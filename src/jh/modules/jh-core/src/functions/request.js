/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 
 */
import config from '../config'
//配置接口地址
axios.defaults.baseURL = config.baseURL;

axios.defaults.timeout = 300000; //响应时间
const whiteList = ["/web/sysuser/login"]
// ----------------------------------------------添加请求拦截器
let errorState = 0; //如果报错只显示一次
let errorTimer = null;

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// ---------------添加响应拦截器
axios.interceptors.response.use(response => {
  let isInwhite = false; //判断请求是否在白名单里
  for (const iterator of whiteList) {
    if(response.config.url.indexOf(iterator) > -1) {
      isInwhite = true;
    }
  }
  if(isInwhite) {
    return response;
  }
  // 对响应数据做点什么
  if (response.data.retHead && response.data.retHead.code == "0801005") {
    if(errorState === 0) {
      Vue.prototype.$message.error("Token不存在，请重新登录！");
    }
    errorState++;
    VueRouter.push("/login");
    showErrorOnce();
    return;
  }
  if (response.data.retHead && response.data.retHead.code == "0801006") {
    if(errorState === 0) {
      Vue.prototype.$message.error("Token验证异常，请重新登录！");
    }
    errorState++;
    VueRouter.push("/login");
    showErrorOnce();
    return;
  }
  if (response.data.retHead &&response.data.retHead.code == "0801008") {
    if(errorState === 0) {
      Vue.prototype.$message.error("Token为空，请重新登录！");
    }
    errorState++;
    VueRouter.push("/login");
    showErrorOnce();
    return;
  }
  if (response.data.retHead &&response.data.retHead.code == "0801009") {
    if(errorState === 0) {
      Vue.prototype.$message.error("Token超时，请重新登录！");
    }
    errorState++;
    VueRouter.push("/login");
    showErrorOnce();
    return;
  }
  if (response.data.retHead &&response.data.retHead.code == "0801001") {
    if(errorState === 0) {
      Vue.prototype.$message.error("未登录！");
    }
    VueRouter.push("/login");
    errorState++;
    showErrorOnce();
    return;
  }
  if (response.data.retHead && response.data.retHead.code == "9999999") {
    if(errorState === 0) {
      Vue.prototype.$message.error("系统异常！");
    }
    errorState++;
    showErrorOnce();
    return;
  }
  if (response.data.retHead && response.config.isIntercept && response.data.retHead.code != "0000000") {
    if(errorState === 0) {
      Vue.prototype.$message.error(response.data.retHead.message);
    }
    errorState++;
    showErrorOnce();
    return;
  }
  return response;
}, error => {
  return Promise.reject(error);
})
//3秒内重复报错不展示
function showErrorOnce() {
  clearTimeout(errorTimer);
  errorTimer = setTimeout(() => {
    errorState = 0;
  }, 3000);
}
export default axios