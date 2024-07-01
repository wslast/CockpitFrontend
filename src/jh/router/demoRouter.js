const demo = () => import("@/jh/pages/demo");
const demo2 = () => import("@/jh/pages/demo/index2.vue");
const simpleTable = () => import("@/jh/pages/demo/simpleTable/index");
const batchDeleteTable = () => import("@/jh/pages/demo/batchDeleteTable/index");
const dynamicColTable = () => import("@/jh/pages/demo/dynamicColTable/index");
const threeTypesDialog = () => import("@/jh/pages/demo/threeTypesDialog/index");
const filePreview = () => import("@/jh/pages/demo/filePreview/index");
const getSystemValue = () => import("@/jh/pages/demo/getSystemValue/index");
const syncInterface = () => import("@/jh/pages/demo/syncInterface/index");
const coreCpt = () => import("@/jh/pages/demo/coreCpt/index");
const changeData = () => import("@/jh/pages/jhAuth/changedata/index.vue");
const organ = () => import("@/jh/pages/jhAuth/organ/index.vue");
const user = () => import("@/jh/pages/jhAuth/user/index.vue");
const organUser = () => import("@/jh/pages/jhAuth/organUser/index.vue");
export default [
  //jh-auth权限模块的用户管理 个人中心及机构机构
  // {
  //   path: "/user/mod-user",
  //   name: "changeData",
  //   component: changeData,
  //   meta: {
  //     title: "修改资料(本地)",
  //     path: ["用户中心", "修改资料(本地)"],
  //     noCache: true,
  //     affix: true
  //   }
  // },
  // {
  //   path: "/auth/organ",
  //   name: "organ",
  //   component: organ,
  //   meta: {
  //     title: "组织结构(本地)",
  //     path: ["用户权限", "组织结构(本地)"],
  //     noCache: true,
  //     affix: true
  //   }
  // },
  // {
  //   path: "/auth/user",
  //   name: "user",
  //   component: user,
  //   meta: {
  //     title: "用户管理(本地)",
  //     path: ["用户权限", "用户管理(本地)"],
  //     noCache: true,
  //     affix: true
  //   }
  // },
  // {
  //   path: "/auth/organUser",
  //   name: "organUser",
  //   meta: {
  //     title: "机构用户管理(本地)",
  //     path: ["用户权限", "机构用户管理(本地)"],
  //     icon: "dashboard",
  //     noCache: true,
  //     affix: true
  //   },
  //   component: organUser
  // },
  {
    path: "/demo2",
    name: "demo2",
    component: demo2,
    meta: {
      title: "demo2",
      noCache: true,
      affix: true
    }
  },
  {
    path: "/demo",
    name: "demo",
    component: demo,
    meta: {
      title: "demo",
      noCache: true,
      affix: true
    }
  },
  {
    path: "/demo/simpleTable",
    name: "simpleTable",
    component: simpleTable,
    meta: {
      title: "simpleTable",
      noCache: true,
      affix: true
    }
  },
  {
    path: "/demo/batchDeleteTable",
    name: "batchDeleteTable",
    component: batchDeleteTable,
    meta: {
      title: "batchDeleteTable",
      noCache: true,
      affix: true
    }
  },
  {
    path: "/demo/dynamicColTable",
    name: "dynamicColTable",
    component: dynamicColTable,
    meta: {
      title: "dynamicColTable",
      noCache: true,
      affix: true
    }
  },
  {
    path: "/demo/threeTypesDialog",
    name: "threeTypesDialog",
    component: threeTypesDialog,
    meta: {
      title: "threeTypesDialog",
      noCache: true,
      affix: true
    }
  },
  {
    path: "/demo/filePreview",
    name: "filePreview",
    component: filePreview,
    meta: {
      title: "filePreview",
      noCache: true,
      affix: true
    }
  },
  {
    path: "/demo/getSystemValue",
    name: "getSystemValue",
    component: getSystemValue,
    meta: {
      title: "getSystemValue",
      noCache: true,
      affix: true
    }
  },
  {
    path: "/demo/syncInterface",
    name: "syncInterface",
    component: syncInterface,
    meta: {
      title: "syncInterface",
      noCache: true,
      affix: true
    }
  },
  {
    path: "/demo/coreCpt",
    name: "coreCpt",
    component: coreCpt,
    meta: {
      title: "coreCpt",
      noCache: true,
      affix: true
    }
  }
];
