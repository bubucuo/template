import {useState, useEffect} from "react";
import ContextMenu from "./ContextMenu";
import styles from "./index.less";

// setSelectCmp 选中的组件
// selected 是否是选中的组件，选中的组件加橙色标记边框
export default function Draggable({
  children,
  cmp,
  setSelectCmp,
  selected,
  editCmp,
  index,
}) {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const {style} = cmp.data;

  const setActive = (e) => {
    e.stopPropagation();
    setSelectCmp(cmp);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowContextMenu(true);
  };

  useEffect(() => {
    document.getElementById("root").addEventListener("click", () => {
      // 点击非组件区域的时候，取消选中的组件
      // setSelectCmp(null);
      setShowContextMenu(false);
    });
  }, []);

  return (
    <>
      <div
        className={
          styles.main + " " + (selected ? "selected" : styles.unselected)
        }
        style={style}
        draggable={true}
        onDragStart={setActive}
        onClick={setActive}
        onContextMenu={handleContextMenu}>
        {children}
      </div>
      {showContextMenu && (
        <ContextMenu
          pos={{top: style.top + 10, left: style.left + 60}}
          cmp={cmp}
          index={index}
          editCmp={editCmp}
        />
      )}
    </>
  );
}
