import {useContext} from "react";
import {CanvasContext} from "../../Context";
import styles from "./index.less";

export default function ContextMenu({index, pos, cmp}) {
  const globalCanvas = useContext(CanvasContext);

  const del = (e) => {
    e.stopPropagation();
    globalCanvas.deleteSelectedCmp(cmp);
  };

  const beTop = (e) => {
    globalCanvas.changeCmpIndex(index);
  };

  const beBottom = (e) => {
    globalCanvas.changeCmpIndex(index, 0);
  };

  return (
    <ul className={styles.main} style={pos}>
      <li className={styles.item} onClick={del}>
        删除
      </li>
      <li className={styles.item} onClick={beTop}>
        置顶
      </li>
      <li className={styles.item} onClick={beBottom}>
        置底
      </li>
    </ul>
  );
}
