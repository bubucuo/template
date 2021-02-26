import React from "react";
import {CanvasContext} from "../../../Context";
import styles from "./index.less";

export default function AddCmpWrapper({
  children,
  baseCmp,
  value,
  style = {width: 200, height: 200},
}) {
  const globalCanvas = React.useContext(CanvasContext);

  let cmp = React.useMemo(() => {
    return {
      ...baseCmp,
      data: {
        ...baseCmp.data,
        value,
        style: {
          ...baseCmp.data.style,
          ...style,
        },
      },
    };
  }, [baseCmp, value]);

  const addCmp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    globalCanvas.addCmp(cmp);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("add-component", JSON.stringify(cmp));
  };

  return (
    <li
      className={styles.main}
      onClick={addCmp}
      draggable="true"
      onDragStart={handleDragStart}>
      {children}
    </li>
  );
}
