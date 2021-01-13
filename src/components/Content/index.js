import {useEffect, useReducer, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {cmpsReducer} from "../../store/cmpsReducer";
import {ADD_TO_CANVAS, UPDATE_CANVAS} from "../../store/reducerType";
import {getOnlyKey} from "../../utils";
import {
  getCanvasPos,
  globalCanvas,
  setCanvasPos,
} from "../../utils/globalCanvas";
import Button from "../Button";
import {ButtonComponent, TextComponent} from "../Cmps/index";
import Draggable from "../Draggable";
import EditCmp from "../EditCmp";
import useAddCanvas from "../hooks/useAddCanvas";
import Text from "../Text";
import styles from "./index.less";

function getCmp(cmp, basePos) {
  const {data} = cmp;
  let res = null;
  switch (data.type) {
    case TextComponent:
      res = <Text basePos={basePos} {...data} />;
      break;
    case ButtonComponent:
      res = <Button basePos={basePos} {...data} />;
      break;
  }
  return res;
}

function Content(props) {
  // 当前选中的组件

  const [cmps, setCmps] = useReducer(cmpsReducer, []);

  const [selectedCmp, setSelectCmp] = useState({});

  const canvasRef = useRef();
  //const cmps = useSelector(({cmps}) => cmps);
  console.log("cmps", cmps); //sy-log

  useEffect(() => {
    const canvasPos = canvasRef.current.getBoundingClientRect();
    setCanvasPos({top: canvasPos.top, left: canvasPos.left});
  }, []);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // const [dispatch] = useAddCanvas();

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // globalCanvas中存的是新增的
    let allData = globalCanvas.getActiveCmp(); //props.cmpToAdd;

    let resData = allData.data ? allData : selectedCmp;

    let width = resData.data.style.width;
    let height = resData.data.style.height;

    let canvasPos = globalCanvas.getPos();
    let top = e.pageY - canvasPos.top; //- width / 2; // allData.data.style.height / 2; // 80;
    let left = e.pageX - canvasPos.left; // - height / 2; //allData.data.style.width / 2; //30;
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

    //globalCanvas.setActiveCmp(newAllData);
    //dispatch(newAllData);
    setSelectCmp(newAllData);
    globalCanvas.setActiveCmp(null);
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

  return (
    <div className={styles.main}>
      <div
        className={styles.canvas}
        ref={canvasRef}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        {canvasRef.current &&
          cmps.map((cmp) => {
            return (
              <Draggable
                targetData={cmp}
                basePos={canvasRef.current}
                key={cmp.onlyKey}
                setSelectCmp={setSelectCmp}
                selected={selectedCmp.onlyKey === cmp.onlyKey}>
                {getCmp(cmp, canvasRef.current)}
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
