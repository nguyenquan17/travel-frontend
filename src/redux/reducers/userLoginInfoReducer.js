import Storage from "../../Storage/Storage";
import * as types from "../constants";

const initialState = {
  token: Storage.getToken(),
  userInfo: Storage.getUserInfo(),
  isRememberMe: Storage.isRememberMe()
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.USER_LOGIN_INFO:
      return {
        ...state,
        userInfo: actions.user
      };
    case types.TOKEN_INFO:
      return {
        ...state,
        token: actions.token
      };
    case types.REMEMBER_ME_INFO:
      return {
        ...state,
        isRememberMe: actions.isRememberMe
      };
    default:
      return state;
  }
}