import { useContext } from "react";
import { getComponent } from "..";
import { CanvasContext } from "../../../Context";
import styles from "./index.less";

export default function ContextMenu({ index, pos, cmp, del }) {
  const globalCanvas = useContext(CanvasContext);

  const copy = () => {
    globalCanvas.addCmp(cmp);
  };

  const beTop = (e) => {
    globalCanvas.changeCmpIndex(index);
  };

  const beBottom = (e) => {
    globalCanvas.changeCmpIndex(index, 0);
  };

  const cmps = globalCanvas.getCmps();

  const mouseOver = (e, _cmp) => {
    let cmpTarget = document.getElementById("cmp" + _cmp.onlyKey);
    let prevClassName = cmpTarget.className;
    if (prevClassName.indexOf("hover") === -1) {
      cmpTarget.setAttribute("class", prevClassName + " hover");
    }
  };

  const mouseLeave = (e, _cmp) => {
    let cmpTarget = document.getElementById("cmp" + _cmp.onlyKey);
    let prevClassName = cmpTarget.className;

    if (prevClassName.indexOf("hover") > -1) {
      cmpTarget.setAttribute("class", prevClassName.slice(0, -6));
    }
  };

  const selectCmp = (e, cmp) => {
    globalCanvas.setSelectedCmp(cmp);
  };

  return (
    <ul className={styles.main} style={pos}>
      <li className={styles.item} onClick={copy}>
        复制
      </li>
      <li className={styles.item} onClick={del}>
        删除
      </li>
      <li className={styles.item} onClick={beTop}>
        置顶
      </li>
      <li className={styles.item} onClick={beBottom}>
        置底
      </li>

      {cmps.map((_cmp) => (
        <li
          key={_cmp.onlyKey}
          className={styles.item}
          onMouseOver={(e) => mouseOver(e, _cmp)}
          onMouseLeave={(e) => mouseLeave(e, _cmp)}
          onClick={(e) => selectCmp(e, _cmp)}
        >
          <div className={styles.desc}>{_cmp.desc}</div>
          <div
            className={styles.thumbnail}
            style={{
              width: _cmp.data.style.width,
              height: _cmp.data.style.height,
            }}
          >
            {getComponent(_cmp)}
          </div>
        </li>
      ))}
    </ul>
  );
}
