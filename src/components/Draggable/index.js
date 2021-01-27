import {useState, useEffect} from "react";
import ContextMenu from "./ContextMenu";
import styles from "./index.less";

// setSelectCmp 选中的组件
// selected 是否是选中的组件，选中的组件加橙色标记边框
export default function Draggable({
  index,
  children,
  cmp,
  setSelectCmp,
  selected,
  editCmp,
  editCmpStyle,
  changeCmpIndex,
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
      // showContextMenu &&
      setShowContextMenu(false);
    });
  }, []);

  const top = style.top - 4;
  const left = style.left - 4;
  const width = style.width,
    height = style.height;

  const handleMouseDown = (e, direction) => {
    e.stopPropagation();
    e.preventDefault();

    let startX = e.pageX;
    let startY = e.pageY;

    const target = e.target;

    const move = (e) => {
      let x = e.pageX;
      let y = e.pageY;

      let disX = x - startX;
      let disY = y - startY;
      let newStyle = {};

      if (direction) {
        if (direction.indexOf("top") >= 0) {
          disY = 0 - disY;
          newStyle.top = cmp.data.style.top - disY;
        }

        if (direction.indexOf("left") >= 0) {
          disX = 0 - disX;
          newStyle.left = cmp.data.style.left - disX;
        }
      }

      editCmpStyle(cmp, {
        width: cmp.data.style.width + disX,
        height: cmp.data.style.height + disY,
        ...newStyle,
      });
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  const handleMouseDownOfLeft = (e) => {};

  const handleMouseDownOfRight = (e) => {};
  return (
    <>
      <div
        className={
          styles.main + " " + (selected ? "selected" : styles.unselected)
        }
        style={{...style, zIndex: index}}
        draggable={true}
        onDragStart={setActive}
        onClick={setActive}
        onContextMenu={handleContextMenu}>
        {children}
      </div>
      {selected && (
        <ul className={styles.stretch}>
          <li
            className="top left"
            style={{top, left}}
            onMouseDown={(e) => handleMouseDown(e, "top left")}
          />
          <li
            className="top"
            style={{
              top,
              left: left + width / 2,
            }}
            onMouseDown={(e) => handleMouseDown(e, "top")}
          />
          <li
            className="top right"
            style={{top, left: left + width + 2}}
            onMouseDown={(e) => handleMouseDown(e, "top right")}
          />
          <li
            className="right"
            style={{
              top: top + height / 2,
              left: left + width + 2,
            }}
            onMouseDown={handleMouseDown}
          />
          <li
            className="bottom right"
            style={{
              top: top + height + 2,
              left: left + width + 2,
            }}
            onMouseDown={handleMouseDown}
          />
          <li
            className="bottom"
            style={{
              top: top + height + 2,
              left: left + width / 2,
            }}
            onMouseDown={handleMouseDown}
          />
          <li
            className="bottom left"
            style={{
              top: top + height + 2,
              left,
            }}
            onMouseDown={(e) => handleMouseDown(e, "bottom left")}
          />
          <li
            className="left"
            style={{
              top: top + height / 2,
              left,
            }}
            onMouseDown={(e) => handleMouseDown(e, "left")}
          />
        </ul>
      )}
      {showContextMenu && (
        <ContextMenu
          index={index}
          pos={{top: style.top + 10, left: style.left + 60}}
          cmp={cmp}
          editCmp={editCmp}
          changeCmpIndex={changeCmpIndex}
        />
      )}
    </>
  );
}
