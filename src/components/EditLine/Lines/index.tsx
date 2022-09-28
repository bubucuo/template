import {Component} from "react";
import classNames from "classnames";
import {CanvasContext} from "src/Context";
import styles from "./index.less";

interface ILinesProps {
  style: any;
  basePos?: number;
}

export default class Lines extends Component<ILinesProps> {
  static contextType = CanvasContext;

  render() {
    const {style, basePos = 0} = this.props;
    const {width, height} = style;
    return (
      <>
        <div
          className={classNames(styles.line, styles.xLine)}
          style={{width, top: -2 - basePos, left: -2 - basePos}}
        />
        <div
          className={classNames(styles.line, styles.xLine)}
          style={{width, top: height - basePos, left: -2 - basePos}}
        />

        <div
          className={classNames(styles.line, styles.yLine)}
          style={{height: height + 4, top: -2 - basePos, left: -2 - basePos}}
        />
        <div
          className={classNames(styles.line, styles.yLine)}
          style={{
            height: height + 4,
            top: -2 - basePos,
            left: width - basePos - 2,
          }}
        />
      </>
    );
  }
}
