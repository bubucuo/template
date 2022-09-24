import axios from "axios";
import {common, end} from "./index";
import docCookies from "../utils/cookies";

export function login(values, successCallback, failedCallback) {
  axios.post(end + "/api/login", values).then((res) => {
    // 缓存 sessionId
    common(
      res,
      () => {
        docCookies.setItem("sessionId", res.data.result.sessionId);
        docCookies.setItem("name", res.data.result.name);
        successCallback();
      },
      failedCallback
    );
  });
}
