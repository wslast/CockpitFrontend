
const messType = () => import("../pages/mess/type.vue")
const messSend = () => import("../pages/mess/send.vue")
const messReceive = () => import("../pages/mess/receive.vue")
const messSelf = () => import("../pages/mess/receive.vue")
const messJobRecord = () => import("../pages/mess/jobRecord.vue")
const tmplPm = () => import("../pages/mess/tmpl/tmplPm.vue")
const tmplWx = () => import("../pages/mess/tmpl/tmplWx.vue")
const tmplApp = () => import("../pages/mess/tmpl/tmplApp.vue")
const tmplSms = () => import("../pages/mess/tmpl/tmplSms.vue")
const messRule = () => import("../pages/mess/messRules.vue")
const messMessage = () => import("../pages/mess/messMessage.vue")
const messMould = () => import("../pages/mess/messMould.vue")
const channelAccount = () => import("../pages/mess/channelAccount.vue")
const messBizTask = () => import("../pages/mess/messBizTask.vue")

const hangMessage = () => import("../pages/mess/message/hangMessage.vue")
const pmMessage = () => import("../pages/mess/message/pmMessage.vue")
const wxMessage = () => import("../pages/mess/message/wxMessage.vue")
const smsMessage = () => import("../pages/mess/message/smsMessage.vue")
const appMessage = () => import("../pages/mess/message/appMessage.vue")

export default [
    {
        path: '/mess/message/hangMessage', name: 'hangMessage', meta: {
            title: '挂起消息',
            path: ['挂起消息'],
            icon: 'dashboard',
            noCache: true,
            affix: true
        }, component: hangMessage
    },
    {
        path: '/mess/message/pmMessage', name: 'pmMessage', meta: {
            title: '站内消息',
            path: ['消息管理','消息查询','站内消息'],
            icon: 'dashboard',
            noCache: true,
            affix: true
        }, component: pmMessage
    },
    {
        path: '/mess/message/wxMessage', name: 'wxMessage', meta: {
            title: '微信消息',
            path: ['消息管理','消息查询','微信消息'],
            icon: 'dashboard',
            noCache: true,
            affix: true
        }, component: wxMessage
    },
    {
        path: '/mess/message/smsMessage', name: 'smsMessage', meta: {
            title: '手机短信',
            path: ['消息管理','消息查询','手机短信'],
            icon: 'dashboard',
            noCache: true,
            affix: true
        }, component: smsMessage
    },
    {
        path: '/mess/message/appMessage', name: 'appMessage', meta: {
            title: 'APP消息',
            path: ['消息管理','消息查询','APP消息'],
            icon: 'dashboard',
            noCache: true,
            affix: true
        }, component: appMessage
    },
    {
        path: '/mess/messBizTask', name: 'messBizTask', meta: {
            title: '调度管理',
            path: ['消息管理','调度管理'],
            icon: 'dashboard',
            noCache: true,
            affix: true
        }, component: messBizTask
    },
    {
        path: '/mess/channelAccount', name: 'channelAccount', meta: {
            title: '渠道管理',
            path: ['消息管理','渠道管理'],
            icon: 'dashboard',
            noCache: true,
            affix: true
        }, component: channelAccount
    },
    {
        path: '/mess/messMould', name: 'messMould', meta: {
            title: '消息模型',
            path: ['消息管理','消息模型'],
            icon: 'dashboard',
            noCache: true,
            affix: true
        }, component: messMould
    },
    {
        path: '/mess/messMessage', name: 'messMessage', meta: {
            title: '我的消息',
            path: ['用户中心','我的消息'],
            icon: 'dashboard',
            noCache: true,
            affix: true
        }, component: messMessage
    },
    {
        path: '/mess/messRule', name: 'messRule', meta: {
            title: '消息策略',
            path: ['消息管理','消息策略'],
            icon: 'dashboard',
            noCache: true,
            affix: true
        }, component: messRule
    },
    {
        path: '/mess/tmpl/tmplWx', name: 'tmplWx', meta: {
            title: '微信模板',
            path: ['消息管理','消息模版','微信模板'],
            icon: 'dashboard',
            noCache: true,
            affix: true
        }, component: tmplWx
    },
    {
        path: '/mess/tmpl/tmplApp', name: 'tmplApp', meta: {
            title: 'APP模板',
            path: ['消息管理','消息模版','APP模板'],
            icon: 'dashboard',
            noCache: true,
            affix: true
        }, component: tmplApp
    },
    {
        path: '/mess/tmpl/tmplSms', name: 'tmplSms', meta: {
            title: '短信模板',
            path: ['消息管理','消息模版','短信模板'],
            icon: 'dashboard',
            noCache: true,
            affix: true
        }, component: tmplSms
    },
    {
        path: '/mess/tmpl/tmplPm', name: 'tmplPm', meta: {
            title: '站内模板',
            path: ['消息管理','消息模版','站内模板'],
            icon: 'dashboard',
            noCache: true,
            affix: true
        }, component: tmplPm
    },
    {
        path: '/mess/jobRecord', name: 'messJobRecord', meta: {
            title: '执行记录',
            path: '执行记录',
            icon: 'dashboard',
            noCache: true,
            affix: true
        }, component: messJobRecord
    },
    {
        path: '/mess/type', name: 'messType', meta: {
            title: '消息类型设置',
            path: '消息类型设置',
            icon: 'dashboard',
            noCache: true,
            affix: true
        }, component: messType
    },
    // {
    //     path: '/mess/send', name: 'messSend', meta: {
    //         title: '消息发送',
    //         icon: 'dashboard',
    //         noCache: true,
    //         affix: true
    //     }, component: messSend
    // },
    // {
    //     path: '/mess/receive', name: 'messReceive', meta: {
    //         title: '消息接收',
    //         icon: 'dashboard',
    //         noCache: true,
    //         affix: true
    //     }, component: messReceive
    // },
    // {
    //     path: '/mess/self', name: 'messSelf', 
    //     meta: {
    //         title: '我的消息',
    //         icon: 'dashboard',
    //         noCache: true,
    //         affix: true
    //     }, component: messSelf
    // },
    
]