import { combineReducers } from "redux";

import sidebar from "./sidebarReducers";
import layout from "./layoutReducer";
import theme from "./themeReducer";
import userLoginInfo from "./userLoginInfoReducer";
import groupsReducer from "./groupsReducer";
import loaderReducer from "./loaderReducer";
import tourReducer from "./tourReducer";
import { reducer as toastr } from "react-redux-toastr";

export default combineReducers({
  sidebar,
  layout,
  theme,
  toastr,
  userLoginInfo,
  groupsReducer,
  loaderReducer,
  tourReducer
});
