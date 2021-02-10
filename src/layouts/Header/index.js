import {useContext} from "react";
import styles from "./index.less";
import classnames from "classnames";
import {CanvasContext} from "../../Context";

export default function Header(props) {
  const globalCanvas = useContext(CanvasContext);

  const prevCanvas = () => {
    globalCanvas.goPrevCanvasHistory();
  };

  const nextCanvas = () => {
    globalCanvas.goNextCanvasHistory();
  };
  return (
    <ul className={styles.main}>
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
    </ul>
  );
}
