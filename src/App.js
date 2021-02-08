import {useLayoutEffect} from "react";
import styles from "./App.less";
import {CanvasContext} from "./Context";
import Cmps from "./layouts/Cmps";
import Content from "./layouts/Content";
import Edit from "./layouts/Edit";
import {useForceUpdate} from "./layouts/hooks";
import {useCanvas} from "./store/globalCanvas";

function App() {
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
    <div className={styles.main}>
      <CanvasContext.Provider value={globalCanvas}>
        <Cmps />
        <Content />
        <Edit />
      </CanvasContext.Provider>
    </div>
  );
}

export default App;
