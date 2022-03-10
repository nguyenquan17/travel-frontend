import {toastr} from "react-redux-toastr";

export const showSuccessNotification = (title, message) => {
  const options = {
    timeOut: 2500,
    showCloseButton: false,
    progressBar: false,
    position: "top-right"
  };

  // show notification
  toastr.success(title, message, options);
}
export const showWrongNotification = (title, message) => {
  const options = {
    timeOut: 2500,
    showCloseButton: false,
    progressBar: false,
    position: "top-right"
  }
  // show notification
  toastr.error(title, message, options)
};