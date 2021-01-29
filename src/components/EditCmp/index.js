import {useForceUpdate} from "../../utils";
import {globalCanvas} from "../../utils/globalCanvas";
import useUpdateCanvas from "../hooks/useUpdateCanvas";
import InputColor from "react-input-color";
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

  const handleStyleChange = ({name, value}) => {
    let payload = {
      ...selectedCmp,
      data: {
        ...data,
        style: {
          ...style,
          [name]: value,
        },
      },
    };

    handleChange(payload);
  };

  console.log("哈哈哈哈", style.borderRadius); //sy-log

  return (
    <div className={styles.main}>
      <>
        <div className={styles.title}>{selectedCmp.desc}</div>
        {data.value !== undefined && (
          <Item label={selectedCmp.desc === "图片" ? "图片地址" : "描述"}>
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
              onChange={(e) =>
                handleStyleChange({name: "fontSize", value: e.target.value})
              }
            />
          </Item>
        )}
        {style.lineHeight !== undefined && (
          <Item label="行高">
            <input
              className={styles.itemRight}
              type="number"
              value={style.lineHeight}
              onChange={(e) =>
                handleStyleChange({name: "lineHeight", value: e.target.value})
              }
            />
          </Item>
        )}

        {style.textAlign !== undefined && (
          <Item label="对齐">
            <select
              className={styles.itemRight}
              value={style.textAlign}
              onChange={(e) => {
                handleStyleChange({name: "textAlign", value: e.target.value});
              }}>
              <option value="left">居左</option>
              <option value="center">居中</option>
              <option value="right">居右边</option>
            </select>
          </Item>
        )}

        {style.borderRadius !== undefined && (
          <Item label="圆角">
            <input
              className={styles.itemRight}
              type="text"
              value={style.borderRadius}
              onChange={(e) =>
                handleStyleChange({
                  name: "borderRadius",
                  value: e.target.value,
                })
              }
            />
          </Item>
        )}

        {style.color !== undefined && (
          <Item label="颜色">
            <InputColor
              className={styles.itemRight}
              initialValue={style.color}
              onChange={(e) => handleStyleChange({name: "color", value: e.hex})}
              placement="right"
            />
          </Item>
        )}

        {style.backgroundColor !== undefined && (
          <Item label="背景颜色">
            <InputColor
              className={styles.itemRight}
              initialValue={style.backgroundColor}
              onChange={(e) =>
                handleStyleChange({name: "backgroundColor", value: e.hex})
              }
              placement="right"
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
