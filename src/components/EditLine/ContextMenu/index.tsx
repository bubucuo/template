import styles from "./index.less";
import {useCanvasByContext} from "src/store/hooks";
import classNames from "classnames";

export default function ContextMenu({style}: any) {
  const canvas = useCanvasByContext();

  const copy = (e) => {
    e.stopPropagation();
    canvas.addAssemblyCms();
  };

  const del = (e) => {
    e.stopPropagation();
    canvas.deleteCmps();
  };

  const addCmpZIndex = (e) => {
    e.stopPropagation();
    canvas.addCmpZIndex();
  };

  const subCmpZIndex = (e) => {
    e.stopPropagation();
    canvas.subCmpZIndex();
  };

  const topZIndex = (e) => {
    e.stopPropagation();
    canvas.topZIndex();
  };

  const bottomZIndex = (e) => {
    e.stopPropagation();
    canvas.bottomZIndex();
  };
  const hasAssembly = canvas.hasAssembly();
  return (
    <ul className={classNames(styles.main)} style={style}>
      <li className={styles.item} onClick={copy}>
        复制组件
      </li>
      <li className={styles.item} onClick={del}>
        删除组件
      </li>
      {!hasAssembly && (
        <>
          <li className={styles.item} onClick={addCmpZIndex}>
            上移一层
          </li>
          <li className={styles.item} onClick={subCmpZIndex}>
            下移一层
          </li>
          <li className={styles.item} onClick={topZIndex}>
            置顶
          </li>
          <li className={styles.item} onClick={bottomZIndex}>
            置底
          </li>
        </>
      )}
    </ul>
  );
}
