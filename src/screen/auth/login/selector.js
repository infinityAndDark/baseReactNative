import { createSelector } from "reselect";
import { Map } from "reducer";
const getAuth = state => state[Map.LOGIN];
const getApp = state => state[Map.APP];
const getLanguage = state => state[Map.LANGUAGE];

export default createSelector(
  [getAuth, getApp, getLanguage],
  (auth, app, language) => ({ ...auth, ...app, ...language })
);
