import InputColor from "react-input-color";
import styles from "./index.less";

export default function EditCanvas({globalCanvas}) {
  const style = globalCanvas.getCanvasStyle();

  const handleStyleChange = (e, {name, value}) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    globalCanvas.updateCanvasStyle({
      [name]: value,
    });
  };

  console.log("style", style); //sy-log

  return (
    <div className={styles.main}>
      <>
        <div className={styles.title}>画布属性</div>

        {style.width !== undefined && (
          <Item label="画布宽度(px)">
            <input
              className={styles.itemRight}
              type="number"
              value={style.width}
              onChange={(e) =>
                handleStyleChange(e, {name: "width", value: e.target.value})
              }
            />
          </Item>
        )}
        {style.height !== undefined && (
          <Item label="画布高度(px)">
            <input
              className={styles.itemRight}
              type="number"
              value={style.height}
              onChange={(e) =>
                handleStyleChange(e, {
                  name: "height",
                  value: e.target.value,
                })
              }
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

        {style.backgroundImage !== undefined && (
          <Item label="背景图片">
            <input
              className={styles.itemRight}
              type="text"
              value={style.backgroundImage}
              onChange={(e) =>
                handleStyleChange(e, {
                  name: "backgroundImage",
                  value: e.target.value,
                })
              }
            />
          </Item>
        )}
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
