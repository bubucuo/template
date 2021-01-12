import {useState} from "react";
import {useDispatch} from "react-redux";
import {ADD_TO_CANVAS} from "../../store/reducerType";
import {getOnlyKey} from "../../utils";
import {getCanvasPos, globalCanvas} from "../../utils/globalCanvas";
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
        top: 0,
        left: 0,
        width: 80,
        height: 30,
        lineHeight: "30px",
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
        lineHeight: "30px",
        fontSize: 12,
      },
    },
  },
  {
    desc: "图片",
    data: {
      type: ImgComponent,
      value: "文字",
      style: {
        top: 0,
        left: 0,
      },
    },
  },
];

export default function Cmps(props) {
  const dispatch = useDispatch();

  const handleDragStart = (e, data) => {
    // props.setAddCmp({...data});
    globalCanvas.setActiveCmp({...data});
  };

  const handleDragEnd = (e, data) => {
    // props.setAddCmp(null);
  };

  return (
    <div className={styles.main}>
      {menus.map((item) => (
        <span
          key={item.desc}
          className={styles.cmp}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, item)}
          onDragEnd={(e) => handleDragEnd(e, item)}>
          {item.desc}
        </span>
      ))}
    </div>
  );
}
