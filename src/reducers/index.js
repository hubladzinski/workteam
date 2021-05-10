import { createSlice } from "@reduxjs/toolkit";

export const rootSlice = createSlice({
  name: "root",
  initialState: {
    people: [
      {
        id: 1,
        name: "Jan Nowak",
        picture:
          "https://images.pexels.com/photos/7473931/pexels-photo-7473931.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        tel: "123456789",
        email: "email@email.com",
        teams: [
          {
            id: 1,
            name: "Team A",
            picture:
              "https://images.pexels.com/photos/7473931/pexels-photo-7473931.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          },
        ],
        tasks: [
          { id: 1, name: "Task A", date: "21.02.2021", status: "Completed" },
        ],
      },
    ],
    inventory: [
      {
        id: 1,
        name: "Item",
        picture:
          "https://images.pexels.com/photos/7473931/pexels-photo-7473931.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        status: "In stock",
        price: 65.9,
        date: "21.02.2021",
      },
    ],
    tasks: [
      {
        id: 1,
        title: "Hello its me 1",
        date_start: new Date(2021, 4, 5, 15, 45),
        date_end: new Date(2022, 11, 10, 15, 55),
        note:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. ",
        steps: [
          {
            order: 1,
            task: "Do it 1#",
          },
          {
            order: 2,
            task: "Do it 2#",
          },
        ],
        users: [],
        teams: [],
      },
      {
        id: 2,
        title: "Hello its me 2",
        date_start: new Date(2021, 5, 3, 15, 10),
        date_end: new Date(2022, 11, 10, 16, 50),
        note:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. ",
        users: [],
        teams: [],
      },
    ],
    user: {
      email: "User",
      _id: "",
      uid: "",
      token: "",
      loginStatus: false,
      admin: [],
    },
  },
  reducers: {
    addItem: (state, action) => {
      state[action.payload.type] = [
        ...state[action.payload.type],
        action.payload.item,
      ];
    },
    removeItem: (state, action) => {
      state[action.payload.type] = state[action.payload.type].filter(
        (item) => item.id !== action.payload.id
      );
    },
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { addItem, removeItem, setUserInfo } = rootSlice.actions;

export default rootSlice.reducer;
