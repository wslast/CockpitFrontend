<template>
  <div class>
    <el-container style="overflow:hidden;">
      <right-panel v-show="showSettings">
        <settings />
      </right-panel>
      <el-container>
        <el-aside
          class="silder"
          :style="{
            background: '#2F4155',
            width: !isCollapse ? '200px' : '64px'
          }"
        >
          <div class="df aic jca">
            <img
              class="userImg user"
              src="@/assets/images/user.png"
              v-if="!isCollapse && !imageUrl && showUser"
              alt=""
            />
            <img
              class="userImg upload user"
              :src="imageUrl"
              v-if="!isCollapse && imageUrl && showUser"
              alt=""
            />
            <div class="item poi user" v-if="!isCollapse && showUser">
              <el-dropdown
                trigger="click"
                @command="handleCommand"
                style="color:#fff;"
              >
                <span class="el-dropdown-link">
                  {{ user }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="infoCenter" icon="el-icon-user"
                    >个人中心</el-dropdown-item
                  >
                  <el-dropdown-item command="homeSetting" icon="el-icon-house"
                    >首页设置</el-dropdown-item
                  >
                  <el-dropdown-item
                    command="layoutSetting"
                    icon="el-icon-s-grid"
                    >布局设置</el-dropdown-item
                  >
                  <el-dropdown-item
                    command="loginOut"
                    icon="el-icon-switch-button"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <!-- 收缩 -->
            <div class="collapse" @click="isCollapse = !isCollapse">
              <i class="el-icon-s-unfold" v-show="isCollapse"></i>
              <i class="el-icon-s-fold" v-show="!isCollapse"></i>
            </div>
          </div>
          <treeSlider v-if="menuType === '0'"></treeSlider>
          <flatSlider v-if="menuType === '1'"></flatSlider>
        </el-aside>
        <el-main v-warterMark="{ text: projectName }" class="rel">
          <el-header class="head" height="60px" width="100%">
            <div class="logo" v-show="sidebarLogo">
              <router-link class="sidebar-logo-link" to="/">
                <h2 class="sidebar-logo">
                  {{ projectName }}
                </h2>
              </router-link>
            </div>
            <bread style="margin-right:100px;" />
            <shortcuts class="w14" />
            <!-- 搜索 -->
            <HeaderSearch />
            <!-- 全屏 -->
            <screen class="ml20 mr20" />
            <div class="refresh" @click="refreshView"></div>
            <!-- 消息 -->
            <message v-if="isOpenWs" />
          </el-header>
          <div class="histry card" v-show="showHistry">
            <div class="histryBox" ref="tags">
              <tags-view @refresh="refreshView" />
            </div>
          </div>
          <div :class="{ main: showHistry, mainHis: !showHistry }">
            <transition name="fade-transform" mode="out-in">
              <router-view
                v-if="showView && !keepCache"
                :key="$route.fullPath"
              />
            </transition>
            <transition name="fade-transform" mode="out-in">
              <keep-alive>
                <router-view
                  v-if="showView && keepCache"
                  :key="$route.fullPath"
                />
              </keep-alive>
            </transition>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <themeDefault
      ref="themePicker"
      style="width:1px;height:1px;overflow:hidden;position:absolute;top:-100px;"
    ></themeDefault>
  </div>
</template>
<script>
import { projectName } from "@/config";
import treeSlider from "./components/silder/treeSlider/slider.vue";
import flatSlider from "./components/silder/flatSlider/slider.vue";
import TagsView from "./components/TagsView/index";
import RightPanel from "./components/settings/RightPanel";
import Settings from "./components/settings/index";
import bread from "./components/bread/index";
import screen from "./components/screen/index";
import HeaderSearch from "./components/HeaderSearch/index";
import themeDefault from "./components/settings/ThemePicker/default.vue";
import shortcuts from "./components/shortCutMenu/index.vue";
export default {
  components: {
    flatSlider,
    treeSlider,
    TagsView,
    RightPanel,
    HeaderSearch,
    Settings,
    themeDefault,
    bread,
    screen,
    shortcuts
  },
  inject: ["reload"],
  data() {
    return {
      showView: true,
      showSettings: true,
      userId: "",
      projectName: projectName,
      count: 0,
      showUser: true,
      imageUrl: "" //用户头像
    };
  },
  async created() {
    await this.getUserSetting();
    await this.getUserCompressSetting();
  },
  mounted() {
    this.showUser = !this.isCollapse;
    this.getImg();
  },
  computed: {
    isCollapse: {
      get: function() {
        return this.$store.state.init.isCollapse;
      },
      set: function(nv) {
        this.$store.commit("isCollapse", nv);
      }
    },
    keepCache: {
      get: function() {
        return this.$store.state.settings.keepCache;
      }
    },
    setShow: {
      get: function() {
        return this.$store.state.settings.setShow;
      },
      set: function(nv) {
        this.$store.commit("setShow", nv);
      }
    },
    sidebarLogo: {
      get() {
        return this.$store.state.settings.sidebarLogo;
      }
    },
    showHistry: {
      get: function() {
        return this.$store.state.settings.showHistry;
      },
      set: function(nv) {
        this.$store.commit("showHistry", nv);
      }
    },
    menuType: {
      get: function() {
        return this.$store.state.settings.menuType;
      },
      set: function(nv) {
        this.$store.commit("setMenuType", nv);
      }
    },
    routers: function() {
      return this.$store.state.tagsView.visitedPath[
        this.$store.state.tagsView.visitedPath.length - 1
      ].meta.title;
    },
    user: function() {
      let userData = JSON.parse(sessionStorage.getItem("user"));
      return userData.realName;
    }
  },
  watch: {
    "$store.state.tagsView.visitedPath": function(v) {
      this.$nextTick(() => {
        this.$refs.tags.scrollLeft = this.$refs.tags.childNodes[0].scrollWidth;
      });
    },
    "$store.state.settings.headImg": function(v) {
      this.getImg();
    },
    showHistry: function(v) {
      this.$nextTick(() => {
        if (v) {
          let main = document.getElementsByClassName("main")[0];
          let bt = document.body.offsetHeight;
          main.style.height = bt - 122 + "px";
        } else {
          let main = document.getElementsByClassName("mainHis")[0];
          let bt = document.body.offsetHeight;
          main.style.height = bt - 80 + "px";
        }
      });
    },
    isCollapse: function(v) {
      this.showUser = false;
      setTimeout(() => {
        this.showUser = true;
      }, 300);
    },
    $route(to, from) {
      if (to.path.split("?")[0] === from.path.split("?")[0]) {
        this.refreshView();
      }
    }
  },
  methods: {
    //获取用户默认配置
    async getUserSetting() {
      return new Promise((resolve, reject) => {
        this.$api
          .formPost("/api/auth/sysuserprofile/doGetUserIndiviality", {})
          .then(res => {
            if (res.retHead.code === "0000000") {
              this.$store.commit("setSetting", res.retBody);
            } else {
              this.$store.commit("setSetting", null);
            }
            resolve();
          });
      });
    },
    async getUserCompressSetting() {
      return new Promise((resolve, reject) => {
        this.$api
          .formPost(
            this.getGlobalConfig().previewURL +
              "/api/file/upconfig/getImgConfig",
            {}
          )
          .then(res => {
            if (res.retHead.code === "0000000") {
              this.$store.commit("setUploadConfig", res.retBody);
            } else {
              this.$store.commit("setUploadConfig", null);
            }
            resolve();
          })
          .catch(err => {
            resolve();
          });
      });
    },

    getImg() {
      this.$api
        .formPost("/api/auth/sysuserprofile/doGetUserProfile", {})
        .then(res => {
          this.imageUrl = res && res.retBody ? res.retBody : "";
        });
    },
    refreshView() {
      this.showView = false; // 通过v-if移除router-view节点
      this.$nextTick(() => {
        this.showView = true; // DOM更新后再通过v-if添加router-view节点
      });
    },
    getCount(v) {
      this.count = v;
    },
    handleCommand(command) {
      if (command == "loginOut") {
        this.loginOut();
      } else if (command == "infoCenter") {
        this.$router.push("/user/mod-user");
      } else if (command == "homeSetting") {
        this.$router.push("/sysfun/desk/layout");
      } else if (command == "layoutSetting") {
        this.setShow = true;
      }
    },
    loginOut() {
      sessionStorage.removeItem("token");
      this.$store.commit("visitedPathReset");
      this.$store.commit("isCollapse", false);
      sessionStorage.removeItem("user");
      this.showView = false;
      this.$store.commit("resetSetting");
      window.sessionStorage.ticket && sso && sso.logout();
      // //删除当前主题色
      document.querySelector("#chalk-style") &&
        document.querySelector("#chalk-style").remove();
      this.$nextTick(() => {
        this.$router.push("/login");
      });
      // clearCookie();
      // window.location.href = ssoUrl + "/sso/logout?redirecturl=" + encodeURIComponent(window.location.href);
    }
  }
};
</script>
<style lang="scss" scoped>
.logo {
  height: 100%;
  .sidebar-logo {
    height: 100%;
    white-space: nowrap;
    padding: 0 20px;
    margin: 0;
    color: #304156;
  }
}

.head {
  display: flex;
  align-items: center;
  background-color: #fff;
  line-height: 60px;
}
.silder {
  height: 100vh;
  background-color: #2f4155;
  transition: width 0.3s;
}
.collapse {
  min-width: 30px;
  text-align: center;
  cursor: pointer;
  color: #999999;
  font-size: 30px;
  line-height: 60px;
}
.histry {
  padding: 4px 10px;
  display: flex;
}
.histryBox {
  height: 34px;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
}
.histryBox::-webkit-scrollbar {
  width: 0;
  height: 0px;
}
.main {
  margin: 0 10px;
  margin-top: 10px;
  height: calc(100vh - 124px);
  background-color: #fff;
  overflow: auto;
  position: relative;
  font-size: var(--text-size);
  background: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.mainHis {
  margin: 0 10px;
  margin-top: 10px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  height: calc(100vh - 80px);
  background-color: #fff;
  overflow: auto;
  position: relative;
  font-size: var(--text-size);
  background: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.userImg {
  height: 40px;
  width: 40px;
}
.upload {
  border-radius: 100%;
}
.rel {
  background: #fff;
}
</style>
