/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 
 */

const fdcfg = () => import("@/pages/ruleCfg/fdcfg.vue")
const fdScriptCfg = () => import("@/pages/ruleCfg/fdScriptCfg.vue")
const fdScriptRule = () => import("@/pages/ruleCfg/fdScriptRule.vue")
const fdField = () => import("@/pages/ruleCfg/fdField.vue")
const fdScriptParam = () => import("@/pages/ruleCfg/fdScriptParam.vue")
// const generalQueryCfg = () => import("@/pages/major/gen/generalQueryCfg.vue")



export default [
  {
    path: '/fd/fdcfg', name: 'fdcfg', meta: {
      title: '脚本配置管理',
      icon: 'dashboard',
      noCache: true,  //是否缓存
      affix: true    //是否固定图钉
    }, component: fdcfg
  },
  
  {
    path: '/fd/fdScriptCfg', name: 'fdScriptCfg', 
    // meta: {
    //   title: '脚本配置',
    //   icon: 'dashboard',
    //   noCache: true,  //是否缓存
    //   affix: true    //是否固定图钉
    // }, 
    component: fdScriptCfg
  },
  {
    path: '/fd/fdScriptRule', name: 'fdScriptRule', meta: {
      title: '规则配置',
      icon: 'dashboard',
      noCache: true,  //是否缓存
      affix: true    //是否固定图钉
    }, component: fdScriptRule
  },
  {
    path: '/fd/fdField', name: 'fdField', meta: {
      title: '脚本列配置',
      icon: 'dashboard',
      noCache: true,  //是否缓存
      affix: true    //是否固定图钉
    }, component: fdField
  },
  {
    path: '/fd/fdScriptParam', name: 'fdScriptParam', meta: {
      title: '参数配置',
      icon: 'dashboard',
      noCache: true,  //是否缓存
      affix: true    //是否固定图钉
    }, component: fdScriptParam
  },
  // {
  //   path: '/gen/generalQuery', name: 'generalQueryCfg', meta: {
  //     title: '参数配置',
  //     icon: 'dashboard',
  //     noCache: true,  //是否缓存
  //     affix: true    //是否固定图钉
  //   }, component: generalQueryCfg
  // },

 
  
]
