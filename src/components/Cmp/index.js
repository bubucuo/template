import React, {Component} from "react";
import classNames from "classnames";
import styles from "./index.less";
import {CanvasContext} from "../../Context";
import {isImgComponent, isTextComponent} from "@/layout/Left";
import Text from "../Text";
import Img from "../Img";

// todo 拖拽、删除、改变层级关系等

// 按键小幅度移动的事件写在了Center中
export default class Cmp extends Component {
  static contextType = CanvasContext;

  // 在画布上移动组件位置
  onMouseDownOfCmp = (e) => {
    // 否则会触发其他组件的选中行为
    e.preventDefault();

    let startX = e.pageX;
    let startY = e.pageY;

    const {cmp, zoom} = this.props;
    const move = (e) => {
      const x = e.pageX;
      const y = e.pageY;

      let disX = x - startX;
      let disY = y - startY;

      disX = disX * (100 / zoom);
      disY = disY * (100 / zoom);

      const oldStyle = cmp;

      const top = cmp.style.top + disY;
      const left = cmp.style.left + disX;

      this.context.updateSelectedCmp({top, left});

      startX = x;
      startY = y;
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  setSelected = (e) => {
    e.stopPropagation();
    this.context.setSelectedCmpIndex(this.props.index);
  };

  // 伸缩组件 style top left width height
  onMouseDown = (e) => {
    const direction = e.target.dataset.direction;
    if (!direction) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();

    let startX = e.pageX;
    let startY = e.pageY;

    const {cmp} = this.props;
    const move = (e) => {
      const x = e.pageX;
      const y = e.pageY;

      let disX = x - startX;
      let disY = y - startY;

      // style top left width height
      let newStyle = {};
      // todo top left
      if (direction) {
        if (direction.indexOf("top") >= 0) {
          disY = 0 - disY;
          newStyle.top = cmp.style.top - disY;
        }

        if (direction.indexOf("left") >= 0) {
          disX = 0 - disX;
          newStyle.left = cmp.style.left - disX;
        }
      }

      const newHeight = cmp.style.height + disY;
      Object.assign(newStyle, {
        width: cmp.style.width + disX,
        height: newHeight,
      });

      if (cmp.style.fontSize) {
        // 文本组件的行高、字体大小跟着高度变化
        const n = newHeight / cmp.style.height;
        let newFontSize = n * cmp.style.fontSize;
        newFontSize =
          newFontSize < 12 ? 12 : newFontSize > 130 ? 130 : newFontSize;
        Object.assign(newStyle, {
          lineHeight: newHeight + "px",
          fontSize: parseInt(newFontSize),
        });
      }

      this.context.updateSelectedCmp(newStyle);

      startX = x;
      startY = y;
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  // 旋转组件
  rotate = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const {style} = this.props.cmp;
    const {width, height, transform} = style;
    const trans = parseFloat(transform);

    const r = height / 2;

    const ang = ((trans + 90) * Math.PI) / 180;

    const [offsetX, offsetY] = [-Math.cos(ang) * r, -Math.sin(ang) * r];

    let startX = e.pageX + offsetX;
    let startY = e.pageY + offsetY;

    const move = (e) => {
      let x = e.pageX;
      let y = e.pageY;

      let disX = x - startX;
      let disY = y - startY;

      let deg = (360 * Math.atan2(disY, disX)) / (2 * Math.PI) - 90;

      deg = parseInt(deg);

      this.context.updateSelectedCmp({
        transform: deg,
      });
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  render() {
    const {cmp, selected} = this.props;
    const {style, value} = cmp;

    const {width, height} = style;
    const transform = `rotate(${style.transform}deg)`;

    return (
      <div
        id={cmp.key}
        className={styles.main}
        onMouseDown={this.onMouseDownOfCmp}
        onClick={this.setSelected}>
        {/* 组件本身 */}
        <div className={styles.cmp} style={{...style, transform}}>
          {getCmp(cmp)}
        </div>

        {/* 组件的功能、选中的样式 */}
        <ul
          className={classNames(
            styles.editStyle,
            selected ? styles.selected : styles.unselected
          )}
          style={{
            top: style.top - 2,
            left: style.left - 2,
            width: style.width,
            height: style.height,
            transform,
          }}
          onMouseDown={this.onMouseDown}>
          <li
            className={styles.stretchDot}
            style={{top: -8, left: -8}}
            data-direction="top, left"
          />

          <li
            className={styles.stretchDot}
            style={{
              top: -8,
              left: width / 2 - 8,
            }}
            data-direction="top"
          />

          <li
            className={styles.stretchDot}
            style={{top: -8, left: width - 8}}
            data-direction="top right"
          />

          <li
            className={styles.stretchDot}
            style={{top: height / 2 - 8, left: width - 8}}
            data-direction="right"
          />

          <li
            className={styles.stretchDot}
            style={{
              top: height - 8,
              left: width - 8,
            }}
            data-direction="bottom right"
          />

          <li
            className={styles.stretchDot}
            style={{
              top: height - 8,
              left: width / 2 - 8,
            }}
            data-direction="bottom"
          />

          <li
            className={styles.stretchDot}
            style={{
              top: height - 8,
              left: -8,
            }}
            data-direction="bottom left"
          />
          <li
            className={styles.stretchDot}
            style={{
              top: height / 2 - 8,
              left: -8,
            }}
            data-direction="left"
          />

          <li
            className={classNames(styles.rotate, "iconfont icon-xuanzhuan")}
            style={{
              top: height + 8,
              left: width / 2 - 8,
            }}
            onMouseDown={this.rotate}
          />
        </ul>
      </div>
    );
  }
}

function getCmp(cmp) {
  switch (cmp.type) {
    case isTextComponent:
      return <Text {...cmp} />;

    case isImgComponent:
      return <Img {...cmp} />;
    default:
      break;
  }
}
