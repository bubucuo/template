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
