import Header from "./layout/Header";
import Left from "./layout/Left";
import Center from "./layout/Center";
import Right from "./layout/Right";
import styles from "./App.less";
import { useCanvas } from "./store/canvas";
import { CanvasContext } from "./Context";

export default function App(props) {
  const canvas = useCanvas();

  return (
    <div className={styles.main}>
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
