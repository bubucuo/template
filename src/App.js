import styles from "./App.less";
import Cmps from "./components/Cmps";
import Content from "./components/Content";

function App() {
  return (
    <div className={styles.main}>
      <Cmps />
      <Content />
    </div>
  );
}

export default App;
