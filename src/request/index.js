export const end = "//www.bubucuo.cn";

export function common(res, successCallback, failedCallback) {
  if (res.status === 200) {
    let code = res.data.code;
    if (code === 200) {
      successCallback(res.data.result);
    } else if (code == 401) {
      typeof failedCallback === "function"
        ? failedCallback()
        : alert("请先登录！");
    } else if (code == 500) {
      typeof failedCallback === "function"
        ? failedCallback()
        : alert("信息有误，失败！");
    }
  } else if (res.status == 500) {
    typeof failedCallback === "function" ? failedCallback() : alert("失败！");
  }
}
