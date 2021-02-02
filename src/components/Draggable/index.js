import {useState, useEffect, useContext} from "react";
import {throttle} from "../../utils";
import {CanvasContext} from "../Context";
import ContextMenu from "./ContextMenu";
import styles from "./index.less";

// setSelectCmp 选中的组件
// selected 是否是选中的组件，选中的组件加橙色标记边框
export default function Draggable({
  index,
  children,
  cmp,
  // setSelectCmp,
  selected,
}) {
  const globalCanvas = useContext(CanvasContext);

  const [showContextMenu, setShowContextMenu] = useState(false);
  const {style} = cmp.data;

  const setActive = (e) => {
    e.stopPropagation();
    globalCanvas.setSelectedCmp(cmp);
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

      throttle(
        globalCanvas.updateSelectedCmpStyle({
          width: cmp.data.style.width + disX,
          height: cmp.data.style.height + disY,
        })
      );
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  const handleDragStart = (e) => {
    setActive(e);
    let startX = e.pageX;
    let startY = e.pageY;
    e.dataTransfer.setData("startPos", JSON.stringify({startX, startY}));
  };

  return (
    <>
      <div
        className={
          styles.main + " " + (selected ? "selected" : styles.unselected)
        }
        style={{...style, zIndex: index}}
        draggable={true}
        //onDragStart={setActive}
        onDragStart={handleDragStart}
        //onMouseDown={handleCmpMouseDown}
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
        />
      )}
    </>
  );
}
