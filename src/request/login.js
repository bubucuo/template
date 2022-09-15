import axios from "axios";
import {common} from "./index";

export function login(values, successCallback, failedCallback) {
  axios.post("/api/login", values).then((res) => {
    common(res, successCallback);
  });
}
