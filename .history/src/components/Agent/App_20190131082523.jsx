import React, { Component } from "react";
import Routes from "../Router/route";
import ReactDOM from "react-dom";
import rootReducer from "../../Reducers/DashBoardReducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

var store = createStore(rootReducer, applyMiddleware(thunk));

export function render() {
  console.log("--------------->", store.getState());
  ReactDOM.render(<Routes mystore={store} />, document.getElementById("root"));
}

store.subscribe(render);

export default class App extends Component {
  render() {
    return <Routes mystore={store} />;
  }
}
