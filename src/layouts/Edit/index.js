import {Component} from "react";
import {CanvasContext} from "../../Context";
import EditCanvas from "./EditCanvas";
import EditCmp from "./EditCmp";
import styles from "./index.less";

export default class Edit extends Component {
  static contextType = CanvasContext;

  constructor(props) {
    super(props);
    this.state = {
      showIndex: 0,
    };
  }
  onStoreChange = () => {
    this.forceUpdate();
  };

  componentDidMount() {
    this.unregister = this.context.registerStoreChangeCmps(this);
  }

  componentWillUnmount() {
    this.unregister();
  }

  render() {
    const selectedCmp = this.context.getSelectedCmp();
    const {showIndex} = this.state;
    return selectedCmp ? (
      <EditCmp
        {...this.props}
        selectedCmp={selectedCmp}
        globalCanvas={this.context}
      />
    ) : (
      <EditCanvas globalCanvas={this.context} />
    );
  }
}
