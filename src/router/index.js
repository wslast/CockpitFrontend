/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description:
 */
import Home from '@/jh/pages/sy/sy';
import login from '@/jh/pages/login/index';
import thirdLogin from '@/jh/pages/login/thirdLogin.vue';
import index from '@/jh/pages/index/index.vue';
import page404 from '@/jh/components/404.vue';
import demoRoutes from '@/jh/router/demoRouter';
import ruleCfgRoutes from '@/router/ruleCfgRouter';
import highScreen from './highScreen';
import dashboard from './dashboard';
export const constantRoutes = [
    {
        path: '/login',
        name: 'login',
        component: login,
    },
    {
        path: '/thirdLogin',
        name: 'thirdLogin',
        component: thirdLogin,
    },
    ...highScreen,
    ...dashboard,
    {
        path: '/',
        name: 'Home',
        redirect: '/home',
        component: Home,
        meta: {
            title: '首页',
            path: '首页',
        },
        children: [
            {
                path: '/error',
                name: 'error',
                component: page404,
                meta: {
                    title: 'page404',
                    icon: '',
                    noCache: true,
                    affix: false,
                },
            },
            {
                path: '/home',
                name: 'index',
                component: index,
                meta: {
                    title: '首页',
                    icon: 'dashboard',
                    noCache: true,
                    affix: true,
                    all: true,
                },
            },
            ...ruleCfgRoutes,
        ],
    },
    {
        path: '*',
        name: '404',
        redirect: '/error',
    },
];
const createRouter = () =>
    new VueRouter({
        // mode: 'history', // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes,
    });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465 去除路由name重复的警告 软重置
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
