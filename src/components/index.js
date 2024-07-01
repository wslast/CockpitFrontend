/*
 * @Author: Junchi Zhao
 * @LastEditors: zjc2684613 1984937455@qq.com
 * @Description: 全局注册组件
 */
import pageDialog from "@/jh/components/baseDialog/pageDialog.vue";
import selectColumnDialog from "@/jh/components/baseDialog/selectColumnDialog.vue";
import searchDialog from "@/jh/components/baseDialog/searchDialog.vue";
import chart from './chart/index.vue';
import empty from './empty/index.vue';
function plugin(Vue) {
  if (plugin.installed) {
    return;
  }
  Vue.component("pageDialog", pageDialog);
  Vue.component("selectColumnDialog", selectColumnDialog);
  Vue.component("searchDialog", searchDialog);
  Vue.component('chart',chart);
  Vue.component('empty',empty);
}
export default plugin;
