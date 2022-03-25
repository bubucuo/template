import React, { Component } from "react";
import classNames from "classnames";
import styles from "./index.less";
import { CanvasContext } from "../../Context";

// todo 拖拽、删除、改变层级关系等

export default class Cmp extends Component {
  static contextType = CanvasContext;

  onDragStart = (e) => {
    this.setSelected();

    // 拖拽的开始位置
    const startX = e.pageX;
    const startY = e.pageY;

    e.dataTransfer.setData("text", startX + "," + startY);
  };

  setSelected = () => {
    this.context.setSelectedCmpIndex(this.props.index);
  };
  render() {
    const { cmp, selected } = this.props;
    const { style, value } = cmp;
    return (
      <div
        className={styles.main}
        draggable="true"
        onDragStart={this.onDragStart}
        onClick={this.setSelected}
      >
        {/* 组件本身 */}
        <div className={styles.cmp} style={style}>
          {value}
        </div>

        {/* 组件的功能、选中的样式 */}
        <div
          className={classNames(
            styles.editStyle,
            selected ? styles.selected : styles.unselected
          )}
          style={{
            top: style.top - 2,
            left: style.left - 2,
            width: style.width,
            height: style.height,
          }}
        ></div>
      </div>
    );
  }
}
