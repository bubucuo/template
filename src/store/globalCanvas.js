import {useRef} from "react";
import {getOnlyKey} from "../utils";

/**
 * 组件更新
 *
 * 为了颗粒度细化
 *
 * 目前设置是 增删 组件全部更新
 * 组件更新的话 只更新组件自身
 */

class Canvas {
  constructor() {
    this.cmpsEntity = new Map(); // 实例

    // 画布属性
    this.canvas = {
      style: {
        width: 320,
        height: 568,
        backgroundColor: "#fff",
        backgroundImage: "",
        backgroundPosition: "center",
        backgroundSize: "contain",
      },
      cmps: [],
    };

    this.cmps = [];
    this.listeners = [];
    this.selectedCmp = null;

    // 画布之外的组件更新，如编辑区域
    this.storeChangeCmps = [];
  }

  // get canvasStyle
  getCanvasStyle = () => {
    return {...this.canvas.style};
  };
  updateCanvasStyle = (data) => {
    this.canvas = {
      ...this.canvas,
      style: {
        ...this.getCanvasStyle(),
        ...data,
      },
    };

    // 更新Content层级
    this.runListeners();
  };

  registerStoreChangeCmps = (_cmp) => {
    this.storeChangeCmps.push(_cmp);
    return () => {
      this.storeChangeCmps = this.storeChangeCmps.filter(
        (cmp) => _cmp.onlyKey !== cmp.onlyKey
      );
    };
  };

  registerCmpsEntity = (key, entity) => {
    this.cmpsEntity.set(key, entity);
    return () => this.cmpsEntity.delete(key);
  };

  forceCmpsUpdate = (..._cmps) => {
    // 更新画布组件
    _cmps.forEach((_cmp) => {
      this.cmpsEntity.get(_cmp.onlyKey).onStoreChange();
    });

    // 更新和画布组件相关的组件，如编辑区域
    this.storeChangeCmps.forEach(({onStoreChange}) => onStoreChange());
  };

  // 编辑区域更新
  forceEditUpdate = () => {};

  getCmp = (index) => {
    return {...this.cmps[index]};
  };

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

    this.forceCmpsUpdate(_cmp);
  };

  /** 选中组件的操作 **/
  // 获取选中的组件
  getSelectedCmp = () => {
    return this.selectedCmp;
  };

  setSelectedCmp = (_cmp) => {
    if (this.selectedCmp === _cmp) {
      return;
    }

    let needForceUpdateCmps = [];

    if (this.selectedCmp) {
      needForceUpdateCmps.push(this.selectedCmp);
    }

    this.selectedCmp = _cmp;

    // 如果selectedCmp为null，证明为取消选中，则这个时候只更新取消选中的组件就行了
    // 否则，下个要选中的组件也要更新

    if (this.selectedCmp) {
      needForceUpdateCmps.push(this.selectedCmp);
    }

    // 更新上个选中的和下个选中的组件
    this.forceCmpsUpdate(...needForceUpdateCmps);
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
    this.setCmps(this.cmps.filter((cmp) => cmp.onlyKey !== _cmp.onlyKey));
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

  // 订阅 组件更新
  subscribe = (listener) => {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((lis) => lis !== listener);
    };
  };

  getCanvas = () => {
    const returnFuncs = [
      "getCanvasStyle",
      "updateCanvasStyle",
      "registerStoreChangeCmps",
      "registerCmpsEntity",
      "getCmp",
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
