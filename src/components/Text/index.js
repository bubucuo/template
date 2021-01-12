import styles from "./index.less";

export default function Text(data) {
  const {style} = data;

  return (
    <div
      className={styles.main}
      style={{
        fontSize: style.fontSize,
        width: style.width,
        height: style.height,
        lineHeight: style.lineHeight,
      }}>
      {data.value}
    </div>
  );
}
