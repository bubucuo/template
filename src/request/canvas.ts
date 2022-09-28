import axios from "axios";
import {common, end, myAxios} from "./index";

// 查询, 没有设置登录权限
export function getCanvas(
  values: number, //id
  successCallback: Function,
  failedCallback?: Function
) {
  axios.get(end + "/api/web/content/get?id=" + values).then((res) => {
    common(res, successCallback);
  });
}

// 保存
export function saveCanvas(
  values: {id: number | null; content: string; type: string; title?: string},
  successCallback: Function,
  failedCallback?: Function
) {
  myAxios.post(end + "/api/web/content/save", values).then((res) => {
    common(res, successCallback);
  });
}

// 查询列表
export function getCanvasList(
  values: any,
  successCallback: Function,
  failedCallback?: Function
) {
  myAxios
    .get(end + "/api/web/content/list?pageSize=1000" + values)
    .then((res) => {
      common(res, successCallback, failedCallback);
    });
}

// 删除
export function deleteCanvas(
  values: {id: number},
  successCallback: Function,
  failedCallback?: Function
) {
  myAxios.post(end + "/api/web/content/delete", values).then((res) => {
    common(res, successCallback);
  });
}
