import axios from "axios";
import {common, end} from "./index";

export function login(values, successCallback, failedCallback) {
  axios.post(end + "/api/login", values).then((res) => {
    // 缓存 sessionId
    document.cookie = "sessionId=" + res.data.result.sessionId;
    common(res, successCallback);
  });
}
