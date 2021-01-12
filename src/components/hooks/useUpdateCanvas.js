import {useDispatch} from "react-redux";
import {UPDATE_CANVAS} from "../../store/reducerType";

export default function useUpdateCanvas() {
  const dispatch = useDispatch();
  const update = (payload) => {
    dispatch({type: UPDATE_CANVAS, payload});
  };
  return [update];
}
