import Header from "./layout/Header";
import Left from "./layout/Left";
import Center from "./layout/Center";
import Right from "./layout/Right";
import styles from "./App.less";
import {useCanvas, useGetCanvas} from "./store/hooks";
import {CanvasContext} from "./Context";
import {useEffect, useReducer} from "react";

export default function App() {
  const canvas = useCanvas();

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    if (canvas?.subscribe) {
      const unsubscribe = canvas?.subscribe(() => {
        forceUpdate();
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);

  useGetCanvas(canvas);
  return (
    <div className={styles.main} style={{marginTop: -60}}>
      <CanvasContext.Provider value={canvas}>
        <Header />
        <div className={styles.content}>
          <Left />
          <Center />
          <Right />
        </div>
      </CanvasContext.Provider>
    </div>
  );
}
