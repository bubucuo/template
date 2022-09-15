import axios from "axios";
import {common, end} from "./index";

export function login(values, successCallback, failedCallback) {
  axios.post(end + "/api/login", values).then((res) => {
    // 缓存 sessionId

    console.log(
      "%c [  ]-9",
      "font-size:13px; background:pink; color:#bf2c9f;",
      res
    );
    document.cookie = "sessionId=" + res.data.result.sessionId;
    common(res, successCallback);
  });
}
