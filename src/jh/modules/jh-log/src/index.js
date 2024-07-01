/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 
 */
import registerCpt from './components'
import logRouter from './router/log-router'
import config, { resetConfig } from './config'  //全局环境变量
// Declare install function executed by Vue.use()
export function install(Vue,router,resetRouter,getGlobalConfig) {
  if (install.installed || !getGlobalConfig) return;
  install.installed = true;
  //注册父项目config
  if(getGlobalConfig) {
    resetConfig(getGlobalConfig());
  }
  //挂载全局组件
  registerCpt(Vue);
  let { routes } = router.options;
  let routeData = {};
  for (const iterator of routes) {
    if(iterator.path === '/') {
      routeData = iterator;
    }
  }
  routeData.children = [...routeData.children, ...logRouter];
  resetRouter();
  router.addRoutes([routeData]);
}

// Create module definition for Vue.use()
const plugin = { install };

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export default {
  install,
};
