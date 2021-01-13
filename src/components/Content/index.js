import {useEffect, useReducer, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {cmpsReducer} from "../../store/cmpsReducer";
import {ADD_TO_CANVAS, UPDATE_CANVAS} from "../../store/reducerType";
import {getOnlyKey} from "../../utils";
import {
  // getCanvasPos,
  globalCanvas,
} from "../../utils/globalCanvas";
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

    let resData; //将要移动到画布的组件信息或者是移动中的组件信息

    // globalCanvas中存的是新增的
    let addingCmp = globalCanvas.getActiveCmp();
    if (addingCmp.data) {
      resData = {...addingCmp};
      // 置空将要要添加的组件信息
      globalCanvas.setActiveCmp(null);
    } else {
      resData = selectedCmp;
    }

    let top = e.pageY - canvasPos.top;
    let left = e.pageX - canvasPos.left;
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
    for (let i = 0; i < cmps.length; i++) {
      if (cmps[i].onlyKey === cmp.onlyKey) {
        cmps[i] = cmp;
        setCmps(cmps);
        break;
      }
    }
  };

  useEffect(() => {
    // document.getElementById("root").addEventListener("click", () => {
    //   // 点击非组件区域的时候，取消选中的组件
    //   setSelectCmp(null);
    // });
  }, []);

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
            return (
              <Draggable
                targetData={cmp}
                key={cmp.onlyKey}
                setSelectCmp={setSelectCmp}
                selected={(selectedCmp && selectedCmp.onlyKey) === cmp.onlyKey}>
                {getCmp(cmp)}
              </Draggable>
            );
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
