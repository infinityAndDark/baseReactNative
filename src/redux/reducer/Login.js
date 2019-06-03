import Action from "action";
export default function(
  state = { startLogin: false, userName: "", password: "", result: null },
  action
) {
  switch (action.type) {
    case Action.LOGIN_SUCCESS:
      return { ...state, result: action.payload };
    default:
      return state;
  }
}
