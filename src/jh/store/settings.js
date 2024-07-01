/*
 * @Author: Junchi Zhao
 * @LastEditors: zjc2684613 1984937455@qq.com
 * @Description:
 */
import variables from "@/assets/element-variables.scss";
export default {
  state: {
    theme: variables.theme,
    uploadConfig: null,
    fontSize: "small",
    setShow: false,
    keepCache: false,
    headImg: false,
    showHistry: false,
    sidebarLogo: true,
    menuType: "0"
  },
  mutations: {
    setMenuType(state, menuType) {
      state.menuType = menuType;
    },
    setUploadConfig(state, v) {
      state.uploadConfig = v;
    },
    refreshHeadImg(state, v) {
      state.headImg = v;
    },
    setKeepCache(state, v) {
      state.keepCache = v;
    },
    theme(state, v) {
      state.theme = v;
    },
    setShow(state, v) {
      state.setShow = v;
    },
    showHistry(state, v) {
      state.showHistry = v;
    },
    sidebarLogo(state, v) {
      state.sidebarLogo = v;
    },
    setFontSize(state, v) {
      state.fontSize = v;
    },
    setSetting(state, v) {
      if (!v) return;
      state.theme = v.mainColor ? v.mainColor : variables.theme;
      state.fontSize = v.fontSize ? v.fontSize : "small";
      state.showHistry = v.enableTag === "true";
      state.sidebarLogo = v.enableLogo === "true";
      state.keepCache = v.enableCache === "true";
      state.menuType = v.menuType || "0";
    },
    resetSetting(state, v) {
      state.theme = variables.theme;
      state.setShow = false;
      state.fontSize = "small";
      state.keepCache = false;
      state.headImg = false;
      state.showHistry = false;
      state.sidebarLogo = true;
      state.menuType = "0";
      Vue.prototype.$ELEMENT.size = state.fontSize;
      switch (state.fontSize) {
        case "mini":
          document.documentElement.style.setProperty(`--title-size`, "14px");
          document.documentElement.style.setProperty(`--subtitle-size`, "12px");
          document.documentElement.style.setProperty(`--text-size`, "12px");
          break;
        case "small":
          document.documentElement.style.setProperty(`--title-size`, "16px");
          document.documentElement.style.setProperty(`--subtitle-size`, "14px");
          document.documentElement.style.setProperty(`--text-size`, "14px");
          break;
        case "medium":
          document.documentElement.style.setProperty(`--title-size`, "18px");
          document.documentElement.style.setProperty(`--subtitle-size`, "16px");
          document.documentElement.style.setProperty(`--text-size`, "16px");
          break;
        default:
          break;
      }
    }
  }
};
