import { combineReducers } from "redux";
import Map from "./Map";
import App from "./App";
import Language from "./Language";
import Splash from "./Splash";
import Login from "./Login";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
const persistConfigApp = {
  key: "app",
  storage: storage,
  stateReconciler: autoMergeLevel2
};
const persistConfigLanguage = {
  key: "language",
  storage: storage,
  stateReconciler: autoMergeLevel2
};

const reducers = {
  [Map.APP]: persistReducer(persistConfigApp, App),
  [Map.LANGUAGE]: persistReducer(persistConfigLanguage, Language),
  [Map.SPLASH]: Splash,
  [Map.LOGIN]: Login
};

export default combineReducers(reducers);
export { Map };
