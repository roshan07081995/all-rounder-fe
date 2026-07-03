import { combineReducers } from "@reduxjs/toolkit";

const appReducer = (
  state = {
    initialized: true,
  }
) => state;

export const rootReducer = combineReducers({
  app: appReducer,
});
