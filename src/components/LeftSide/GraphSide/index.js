import {useCallback} from "react";

import {isGraphComponent, isTextComponent} from "../../../layout/Left";
import {useCanvasByContext} from "../../../store/hooks";
import {defaultCommonStyle} from "../../../utils/const";
import leftSideStyles from "../index.less";

const defaultStyle = {
  ...defaultCommonStyle,
  width: 120,
  height: 120,
  borderColor: "blue",
  backgroundColor: "blue",
};

const settings = [
  {
    value: "",
    style: {
      ...defaultStyle,
      borderWidth: 1,
      borderStyle: "solid",
      backgroundColor: "transparent",
    },
  },
  {
    value: "",
    style: defaultStyle,
  },
];

export default function GraphSide() {
  const canvas = useCanvasByContext();
  const addCmp = (_cmp) => {
    canvas.addCmp(_cmp);
  };

  const onDragStart = (e, _cmp) => {
    e.dataTransfer.setData("drag-cmp", JSON.stringify(_cmp));
  };

  return (
    <div className={leftSideStyles.main}>
      <ul className={leftSideStyles.box}>
        {settings.map((item, index) => (
          <li
            key={"item" + index}
            className={leftSideStyles.item}
            style={{
              width: item.style.width,
              height: item.style.height,
              backgroundColor: item.style.backgroundColor,
              borderStyle: item.style.borderStyle,
              borderStyle: item.style.borderStyle,
              borderColor: item.style.borderColor,
            }}
            onClick={() => addCmp({...item, type: isGraphComponent})}
            draggable="true"
            onDragStart={(e) =>
              onDragStart(e, {...item, type: isGraphComponent})
            }></li>
        ))}
      </ul>
    </div>
  );
}
