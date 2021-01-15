import {useState} from "react";
import styles from "./App.less";
import Cmps from "./components/Cmps";
import Content from "./components/Content";

function App() {
  // const [cmpToAdd, setAddCmp] = useState(null);
  // let cmpToAdd = null;
  // const setAddCmp = (v) => {
  //   cmpToAdd = v;
  // };
  return (
    <div className={styles.main}>
      <Cmps />
      <Content />
    </div>
  );
}

export default App;
