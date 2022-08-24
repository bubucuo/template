import {Component} from "react";
import styles from "./index.less";
import {CanvasContext} from "@/Context";

export default class StretchDots extends Component {
  static contextType = CanvasContext;

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

    const cmp = this.context.getSelectedCmp();

    const {zoom} = this.props;
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

  render() {
    const {zoom, style} = this.props;
    const {width, height, transform} = style;
    return (
      <>
        <div
          className={styles.stretchDot}
          style={{
            top: -8,
            left: -8,
            transform,
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
            transform,
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
            transform,
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
            transform,
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
            transform,
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
            transform,
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
            transform,
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
            transform,
            cursor: "col-resize",
          }}
          data-direction="left"
          onMouseDown={this.onMouseDown}
        />
      </>
    );
  }
}
