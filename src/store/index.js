import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import inventoryReducer from "../reducers/inventorySlice";
import peopleReducer from "../reducers/peopleSlice";
import calendarReducer from "../reducers/calendarSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistUserConfig = {
  key: "user",
  version: 1,
  storage,
};

const persistInventoryConfig = {
  key: "inventory",
  version: 1,
  storage,
};

const persistPeopleConfig = {
  key: "people",
  version: 1,
  storage,
};

const persistCalendarConfig = {
  key: "calendar",
  version: 1,
  storage,
};

const persistedUserReducer = persistReducer(persistUserConfig, userReducer);
const persistedInventoryReducer = persistReducer(
  persistInventoryConfig,
  inventoryReducer
);
const persistedPeopleReducer = persistReducer(
  persistPeopleConfig,
  peopleReducer
);
const persistedCalendarReducer = persistReducer(
  persistCalendarConfig,
  calendarReducer
);

export default configureStore({
  reducer: {
    user: persistedUserReducer,
    inventory: persistedInventoryReducer,
    people: persistedPeopleReducer,
    calendar: persistedCalendarReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
