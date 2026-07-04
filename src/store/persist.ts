import { persistReducer, type WebStorage } from "redux-persist";

import { rootReducer } from "./root-reducer";

const localStorageAdapter: WebStorage = {
  getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key, value) => {
    window.localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key) => {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
};

export const persistedReducer = persistReducer(
  {
    key: "root",
    storage: localStorageAdapter,
    whitelist: ["auth"],
  },
  rootReducer
);
