import {
  ADD_TO_CANVAS,
  UPDATE_CANVAS,
  REPLACE_CANVAS,
  UPDATE_CANVAS_STYLE,
} from "./reducerType";

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
    // 修改stle
    case UPDATE_CANVAS_STYLE:
      return getNewStateFromUpdate(
        state,
        updateCmpFromStyle(action.payload.cmp, action.payload.style)
      );
    case REPLACE_CANVAS:
      return action.payload;
    default:
      return state;
  }
};

export function updateCmpFromStyle(cmp, partStyle) {
  return {
    ...cmp,
    data: {
      ...cmp.data,
      style: {
        ...cmp.data.style,
        ...partStyle,
      },
    },
  };
}
