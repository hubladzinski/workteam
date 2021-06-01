import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import inventoryReducer from "../reducers/inventorySlice";
import peopleReducer from "../reducers/peopleSlice";
import calendarReducer from "../reducers/calendarSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    inventory: inventoryReducer,
    people: peopleReducer,
    calendar: calendarReducer,
  },
});
