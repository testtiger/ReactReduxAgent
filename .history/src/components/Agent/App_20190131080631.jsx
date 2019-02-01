import React, { Component } from "react";
import Routes from "../Router/route";
import  rootReducer from "../../Reducers/DashBoardReducers"

import { createStore,appl } from "redux";

var store = createStore(rootReducer);

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
