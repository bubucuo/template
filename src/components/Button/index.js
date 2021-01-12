import styles from "./index.less";

export default function Button(data) {
  const {style} = data;

  return (
    <button className={styles.main} style={{fontSize: style.fontSize}}>
      {data.value}
    </button>
  );
}
