export function getOnlyKey() {
  return Math.random();
}

// 规范style，如传入的lineHeight只是数字，没有px，则这里加上
export function formatStyle(style, noNeedPos) {
  let newStyle = {...style};

  newStyle = checkPx(newStyle, ["width", "height", "lineHeight", "fontSize"]);

  delete newStyle.top;
  delete newStyle.right;
  delete newStyle.bottom;
  delete newStyle.left;
  delete newStyle.transform;

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
