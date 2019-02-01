import {createStore,applyMiddleWare} from "redux";

import {thunk } from "redux-thunk";

const initialState={};

const rootReducer={};

const middleWare=[]
const store = createStore(rootReducer,initialState,applyMiddleWare());

export default store;