import { useState } from "react";
import DetailsList from "../../components/DetailsList";
import styles from "./index.less";

export default function Left(props) {
  const [showSide, setShowSide] = useState(false);
  return (
    <div className={styles.main}>
      <ul className={styles.cmps}>
        <li className={styles.cmp} onClick={() => setShowSide(!showSide)}>
          <span>文本</span>
        </li>
      </ul>

      {showSide && <DetailsList />}
    </div>
  );
}
