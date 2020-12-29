import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {UPDATE_CANVAS} from "../../store/reducerType";

export default function Text(data) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log("handleChange", {...data, desc: newValue}); //sy-log
    dispatch({type: UPDATE_CANVAS, payload: {...data, desc: newValue}});
  };

  return (
    <div>
      <input type="text" value={data.desc} onChange={handleChange} />
    </div>
  );
}
