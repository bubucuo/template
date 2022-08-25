import React, {Component} from "react";
import classNames from "classnames";
import styles from "./index.less";
import {CanvasContext} from "../../Context";
import {isTextComponent} from "@/layout/Left";
import ContextMenu from "./ContextMenu";
import StretchDots from "./StretchDots";
import Rotate from "./Rotate";
import Lines from "./Lines";
import {createRef} from "react";

// todo 拖拽、删除、改变层级关系等

// 按键小幅度移动的事件写在了Center中
export default class EditLine extends Component {
  static contextType = CanvasContext;

  constructor(props) {
    super(props);

    this.state = {textareaFocused: false, showContextMenu: false};
    this.textareaRef = createRef();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 切换选中组件的时候，如果右键出现的菜单栏出现，则藏掉
    if (
      prevProps.selectedIndex !== this.props.selectedIndex &&
      this.state.showContextMenu
    ) {
      this.hideShowContextMenu();
    }
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

    const {zoom} = this.props;
    const move = (e) => {
      const x = e.pageX;
      const y = e.pageY;

      let disX = x - startX;
      let disY = y - startY;

      disX = disX * (100 / zoom);
      disY = disY * (100 / zoom);

      this.context.updateAssemblyCmps({top: disY, left: disX});

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

  valueChange = (e) => {
    const newValue = e.target.value;
    // 如果改变文本高度，则调整组件框高度
    const textHeight = this.textareaRef.current.scrollHeight;
    this.context.updateSelectedCmp({height: textHeight}, newValue);
    this.context.recordCanvasChangeHistory();
  };

  handleShowContextMenu = (e) => {
    e.preventDefault();
    this.setState({showContextMenu: true});
  };

  hideShowContextMenu = (e) => {
    this.setState({showContextMenu: false});
  };

  render() {
    const {zoom} = this.props;
    const cmp = this.context.getSelectedCmp();

    if (!cmp) {
      // 没有选择线
      return null;
    }

    const {style, value} = cmp;

    const {width, height} = style;
    const transform = `rotate(${style.transform}deg)`;

    // width height是组件本身宽度
    // dot直径 16
    // line 宽 2
    // rotate 直径 26
    // rotate距离边框距离为30

    return (
      <div
        className={styles.main}
        style={{
          zIndex: 99999,
          width,
          height,
          top: style.top,
          left: style.left,
          transform,
        }}
        // 双击，编辑文本
        onDoubleClick={(e) => {
          this.setState({textareaFocused: true, showContextMenu: false});
        }}>
        {cmp.type === isTextComponent && this.state.textareaFocused ? (
          <textarea
            ref={this.textareaRef}
            value={cmp.value}
            onChange={this.valueChange}
            onBlur={() => {
              this.setState({textareaFocused: false});
            }}
            style={{
              ...style,
              width,
              height,
              top: 0,
              left: 0,
            }}
          />
        ) : (
          // 拖拽组件的有效蒙层
          <div
            className={styles.eventMask}
            style={{
              width,
              height,
            }}
            onMouseDown={this.onMouseDownOfCmp}
            onContextMenu={this.handleShowContextMenu}></div>
        )}

        {this.state.showContextMenu && (
          <ContextMenu
            style={{
              top: 2,
              left: width / 2,
              transform: `scale(${100 / zoom}) rotate(${
                0 - style.transform
              }deg)`,
            }}
          />
        )}

        {/* 选中组件的边界线 */}
        <Lines style={{width, height}} />

        {/* 拉伸组件的八个点 */}
        <StretchDots
          zoom={zoom}
          style={{
            width,
            height,
            transform: `scale(${100 / zoom})`,
          }}
        />

        {/* 旋转组件的标记 */}
        <Rotate
          zoom={zoom}
          style={{width, height, transform: `scale(${100 / zoom})`}}
        />
      </div>
    );
  }
}
