import styles from "./index.less";

export default function ContextMenu({
  index,
  pos,
  cmp,
  editCmp,
  changeCmpIndex,
}) {
  const del = (e) => {
    e.stopPropagation();
    editCmp({
      ...cmp,
      data: null,
    });
  };

  const beTop = (e) => {
    changeCmpIndex(index);
  };

  const beBottom = (e) => {
    changeCmpIndex(index, 0);
  };

  return (
    <ul className={styles.main} style={pos}>
      <li className={styles.item} onClick={del}>
        删除
      </li>
      <li className={styles.item} onClick={beTop}>
        置顶
      </li>
      <li className={styles.item} onClick={beBottom}>
        置底
      </li>
    </ul>
  );
}
