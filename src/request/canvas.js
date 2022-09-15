import axios from "axios";
import {common, end} from "./index";

export function getSessionId() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)sessionId\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
}

// 查询
export function getCanvas(values, successCallback) {
  axios.get(end + "/api/web/content/get?id=" + values).then((res) => {
    common(res, successCallback);
  });
}

// 保存
export function saveCanvas(values, successCallback) {
  axios
    .post(
      end + "/api/web/content/save",
      values,

      {headers: {Authorization: getSessionId()}}
    )
    .then((res) => {
      common(res, successCallback);
    });
}
