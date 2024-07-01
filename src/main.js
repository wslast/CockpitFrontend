/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description:
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App';
import router, { resetRouter } from './router';
import store from './store';
// 解决Added non-passive event listener to a scroll-blocking 'mousewheel' event. Consider marking event han
// import 'default-passive-events'
import '@/assets/atom.css';
import '@/assets/base.scss';
import '@/assets/defaultPage.scss';
import '@/assets/font/iconfont.css';
import '@/assets/element-variables.scss';
import 'nprogress/nprogress.css';
// 引入axios，并加到原型链中
import axios from './data/request';
window.axios = axios;
import api from './data/fetchType';
import { baseURL, wsURL, isOpenWs, getGlobalConfig, isMock } from './config';
//路由守卫
import '@/router/routeGuard';
//配置接口地址
Vue.prototype.isOpenWs = isOpenWs;
Vue.prototype.wsURL = wsURL;
Vue.prototype.baseURL = baseURL;
Vue.prototype.getGlobalConfig = getGlobalConfig;
Vue.prototype.$api = api;
import jhCore from '@/jh/modules/jh-core/src';
Vue.use(jhCore, router, resetRouter, getGlobalConfig);
import jhMessage from '@/jh/modules/jh-message/src';
Vue.use(jhMessage, router, resetRouter, getGlobalConfig);
import jhAuth from '@/jh/modules/jh-auth/src';
Vue.use(jhAuth, router, resetRouter, getGlobalConfig);
import jhBase from '@/jh/modules/jh-base/src';
Vue.use(jhBase, router, resetRouter, getGlobalConfig);
import jhLog from '@/jh/modules/jh-log/src';
Vue.use(jhLog, router, resetRouter, getGlobalConfig);
import jhTask from '@/jh/modules/jh-task/src';
Vue.use(jhTask, router, resetRouter, getGlobalConfig);
import jhEncrypt from '@/jh/modules/jh-encrypt/src';
Vue.use(
    jhEncrypt,
    {
        SM4Key: 'jhkj@123pass#678',
        tripleDESKey: 'jhkj@123pass#67801234567',
    },
    getGlobalConfig,
);
import VScaleScreen from 'v-scale-screen';

Vue.use(VScaleScreen);
// import jhSso from "jh-sso";
// console.log(jhSso);
// var sso = jhSso.init({
//   urlParamKey: "portal_sso_login_ticket",
//   headerKey: "Portal-SSO-Auth-Ticket",
//   ssoUrl: "http://115.233.221.131:26201",
//   redirectUrl: "#/home"
// });
// import jhFormTemplate from 'jh-form-template';
// Vue.use(jhFormTemplate,router,resetRouter,getGlobalConfig);
// import jhFileTemplate from 'jh-file-template';
// Vue.use(jhFileTemplate,router,resetRouter,getGlobalConfig);

//mock数据
if (isMock && process.env.NODE_ENV === 'development') {
    const { mockXHR } = require('../mock');
    mockXHR();
}
//水印指令
import warterMark from '@/jh/functions/warterMark';
Vue.directive('warterMark', warterMark);
import plugin from './components';
plugin(Vue);
//项目所有工具方法
import utils from './functions/utils';
Vue.use(utils);
//全局设置尺寸
console.log(ELEMENT);
ELEMENT.TableColumn.props.showOverflowTooltip.default = true;
ELEMENT.TableColumn.props.align.default = 'center';
ELEMENT.Table.props.stripe.default = false;
ELEMENT.Table.props.border.default = true;
ELEMENT.Dialog.props.closeOnClickModal.default = false;
ELEMENT.Pagination.props.pageSizes.default = () => {
    return [20, 50, 100, 200];
};
ELEMENT.Pagination.props.background.default = true;
Vue.prototype.$ELEMENT.size = 'small';
Vue.config.productionTip = false;
//全局自动注入data/api下所有接口方法
const dataFiles = require.context('./data/api', true, /\.js$/);
const data = dataFiles.keys().reduce((data, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = dataFiles(modulePath);
    data[moduleName] = value.default;
    return data;
}, {});
Vue.prototype.$apiData = data;
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;
//水球图
import 'echarts-liquidfill';

//vue项目数字滚动插件
import VueAnimateNumber from 'vue-animate-number';
import countTo from 'vue-count-to'
import BaiduMap from 'vue2-baidu-map'
Vue.use(countTo);
Vue.use(VueAnimateNumber);
Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak:'DL5Z4vfhvbYHpqlYLg0tALBGuPlRNuAD'
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
});
