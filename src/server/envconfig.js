/**
 * 环境配置文件
 */
let baseURL;

if (process.env.NODE_ENV === "production") {
  // 干一些线上才要做的事情
  baseURL = "http://47.92.49.26:8551/api/";
}
if (process.env.NODE_ENV === "development") {
  // 干一些测试时不可告人的事情
  // baseURL = "http://47.92.49.26:8551/api/";
  // baseURL = 'http://192.168.0.105/api'
  baseURL = "/api/"; 
}
export default { baseURL };
