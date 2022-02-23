import styles from "./index.less";

export default function Cmp({ cmp }) {
  const { style, value } = cmp;
  return (
    <div className={styles.cmp} style={style}>
      {value}
    </div>
  );
}
