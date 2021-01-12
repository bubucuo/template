import {useDispatch} from "react-redux";
import {ADD_TO_CANVAS} from "../../store/reducerType";

export default function useAddCanvas() {
  const dispatch = useDispatch();
  const add = (payload) => {
    dispatch({type: ADD_TO_CANVAS, payload});
  };
  return [add];
}
