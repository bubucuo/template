import {getOnlyKey} from "../utils";
import {cloneDeep} from "lodash";

function getDefaultCanvas() {
  return {
    title: "未命名",
    // 页面样式
    style: {
      width: 320,
      height: 568,
      backgroundColor: "#ffffff",
      backgroundImage: "",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      // boxSizing: "content-box",
    },
    // 组件
    cmps: [],
  };
}

// 状态
export default class Canvas {
  constructor(_canvas = getDefaultCanvas()) {
    this.canvas = _canvas; // 页面数据

    this.listeners = [];

    // 画布历史
    this.canvasChangeHistory = [cloneDeep(this.canvas)];

    // 前进、后退
    this.canvasChangeHistoryIndex = 0;

    // 最多记录100条数据
    this.maxCanvasChangeHistory = 100;

    // 选中组件的下标集合
    this.assembly = new Set();
  }

  // get

  getCanvas = () => {
    return {...this.canvas};
  };

  getCanvasCmps = () => {
    return [...this.canvas.cmps];
  };

  getSelectedCmpIndex = () => {
    const selectedCmpIndex = Array.from(this.assembly)[0];

    return selectedCmpIndex === undefined ? -1 : selectedCmpIndex;
  };
  // 返回选中组件的参数
  getSelectedCmp = () => {
    const cmps = this.getCanvasCmps();

    return cmps[this.getSelectedCmpIndex()];
  };

  setSelectedCmpIndex = (index) => {
    if (this.getSelectedCmpIndex() === index) {
      return;
    }

    this.assembly.clear();

    if (index > -1) {
      this.addToAssembly(index);
    }

    this.updateApp();
  };

  // set
  setCanvas = (_canvas) => {
    if (_canvas) {
      Object.assign(this.canvas, _canvas);
    } else {
      this.canvas = getDefaultCanvas();
    }

    this.updateApp();
    this.recordCanvasChangeHistory();
  };

  // 新增组件
  addCmp = (_cmp) => {
    const cmp = {..._cmp, key: getOnlyKey()};
    // 1. 更新画布数据
    this.canvas.cmps.push(cmp);
    // 2. 选中新增的组件为选中组件

    this.assembly.clear();
    this.addToAssembly(this.canvas.cmps.length - 1);

    // 3. 更新组件
    this.updateApp();
    this.recordCanvasChangeHistory();
  };

