/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description:
 */
import { baseURL } from "../config";
import router from "@/router/index";
//配置接口地址
axios.defaults.baseURL = baseURL;

axios.defaults.timeout = 300000; //响应时间
//白名单接口 不全局拦截
const whiteList = [
  "/web/sysuser/login",
  "/captcha/register",
  "/captcha/status",
  "/dingTalk/bindUserAndLogin",
  "/dingTalk/dingTalkLogin",
  "/api/auth/sysuserprofile/doGetUserIndiviality",
  "/api/auth/sysuserprofile/doGetUserProfile",
  "/api/basfun/desk/deskUserComp/doGetListByUserId"
];
// ----------------------------------------------添加请求拦截器
let errorState = 0; //如果报错只显示一次
let errorTimer = null;
// 拦截重复请求
let pending = {}; //存储所有请求
const CancelToken = axios.CancelToken;
// 请求标识；完成请求后也需要执行删除记录，所以添加此参数避免执行无用操作
const removePending = (key, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]("取消重复请求");
  }
  delete pending[key];
};
const getRequestIdentify = config => {
  const url = config.url;
  // 返回url及请求参数 post方法请求参数为config.data  get方法请求参数为config.params
  if (config.method === "post") {
    return encodeURIComponent(config.url + JSON.stringify(config.data));
  }
  return encodeURIComponent(url + JSON.stringify(config.params));
};
axios.interceptors.request.use(
  function(config) {
    // 如果不允许重复请求，开启拦截
    if (
      config.method === "post" &&
      config.data &&
      Object.keys(config.data).length > 0 &&
      config.url
        .split("/")
        .pop()
        .indexOf("doGet") === -1
    ) {
      // 拦截重复请求(即当前正在进行的相同请求)
      const requestData = getRequestIdentify(config);
      removePending(requestData, true);
      // 使用 cancel token 取消请求
      config.cancelToken = new CancelToken(c => {
        pending[requestData] = c;
      });
    } else {
      // 允许重复请求，不进行拦截
      config.data && delete config.data.allowedRepeat;
    }

    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// ---------------添加响应拦截器
axios.interceptors.response.use(
  response => {
    let isInwhite = false; //判断请求是否在白名单里
    for (const iterator of whiteList) {
      if (response.config.url.indexOf(iterator) > -1) {
        isInwhite = true;
      }
    }
    if (isInwhite) {
      return response;
    }
    // 对响应数据做点什么
    if (response.data.retHead && response.data.retHead.code == "0801005") {
      if (errorState === 0) {
        Vue.prototype.$message.error("Token不存在，请重新登录！");
      }
      errorState++;
      sessionStorage.clear();
      router.push("/login");
      showErrorOnce();
      return Promise.reject(response);
    }
    if (response.data.retHead && response.data.retHead.code == "0801006") {
      if (errorState === 0) {
        Vue.prototype.$message.error("Token验证异常，请重新登录！");
      }
      errorState++;
      sessionStorage.clear();
      router.push("/login");
      showErrorOnce();
      return Promise.reject(response);
    }
    if (response.data.retHead && response.data.retHead.code == "0801008") {
      if (errorState === 0) {
        Vue.prototype.$message.error("Token为空，请重新登录！");
      }
      errorState++;
      sessionStorage.clear();
      router.push("/login");
      showErrorOnce();
      return Promise.reject(response);
    }
    if (response.data.retHead && response.data.retHead.code == "0801009") {
      if (errorState === 0) {
        Vue.prototype.$message.error("Token超时，请重新登录！");
      }
      errorState++;
      sessionStorage.clear();
      router.push("/login");
      showErrorOnce();
      return Promise.reject(response);
    }
    if (response.data.retHead && response.data.retHead.code == "0801001") {
      if (errorState === 0) {
        Vue.prototype.$message.error("未登录！");
      }
      errorState++;
      sessionStorage.clear();
      router.push("/login");
      showErrorOnce();
      return Promise.reject(response);
    }
    if (response.data.retHead && response.data.retHead.code == "0101001") {
      if (errorState === 0) {
        Vue.prototype
          .$confirm("登陆过期，是否去登录？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            sessionStorage.clear();
            router.push("/login");
          })
          .catch(() => {});
      }
      errorState++;
      showErrorOnce();
      return Promise.reject(response);
    }
    if (response.data.retHead && response.data.retHead.code == "9999999") {
      if (errorState === 0) {
        Vue.prototype.$message.error("系统异常！");
      }
      errorState++;
      showErrorOnce();
      return;
    }
    if (
      response.data.retHead &&
      response.config.isIntercept &&
      response.data.retHead.code != "0000000"
    ) {
      if (errorState === 0) {
        Vue.prototype.$message.error(response.data.retHead.message);
      }
      errorState++;
      showErrorOnce();
      return;
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
//3秒内重复报错不展示
function showErrorOnce() {
  hideLoading();
  clearTimeout(errorTimer);
  errorTimer = setTimeout(() => {
    errorState = 0;
  }, 3000);
}
//异常处理关闭loading
function hideLoading() {
  document.querySelectorAll(".el-loading-mask").forEach(element => {
    element.remove();
  });
}

export default axios;
