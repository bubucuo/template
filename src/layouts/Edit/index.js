import { Component } from "react";
import { CanvasContext } from "../../Context";
import EditCanvas from "./EditCanvas";
import EditCmp from "./EditCmp";

export default class Edit extends Component {
  static contextType = CanvasContext;

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
