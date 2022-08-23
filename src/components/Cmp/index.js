import React, {Component} from "react";
import classNames from "classnames";
import styles from "./index.less";
import {CanvasContext} from "../../Context";
import {isImgComponent, isTextComponent} from "@/layout/Left";
import Text from "../Text";
import Img from "../Img";
import ContextMenu from "./ContextMenu";

// todo 拖拽、删除、改变层级关系等

// 按键小幅度移动的事件写在了Center中
export default class Cmp extends Component {
  static contextType = CanvasContext;

  constructor(props) {
    super(props);
    this.state = {showContextMenu: false, textareaFocused: false};
  }

  // 在画布上移动组件位置
  onMouseDownOfCmp = (e) => {
    if (this.state.textareaFocused) {
      return;
    }

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
      this.context.recordCanvasChangeHistory();
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  setSelected = (e) => {
    e.stopPropagation();
    // 选中其他元素，则取消这个元素的焦点
    if (this.props.index !== this.context.getSelectedCmpIndex()) {
      document.activeElement.blur();
    }
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

    const {cmp, zoom} = this.props;
    const move = (e) => {
      const x = e.pageX;
      const y = e.pageY;

      let disX = x - startX;
      let disY = y - startY;

      disX = disX * (100 / zoom);
      disY = disY * (100 / zoom);

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

      if (newStyle.width < 10) {
        newStyle.width = 10;
      }
      if (newStyle.height < 10) {
        newStyle.height = 10;
      }

      this.context.updateSelectedCmp(newStyle);

      startX = x;
      startY = y;
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);

      this.context.recordCanvasChangeHistory();
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  // 旋转组件
  rotate = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const {cmp, zoom} = this.props;
    const {style} = cmp;
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

      disX = disX * (100 / zoom);
      disY = disY * (100 / zoom);

      let deg = (360 * Math.atan2(disY, disX)) / (2 * Math.PI) - 90;

      deg = parseInt(deg);

      this.context.updateSelectedCmp({
        transform: deg,
      });
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      this.context.recordCanvasChangeHistory();
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  handleShowContextMenu = (e) => {
    e.preventDefault();
    this.props.selected && this.setState({showContextMenu: true});
  };

  hideShowContextMenu = (e) => {
    this.setState({showContextMenu: false});
  };

  valueChange = (e) => {
    const newValue = e.target.value;
    this.context.updateSelectedCmp(null, newValue);
    this.context.recordCanvasChangeHistory();
  };

  render() {
    const {cmp, selected, zoom, index} = this.props;
    const {style, value} = cmp;

    const {width, height} = style;
    const transform = `rotate(${style.transform}deg)`;

    const zIndex = index;

    return (
      <div
        id={cmp.key}
        className={styles.main}
        style={{
          ...style,
          transform,
          zIndex: selected && this.state.showContextMenu ? 99999 : index,
        }}
        onMouseDown={this.onMouseDownOfCmp}
        onClick={this.setSelected}
        onDoubleClick={(e) => {
          this.setState({textareaFocused: true});
        }}
        onContextMenu={this.handleShowContextMenu}>
        {/* 组件的功能、选中的样式 */}
        {selected && (
          <>
            {/* line */}
            <div
              className={classNames(styles.line, styles.xLine)}
              style={{width, top: -2}}
            />
            <div
              className={classNames(styles.line, styles.xLine)}
              style={{width, top: height}}
            />

            <div
              className={classNames(styles.line, styles.yLine)}
              style={{height, left: -2}}
            />
            <div
              className={classNames(styles.line, styles.yLine)}
              style={{height, left: width}}
            />
            {/* line */}

            <div
              className={styles.stretchDot}
              style={{
                top: -8,
                left: -8,
                transform: `scale(${100 / zoom})`,
                cursor: "nwse-resize",
              }}
              data-direction="top, left"
              onMouseDown={this.onMouseDown}
            />

            <div
              className={styles.stretchDot}
              style={{
                top: -8,
                left: width / 2 - 8,
                transform: `scale(${100 / zoom})`,
                cursor: "row-resize",
              }}
              data-direction="top"
              onMouseDown={this.onMouseDown}
            />

            <div
              className={styles.stretchDot}
              style={{
                top: -8,
                left: width - 8,
                transform: `scale(${100 / zoom})`,
                cursor: "nesw-resize",
              }}
              data-direction="top right"
              onMouseDown={this.onMouseDown}
            />

            <div
              className={styles.stretchDot}
              style={{
                top: height / 2 - 8,
                left: width - 8,
                transform: `scale(${100 / zoom})`,
                cursor: "col-resize",
              }}
              data-direction="right"
              onMouseDown={this.onMouseDown}
            />

            <div
              className={styles.stretchDot}
              style={{
                top: height - 8,
                left: width - 8,
                transform: `scale(${100 / zoom})`,
                cursor: "nwse-resize",
              }}
              data-direction="bottom right"
              onMouseDown={this.onMouseDown}
            />

            <div
              className={styles.stretchDot}
              style={{
                top: height - 8,
                left: width / 2 - 8,
                transform: `scale(${100 / zoom})`,
                cursor: "row-resize",
              }}
              data-direction="bottom"
              onMouseDown={this.onMouseDown}
            />

            <div
              className={styles.stretchDot}
              style={{
                top: height - 8,
                left: -8,
                transform: `scale(${100 / zoom})`,
                cursor: "nesw-resize",
              }}
              data-direction="bottom left"
              onMouseDown={this.onMouseDown}
            />
            <div
              className={styles.stretchDot}
              style={{
                top: height / 2 - 8,
                left: -8,
                transform: `scale(${100 / zoom})`,
                cursor: "col-resize",
              }}
              data-direction="left"
              onMouseDown={this.onMouseDown}
            />

            <div
              className={classNames(styles.rotate, "iconfont icon-xuanzhuan")}
              style={{
                top: height + (30 * 100) / zoom,
                left: width / 2 - 13,
                transform: `scale(${100 / zoom})`,
              }}
              onMouseDown={this.rotate}
            />
          </>
        )}

        {selected && this.state.showContextMenu && (
          <ContextMenu
            index={index}
            style={{
              top: 2, //style.top,
              left: style.left + width / 2,
              transform: `scale(${100 / zoom}) rotate(${
                0 - style.transform
              }deg)`,
            }}
            cmp={cmp}
            hideShowContextMenu={this.hideShowContextMenu}
          />
        )}

        {/* 组件本身 */}
        <div
          className={styles.cmp}
          style={{
            width: style.width,
            height: style.height,
          }}>
          {cmp.type === isTextComponent && (
            <textarea
              value={cmp.value}
              disabled={!this.state.textareaFocused}
              onChange={(e) => {
                const newValue = e.target.value;
                this.context.updateSelectedCmp(null, newValue);
                this.context.recordCanvasChangeHistory();
              }}
              onBlur={() => {
                this.setState({textareaFocused: false});
              }}
              style={{
                ...style,
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                cursor: this.state.textareaFocused ? "text" : "move",
              }}
            />
          )}
          {cmp.type === isImgComponent && <Img cmp={{...cmp}} />}
        </div>
      </div>
    );
  }
}
