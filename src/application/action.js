import Action from "action";

export const restart = () => ({ type: Action.RESTART });
export const changeLanguage = langCode => ({
  type: Action.CHANGE_LANGUAGE,
  payload: langCode
});
