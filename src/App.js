import {useLayoutEffect} from "react";
import {CanvasContext} from "./Context";
import Cmps from "./layouts/Cmps";
import Content from "./layouts/Content";
import Edit from "./layouts/Edit";
import {useForceUpdate} from "./layouts/hooks";
import {useCanvas} from "./store/globalCanvas";
import styles from "./App.less";

export default function App() {
  const forceUpdate = useForceUpdate();

  // 所有组件
  const globalCanvas = useCanvas();

  useLayoutEffect(() => {
    const unsubscribe = globalCanvas.subscribe(() => {
      forceUpdate();
    });
    return () => {
      unsubscribe();
    };
  }, [globalCanvas, forceUpdate]);
  return (
    <div id="app" className={styles.main}>
      <CanvasContext.Provider value={globalCanvas}>
        <Cmps />
        <Content />
        <Edit />
      </CanvasContext.Provider>
    </div>
  );
}
