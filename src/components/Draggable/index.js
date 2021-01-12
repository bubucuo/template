import styles from "./index.less";
import classnames from "classnames";
import useUpdateCanvas from "../hooks/useUpdateCanvas";
import {useEffect, useRef, useState} from "react";
import {globalCanvas} from "../../utils/globalCanvas";
import {useForceUpdate} from "../../utils";

// setSelectCmp 选中的组件
// selected 是否是选中的组件，选中的组件加橙色标记边框
export default function Draggable({
  children,
  targetData,
  basePos,
  setSelectCmp,
  selected,
}) {
  const forceUpdate = useForceUpdate();

  const {style} = targetData.data;

  const [pos, setPos] = useState({top: style.top, left: style.left});

  let [update] = useUpdateCanvas();

  const dragRef = useRef();

  const onDrag = (e) => {
    e.clientY &&
      setPos({
        top: e.clientY,
        left: e.clientX,
      });
  };

  const onDragEnd = (e) => {
    let _pos = {
      top: basePos.top - pos.top,
      left: basePos.left - pos.left,
    };
    update({...targetData, style: _pos});
  };

  const setActive = () => {
    // globalCanvas.setActiveCmp(targetData);
    // forceUpdate();
    setSelectCmp(targetData);
  };

  const domStyle = {
    top: style.top, //+ basePos.top,
    left: style.left, //+ basePos.left,
    width: style.width,
    height: style.height,
  };

  useEffect(() => {}, [pos]);

  return (
    <div
      ref={dragRef}
      className={
        styles.main + " " + (selected ? "selected" : styles.unselected)
      }
      style={domStyle}
      draggable={true}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onClick={setActive}>
      {children}
    </div>
  );
}
