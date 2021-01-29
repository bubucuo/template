import {formatStyle} from "../../utils";
import styles from "./index.less";

export default function Button(data) {
  const {style} = data;

  console.log("sssssssssss--------", formatStyle(style, false)); //sy-log

  return (
    <button className={styles.main} style={formatStyle(style, false)}>
      {data.value}
    </button>
  );
}
