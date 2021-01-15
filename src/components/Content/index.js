import {useEffect, useReducer, useRef, useState} from "react";
import {cmpsReducer} from "../../store/cmpsReducer";
import {ADD_TO_CANVAS, UPDATE_CANVAS} from "../../store/reducerType";
import {getOnlyKey} from "../../utils";
import {globalCanvas} from "../../utils/globalCanvas";
import Button from "../Button";
import {ButtonComponent, TextComponent} from "../Cmps/index";
import Draggable from "../Draggable";
import EditCmp from "../EditCmp";
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

    let startPos = e.dataTransfer.getData("startPos");

    let resData;
    let top, left;

    if (startPos) {
      // 移动新增的组件
      startPos = JSON.parse(startPos);
      top = e.pageY - canvasPos.top - 15;
      left = e.pageX - canvasPos.left - 40;

      let addingCmp = globalCanvas.getActiveCmp();

      resData = {...addingCmp};
    } else {
      // 移动画布内的组件
      top = e.pageY - canvasPos.top - 15;
      left = e.pageX - canvasPos.left - 40;

      resData = selectedCmp;
    }

    const style = {...resData.data.style, top, left};
    let newAllData = {
      ...resData,
      data: {
        ...resData.data,
        style,
      },
    };

    // 如果还没有onlyKey，证明是新增进来的
    // 如果没有，则是拖动，这个时候更新位置即可
    if (!newAllData.onlyKey) {
      newAllData.onlyKey = getOnlyKey();
      setCmps({type: ADD_TO_CANVAS, payload: newAllData});
    } else {
      setCmps({type: UPDATE_CANVAS, payload: newAllData});
    }

    setSelectCmp(newAllData);
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
        onClick={() => setSelectCmp(null)}>
        {canvasRef.current &&
          cmps.map((cmp) => {
            return cmp.data ? (
              <Draggable
                cmp={cmp}
                key={cmp.onlyKey}
                setSelectCmp={setSelectCmp}
                editCmp={editCmp}
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
