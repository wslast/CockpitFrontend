<!-- 获取系统变量 -->
<template>
  <div>
    <div class="f24 m20">F12控制台也有打印</div>
    <el-card class="m20">
      <div slot="header">
        <span>用户信息:</span>
      </div>
      <div>{{ JSON.stringify(userInfo) }}</div>
    </el-card>
    <el-card class="m20">
      <div slot="header">
        <span>token:</span>
      </div>
      <div>{{ token }}</div>
    </el-card>
    <el-card class="m20">
      <div slot="header">
        <span>侧边栏状态:</span>
      </div>
      <div>{{ JSON.stringify(init) }}</div>
    </el-card>
    <el-card class="m20">
      <div slot="header">
        <span>布局设置及图片压缩设置:</span>
      </div>
      <div>{{ JSON.stringify(settings) }}</div>
    </el-card>
    <el-card class="m20">
      <div slot="header">
        <span>页签:</span>
      </div>
      <div>{{ JSON.stringify(tagsView) }}</div>
    </el-card>
    <el-card class="m20">
      <div slot="header">
        <span>面包屑:</span>
      </div>
      <div>{{ JSON.stringify(routeView) }}</div>
    </el-card>
    <el-card class="m20">
      <div slot="header">
        <span>全局变量:</span>
      </div>
      <div>{{ JSON.stringify(getGlobalConfig()) }}</div>
    </el-card>
    <el-card class="m20">
      <div slot="header">
        <span>全局css变量:</span>
      </div>
      <div style="background:var(--theme-color);color:#fff;font-size:24px;">
        主题颜色:background:var(--theme-color)
      </div>
      <div style="font-size:var(--title-size)">
        标题字体: font-size:var(--title-size)
      </div>
      <div style="font-size:var(--subtitle-size)">
        副标题字体: font-size:var(--subtitle-size)
      </div>
      <div style="font-size:var(--text-size)">
        页面文本字体: font-size:var(--text-size)
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "getSystemValue",
  components: {},

  data() {
    return {
      //用户信息
      userInfo: JSON.parse(window.sessionStorage.user),
      //token
      token: window.sessionStorage.token
    };
  },
  //单独引用
  //   computed: {
  //     isCollapse: function() {
  //       return this.$store.state.init.isCollapse;
  //     }
  //   },
  //多个引用
  computed: {
    ...mapState({
      tagsView: state => state.tagsView, //页签
      routeView: state => state.routeView, //面包屑
      init: state => state.init, // 侧边栏状态
      settings: state => state.settings //布局设置
    })
  },
  mounted() {
    console.log("用户信息:", this.userInfo);
    console.log("token:", this.token);
    console.log("侧边栏状态:", this.init);
    console.log("布局设置:", this.settings);
    console.log("页签:", this.tagsView);
    console.log("面包屑:", this.routeView);
    console.log("全局变量:", this.getGlobalConfig());
  }
};
</script>
<style lang="scss" scoped>
.m20 {
  margin: 20px;
}
</style>
