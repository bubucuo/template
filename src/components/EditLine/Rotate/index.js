import {Component} from "react";
import classNames from "classnames";
import {CanvasContext} from "@/Context";
import styles from "./index.less";

export default class Rotate extends Component {
  static contextType = CanvasContext;

  // 旋转组件
  rotate = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const cmp = this.context.getSelectedCmp();
    const {zoom} = this.props;
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

      this.context.updateAssemblyCmps({
        transform: deg - transform,
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

  render() {
    const {zoom, style} = this.props;
    const {width, height, transform} = style;
    return (
      <div
        className={classNames(styles.rotate, "iconfont icon-xuanzhuan")}
        style={{
          top: height + (30 * 100) / zoom,
          left: width / 2 - 13,
          transform,
        }}
        onMouseDown={this.rotate}
      />
    );
  }
}
