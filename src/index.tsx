import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import configureStore from "store/configureStore";
import "./index.css";
import App from "./App";

const content = document.getElementById("main");
const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  content
);
