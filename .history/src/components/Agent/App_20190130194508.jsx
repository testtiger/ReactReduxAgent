import React, { Component } from "react";
import Routes from "../Router/route";
import { Root} from "../Router/route";

import { createStore } from "redux";

import { loginReducer } from "../../Reducers/DashBoardReducers"

var store = createStore(loginReducer);

export default class App extends Component {
    render() {
        return <Routes store />;
    }
}

/***
 * TODO : token expiry logic
 *
 *
 */
