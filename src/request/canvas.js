import axios from "axios";
import {common} from "./index";

// 查询
export function getCanvas(values, successCallback) {
  axios.get("api/web/content/get?id=" + values).then((res) => {
    common(res, successCallback);
  });
}

// 保存
export function saveCanvas(values, successCallback) {
  axios.post("api/web/content/save", values).then((res) => {
    common(res, successCallback);
  });
}
