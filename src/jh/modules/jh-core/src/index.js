/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 
 */
import registerCpt from './components'
import debounce from './functions/debounce'
import fullScreen from './functions/fullScreen'
import coreRouter from './router/core-router'
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
  //自定义节流指令
  Vue.directive('debounce', debounce);
  //自定义全屏
  Vue.directive('fullScreen', fullScreen);
  //拦截器
  if(getGlobalConfig) {
    axios.defaults.baseURL = config.baseURL;
  }
  if(router) {
    let { routes } = router.options;
    let routeData = {};
    for (const iterator of routes) {
      if(iterator.path === '/') {
        routeData = iterator;
      }
    }
    routes.push(coreRouter[0])
    routeData.children = [...routeData.children, ...[coreRouter[1]]];
    resetRouter();
  }
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
export default install;
