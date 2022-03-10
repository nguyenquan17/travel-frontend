import React from "react";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";

import Loading from "./components/loading/Loading";
import "animate.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import store from "./redux/store/index";
import Routes from "./routes/Routes";

const App = () => (
  <Provider store={store}>
    <Loading/>
    <Routes />
    <ReduxToastr
      timeOut={5000}
      newestOnTop={true}
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick
    />
  </Provider>
);

export default App;
