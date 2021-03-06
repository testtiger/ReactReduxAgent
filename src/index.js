import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./Reducers/DashBoardReducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Routes from "./components/Agent/Router/route";
import { Provider } from "react-redux";
var store = createStore(rootReducer, applyMiddleware(thunk));

//C:\Users\dkammara.ORADEV\Desktop\React\react-2hours\Agent-redux\src\components\Router

//render();


ReactDOM.render(
  <div>
    <Routes />
  </div>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
