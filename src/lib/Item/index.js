import styles from "./index.less";

export default function Item({label, children}) {
  return (
    <div className={styles.main}>
      <label>{label}</label>
      {children}
    </div>
  );
}
