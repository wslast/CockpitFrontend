/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 
 */
//桌面组件配置
const deskSetting = () => import("../pages/desk/index.vue")
//桌面组件管理
const deskComp = () => import("../pages/desk/deskComp.vue")
//桌面角色管理
const deskRole = () => import("../pages/desk/deskRole.vue")
//桌面角色权限
const deskRoleComp = () => import("../pages/desk/deskRoleComp.vue")
// 行业管理
const industry = () => import("../pages/sysfun/industry/industry.vue")
//系统参数设置
const systemParSetType = () => import("../pages/sysfun/dict/systemParSetType.vue")
//区域管理
const area = () => import("../pages/sysfun/area/index.vue")
//日期管理
const SysCalendar = () => import("../pages/sysfun/calendar/sysCalendar.vue")
//编码类型管理
const codeTypeList = () => import("../pages/sysfun/codeType/index.vue")
//json编码管理
const jsonCodeList = () => import("../pages/sysfun/jsonCodeList/index.vue")
//序列格式管理
const seqConfig = () => import("../pages/sysfun/seq/config/index.vue")
//序列值
const seqnum = () => import("../pages/sysfun/seq/seqnum/index.vue")
export default [
    {
        path: '/sysfun/desk/deskComp', name: 'deskComp', meta: {
            title: '桌面组件管理',
            icon: 'dashboard',
            path: ['系统设置','桌面管理','桌面组件'],
            noCache: true,  //是否缓存
            affix: true    //是否固定图钉
        },
        component: deskComp
    },
    {
        path: '/sysfun/desk/deskRole', name: 'deskRole', meta: {
            title: '桌面角色管理',
            path: ['系统设置','桌面管理','桌面角色'],
            icon: 'dashboard',
            noCache: true,  //是否缓存
            affix: true    //是否固定图钉
        },
        component: deskRole
    },
    {
        path: '/sysfun/desk/deskRoleComp', name: 'deskRoleComp', meta: {
            title: '桌面角色权限',
            path: ['系统设置','桌面管理','桌面角色权限'],
            icon: 'dashboard',
            noCache: true,  //是否缓存
            affix: true    //是否固定图钉
        },
        component: deskRoleComp
    },
    {
        path: '/sysfun/desk/layout', meta: {
            title: '首页设置',
            path: ['用户中心','首页设置'],
            icon: 'dashboard',
            noCache: true,
            affix: true
        }, component: deskSetting
    },
    {
      path: '/sysfun/calendar', meta: {
        title: '日历管理',
        path: ['系统设置','日历管理'],
        icon: 'dashboard',
        noCache: true,
        affix: true
      }, component: SysCalendar
    },//系统日历设置
    {
        path: '/sysfun/systemParSetType', name: 'systemParSetType', meta: {
          title: '编码管理',
          path: ['系统设置','编码管理'],
          icon: 'dashboard',
          noCache: true,  //是否缓存
          affix: true    //是否固定图钉
        }, component: systemParSetType
    },
    {
        path: '/sysfun/codeTypeList', name: 'codeTypeList', meta: {
          title: '编码类型管理',
          path: ['系统设置','编码类型管理'],
          icon: 'dashboard',
          noCache: true,  //是否缓存
          affix: true    //是否固定图钉
        }, component: codeTypeList
    },
    {
        path: '/sysfun/area',
        name: 'area',
        meta: {
          title: '区域管理',
          path: ['系统设置','区域管理'],
          icon: 'dashboard',
          noCache: true, //是否缓存
          affix: true //是否固定图钉
        },
        component: area
    },

    {
      path: '/sysfun/industry',
      name: 'industry',
      meta: {
        title: '行业管理',
        path: ['系统设置','行业管理'],
        icon: 'dashboard',
        noCache: true, //是否缓存
        affix: true //是否固定图钉
      },
      component: industry
    },

    {
      path: '/sysfun/jsonCodeList',
      name: 'jsonCodeList',
      meta: {
        title: '编码管理(JSON)',
        path: ['系统设置','编码管理(JSON)'],
        icon: 'dashboard',
        noCache: true, //是否缓存
        affix: true //是否固定图钉
      },
      component: jsonCodeList
    },
    {
      path: '/core/seq/config',
      name: 'seqConfig',
      meta: {
        title: '格式配置',
        path: ['系统设置','序列管理','格式配置'],
        icon: 'dashboard',
        noCache: true, //是否缓存
        affix: true //是否固定图钉
      },
      component: seqConfig
    },
    {
      path: '/core/seq/seqnum',
      name: 'seqnum',
      meta: {
        title: '序列值',
        path: ['系统设置','序列管理','序列值'],
        icon: 'dashboard',
        noCache: true, //是否缓存
        affix: true //是否固定图钉
      },
      component: seqnum
    },
    
]