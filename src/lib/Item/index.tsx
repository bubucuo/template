import styles from "./index.less";

export default function Item({
  label,
  children,
}: {
  label: string;
  children: JSX.Element;
}) {
  return (
    <div className={styles.main}>
      <label>{label}</label>
      {children}
    </div>
  );
}
