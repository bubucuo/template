import axios from "axios";
import {common, end, myAxios} from "./index";

// 查询, 没有设置登录权限
export function getCanvas(values, successCallback) {
  axios.get(end + "/api/web/content/get?id=" + values).then((res) => {
    common(res, successCallback);
  });
}

// 保存
export function saveCanvas(values, successCallback) {
  myAxios.post(end + "/api/web/content/save", values).then((res) => {
    common(res, successCallback);
  });
}

// 查询列表
export function getCanvasList(values, successCallback) {
  myAxios
    .get(end + "/api/web/content/list?pageSize=1000" + values)
    .then((res) => {
      common(res, successCallback);
    });
}

// 删除
export function deleteCanvas(values, successCallback) {
  myAxios.post(end + "/api/web/content/delete", values).then((res) => {
    common(res, successCallback);
  });
}
