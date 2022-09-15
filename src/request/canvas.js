import axios from "axios";
import {common, end} from "./index";

// 查询
export function getCanvas(values, successCallback) {
  axios.get(end + "/api/web/content/get?id=" + values).then((res) => {
    common(res, successCallback);
  });
}

// 保存
export function saveCanvas(values, successCallback) {
  axios.post(end + "/api/web/content/save", values).then((res) => {
    common(res, successCallback);
  });
}
