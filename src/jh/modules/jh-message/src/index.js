/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 
 */
import messRouter from './router/mess-router'
import message from './components/message/index.vue'
import config, { resetConfig } from './config' //全局环境变量
// Declare install function executed by Vue.use()
export function install(Vue,router,resetRouter,getGlobalConfig) {
  if (install.installed || !getGlobalConfig) return;
  install.installed = true;
  resetConfig(getGlobalConfig());
  Vue.component('message',message);
  let { routes } = router.options;
  let routeData = {};
  for (const iterator of routes) {
    if(iterator.path === '/') {
      routeData = iterator;
    }
  }
  routeData.children = [...routeData.children, ...messRouter];
  resetRouter();
  router.addRoutes([routeData])
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
  messRouter
};
