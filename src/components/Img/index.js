import {formatStyle} from "../../utils";
import styles from "./index.less";

export default function Img(data) {
  const {style} = data;

  return (
    <img
      className={styles.main}
      style={style}
      src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1333208373,3297678241&fm=26&gp=0.jpg"
      alt=""
    />
  );
}
