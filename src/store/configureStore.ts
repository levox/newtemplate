import { applyMiddleware, createStore } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import reducers from "./reducers";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";

const client = axios.create({ baseURL: "", responseType: "json" });

export default function configureStore(initialState = {}) {
  return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk, axiosMiddleware(client))));
}
