<!--
 * @Author: Junchi Zhao
 * @LastEditors: zjc2684613 1984937455@qq.com
 * @Description: 
-->
<template>
  <div class="drawer-container">
    <div>
      <div class="drawer-item">
        <span>主题颜色</span>
        <theme-picker
          ref="themePicker"
          style="float: right;height: 26px;margin: -3px 8px 0 0;"
          @change="themeChange"
        />
      </div>
      <div class="drawer-item">
        <span>字体尺寸</span>
        <el-select
          v-model="fontSize"
          @change="fontSizeSetting"
          size="mini"
          style="width:70px;"
        >
          <el-option label="小" value="mini">小</el-option>
          <el-option label="中" value="small">中</el-option>
          <el-option label="大" value="medium">大</el-option>
        </el-select>
      </div>
      <div class="drawer-item">
        <span>历史导航栏</span>
        <el-switch
          v-model="showHistry"
          @change="historyChange"
          class="drawer-switch"
        />
      </div>

      <!-- <div class="drawer-item">
        <span>Fixed Header</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>-->

      <div class="drawer-item">
        <span>导航栏Logo</span>
        <el-switch
          v-model="sidebarLogo"
          @change="logoChange"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>开启缓存</span>
        <el-switch
          v-model="keepCache"
          @change="cacheChange"
          class="drawer-switch"
        />
      </div>
      <div class="drawer-item">
        <span>侧边菜单</span>
        <el-select
          style="width: 120px;"
          v-model="menuType"
          @change="menuTypeChange"
        >
          <el-option label="树形菜单" value="0"></el-option>
          <el-option label="平铺型菜单" value="1"></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
import ThemePicker from "./ThemePicker/index";

export default {
  components: { ThemePicker },
  data() {
    return {};
  },
  computed: {
    showHistry: {
      get: function() {
        return this.$store.state.settings.showHistry;
      },
      set: function(nv) {
        this.$store.commit("showHistry", nv);
      }
    },
    sidebarLogo: {
      get() {
        return this.$store.state.settings.sidebarLogo;
      },
      set(val) {
        this.$store.commit("sidebarLogo", val);
      }
    },
    keepCache: {
      get() {
        return this.$store.state.settings.keepCache;
      },
      set(val) {
        this.$store.commit("setKeepCache", val);
      }
    },
    fontSize: {
      get() {
        return this.$store.state.settings.fontSize;
      },
      set(val) {
        this.$store.commit("setFontSize", val);
      }
    },
    menuType: {
      get() {
        return this.$store.state.settings.menuType;
      },
      set(val) {
        this.$store.commit("setMenuType", val);
      }
    }
  },
  methods: {
    fontSizeSetting(val) {
      this.$ELEMENT.size = val;
      switch (val) {
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
      this.saveSetting({ fontSize: val });
    },
    themeChange(val) {
      this.$store.commit("theme", val);
    },
    historyChange(val) {
      this.saveSetting({ enableTag: val });
    },
    logoChange(val) {
      this.saveSetting({ enableLogo: val });
    },
    cacheChange(val) {
      this.saveSetting({ enableCache: val });
    },
    menuTypeChange(val) {
      this.saveSetting({ menuType: val });
    },
    saveSetting(v) {
      let params = {
        mainColor: v.mainColor ? v.mainColor : this.$store.state.settings.theme,
        fontSize: v.fontSize ? v.fontSize : this.fontSize,
        enableTag: v.enableTag ? v.enableTag : this.showHistry,
        enableLogo: v.enableLogo ? v.enableLogo : this.sidebarLogo,
        enableCache: v.enableCache ? v.enableCache : this.keepCache,
        menuType: v.menuType ? v.menuType : this.menuType
      };
      this.$api
        .formPost("/api/auth/sysuserprofile/doSetUserIndiviality", params)
        .then(res => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .drawer-item:first-child {
    line-height: 100%;
  }
  .drawer-switch {
    float: right;
  }
}
</style>
