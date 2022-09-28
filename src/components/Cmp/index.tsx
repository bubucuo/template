import React, {Component} from "react";
import styles from "./index.less";
import {CanvasContext} from "src/Context";
// import {CanvasContext} from "@/src/Context";

import {isImgComponent, isTextComponent} from "src/layout/Left";
import Text from "../Text";
import Img from "../Img";
import Lines from "../EditLine/Lines";
import {ICmp} from "src/store/canvas";

// todo 拖拽、删除、改变层级关系等

interface ICmpProps {
  cmp: ICmp;
  index: number;
}

// 按键小幅度移动的事件写在了Center中
export default class Cmp extends Component<ICmpProps> {
  static contextType = CanvasContext;

  context: any;

  setSelected = (e: React.MouseEvent<HTMLDivElement>) => {
    //
    if (e.metaKey) {
      // 把选中的组件填入组件集合
      this.context.addAndUpdateAssembly(this.props.index);
    } else {
      this.context.setSelectedCmpIndex(this.props.index);
    }
  };

  render() {
    const {cmp, index} = this.props;
    const {style} = cmp;

    const {width, height} = style;
    const transform = `rotate(${style.transform}deg)`;

    const zIndex = index;

    const belongingToAssembly = this.context.belongingToAssembly(index);

    const innerWidth = style.width - (style.borderWidth || 0) * 2;
    const innerHeight = style.height - (style.borderWidth || 0) * 2;

    const selectedIndex = this.context.getSelectedCmpIndex();
    return (
      <div
        id={cmp.key + ""}
        className={styles.main}
        style={{
          ...style,
          transform,
          zIndex,
        }}
        onClick={this.setSelected}>
        {selectedIndex !== index && belongingToAssembly && (
          <Lines
            style={{width, height, transform}}
            basePos={style.borderWidth}
          />
        )}

        {/* 组件本身 , 注意如果是文本组件 ，如果处于选中状态，则目前处理是，textarea与这里的div Text重叠*/}
        <div
          className={styles.cmp}
          style={{
            width: innerWidth,
            height: innerHeight,
          }}>
          {cmp.type === isTextComponent && <Text {...cmp} />}
          {cmp.type === isImgComponent && <Img {...cmp} />}
        </div>
      </div>
    );
  }
}
