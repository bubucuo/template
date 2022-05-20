import classNames from "classnames";
import { useState } from "react";
import ImgSide from "../../components/ImgSide";
import TextSide from "../../components/TextSide";
import styles from "./index.less";

export const isTextComponent = 1;
export const isImgComponent = 2;

export default function Left(props) {
  const [showSide, setShowSide] = useState(0);

  const _setShowSide = (which) => {
    if (showSide === which) {
      setShowSide(0);
    } else {
      setShowSide(which);
    }
  };
  return (
    <div className={styles.main}>
      <ul className={styles.cmps}>
        <li
          className={classNames(
            styles.cmp,
            showSide === isTextComponent ? styles.selected : ""
          )}
          onClick={() => _setShowSide(isTextComponent)}
        >
          <span>文本</span>
        </li>
        <li
          className={classNames(
            styles.cmp,
            showSide === isImgComponent ? styles.selected : ""
          )}
          onClick={() => _setShowSide(isImgComponent)}
        >
          <span>图片</span>
        </li>
      </ul>

      {showSide === isTextComponent && <TextSide />}
      {showSide === isImgComponent && <ImgSide />}
    </div>
  );
}
