import { useState, useContext } from "react";
import { CanvasContext } from "../../Context";
import Img from "./Img";
import styles from "./index.less";
import {
  isImgComponent,
  isTextComponent,
  isButtonComponent,
  menus,
} from "./menus";
import classnames from "classnames";

export default function Cmps(props) {
  const globalCanvas = useContext(CanvasContext);

  const [list, setList] = useState(null);
  const handleDragStart = (e, cmp) => {
    if (cmp.data.type === isImgComponent) {
      return;
    }
    e.dataTransfer.setData("add-component", JSON.stringify(cmp));
  };

  const handleClick = (e, cmp) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      cmp.data.type === isTextComponent ||
      cmp.data.type === isButtonComponent
    ) {
      globalCanvas.addCmp(cmp);
      return;
    }
    // 图片组件
    if (list) {
      setList(null);
    } else {
      let l = null;
      switch (cmp.data.type) {
        case isImgComponent:
          l = <Img baseCmp={cmp} />;
          break;
        default:
          l = null;
      }
      setList(l);
    }
  };
  //  左侧栏布局
  return (
    <div id="cmps" className={styles.main}>
      <div className={styles.cmpTop}>嗷嗷的</div>
      <div className={styles.cmpList}>
        {menus.map((item) => (
          <div
            key={item.desc}
            className={styles.cmp}
            draggable={item.data.type !== isImgComponent}
            onDragStart={(e) => handleDragStart(e, item)}
            onClick={(e) => handleClick(e, item)}
          >
            <span className={`${item.data.iconfont} ${styles.cmpIcon}`}> </span>

            <span className={styles.cmpText}> {item.desc} </span>
          </div>
        ))}
      </div>
      {list && (
        <button
          className={classnames("iconfont icon-close", styles.close)}
          onClick={() => setList(null)}
        ></button>
      )}
      {list && <ul className={styles.detailList}> {list}</ul>}
    </div>
  );
}
