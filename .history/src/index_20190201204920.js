import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

import App,{render} from "./components/Agent/App";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./Reducers/DashBoardReducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Routes from "./components/A/Router/Routes";
var store = createStore(rootReducer, applyMiddleware(thunk));




//render();
ReactDOM.render(<Routes mystore={store} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
