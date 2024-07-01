/*
 * @Author: Junchi Zhao
 * @LastEditors: zjc2684613 1984937455@qq.com
 * @Description:
 */
//本地数据持久化插件 并将缓存数据加密
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

import init from "@/jh/store/init";
import tagsView from "@/jh/store/tagsView";
import settings from "@/jh/store/settings";
import routeView from "@/jh/store/routeView";

export default new Vuex.Store({
  state: {
    routers: {},
    components: []
  },
  modules: {
    init,
    tagsView,
    settings,
    routeView
  },
  mutations: {
    setRouters(state, v) {
      return (state.routers = v);
    },
    setComponents(state, v) {
      return (state.components = v);
    }
  },
  plugins: [
    createPersistedState({
      key: "nfgs",
      storage: window.sessionStorage
    })
  ]
});
