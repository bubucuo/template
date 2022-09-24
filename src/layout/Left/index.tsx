import classNames from "classnames";
import {useState, useEffect} from "react";
import ImgSide from "src/components/LeftSide/ImgSide";
import TextSide from "src/components/LeftSide/TextSide";
import TplSide from "src/components/LeftSide/TplSide";
import GraphSide from "src/components/LeftSide/GraphSide";

import styles from "./index.less";

export const isTplSide = 4; //"TplSide";
export const isTextComponent = 1;
export const isImgComponent = 2;
export const isGraphComponent = 3;

export default function Left() {
  const [showSide, setShowSide] = useState(0);

  const _setShowSide = (which: number) => {
    if (showSide === which) {
      setShowSide(0);
    } else {
      setShowSide(which);
    }
  };

  useEffect(() => {
    document.getElementById("center")?.addEventListener("click", () => {
      setShowSide(0);
    });
  }, []);

  return (
    <div className={styles.main}>
      <ul className={styles.cmps}>
        <li
          className={classNames(
            styles.cmp,
            showSide === isTplSide ? styles.selected : ""
          )}
          onClick={() => _setShowSide(isTplSide)}>
          <i
            className={classNames(
              "iconfont icon-mobankuangjia-xianxing",
              styles.cmpIcon
            )}
          />
          <span className={styles.cmpText}>模板</span>
        </li>
        <li
          className={classNames(
            styles.cmp,
            showSide === isTextComponent ? styles.selected : ""
          )}
          onClick={() => _setShowSide(isTextComponent)}>
          <i className={classNames("iconfont icon-wenben", styles.cmpIcon)} />
          <span className={styles.cmpText}>文本</span>
        </li>
        <li
          className={classNames(
            styles.cmp,
            showSide === isImgComponent ? styles.selected : ""
          )}
          onClick={() => _setShowSide(isImgComponent)}>
          <i className={classNames("iconfont icon-tupian", styles.cmpIcon)} />
          <span className={styles.cmpText}>图片</span>
        </li>
        <li
          className={classNames(
            styles.cmp,
            showSide === isGraphComponent ? styles.selected : ""
          )}
          onClick={() => _setShowSide(isGraphComponent)}>
          <i
            className={classNames("iconfont icon-graphical", styles.cmpIcon)}
          />
          <span className={styles.cmpText}>图形</span>
        </li>
      </ul>

      {showSide === isTextComponent && <TextSide />}
      {showSide === isImgComponent && <ImgSide />}
      {showSide === isTplSide && <TplSide />}
      {showSide === isGraphComponent && <GraphSide />}
    </div>
  );
}
