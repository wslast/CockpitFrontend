import highScreen from '@/pages/highScreen/index.vue';

// 贷款-旧
// import dk from '@/pages/highScreen/dk/index';
// 贷款
import dk from '@/pages/highScreen/dk/dk';
// 缴存-旧
// import jc from '@/pages/highScreen/jc/index';
// 缴存
import jc from '@/pages/highScreen/jc/jc';

// 首页 - 旧
import sy from '@/pages/highScreen/sy/index';

// 资金流动-旧
// import zjld from '@/pages/highScreen/zjld/index';
// 资金流动
import zjld from '@/pages/highScreen/zjld/zjld';

// 提取-旧
// import tq from '@/pages/highScreen/tq/index';
// 提取
import tq from '@/pages/highScreen/tq/tq';

// 风控-旧
// import fk from '@/pages/highScreen/fk/index';
// 风控
import fk from '@/pages/highScreen/fk/fk';

// 银行画像
import yhhx from '@/pages/highScreen/yhhx/yhhx';

// 数字化成果
import szhcg from '@/pages/highScreen/szhcg/szhcg';

import person from '@/pages/dashboard/person/index.vue';
import organ from '@/pages/dashboard/organ/index.vue';
import map from '@/pages/map/index.vue';
export default [
    {
        path: '/highScreen',
        name: 'highScreen',
        component: highScreen,
        redirect: '/highScreen/sy',
        meta: {
            title: '首页',
            icon: '',
            noCache: true,
            affix: true,
        },
        children: [
            {
                path: '/highScreen/sy',
                name: 'sy',
                component: sy,
                meta: {
                    title: '首页',
                    icon: '',
                    noCache: true,
                    affix: false,
                },
            },
            {
                path: '/highScreen/jc',
                name: 'jc',
                component: jc,
                meta: {
                    title: '缴存',
                    icon: '',
                    noCache: true,
                    affix: false,
                },
            },
            {
                path: '/highScreen/tq',
                name: 'tq',
                component: tq,
                meta: {
                    title: '提取',
                    icon: '',
                    noCache: true,
                    affix: false,
                },
            },
            {
                path: '/highScreen/dk',
                name: 'dk',
                component: dk,
                meta: {
                    title: '贷款',
                    icon: '',
                    noCache: true,
                    affix: false,
                },
            },
            {
                path: '/highScreen/fk',
                name: 'fk',
                component: fk,
                meta: {
                    title: '风控',
                    icon: '',
                    noCache: true,
                    affix: false,
                },
            },
            {
                path: '/highScreen/zjld',
                name: 'zjld',
                component: zjld,
                meta: {
                    title: '资金流动',
                    icon: '',
                    noCache: true,
                    affix: false,
                },
            },
            {
                path: '/highScreen/yhhx',
                name: 'yhhx',
                component: yhhx,
                meta: {
                    title: '银行画像',
                    icon: '',
                    noCache: true,
                    affix: false,
                },
            },
            {
                path: '/highScreen/szhcg',
                name: 'szhcg',
                component: szhcg,
                meta: {
                    title: '数字化成果',
                    icon: '',
                    noCache: true,
                    affix: false,
                },
            },
            {
                path: '/highScreen/portrait/person',
                name: 'person',
                component: person,
            },
            {
                path: '/highScreen/portrait/organ',
                name: 'organ',
                component: organ,
            },
            {
                path: '/highScreen/map',
                name: 'map',
                component: map,
                meta: {
                    title: '网格化服务',
                    icon: '',
                    noCache: true,
                    affix: false,
                },
            },
        ],
    },
];
