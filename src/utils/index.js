export const url0 = "http://150.158.30.131:8181/";

export function getOnlyKey() {
  return Math.random();
}

// 规范style，如传入的lineHeight只是数字，没有px，则这里加上
export function formatStyle(style, noDel) {
  let newStyle = { ...style };

  newStyle = checkPx(newStyle, [
    "width",
    "height",
    "lineHeight",
    "fontSize",
    "borderWidth",
  ]);

  newStyle = checkSec(newStyle, ["animationDuration", "animationDelay"]);
  if (!noDel) {
    delete newStyle.top;
    delete newStyle.right;
    delete newStyle.bottom;
    delete newStyle.left;
    delete newStyle.transform;
    delete newStyle.borderWidth;
    delete newStyle.animationName;
  }
  return newStyle;
}

function checkPx(newStyle, names) {
  names.forEach((name) => {
    if (newStyle[name] && (newStyle[name] + "").indexOf("px") === -1) {
      newStyle[name] = newStyle[name] + "px";
    }
  });
  return newStyle;
}

// 时间单位加上s
function checkSec(newStyle, names) {
  names.forEach((name) => {
    if (newStyle[name] && (newStyle[name] + "").indexOf("s") === -1) {
      newStyle[name] = newStyle[name] + "s";
    }
  });
  return newStyle;
}

// export function debounce(func, wait = 500) {
//   var timer = null;
//   return function() {
//     if (timer !== null) clearTimeout(timer);
//     timer = setTimeout(func, wait);
//   };
// }

export const debounce = (func, wait = 500) => {
  var timer = null;
  return () => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(func, wait);
  };
};

// 节流， 默认500ms
// export function throttle(func, wait = 500) {
//   let timer = 0;
//   return (...args) => {
//     if (timer) {
//       return;
//     }
//     timer = window.setTimeout(() => {
//       func(...args);
//       timer = 0;
//     }, wait);
//   };
// }

export function getContainerDom() {
  return document.getElementById("root");
}

export function checkBackgroundImage() {}

export function getCmpDom(onlyKey) {
  return document.getElementById("cmp" + onlyKey);
}
