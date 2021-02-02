import {useEffect, useRef, useState, useContext} from "react";
import {
  isButtonComponent,
  isImgComponent,
  isTextComponent,
} from "../Cmps/menus";
import Draggable from "../Draggable";
import EditCmp from "../EditCmp";
import styles from "./index.less";
// 画布组件
import TextComponent from "../../components/TextComponent";
import ButtonComponent from "../../components/ButtonComponent";
import ImgComponent from "../../components/ImgComponent";
import {CanvasContext} from "../../Context";

function getCmp(cmp) {
  const {data} = cmp;
  let res = null;
  switch (data.type) {
    case isTextComponent:
      res = <TextComponent {...data} />;
      break;
    case isButtonComponent:
      res = <ButtonComponent {...data} />;
      break;
    case isImgComponent:
      res = <ImgComponent {...data} />;
      break;
    default:
      res = null;
  }
  return res;
}

function Content(props) {
  // 所有组件
  const globalCanvas = useContext(CanvasContext);

  const cmps = globalCanvas.getCmps();

  // 当前选中的组件
  const selectedCmp = globalCanvas.getSelectedCmp();

  // 画布的位置，
  const [canvasPos, setCanvasPos] = useState(null);

  const canvasRef = useRef();

  console.log("cmps", cmps); //sy-log

  useEffect(() => {
    // 记录画布的位置，因为最终记录的位置是基于画布计算出来的相对位置
    const canvasPos = canvasRef.current.getBoundingClientRect();
    setCanvasPos(canvasPos);
  }, []);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // 新增的组件
    let addingCmp = e.dataTransfer.getData("add-component");

    let top, left;
    if (addingCmp) {
      // 拖拽进来新增的组件
      addingCmp = JSON.parse(addingCmp);
      top = e.pageY - canvasPos.top - 15;
      left = e.pageX - canvasPos.left - 40;
      let resData = {
        ...addingCmp,
        data: {
          ...addingCmp.data,
          style: {
            ...addingCmp.data.style,
            top,
            left,
          },
        },
      };
      globalCanvas.addCmp(resData);
    } else {
      // 拖拽画布内的组件
      let startPos = e.dataTransfer.getData("startPos");
      startPos = JSON.parse(startPos);

      let disX = e.pageX - startPos.startX;
      let disY = e.pageY - startPos.startY;

      top = selectedCmp.data.style.top + disY;
      left = selectedCmp.data.style.left + disX;
      globalCanvas.updateSelectedCmpStyle({top, left});
    }
  };

  return (
    <div className={styles.main}>
      <div
        className={styles.canvas}
        ref={canvasRef}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        // 点击画布非组件区域的时候，取消选中的组件
        onClick={() => {
          globalCanvas.setSelectedCmp(null);
        }}>
        {canvasRef.current &&
          cmps.map((cmp, index) => {
            return cmp.data ? (
              <Draggable
                index={index}
                cmp={cmp}
                key={cmp.onlyKey}
                selected={(selectedCmp && selectedCmp.onlyKey) === cmp.onlyKey}>
                {getCmp(cmp)}
              </Draggable>
            ) : null;
          })}
      </div>
    </div>
  );
}
export default Content;
