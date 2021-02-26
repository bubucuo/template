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

  const release = () => {
    console.log(
      "发布",
      globalCanvas.getCanvasData(),
      JSON.stringify(globalCanvas.getCanvasData())
    ); //sy-log
  };

  return (
    <>
      <ul className={styles.main}>
        <li className={styles.item} onClick={openOrCloseTpl}>
          <span
            className={`${"iconfont icon-xuanze"} ${
              styles.chooseTemplateIcon
            }`}></span>
          <span className={styles.txt}>选择模板</span>
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
          <span
            className={classnames(
              "iconfont icon-qingkong",
              styles.clearCanvasIcon
            )}></span>
          <span className={styles.txt}>清空画布</span>
        </li>
        <li
          className={classnames(styles.item, styles.release)}
          onClick={release}>
          <span
            className={classnames(
              "iconfont icon-fabu",
              styles.releaseIcon
            )}></span>
          <span className={styles.txt}>发布</span>
        </li>
        {/* <li className={styles.item}>下架</li> */}
      </ul>
      {showTpl && (
        <Tpl openOrCloseTpl={openOrCloseTpl} globalCanvas={globalCanvas} />
      )}
    </>
  );
}
