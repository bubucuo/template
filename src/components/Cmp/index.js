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

  constructor(props) {
    super(props);
    this.state = {showContextMenu: false, textareaFocused: false};
  }

  setSelected = (e) => {
    const selectedIndex = this.context.getSelectedCmpIndex();
    this.context.setSelectedCmpIndex(this.props.index);
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
        onClick={this.setSelected}>
        {/* 组件本身 , 注意如果是文本组件 ，如果处于选中状态，则目前处理是，textarea与这里的div Text重叠*/}
        <div
          className={styles.cmp}
          style={{
            width: style.width,
            height: style.height,
          }}>
          {cmp.type === isTextComponent && <Text {...cmp} />}
          {cmp.type === isImgComponent && <Img {...cmp} />}
        </div>
      </div>
    );
  }
}
