import {useRef} from "react";
import {getOnlyKey} from "../utils";
class Canvas {
  constructor() {
    this.cmps = [];
    this.listeners = [];
    this.selectedCmp = null;
  }

  getCmps = () => {
    return [...this.cmps];
  };

  setCmps = (_cmps) => {
    this.cmps = [..._cmps];
    this.runListeners();
  };

  addCmp = (_cmp) => {
    this.selectedCmp = {
      ..._cmp,
      onlyKey: getOnlyKey(),
    };
    this.cmps.push(this.selectedCmp);
    this.runListeners();
  };

  updateCmp = (_cmp) => {
    let cmps = this.cmps;
    for (let i = 0; i < cmps.length; i++) {
      if (cmps[i].onlyKey === _cmp.onlyKey) {
        this.cmps[i] = _cmp;

        break;
      }
    }
    this.runListeners();
  };

  /** 选中组件的操作 **/

  getSelectedCmp = () => {
    return this.selectedCmp;
  };

  setSelectedCmp = (_cmp) => {
    if (this.selectedCmp === _cmp) {
      return;
    }
    this.selectedCmp = _cmp;
    this.runListeners();
  };

  updateSelectedCmpStyle = (_style) => {
    let _cmp = this.getSelectedCmp();
    let cmp = {
      ..._cmp,
      data: {..._cmp.data, style: {..._cmp.data.style, ..._style}},
    };

    this.selectedCmp = cmp;
    this.updateCmp(cmp);
  };

  updateSelectedCmpValue = (value) => {
    let _cmp = this.getSelectedCmp();
    let cmp = {
      ..._cmp,
      data: {
        ..._cmp.data,
        value,
      },
    };

    this.selectedCmp = cmp;
    this.updateCmp(cmp);
  };

  // 删除组件
  deleteSelectedCmp = (_cmp) => {
    this.setSelectedCmp(null);
    this.setCmps(this.cmps.filter((cmp) => cmp !== _cmp));
  };

  // 交换i、j位置的元素
  changeCmpIndex = (i, j = this.cmps.length - 1) => {
    if (i === j) {
      return;
    }

    let newCmps = this.getCmps();
    let tem = newCmps[i];
    newCmps[i] = newCmps[j];
    newCmps[j] = tem;
    this.setCmps(newCmps);
  };

  runListeners = () => {
    this.listeners.forEach((listener) => listener());
  };

  subscribe = (listener) => {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((lis) => lis !== listener);
    };
  };

  getCanvas = () => {
    const returnFuncs = [
      "getCmps",
      "setCmps",
      "addCmp",
      "getSelectedCmp",
      "setSelectedCmp",
      "updateSelectedCmpStyle",
      "updateSelectedCmpValue",
      "deleteSelectedCmp",
      "changeCmpIndex",
      "subscribe",
    ];
    const obj = {};
    returnFuncs.forEach((func) => {
      obj[func] = this[func];
    });
    return obj;
  };
}

// export const globalCanvas = new Canvas();

export function useCanvas(canvas) {
  const canvasRef = useRef();

  if (!canvasRef.current) {
    if (canvas) {
      canvasRef.current = canvas;
    } else {
      const globalCanvas = new Canvas();
      canvasRef.current = globalCanvas.getCanvas();
    }
  }
  return canvasRef.current;
}
