import React, { Component } from "react";
import Routes from "../Router/route";
import  rootReducer from "../../Reducers/DashBoardReducers"

import { createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk";

var store = createStore(rootReducer,applyMiddleware());

export default class App extends Component {
    render() {
        return <Routes mystore={store} />;
    }
}
//return <Routes store={}/>;

/***
 * TODO : token expiry logic
 *
 *
 */
