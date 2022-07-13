import {isImgComponent} from "../../layout/Left";
import {useCanvasByContext} from "../../store/hooks";
import {defaultCommonStyle} from "../../utils/const";
import styles from "./index.less";

const defaultStyle = {
  ...defaultCommonStyle,
};

const settings = [
  {
    value: "http://150.158.30.131:8181/certificate.jpg",
    style: defaultStyle,
  },
  {
    value: "http://150.158.30.131:8181/chuliu.jpeg",
    style: defaultStyle,
  },
  {
    value: "http://150.158.30.131:8181/tiger.png",
    style: defaultStyle,
  },
  {
    value: "http://150.158.30.131:8181/hua.png",
    style: defaultStyle,
  },
];

export default function ImgSide() {
  const canvas = useCanvasByContext();
  const addCmp = (_cmp) => {
    canvas.addCmp(_cmp);
  };
  return (
    <div className={styles.main}>
      <ul className={styles.box}>
        {settings.map((item) => (
          <li
            key={item.value}
            className={styles.item}
            onClick={() => addCmp({...item, type: isImgComponent})}>
            <img src={item.value} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
}
