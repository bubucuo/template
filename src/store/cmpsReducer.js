import {ADD_TO_CANVAS, UPDATE_CANVAS} from "./reducerType";

function getNewStateFromUpdate(state, newData) {
  let newState = [...state];
  newState.map((item, index) => {
    if (item.onlyKey === newData.onlyKey) {
      newState[index] = {...newData};
    }
  });
  return newState;
}

export const cmpsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CANVAS:
      return [...state, action.payload];
    case UPDATE_CANVAS:
      return getNewStateFromUpdate(state, action.payload);
    default:
      return state;
  }
};
