import styles from "./App.less";
import Cmps from "./components/Cmps";
import Content from "./components/Content";
import EditCmps from "./components/EditCmps";

function App() {
  return (
    <div className={styles.main}>
      <Cmps />
      <Content />
      <EditCmps />
    </div>
  );
}

export default App;
