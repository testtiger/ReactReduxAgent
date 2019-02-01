import React, { Component } from "react";
import Routes from "../Router/route";


import { loginReducer } from "../../Reducers/DashBoardReducers"
var store = createStore(loginReducer);

export default class App extends Component {
    render() {
        return <Routes />;
    }
}

/***
 * TODO : token expiry logic
 *
 *
 */
