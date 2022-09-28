import axios from "axios";
import docCookies from "../utils/cookies";
export const end = "//www.bubucuo.cn";

export function common(
  res: any,
  successCallback: Function,
  failedCallback?: Function
) {
  if (res.status === 200) {
    let code = res.data.code;
    if (code === 200) {
      successCallback(res.data.result);
    } else if (code === 401) {
      typeof failedCallback === "function"
        ? failedCallback()
        : alert("请先登录！");
    } else if (code === 500) {
      typeof failedCallback === "function"
        ? failedCallback()
        : alert(res.data.msg || "信息有误，失败！");
    }
  } else if (res.status === 500) {
    typeof failedCallback === "function" ? failedCallback() : alert("失败！");
  }
}

function getHeaders(): {
  headers: {
    Authorization: string;
  };
} {
  return {headers: {Authorization: docCookies.getItem("sessionId") || ""}};
}

export const myAxios = {
  get: (url: string, values?: any) => axios.get(url, getHeaders()),
  post: (url: string, values: any) => axios.post(url, values, getHeaders()),
};
