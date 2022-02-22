import Header from "./layout/Header";
import Left from "./layout/Left";
import Center from "./layout/Center";
import Right from "./layout/Right";
import styles from "./App.less";

export default function App(props) {
  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.content}>
        <Left />
        <Center />
        <Right />
      </div>
    </div>
  );
}
