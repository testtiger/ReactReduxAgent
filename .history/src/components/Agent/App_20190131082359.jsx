import React, { Component } from "react";
import Routes from "../Router/route";
import ReactDOM from "react-dom";
import  rootReducer from "../../Reducers/DashBoardReducers"
import { createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk";

var store = createStore(rootReducer,applyMiddleware(thunk));



 = function () {
    console.log("--------------->", store.getState());
    ReactDOM.render(<Routes mystore={store} />, rootElement);
};

store.subscribe(render);
render();

export default class App extends Component {
    render() {
        return <Routes mystore={store} />;
    }



}

