import {createStore,applyMiddleWare} from "redux";

import {thunk } from "redux-thunk";

const initialState={};

const rootReducer={};

const store = createStore(rootReducer,initialState,applyMiddleWare);

export default store;