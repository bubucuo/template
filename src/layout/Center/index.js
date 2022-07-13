import {useCanvasByContext} from "../../store/hooks";
import Cmp from "../../components/Cmp";
import styles from "./index.less";
import {useCallback, useEffect} from "react";

export default function Center(props) {
  const canvas = useCanvasByContext();

  const canvasData = canvas.getCanvas();

  const {style, cmps} = canvasData;

  const onDrop = useCallback((e) => {
    const endX = e.pageX;
    const endY = e.pageY;

    const start = e.dataTransfer.getData("text").split(",");

    const disX = endX - start[0];
    const disY = endY - start[1];

    const selectedCmp = canvas.getSelectedCmp();

    const oldStyle = selectedCmp.style;

    const top = oldStyle.top + disY;
    const left = oldStyle.left + disX;

    canvas.updateSelectedCmp({top, left});
  }, []);

  const allowDrop = useCallback((e) => {
    e.preventDefault();
  }, []);

  const selectedIndex = canvas.getSelectedCmpIndex();

  useEffect(() => {
    document.getElementById("center").addEventListener("click", () => {
      canvas.setSelectedCmpIndex(-1);
    });

    document.getElementById("center").onkeydown = whichKeyEvent;
  }, []);

  const whichKeyEvent = (e) => {
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

    const {top, left} = selectedCmp.style;
    const newStyle = {top, left};

    switch (e.keyCode) {
      // 左
      case 37:
        newStyle.left -= 1;
        break;

      // 上
      case 38:
        newStyle.top -= 1;
        break;

      // 右
      case 39:
        newStyle.left += 1;
        break;

      // 下
      case 40:
        newStyle.top += 1;
        break;

      default:
        break;
    }

    canvas.updateSelectedCmp(newStyle);
  };

  return (
    <div id="center" className={styles.main} tabIndex="0">
      <div
        className={styles.canvas}
        style={{
          ...canvasData.style,
          backgroundImage: `url(${canvasData.style.backgroundImage})`,
        }}
        onDrop={onDrop}
        onDragOver={allowDrop}>
        {cmps.map((cmp, index) => (
          <Cmp
            key={cmp.key}
            cmp={cmp}
            selected={selectedIndex === index}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
