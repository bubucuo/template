import {getOnlyKey} from "../utils";

const defaultCanvas = {
  // 页面样式
  style: {
    width: 320,
    height: 568,
    backgroundColor: "#ffffff",
    backgroundImage: "",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    boxSizing: "content-box",
  },
  // 组件
  cmps: [],
};

// 状态
export default class Canvas {
  constructor(_canvas = defaultCanvas) {
    this.canvas = _canvas; // 页面数据

    // 被选中的组件的下标
    this.selectedCmpIndex = null;

    this.listeners = [];
  }

  // get

  getCanvas = () => {
    return {...this.canvas};
  };

  getCanvasCmps = () => {
    return [...this.canvas.cmps];
  };

  getSelectedCmpIndex = () => {
    return this.selectedCmpIndex;
  };
  // 返回选中组件的参数
  getSelectedCmp = () => {
    const cmps = this.getCanvasCmps();

    return cmps[this.selectedCmpIndex];
  };

  setSelectedCmpIndex = (index) => {
    if (this.selectedCmpIndex === index) {
      return;
    }

    this.selectedCmpIndex = index;

    this.updateApp();
  };

  // set
  setCanvas = (_canvas) => {
    Object.assign(this.canvas, _canvas);
  };

  // 新增组件
  addCmp = (_cmp) => {
    const cmp = {key: getOnlyKey(), ..._cmp};
    // 1. 更新画布数据
    this.canvas.cmps.push(cmp);
    // 2. 选中新增的组件为选中组件
    this.selectedCmpIndex = this.canvas.cmps.length - 1;
    // 3. 更新组件
    this.updateApp();
  };

  updateSelectedCmp = (newStyle, newValue) => {
    const selectedCmp = this.getSelectedCmp();

    if (newStyle) {
      this.canvas.cmps[this.getSelectedCmpIndex()].style = {
        ...selectedCmp.style,
        ...newStyle,
      };
    }

    if (newValue != undefined) {
      this.canvas.cmps[this.getSelectedCmpIndex()].value = newValue;
    }

    //  更新组件
    this.updateApp();
  };

  updateCanvasStyle = (newStyle) => {
    this.canvas.style = {
      ...this.canvas.style,
      ...newStyle,
    };

    console.log("this", this.canvas.style); //sy-log
    this.updateApp();
  };

  updateApp = () => {
    // 希望组件更新
    this.listeners.forEach((lis) => lis());
  };

  subscribe = (listener) => {
    this.listeners.push(listener);
    // 取消时间
    return () => {
      this.listeners = this.listeners.filter((lis) => lis !== listener);
    };
  };

  getPublicCanvas = () => {
    const obj = {
      getCanvas: this.getCanvas,
      getCanvasCmps: this.getCanvasCmps,
      addCmp: this.addCmp,
      getSelectedCmpIndex: this.getSelectedCmpIndex,
      getSelectedCmp: this.getSelectedCmp,
      setSelectedCmpIndex: this.setSelectedCmpIndex,
      updateSelectedCmp: this.updateSelectedCmp,
      updateCanvasStyle: this.updateCanvasStyle,
      subscribe: this.subscribe,
    };

    return obj;
  };
}
