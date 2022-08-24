import {useCanvasByContext} from "../../store/hooks";
import classNames from "classnames";
import styles from "./index.less";

export default function Header(props) {
  const canvas = useCanvasByContext();

  const save = () => {
    const data = canvas.getCanvas();

    console.log("data", data); //sy-log
  };

  const emptyCanvas = () => {
    canvas.setCanvas(null);
  };

  const goPrevCanvasHistory = () => {
    canvas.goPrevCanvasHistory();
  };

  const goNextCanvasHistory = () => {
    canvas.goNextCanvasHistory();
  };

  return (
    <div className={styles.main}>
      <div className={classNames(styles.item)} onClick={save}>
        <span
          className={classNames("iconfont icon-baocun", styles.icon)}></span>
        <span className={styles.txt}>保存</span>
      </div>

      <div className={classNames(styles.item)} onClick={goPrevCanvasHistory}>
        <span
          className={classNames(
            "iconfont icon-chexiaofanhuichehuishangyibu",
            styles.icon
          )}></span>
        <span className={styles.txt}>上一步</span>
      </div>

      <div className={classNames(styles.item)} onClick={goNextCanvasHistory}>
        <span
          className={classNames(
            "iconfont icon-chexiaofanhuichehuishangyibu",
            styles.icon
          )}
          style={{transform: `rotateY{180}deg`}}></span>
        <span className={styles.txt}>下一步</span>
      </div>

      <div className={classNames(styles.item)} onClick={emptyCanvas}>
        <span
          className={classNames("iconfont icon-qingkong", styles.icon)}></span>
        <span className={styles.txt}>清空</span>
      </div>

      <div className={classNames(styles.item)} onClick={save}>
        <span className={classNames("iconfont icon-fabu", styles.icon)}></span>
        <span className={styles.txt}>发布</span>
      </div>
    </div>
  );
}
