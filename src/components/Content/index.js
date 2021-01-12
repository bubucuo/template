import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {ADD_TO_CANVAS} from "../../store/reducerType";
import {getOnlyKey} from "../../utils";
import {
  getCanvasPos,
  globalCanvas,
  setCanvasPos,
} from "../../utils/globalCanvas";
import Button from "../Button";
import {ButtonComponent, TextComponent} from "../Cmps/index";
import Draggable from "../Draggable";
import EditCmps from "../EditCmps";
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
  console.log("Content 重新渲染"); //sy-log
  const canvasRef = useRef();
  const cmps = useSelector(({cmps}) => cmps);
  console.log("cmps", cmps); //sy-log

  useEffect(() => {
    const canvasPos = canvasRef.current.getBoundingClientRect();
    setCanvasPos({top: canvasPos.top, left: canvasPos.left});
  }, []);

  const handleDragEnter = (e) => {
    e.preventDefault();
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const [dispatch] = useAddCanvas();

  const handleDrop = (e) => {
    e.preventDefault();
    let allData = globalCanvas.getActiveCmp(); //props.cmpToAdd;
    let canvasPos = globalCanvas.getPos();
    let top = e.pageY - canvasPos.top - allData.data.style.height / 2; // 80;
    let left = e.pageX - canvasPos.left - allData.data.style.width / 2; //30;
    const style = {...allData.data.style, top, left};
    let newAllData = {
      ...allData,
      data: {
        ...allData.data,
        style,
      },
      onlyKey: getOnlyKey(),
    };
    globalCanvas.setActiveCmp(newAllData);
    dispatch(newAllData);
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
                key={cmp.onlyKey}>
                {getCmp(cmp, canvasRef.current)}
              </Draggable>
            );
          })}
      </div>

      <EditCmps />
    </div>
  );
}
export default Content;
