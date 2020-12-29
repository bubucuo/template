import {createStore} from "redux";
import {canvasReducer} from "./canvasReducer";

const store = createStore(canvasReducer);

export default store;
