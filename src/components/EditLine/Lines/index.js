import {Component} from "react";
import classNames from "classnames";
import {CanvasContext} from "@/Context";
import styles from "./index.less";

export default class Lines extends Component {
  static contextType = CanvasContext;

  render() {
    const {width, height} = this.props.style;
    return (
      <>
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
          style={{height: height + 4, top: -2, left: -2}}
        />
        <div
          className={classNames(styles.line, styles.yLine)}
          style={{height: height + 4, top: -2, left: width}}
        />
      </>
    );
  }
}
