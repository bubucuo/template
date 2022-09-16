import InputColor from "@/lib/InputColor";
import {useCanvasByContext} from "@/store/hooks";
import Item from "@/lib/Item";
import styles from "./index.less";

export default function EditCanvas(props) {
  const canvas = useCanvasByContext();
  const canvasData = canvas.getCanvas();
  const style = canvas.getCanvas().style;

  const handleStyleChange = (e, {name, value}) => {
    canvas.updateCanvasStyle({[name]: value});
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>画布属性</div>
      <Item label="标题: ">
        <input
          type="text"
          className={styles.itemRight}
          value={canvasData.title}
          onChange={(e) => {
            let newValue = e.target.value;
            canvas.setCanvas({title: newValue});
          }}
        />
      </Item>

      <Item label="画布宽度 (px): ">
        <input
          type="number"
          className={styles.itemRight}
          value={style.width}
          onChange={(e) => {
            handleStyleChange(e, {name: "width", value: e.target.value - 0});
          }}
        />
      </Item>

      <Item label="画布高度 (px): ">
        <input
          type="number"
          className={styles.itemRight}
          value={style.height}
          onChange={(e) => {
            handleStyleChange(e, {name: "height", value: e.target.value - 0});
          }}
        />
      </Item>

      <Item label="背景颜色: ">
        <InputColor
          className={styles.itemRight}
          color={style.backgroundColor}
          onChangeComplete={(e) => {
            handleStyleChange(e, {
              name: "backgroundColor",
              value: `rgba(${Object.values(e.rgb).join(",")})`,
            });
          }}
        />
      </Item>

      <Item label="背景图片: ">
        <input
          type="text"
          className={styles.itemRight}
          value={style.backgroundImage}
          onChange={(e) => {
            handleStyleChange(e, {
              name: "backgroundImage",
              value: e.target.value,
            });
          }}
        />
      </Item>
    </div>
  );
}
