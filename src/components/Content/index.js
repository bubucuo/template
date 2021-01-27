import {useEffect, useReducer, useRef, useState} from "react";
import {cmpsReducer} from "../../store/cmpsReducer";
import {
  ADD_TO_CANVAS,
  UPDATE_CANVAS,
  REPLACE_CANVAS,
  UPDATE_CANVAS_STYLE,
} from "../../store/reducerType";
import {getOnlyKey, useForceUpdate} from "../../utils";
import Button from "../Button";
import {ButtonComponent, ImgComponent, TextComponent} from "../Cmps/index";
import Draggable from "../Draggable";
import EditCmp from "../EditCmp";
import Img from "../Img";
import Text from "../Text";
import styles from "./index.less";

function getCmp(cmp) {
  const {data} = cmp;
  let res = null;
  switch (data.type) {
    case TextComponent:
      res = <Text {...data} />;
      break;
    case ButtonComponent:
      res = <Button {...data} />;
      break;
    case ImgComponent:
      res = <Img {...data} />;
  }
  return res;
}

function Content(props) {
  // 所有组件
  const [cmps, setCmps] = useReducer(cmpsReducer, []);

  // 当前选中的组件
  const [selectedCmp, setSelectCmp] = useState(null);

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
        onlyKey: getOnlyKey(),
        data: {
          ...addingCmp.data,
          style: {
            ...addingCmp.data.style,
            top,
            left,
          },
        },
      };
      setCmps({type: ADD_TO_CANVAS, payload: resData});
      setSelectCmp(resData);
    } else {
      // 拖拽画布内的组件
      let resData = {...selectedCmp};
      let startPos = e.dataTransfer.getData("startPos");
      startPos = JSON.parse(startPos);

      let disX = e.pageX - startPos.startX;
      let disY = e.pageY - startPos.startY;

      top = resData.data.style.top + disY;
      left = resData.data.style.left + disX;

      setCmps({
        type: UPDATE_CANVAS_STYLE,
        payload: {
          cmp: resData,
          style: {top, left},
        },
      });
    }
  };

  const editCmp = (cmp) => {
    let newCmps = cmps;
    let index; //记录找到指定组件的下标
    for (let i = 0; i < newCmps.length; i++) {
      if (newCmps[i].onlyKey === cmp.onlyKey) {
        index = i;
        break;
      }
    }

    if (cmp.data) {
      // 参数更新
      newCmps[index] = cmp;
      setCmps(newCmps);
    } else {
      // 删除
      newCmps.splice(index, 1);
      setSelectCmp(null);
    }
  };

  const editCmpStyle = (cmp, newStyle) => {
    editCmp({
      ...cmp,
      data: {...cmp.data, style: {...cmp.data.style, ...newStyle}},
    });
  };

  const forceUpdate = useForceUpdate();

  // 交换i、j位置的元素
  const changeCmpIndex = (i, j = cmps.length - 1) => {
    if (i === j) {
      return;
    }

    let newCmps = [...cmps];
    let tem = newCmps[i];
    newCmps[i] = newCmps[j];
    newCmps[j] = tem;
    setCmps({type: REPLACE_CANVAS, payload: newCmps});
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
          console.log("cancel"); //sy-log
          setSelectCmp(null);
        }}
        //
      >
        {canvasRef.current &&
          cmps.map((cmp, index) => {
            return cmp.data ? (
              <Draggable
                index={index}
                cmp={cmp}
                key={cmp.onlyKey}
                setSelectCmp={setSelectCmp}
                editCmp={editCmp}
                editCmpStyle={editCmpStyle}
                changeCmpIndex={changeCmpIndex}
                selected={(selectedCmp && selectedCmp.onlyKey) === cmp.onlyKey}>
                {getCmp(cmp)}
              </Draggable>
            ) : null;
          })}
      </div>

      <EditCmp
        selectedCmp={selectedCmp}
        setSelectCmp={setSelectCmp}
        editCmp={editCmp}
      />
    </div>
  );
}
export default Content;
