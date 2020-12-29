import {useSelector, useDispatch} from "react-redux";
import {TextComponent} from "../Cmps/index";
import Text from "../Text";
import styles from "./index.less";

function getCmp(data) {
  let res = null;
  switch (data.type) {
    case TextComponent:
      res = <Text key={data.onlyKey} {...data} />;
  }
  return res;
}

function Content(props) {
  const cmps = useSelector((state) => state);
  console.log("cmps", cmps); //sy-log
  return (
    <div className={styles.main}>
      <div className={styles.canvas}>{cmps.map((cmp) => getCmp(cmp))}</div>
    </div>
  );
}
export default Content;
