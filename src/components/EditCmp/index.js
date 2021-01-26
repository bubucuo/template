import {useForceUpdate} from "../../utils";
import {globalCanvas} from "../../utils/globalCanvas";
import useUpdateCanvas from "../hooks/useUpdateCanvas";
import styles from "./index.less";

export default function EditCmp(props) {
  return props.selectedCmp ? <Edit {...props} /> : <EmptyEditCmp />;
}

function EmptyEditCmp() {
  return (
    <div className={styles.main}>
      <div className={styles.empty}>
        <p>编辑区域</p>
      </div>
    </div>
  );
}

function Edit({selectedCmp, setSelectCmp, editCmp}) {
  const {data} = selectedCmp; //cmpToAdd;

  const {style} = data;

  const [dispatch] = useUpdateCanvas();

  const handleChange = (payload) => {
    editCmp(payload);
    setSelectCmp(payload);
  };

  const handleValueChange = (e) => {
    const newValue = e.target.value;
    let payload = {
      ...selectedCmp,
      data: {
        ...data,
        value: newValue,
      },
    };

    handleChange(payload);
  };

  const handleStyleChange = (e, name) => {
    const newValue = e.target.value;
    // if (!validate(newValue)) {
    //   return;
    // }
    let payload = {
      ...selectedCmp,
      data: {
        ...data,
        style: {
          ...style,
          [name]: newValue,
        },
      },
    };

    handleChange(payload);
  };

  return (
    <div className={styles.main}>
      <>
        <div className={styles.title}>{selectedCmp.desc}</div>
        {data.value !== undefined && (
          <Item label="描述">
            <input
              className={styles.itemRight}
              type="text"
              value={data.value}
              onChange={(e) => handleValueChange(e)}
            />
          </Item>
        )}

        {style.fontSize !== undefined && (
          <Item label="字体">
            <input
              className={styles.itemRight}
              type="number"
              value={style.fontSize}
              onChange={(e) => handleStyleChange(e, "fontSize")}
            />
          </Item>
        )}

        {/* <Item label="层级">
          <input
            className={styles.itemRight}
            type="number"
            value={style.zIndex}
            onChange={(e) => handleStyleChange(e, "zIndex", (v) => v >= 0)}
          />
        </Item> */}
      </>
    </div>
  );
}

function Item({label, children}) {
  return (
    <div className={styles.item}>
      <label>{label}</label>
      {children}
    </div>
  );
}
