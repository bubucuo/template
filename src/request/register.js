import axios from "axios";
import {common, end} from "./index";

export function register(values, successCallback, failedCallback) {
  axios.post(end + "/api/register", values).then((res) => {
    // 缓存 sessionId
    common(res, successCallback, failedCallback);
  });
}
