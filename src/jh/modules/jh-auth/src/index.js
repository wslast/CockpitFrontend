/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description:
 */
import Vue from "vue";
import authRouter from "./router/auth";
import config, { resetConfig } from "./config"; //全局环境变量
import utils from "./functions/utils";
import validOption from "./functions/valid";
import users from "./components/checkUser/uesrs.vue";
import cascaderUser from "./components/checkUser/cascUser.vue";

// Declare install function executed by Vue.use()
export function install(Vue, router, resetRouter, getGlobalConfig) {
  if (install.installed || !getGlobalConfig) return;
  install.installed = true;
  Vue.prototype.$api.formPost("/captcha/password/level", {}).then(res => {
    let config = getGlobalConfig();
    config.pwdLevel = res.retBody;
    resetConfig(config);
  });
  let { routes } = router.options;
  let routeData = {};
  for (const iterator of routes) {
    if (iterator.path === "/") {
      routeData = iterator;
    }
  }
  Vue.use(utils);
  Vue.component("users", users);
  Vue.component("cascader-user", cascaderUser);
  Vue.prototype.$validOption = validOption;
  routeData.children = [...routeData.children, ...authRouter];
  resetRouter();
  router.addRoutes([routeData]);
}
// Create module definition for Vue.use()
const plugin = { install };

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export default {
  install,
  Vue
};
