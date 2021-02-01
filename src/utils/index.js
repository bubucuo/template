import {useCallback, useState} from "react";

export function getOnlyKey() {
  return Math.random();
}

export function useForceUpdate() {
  const [state, setState] = useState(0);
  const update = useCallback(() => {
    setState((prev) => prev + 1);
  }, []);
  return update;
}

// 规范style，如传入的lineHeight只是数字，没有px，则这里加上
export function formatStyle(style, noNeedPos) {
  let newStyle = {...style};

  newStyle = checkPx(newStyle, ["lineHeight", "fontSize"]);

  delete newStyle.top;
  delete newStyle.right;
  delete newStyle.bottom;
  delete newStyle.left;

  return newStyle;
}

function checkPx(newStyle, names) {
  names.map((name) => {
    if (newStyle[name] && (newStyle[name] + "").indexOf("px") === -1) {
      newStyle[name] = newStyle[name] + "px";
    }
  });
  return newStyle;
}

// 节流， 默认500ms
export function throttle(func, wait = 100) {
  let timer = 0;
  return (...args) => {
    if (timer) {
      return;
    }
    timer = window.setTimeout(() => {
      func(...args);
      timer = 0;
    }, wait);
  };
}
