/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 
 */
const logModule = () => import("../pages/log/logModule/index.vue")
const logType = () => import("../pages/log/logType/index.vue")
const logOperateType = () => import("../pages/log/logOperateType/index.vue")
const logConfig = () => import("../pages/log/logConfig/index.vue")
const logList = () => import("../pages/log/index.vue")
export default [
    {
        path: '/log/logList',
        name: '日志详情',
        component: logList,
        meta: {
            title: '日志详情',
            path: ['日志管理','日志详情'],
            icon: 'dashboard',
            noCache: true,  //是否缓存
            affix: true    //是否固定图钉
        },
    },
    {
        path: '/log/logModule',
        name: '模块分类',
        component: logModule,
        meta: {
            title: '模块分类',
            path: ['日志管理','模块分类'],
            icon: 'dashboard',
            noCache: true,  //是否缓存
            affix: true    //是否固定图钉
        },
    },
    {
        path: '/log/logType',
        name: '类型分类',
        component: logType,
        meta: {
            title: '类型分类',
            path: ['日志管理','类型分类'],
            icon: 'dashboard',
            noCache: true,  //是否缓存
            affix: true    //是否固定图钉
        },
    },
    {
        path: '/log/logOperateType',
        name: '操作分类',
        component: logOperateType,
        meta: {
            title: '操作分类',
            path: ['日志管理','操作分类'],
            icon: 'dashboard',
            noCache: true,  //是否缓存
            affix: true    //是否固定图钉
        },
    },
    {
        path: '/log/logConfig',
        name: '日志配置',
        component: logConfig,
        meta: {
            title: '日志配置',
            path: ['日志管理','日志配置'],
            icon: 'dashboard',
            noCache: true,  //是否缓存
            affix: true    //是否固定图钉
        },
    },
]