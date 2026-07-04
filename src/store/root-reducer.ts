import { combineReducers } from "@reduxjs/toolkit";

import { authReducer } from "@/modules/auth/store/auth.slice";

const appReducer = (
  state = {
    initialized: true,
  }
) => state;

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
});