  // 删除组件
  deleteCmps = () => {
    const sorted = Array.from(this.assembly).sort((a, b) => b - a);
    sorted.forEach((index) => {
      this.canvas.cmps.splice(index, 1);
    });

    this.assembly.clear();

    this.updateApp();
    this.recordCanvasChangeHistory();
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

    this.updateApp();
    this.recordCanvasChangeHistory();
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

  // 历史
  // 1 2 5 4
  recordCanvasChangeHistory = () => {
    this.canvasChangeHistory[++this.canvasChangeHistoryIndex] = cloneDeep(
      this.canvas
    );
    this.canvasChangeHistory = this.canvasChangeHistory.slice(
      0,
      this.canvasChangeHistoryIndex + 1
    );

    // 最多记录100条
    if (this.canvasChangeHistory.length > this.maxCanvasChangeHistory) {
      this.canvasChangeHistory.shift();
      this.canvasChangeHistoryIndex--;
    }
  };

  goPrevCanvasHistory = () => {
    let newIndex = this.canvasChangeHistoryIndex - 1;
    if (newIndex < 0) {
      newIndex = 0;
    }

    if (this.canvasChangeHistoryIndex === newIndex) {
      return;
    }
    this.canvasChangeHistoryIndex = newIndex;
    const newCanvas = cloneDeep(this.canvasChangeHistory[newIndex]);
    this.canvas = newCanvas;
    this.updateApp();
  };

  goNextCanvasHistory = () => {
    let newIndex = this.canvasChangeHistoryIndex + 1;
    if (newIndex >= this.canvasChangeHistory.length) {
      newIndex = this.canvasChangeHistory.length - 1;
    }

    if (this.canvasChangeHistoryIndex === newIndex) {
      return;
    }
    this.canvasChangeHistoryIndex = newIndex;
    const newCanvas = cloneDeep(this.canvasChangeHistory[newIndex]);
    this.canvas = newCanvas;
    this.updateApp();
  };

  // 0 1  3 2 4
  // 上移
  addCmpZIndex = (cmpIndex = this.getSelectedCmpIndex()) => {
    const cmps = this.getCanvasCmps();
    const targetIndex = cmpIndex + 1;
    if (targetIndex >= cmps.length) {
      return;
    }

    const tem = cmps[cmpIndex];
    this.canvas.cmps[cmpIndex] = this.canvas.cmps[targetIndex];
    this.canvas.cmps[targetIndex] = tem;

    this.setSelectedCmpIndex(targetIndex);

    this.updateApp();
    this.recordCanvasChangeHistory();
  };

  // 0 1  3 2 4
  // 下移
  subCmpZIndex = (cmpIndex = this.getSelectedCmpIndex()) => {
    const cmps = this.getCanvasCmps();
    const targetIndex = cmpIndex - 1;
    if (targetIndex < 0) {
      return;
    }

    const tem = cmps[cmpIndex];
    this.canvas.cmps[cmpIndex] = this.canvas.cmps[targetIndex];
    this.canvas.cmps[targetIndex] = tem;

    this.setSelectedCmpIndex(targetIndex);

    this.updateApp();
    this.recordCanvasChangeHistory();
  };

  // 0 1  3 4 2
  // 置顶
  topZIndex = (cmpIndex = this.getSelectedCmpIndex()) => {
    const cmps = this.getCanvasCmps();
    if (cmpIndex >= cmps.length - 1) {
      return;
    }
    this.canvas.cmps = cmps
      .slice(0, cmpIndex)
      .concat(cmps.slice(cmpIndex + 1))
      .concat(cmps[cmpIndex]);

    this.setSelectedCmpIndex(cmps.length - 1);

    this.updateApp();
    this.recordCanvasChangeHistory();
  };

  // 置底部
  bottomZIndex = (cmpIndex = this.getSelectedCmpIndex()) => {
    const cmps = this.getCanvasCmps();
    if (cmpIndex <= 0) {
      return;
    }

    this.canvas.cmps = [cmps[cmpIndex]]
      .concat(cmps.slice(0, cmpIndex))
      .concat(cmps.slice(cmpIndex + 1));

    this.setSelectedCmpIndex(0);

    this.updateApp();
    this.recordCanvasChangeHistory();
  };

  // 组件

  addToAssembly = (indexes) => {
    if (Array.isArray(indexes)) {
      indexes.forEach((index) => index !== -1 && this.assembly.add(index - 0));
    } else {
      indexes !== -1 && this.assembly.add(indexes);
    }
  };

  // 批量操作组件
  addAndUpdateAssembly = (indexes) => {
    this.addToAssembly(indexes);
    this.updateApp();
  };

  // 判断下标为index的组件是否被批量选中
  belongingToAssembly = (index) => {
    return this.assembly.has(index);
  };

  // newStyle里面是移动的差值
  updateAssemblyCmps = (newStyle) => {
    this.assembly.forEach((index) => {
      const cmp = this.canvas.cmps[index];
      for (const key in newStyle) {
        cmp.style[key] += newStyle[key] - 0;

        if (cmp.style.width < 10) {
          cmp.style.width = 10;
        }
        if (cmp.style.height < 10) {
          cmp.style.height = 10;
        }
      }
    });

    this.updateApp();
  };

  // 批量添加组件
  addAssemblyCms = () => {
    this.assembly.forEach((index) => {
      const cmp = this.canvas.cmps[index];
      const newCmp = cloneDeep(cmp);
      newCmp.key = getOnlyKey();

      newCmp.style.top += 40;
      newCmp.style.left += 40;

      this.canvas.cmps.push(newCmp);
    });

    // 添加组件之后，更新选中的组件
    // 5 7 9
    // 10
    const cmpsLength = this.canvas.cmps.length;
    const assemblySize = this.assembly.size;

    this.assembly.clear();
    for (let i = cmpsLength - assemblySize; i < cmpsLength; i++) {
      this.assembly.add(i);
    }

    this.updateApp();
    this.recordCanvasChangeHistory();
  };

  // 判断有没有组件组合

  hasAssembly = () => {
    return this.assembly.size > 1;
  };

  getPublicCanvas = () => {
    const obj = {
      getCanvas: this.getCanvas,
      setCanvas: this.setCanvas,
      getCanvasCmps: this.getCanvasCmps,
      addCmp: this.addCmp,
      deleteCmps: this.deleteCmps,
      getSelectedCmpIndex: this.getSelectedCmpIndex,
      getSelectedCmp: this.getSelectedCmp,
      setSelectedCmpIndex: this.setSelectedCmpIndex,
      updateSelectedCmp: this.updateSelectedCmp,
      updateCanvasStyle: this.updateCanvasStyle,
      subscribe: this.subscribe,

      recordCanvasChangeHistory: this.recordCanvasChangeHistory,
      goPrevCanvasHistory: this.goPrevCanvasHistory,
      goNextCanvasHistory: this.goNextCanvasHistory,

      // 修改层级
      addCmpZIndex: this.addCmpZIndex,
      subCmpZIndex: this.subCmpZIndex,
      topZIndex: this.topZIndex,
      bottomZIndex: this.bottomZIndex,

      // 批量操作组件
      addAndUpdateAssembly: this.addAndUpdateAssembly,
      belongingToAssembly: this.belongingToAssembly,
      updateAssemblyCmps: this.updateAssemblyCmps,
      addAssemblyCms: this.addAssemblyCms,
      hasAssembly: this.hasAssembly,
    };

    return obj;
  };
}
