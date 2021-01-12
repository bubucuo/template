class Canvas {
  constructor() {
    this.pos = {
      top: 0,
      left: 0,
    };
    this.activeCmp = null;
  }

  getPos = (name) => {
    return name ? this.pos[name] : {...this.pos};
  };

  setPos = (_pos) => {
    this.pos = {
      ...this.pos,
      ..._pos,
    };
  };

  getActiveCmp = () => {
    return {...this.activeCmp};
  };

  setActiveCmp = (cmp) => {
    this.activeCmp = cmp;
  };
}

export const globalCanvas = new Canvas();

// name ?
export function getCanvasPos(name) {
  return globalCanvas.getPos(name);
}

export function setCanvasPos(_pos) {
  globalCanvas.setPos(_pos);
}
