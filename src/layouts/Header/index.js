import {useContext, useState, useCallback, useEffect} from "react";
import styles from "./index.less";
import classnames from "classnames";
import {CanvasContext} from "../../Context";
import Tpl from "./Tpl";

export default function Header(props) {
  const [showTpl, setShowTpl] = useState(false);
  const globalCanvas = useContext(CanvasContext);

  const prevCanvas = () => {
    globalCanvas.goPrevCanvasHistory();
  };

  const nextCanvas = () => {
    globalCanvas.goNextCanvasHistory();
  };

  const openOrCloseTpl = useCallback(() => {
    setShowTpl(!showTpl);
  }, [showTpl]);

  const emptyCanvas = () => {
    globalCanvas.emptyCanvas();
  };

  return (
    <>
      <ul className={styles.main}>
        <li className={styles.item} onClick={openOrCloseTpl}>
          选择模板
        </li>
        <li className={styles.item} onClick={prevCanvas}>
          <span
            className={classnames(
              "iconfont icon-chexiaofanhuichehuishangyibu",
              styles.lastStep
            )}></span>
          <span className={styles.txt}>上一步</span>
        </li>
        <li className={styles.item} onClick={nextCanvas}>
          <span
            className={classnames(
              "iconfont icon-chexiaofanhuichehuishangyibu",
              styles.nextStep
            )}></span>
          <span className={styles.txt}>下一步</span>
        </li>

        <li className={styles.item} onClick={emptyCanvas}>
          清空画布
        </li>
      </ul>
      {showTpl && (
        <Tpl openOrCloseTpl={openOrCloseTpl} globalCanvas={globalCanvas} />
      )}
    </>
  );
}
