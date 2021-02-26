import InputColor from "react-input-color";
import classnames from "classnames";
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

    let _style = {
      [name]: value,
    };

    if (name === "animationName") {
      if (value === "") {
        // 删除动画
        Object.assign(_style, {
          animationDelay: 0,
          animationDuration: 0,
          animationIterationCount: 0,
        });
      } else if (!style.animationName) {
        // 初次添加动画
        Object.assign(_style, {
          animationDelay: 0,
          animationDuration: 1,
          animationIterationCount: 1,
        });
      }
    }

    globalCanvas.updateSelectedCmpStyle(_style);
  };

  return (
    <div id="editCmp" className={styles.main}>
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
        <Item label="字体大小">
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

      {["文本", "按钮"].indexOf(selectedCmp.desc) > -1 && (
        <Item label="字体粗细">
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

      <Item label="边框样式">
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

      <Item label="边框宽度">
        <input
          className={styles.itemRight}
          type="number"
          value={style.borderWidth}
          onChange={(e) =>
            handleStyleChange(e, {
              name: "borderWidth",
              value: e.target.value,
            })
          }
        />
      </Item>

      <Item label="边框颜色">
        <InputColor
          className={styles.itemRight}
          initialValue={style.borderColor || "#ffffff00"}
          onChange={(e) =>
            handleStyleChange(null, {name: "borderColor", value: e.hex})
          }
          placement="right"
        />
      </Item>

      {style.color !== undefined && (
        <Item label="字体颜色">
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

      <Item label="动画名称">
        <select
          className={styles.itemRight}
          value={style.animationName}
          onChange={(e) => {
            handleStyleChange(e, {
              name: "animationName",
              value: e.target.value,
            });
          }}>
          <option value="">无动画</option>
          <option value="toggle">闪烁</option>
          <option value="jello">果冻</option>
          <option value="shake">抖动</option>
          <option value="wobble">左右摇摆</option>
        </select>
      </Item>

      {style.animationName && (
        <>
          <Item label="动画持续时长(s)">
            <input
              className={styles.itemRight}
              type="number"
              value={style.animationDuration}
              onChange={(e) =>
                handleStyleChange(e, {
                  name: "animationDuration",
                  value: e.target.value,
                })
              }
            />
          </Item>
          <Item label="动画循环次数">
            <button
              className={classnames("iconfont icon-wuqiongda", {
                selected: style.animationIterationCount === "infinite",
              })}
              onClick={(e) =>
                handleStyleChange(e, {
                  name: "animationIterationCount",
                  value:
                    style.animationIterationCount === "infinite"
                      ? 1
                      : "infinite",
                })
              }></button>
            <input
              className={styles.itemRight}
              type="number"
              disabled={style.animationIterationCount !== "infinite"}
              value={style.animationIterationCount}
              onChange={(e) =>
                handleStyleChange(e, {
                  name: "animationIterationCount",
                  value: e.target.value,
                })
              }
            />
          </Item>
          <Item label="动画延迟时间(s)">
            <input
              className={styles.itemRight}
              type="number"
              value={style.animationDelay}
              onChange={(e) =>
                handleStyleChange(e, {
                  name: "animationDelay",
                  value: e.target.value,
                })
              }
            />
          </Item>
          {style.animationIterationCount === "infinite" && (
            <button
              className={styles.pouseAnimation}
              onClick={(e) =>
                handleStyleChange(e, {
                  name: "animationPlayState",
                  value:
                    style.animationPlayState !== "running"
                      ? "running"
                      : "paused",
                })
              }>
              {style.animationPlayState !== "running" ? "暂停" : "开始"}动画演示
            </button>
          )}
        </>
      )}
      {/* <Item label="层级">
          <input
            className={styles.itemRight}
            type="number"
            value={style.zIndex}
            onChange={(e) => handleStyleChange(e, "zIndex", (v) => v >= 0)}
          />
        </Item> */}
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
