/*
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description:
 */
export default {
  state: {
    visitedPath: [
      {
        path: "/home",
        meta: {
          title: "首页",
          icon: "dashboard",
          noCache: true,
          affix: true,
          all: true
        },
        name: "首页",
        fullPath: "/home"
      }
    ],
    currentPath: ""
  },
  mutations: {
    setCurrentPath(state, v) {
      state.currentPath = v;
    },
    visitedPathAdd(state, v) {
      return (state.visitedPath = v);
    },
    visitedPathReset(state, v) {
      return (state.visitedPath = [
        {
          path: "/home",
          fullPath: "/home",
          meta: {
            title: "首页",
            icon: "dashboard",
            noCache: true,
            affix: true,
            all: true
          },
          name: "首页"
        }
      ]);
    },
    visitedRightSetR(state, v) {
      return state.visitedPath.splice(v, 999999999);
    },
    visitedRightSetL(state, v) {
      return state.visitedPath.splice(1, v);
    },
    visitedPathDelete(state, v) {
      state.visitedPath = state.visitedPath.filter(item => item.fullPath != v);
    }
  }
};
