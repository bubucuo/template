import {useSelector, useDispatch} from "react-redux";
import {ADD_TO_CANVAS} from "../../store/reducerType";
import styles from "./index.less";

export const TextComponent = 0;
export const ButtonComponent = 1;
export const ImgComponent = 2;

const menus = [
  {
    desc: "文字",
    defaultData: {
      type: TextComponent,
      desc: "请输入文字",
      fontSize: "12px",
    },
  },
  {
    desc: "按钮",
    type: ButtonComponent,
  },
  {
    desc: "图片",
    type: ImgComponent,
  },
];

export default function Cmps(props) {
  const dispatch = useDispatch();
  const addCmp = (data) => {
    dispatch({type: ADD_TO_CANVAS, payload: {...data, onlyKey: Math.random()}});
  };
  return (
    <div className={styles.main}>
      {menus.map((item) => (
        <span
          key={item.desc}
          className={styles.cmp}
          onClick={() => addCmp(item.defaultData)}>
          {item.desc}
        </span>
      ))}
    </div>
  );
}
