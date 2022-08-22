import {useCanvasByContext} from "../../store/hooks";
import InputColor from "@/lib/InputColor";
import Item from "@/lib/Item";
import styles from "./index.less";
import {isImgComponent} from "../../layout/Left/index";

export default function EditCmp(props) {
  const canvas = useCanvasByContext();

  const selectedCmp = canvas.getSelectedCmp();

  const {value, style} = selectedCmp;

  const handleValueChange = (e) => {
    const newValue = e.target.value;
    canvas.updateSelectedCmp(null, newValue);
    canvas.recordCanvasChangeHistory();
  };

  const handleStyleChange = (e, {name, value}) => {
    const newStyle = {[name]: value};

    canvas.updateSelectedCmp(newStyle);
    canvas.recordCanvasChangeHistory();
  };

  const canvasData = canvas.getCanvas();
  const canvasWidth = canvasData.style.width;
  const selectCmpWidth = selectedCmp.style.width;

  return (
    <div className={styles.main}>
      <div className={styles.title}>组件属性</div>

      {selectedCmp.type === isImgComponent && (
        <Item label="描述: ">
          <input
            type="text"
            className={styles.itemRight}
            value={value}
            onChange={handleValueChange}
          />
        </Item>
      )}

      {style.fontSize != undefined && (
        <Item label="字体大小: ">
          <input
            type="number"
            className={styles.itemRight}
            value={style.fontSize}
            onChange={(e) => {
              handleStyleChange(e, {
                name: "fontSize",
                value: e.target.value - 0,
              });
            }}
          />
        </Item>
      )}

      {style.fontWeight != undefined && (
        <Item label="字体粗细: ">
          <select
            className={styles.itemRight}
            value={style.fontWeight}
            onChange={(e) => {
              handleStyleChange(e, {
                name: "fontWeight",
                value: e.target.value,
              });
            }}>
            <option value="normal">normal</option>
            <option value="bold">bold</option>
            <option value="lighter">lighter</option>
          </select>
        </Item>
      )}

      {style.lineHeight != undefined && (
        <Item label="行高: ">
          <input
            type="number"
            className={styles.itemRight}
            value={parseInt(style.lineHeight)}
            onChange={(e) => {
              handleStyleChange(e, {
                name: "lineHeight",
                value: e.target.value + "px",
              });
            }}
          />
        </Item>
      )}

      {style.textAlign !== undefined && (
        <Item label="对齐: ">
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
            <option value="right">居右</option>
          </select>
        </Item>
      )}

      <Item label="对齐页面: ">
        <select
          className={styles.itemRight}
          value={
            style.left == 0
              ? "left"
              : style.left == canvasWidth / 2 - selectCmpWidth / 2
              ? "center"
              : style.left == canvasWidth - selectCmpWidth
              ? "right"
              : "default"
          }
          onChange={(e) => {
            const newValue = e.target.value;
            let newLeft = 0;

            if (newValue !== "left") {
              if (newValue === "center") {
                newLeft = canvasWidth / 2 - selectCmpWidth / 2;
              } else if (newValue === "right") {
                newLeft = canvasWidth - selectCmpWidth;
              }
            }
            handleStyleChange(e, {name: "left", value: newLeft});
          }}>
          <option value="default">--选择--</option>
          <option value="left">居左</option>
          <option value="center">居中</option>
          <option value="right">居右</option>
        </select>
      </Item>

      {style.transform !== undefined && (
        <Item label="旋转: ">
          <input
            className={styles.itemRight}
            type="number"
            value={style.transform}
            onChange={(e) =>
              handleStyleChange(e, {
                name: "transform",
                value: e.target.value,
              })
            }
          />
        </Item>
      )}

      {style.borderRadius !== undefined && (
        <Item label="圆角: ">
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

      <Item label="边框样式: ">
        <select
          className={styles.itemRight}
          value={style.borderStyle}
          onChange={(e) => {
            handleStyleChange(e, {
              name: "borderStyle",
              value: e.target.value,
            });
          }}>
          <option value="none">none</option>
          <option value="dashed">dashed</option>
          <option value="dotted">dotted</option>
          <option value="double">double</option>
          <option value="groove">groove</option>
          <option value="hidden">hidden</option>
          <option value="solid">solid</option>
        </select>
      </Item>

      <Item label="边框宽度: ">
        <input
          className={styles.itemRight}
          type="number"
          value={style.borderWidth}
          onChange={(e) =>
            handleStyleChange(e, {
              name: "borderWidth",
              value: e.target.value - 0,
            })
          }
        />
      </Item>

      <Item label="边框颜色: ">
        <InputColor
          className={styles.itemRight}
          color={style.borderColor || "#ffffff00"}
          onChangeComplete={(e) =>
            handleStyleChange(null, {
              name: "borderColor",
              value: `rgba(${Object.values(e.rgb).join(",")})`,
            })
          }
        />
      </Item>

      {style.color !== undefined && (
        <Item label="字体颜色: ">
          <InputColor
            className={styles.itemRight}
            color={style.color}
            onChangeComplete={(e) =>
              handleStyleChange(null, {
                name: "color",
                value: `rgba(${Object.values(e.rgb).join(",")})`,
              })
            }
          />
        </Item>
      )}

      {style.backgroundColor !== undefined && (
        <Item label="背景颜色: ">
          <InputColor
            className={styles.itemRight}
            color={style.backgroundColor}
            onChangeComplete={(e) => {
              handleStyleChange(null, {
                name: "backgroundColor",
                value: `rgba(${Object.values(e.rgb).join(",")})`,
              });
            }}
          />
        </Item>
      )}
    </div>
  );
}
