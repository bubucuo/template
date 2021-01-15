import styles from "./index.less";

export default function ContextMenu({pos, cmp, editCmp}) {
  const del = (e) => {
    e.stopPropagation();
    editCmp({
      ...cmp,
      data: null,
    });
  };
  return (
    <ul className={styles.main} style={pos}>
      <li className={styles.item} onClick={del}>
        删除
      </li>
      <li className={styles.item} onClick={del}>
        改变
      </li>
    </ul>
  );
}
