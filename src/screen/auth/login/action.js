import Action from "action";
import Network from "middleware/helper/Network";

export const loginStart = () => ({ type: Action.LOGIN_START });
export const loginSuccess = data => ({
  type: Action.LOGIN_SUCCESS,
  payload: data
});
export const loginError = error => ({
  type: Action.LOGIN_ERROR,
  payload: { error: error }
});
export const logout = () => ({ type: Action.LOGOUT });

export const login = (userName, password) => {
  return async (dispatch, state) => {
    try {
      let result = await Network.login(userName, password);
      dispatch(loginSuccess(result));
    } catch (error) {
      dispatch(loginError(error));
    }
  };
};
