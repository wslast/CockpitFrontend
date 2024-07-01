/*
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description:
 */
import NProgress from 'nprogress'; //页面顶部进度条引入
import router from './index';
import store from '@/store';
//增加白名单  直接放行
const whiteList = [
    '/',
    '/home',
    '/thirdLogin',
    '/qrcode/index',
    '/qrcode/confirm',
    '/highScreen',
    '/highScreen/szhcg',
    '/highScreen/sy',
    '/highScreen/jc',
    '/highScreen/tq',
    '/highScreen/dk',
    '/highScreen/fk',
    '/highScreen/zjld',
    '/highScreen/yhhx',
    '/portrait/person',
    '/portrait/organ',
    '/highScreen/portrait/person',
    '/highScreen/portrait/organ',
];
router.beforeEach((to, from, next) => {
    NProgress.start();
    store.commit('addRoutes', to.matched);
    let token = sessionStorage.getItem('token');
    if (whiteList.includes(to.path)) {
        next();
    } else {
        if (to.path != '/login' && !token) {
            next({ path: '/login' });
        } else if (to.path === '/login' && token) {
            next({ path: '/home' });
        } else {
            next();
        }
    }
});
router.afterEach((router) => {
    NProgress.done();
    if (router.path != '/login' && router.name != '404' && router.meta.affix) {
        if (
            store.state.tagsView.visitedPath &&
            !store.state.tagsView.visitedPath.some((item) => {
                return item.fullPath === router.fullPath;
            })
        ) {
            let routes = JSON.parse(
                JSON.stringify(store.state.tagsView.visitedPath),
            );
            let route = {
                fullPath: router.fullPath,
                path: router.path,
                meta: router.meta,
                query: router.query,
                name: router.meta.multiple
                    ? router.query[router.meta.multiple]
                    : router.meta.title,
                id: store.state.tagsView.currentPath
                    ? store.state.tagsView.currentPath
                    : new Date().getTime(),
            };
            routes.push(route);
            store.commit('visitedPathAdd', routes);
        }
    }
});
