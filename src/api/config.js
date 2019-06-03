import axios from "axios";
import globolContext from "./globolContext"
import {Message} from 'element-ui'

const SERVER_BASE = "http://www.flyeat.com:8080/BM";
// const SERVER_BASE = "http://192.168.1.141:8080";
// const SERVER_BASE = "http://localhost:8080";

let http = axios.create();
http.interceptors.request.use(
  config => {
    if (globolContext.token) {
      config.headers = {token:globolContext.token};
    }
    return config;
  },
  err => {
    return Promise.reject(error);
  }
);
http.interceptors.response.use((data) => {
  return data
}, (err) => {
  console.log(err)
  Message.warning("网络错误")
  return Promise.reject(err)
})

export { SERVER_BASE, http };
