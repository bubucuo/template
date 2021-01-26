import {globalCanvas} from "../../utils/globalCanvas";
import styles from "./index.less";

export const TextComponent = 0;
export const ButtonComponent = 1;
export const ImgComponent = 2;

const menus = [
  {
    desc: "文本",
    data: {
      type: TextComponent,
      value: "文本",
      style: {
        top: 1,
        left: 0,
        width: 80,
        height: 30,
        lineHeight: 30,
        fontSize: 12,
      },
    },
  },
  {
    desc: "按钮",
    data: {
      type: ButtonComponent,
      value: "按钮",
      style: {
        top: 0,
        left: 0,
        width: 80,
        height: 30,
        lineHeight: 30,
        fontSize: 12,
      },
    },
  },
  {
    desc: "图片",
    data: {
      type: ImgComponent,
      value: "",
      style: {
        top: 0,
        left: 0,
        width: 200,
      },
    },
  },
];

export default function Cmps(props) {
  const handleDragStart = (e, data) => {
    let startPos = {pageX: e.pageY, pageY: e.pageY};
    e.dataTransfer.setData("startPos", JSON.stringify(startPos));
    globalCanvas.setActiveCmp({...data});
  };

  return (
    <div className={styles.main}>
      {menus.map((item) => (
        <span
          key={item.desc}
          className={styles.cmp}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, item)}>
          {item.desc}
        </span>
      ))}
    </div>
  );
}
