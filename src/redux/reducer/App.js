import Action from "action";
const INIT_STATE = {
  isLogin: false,
};

export default function(state = INIT_STATE, action) {
  switch (action.type) {
    case Action.LOGIN_SUCCESS:
      return { ...state, isLogin: true };
    case Action.LOGOUT:
      return { ...state, isLogin: false };
    default:
      return state;
  }
}
