import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestType } from "../backend/backend";

const now = new Date();
const day = now.getDate();
const dayOfWeek = now.getDay() - 1;
const month = now.getMonth();
const year = now.getFullYear();
const daysInMonth = new Date(year, month + 1, 0).getDate();
const daysInPreviousMonth = new Date(year, month, 0).getDate();

const time = {
  day: day - dayOfWeek,
  month,
  year,
  daysInMonth,
  daysInPreviousMonth,
};

const initialState = {
  time,
  weekDays: [],
  tasks: [],
  searchCalendar: [],
  status: "idle",
  error: null,
  addStatus: "idle",
  addkError: null,
  putStatus: "idle",
  putError: null,
};

export const getTasks = createAsyncThunk(
  "calendar/getTasks",
  async (arg = null, { getState, dispatch }) => {
    try {
      const { token } = getState().user.user;
      const { searchCalendar } = getState().calendar;
      if (searchCalendar.length > 0) {
        let fetchedTasks = searchCalendar.map(async (userData) => {
          const request = {
            url: `${requestType.get_user_tasks}/${userData._id}`,
            options: {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            },
          };
          const response = await fetch(request.url, request.options);
          const json = await response.json();
          return json;
        });
        let tasks = await Promise.all(fetchedTasks);
        let allTasks = [];
        tasks.forEach((array) => {
          array.forEach((element) => {
            allTasks.push(element);
          });
        });
        let filteredTasks = allTasks.filter(
          (element, index, self) =>
            index === self.findIndex((e) => e._id === element._id)
        );
        console.log(filteredTasks);
        return filteredTasks;
      }
    } catch (err) {
      return err;
    }
  }
);

export const addTasks = createAsyncThunk(
  "calendar/addTasks",
  async (
    { usersIDs, title, selectedDay, time_start, time_end, note, steps },
    { getState, dispatch }
  ) => {
    const { token } = getState().user.user;
    const request = {
      url: requestType.post_task,
      options: {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          time_start: new Date(
            selectedDay.getFullYear(),
            selectedDay.getMonth(),
            selectedDay.getDate(),
            time_start.slice(0, 2),
            time_start.slice(3, 5)
          ),
          time_end: new Date(
            selectedDay.getFullYear(),
            selectedDay.getMonth(),
            selectedDay.getDate(),
            time_end.slice(0, 2),
            time_end.slice(3, 5)
          ),
          note: note,
          users: usersIDs,
          steps: steps,
        }),
      },
    };
    try {
      const response = await fetch(request.url, request.options);
      const json = await response.json();
      return json;
    } catch (err) {
      return err;
    }
  }
);

export const putTask = createAsyncThunk(
  "calendar/putTask",
  async ({ taskID, stepsState: steps }, { getState, dispatch }) => {
    const { token } = getState().user.user;
    const request = {
      url: requestType.put_task,
      options: {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: taskID,
          steps: steps,
        }),
      },
    };
    try {
      const response = await fetch(request.url, request.options);
      const json = await response.json();
      console.log(taskID, steps);
      return { response: json, taskID, steps };
    } catch (err) {
      return err;
    }
  }
);

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: initialState,
  reducers: {
    setItem: (state, action) => {
      state[action.payload.type] = action.payload.data;
    },
    resetStatus: (state, action) => {
      state[action.payload.statusType] = "idle";
      state[action.payload.errorType] = null;
    },
  },
  extraReducers: {
    [getTasks.pending]: (state, action) => {
      state.status = "loading";
    },
    [getTasks.fulfilled]: (state, action) => {
      state.status = "succeeded";
      if (action.payload) {
        state.tasks = action.payload;
      } else {
        state.tasks = [];
      }
    },
    [getTasks.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addTasks.pending]: (state, action) => {
      state.addStatus = "loading";
    },
    [addTasks.fulfilled]: (state, action) => {
      state.addStatus = "succeeded";
    },
    [addTasks.rejected]: (state, action) => {
      state.addStatus = "failed";
      state.addError = action.error.message;
    },
    [putTask.pending]: (state, action) => {
      state.putStatus = "loading";
    },
    [putTask.fulfilled]: (state, action) => {
      state.putStatus = "succeeded";
      state.tasks = state.tasks.map((task) => {
        if (task._id === action.payload.taskID) {
          return { ...task, steps: action.payload.steps };
        }
        return task;
      });
    },
    [putTask.rejected]: (state, action) => {
      state.putStatus = "failed";
      state.putError = action.error.message;
    },
  },
});

export const { setItem, resetStatus } = calendarSlice.actions;

export default calendarSlice.reducer;
