import {ADD_TO_CANVAS, UPDATE_CANVAS} from "./reducerType";

// 画布初始值信息
const init = {
  top: 0,
  left: 0,
};

// export const canvasReducer = (state = init, action) => {
//   switch (action.type) {
//     case ADD_TO_CANVAS:
//       return [...state, action.payload];
//     case UPDATE_CANVAS:
//       return getNewStateFromUpdate(state, action.payload);
//     default:
//       return state;
//   }
// };
