import {combineReducers, createStore} from "redux";
import {cmpsReducer} from "./cmpsReducer";

const store = createStore(combineReducers({cmps: cmpsReducer}));

export default store;
