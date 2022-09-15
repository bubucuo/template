import {isTextComponent} from "../../../layout/Left";
import {useCanvasByContext} from "../../../store/hooks";
import {defaultCommonStyle} from "../../../utils/const";
import leftSideStyles from "../index.less";

const defaultStyle = {
  ...defaultCommonStyle,
  width: 170,
  height: 30,
  lineHeight: "30px",
  fontSize: 12,
  fontWeight: "normal",
  color: "#000",
  backgroundColor: "#ffffff00",
  textAlign: "left",
  wordSpacing: "10px",
};

const settings = [
  {
    value: "双击编辑标题",
    style: {
      ...defaultStyle,
      fontSize: 28,
      height: 50,
      lineHeight: "50px",
    },
  },
  {
    value: "双击编辑正文",
    style: defaultStyle,
  },
];

export default function TextSide() {
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
        {settings.map((item) => (
          <li
            key={item.value}
            className={leftSideStyles.item}
            onClick={() =>
              addCmp({
                ...item,
                value: item.value,
                type: isTextComponent,
              })
            }
            draggable="true"
            onDragStart={(e) =>
              onDragStart(e, {...item, type: isTextComponent})
            }>
            {item.value.indexOf("双击编辑") > -1
              ? item.value.slice(4)
              : item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
