import InputColor from "react-input-color";
import styles from "./index.less";

export default function EditCmp({selectedCmp, globalCanvas}) {
  const {data} = selectedCmp;

  const {style} = data;

  const handleValueChange = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const newValue = e.target.value;

    globalCanvas.updateSelectedCmpValue(newValue);
  };

  const handleStyleChange = (e, {name, value}) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    globalCanvas.updateSelectedCmpStyle({
      [name]: value,
    });
  };

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
                handleStyleChange(e, {name: "fontSize", value: e.target.value})
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
                handleStyleChange(e, {
                  name: "lineHeight",
                  value: e.target.value,
                })
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
                handleStyleChange(e, {
                  name: "textAlign",
                  value: e.target.value,
                });
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
                handleStyleChange(e, {
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
              onChange={(e) =>
                handleStyleChange(null, {name: "color", value: e.hex})
              }
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
                handleStyleChange(null, {name: "backgroundColor", value: e.hex})
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
