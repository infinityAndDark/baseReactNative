import SecureStore from "./SecureStore";
const store = new SecureStore();

const TOKEN_KEY = "LOGIN_TOKEN";

const getToken = async () => {
  return store.get(TOKEN_KEY);
};
const saveToken = async token => {
  return store.set(TOKEN_KEY, token);
};
const deleteToken = async () => {
  return store.delete(TOKEN_KEY);
};
export default {
  getToken: getToken,
  saveToken: saveToken,
  deleteToken: deleteToken
};
