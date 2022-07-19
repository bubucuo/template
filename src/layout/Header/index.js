import {useCanvasByContext} from "../../store/hooks";
import classNames from "classnames";
import styles from "./index.less";

export default function Header(props) {
  const canvas = useCanvasByContext();

  const save = () => {
    const data = canvas.getCanvas();

    console.log("data", data, JSON.stringify(data)); //sy-log
  };
  return (
    <div className={styles.main}>
      <div className={classNames(styles.item)} onClick={save}>
        <span
          className={classNames("iconfont icon-baocun", styles.icon)}></span>
        <span className={styles.txt}>保存</span>
      </div>
      <div className={classNames(styles.item)} onClick={save}>
        <span
          className={classNames("iconfont icon-baocun", styles.icon)}></span>
        <span className={styles.txt}>发布</span>
      </div>
    </div>
  );
}
