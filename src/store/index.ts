import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import { persistedReducer } from "./persist";

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  devTools: import.meta.env.DEV,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
