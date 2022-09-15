import {useCanvasByContext} from "../../store/hooks";
import Cmp from "../../components/Cmp";
import styles from "./index.less";
import {useCallback, useEffect, useState, useRef} from "react";
import classNames from "classnames";
import EditLine from "../../components/EditLine";

export default function Center(props) {
  const canvas = useCanvasByContext();

  const canvasData = canvas.getCanvas();

  const {style, cmps} = canvasData;

  // 缩放比例
  const [zoom, setZoom] = useState(() =>
    parseInt(canvasData.style.width) > 800 ? 50 : 100
  );

  const onDrop = useCallback(
    (e) => {
      const endX = e.pageX;
      const endY = e.pageY;

      let dragCmp = e.dataTransfer.getData("drag-cmp");

      if (!dragCmp) {
        return;
      }

      dragCmp = JSON.parse(dragCmp);

      const canvasDOMPos = {
        top: 110,
        left: document.body.clientWidth / 2 - (style.width / 2) * (zoom / 100),
      };

      const startX = canvasDOMPos.left;
      const startY = canvasDOMPos.top;

      let disX = endX - startX;
      let disY = endY - startY;

      disX = disX * (100 / zoom);
      disY = disY * (100 / zoom);

      dragCmp.style.left = disX - dragCmp.style.width / 2;
      dragCmp.style.top = disY - dragCmp.style.height / 2;

      canvas.addCmp(dragCmp);
    },
    [zoom, style.width]
  );

  const allowDrop = useCallback((e) => {
    e.preventDefault();
  }, []);

  const selectedIndex = canvas.getSelectedCmpIndex();

  useEffect(() => {
    document.onkeydown = whichKeyEvent;
  }, []);

  const whichKeyEvent = (e) => {
    if (e.target.nodeName === "INPUT" || e.target.nodeName === "TEXTAREA") {
      return;
    }

    if (e.metaKey && e.code === "KeyA") {
      // 选中所有组件
      const allCmps = canvas.getCanvasCmps();
      canvas.addAndUpdateAssembly(Object.keys(allCmps));
      e.preventDefault();
      return;
    }

    const selectedCmp = canvas.getSelectedCmp();
    if (!selectedCmp) {
      return;
    }

    if (e.keyCode < 37 || e.keyCode > 40) {
      return;
    }

    // 阻止事件传播，不然别的输入框的输入事件都不生效了
    e.stopPropagation();
    // 禁止默认事件，不然引发的可能是页面的上下左右滚动。
    e.preventDefault();

    const newStyle = {};

    switch (e.keyCode) {
      // 左
      case 37:
        newStyle.left = -1;
        break;

      // 上
      case 38:
        newStyle.top = -1;
        break;

      // 右
      case 39:
        newStyle.left = 1;
        break;

      // 下
      case 40:
        newStyle.top = 1;
        break;

      default:
        break;
    }

    canvas.updateAssemblyCmps(newStyle);
    canvas.recordCanvasChangeHistory();
  };

  return (
    <div
      id="center"
      className={styles.main}
      tabIndex="0"
      onClick={(e) => {
        if (e.target.id === "center") {
          canvas.setSelectedCmpIndex(-1);
        }
      }}>
      <div
        id="canvas"
        className={styles.canvas}
        style={{
          ...canvasData.style,
          backgroundImage: `url(${canvasData.style.backgroundImage})`,
          transform: `scale(${zoom / 100})`,
        }}
        onDrop={onDrop}
        onDragOver={allowDrop}>
        {/* 组件选中的时候，画布显示该组件的编辑区域 */}
        {selectedIndex !== -1 && (
          <EditLine selectedIndex={selectedIndex} zoom={zoom} />
        )}

        <div
          className={styles.cmps}
          style={{
            width: canvasData.style.width,
            height: canvasData.style.height,
          }}>
          {/* 组件区域 */}
          {cmps.map((cmp, index) => (
            <Cmp key={cmp.key} cmp={cmp} index={index} />
          ))}
        </div>
      </div>
      <ul className={styles.zoom}>
        <li
          className={classNames(styles.icon)}
          style={{cursor: "zoom-in"}}
          onClick={() => {
            setZoom(zoom + 25);
          }}>
          +
        </li>
        <li className={classNames(styles.num)}>
          <input
            type="num"
            value={zoom}
            onChange={(e) => {
              let newValue = e.target.value;
              newValue = newValue >= 1 ? newValue : 1;
              setZoom(newValue - 0);
            }}
          />
          %
        </li>
        <li
          className={classNames(styles.icon)}
          style={{cursor: "zoom-out"}}
          onClick={() => {
            const newZoom = zoom - 25 >= 1 ? zoom - 25 : 1;
            setZoom(newZoom);
          }}>
          -
        </li>
      </ul>
    </div>
  );
}
