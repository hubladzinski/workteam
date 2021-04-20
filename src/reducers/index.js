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
  },
});

export const { addItem, removeItem } = rootSlice.actions;

export default rootSlice.reducer;
