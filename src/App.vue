<!--
 * @Author: Junchi Zhao
 * @LastEditors: zjc2684613 1984937455@qq.com
 * @Description: 
-->
<template>
  <div id="app">
    <router-view v-if="refreshView" />
  </div>
</template>

<script>
import { projectName } from "@/config";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      projectName: projectName,
      refreshView: true
    };
  },
  computed: {
    fontSize() {
      return this.$store.state.settings.fontSize;
    }
  },
  watch: {
    fontSize: function(newV, oldV) {
      if (newV != oldV) {
        this.reload();
      }
    }
  },
  mounted() {
    document.title = this.projectName;
    const submitBtn = ["提交", "保存", "提 交", "保 存", "确定", "确 定"];
    document.getElementById("app").addEventListener(
      "click",
      event => {
        if (
          submitBtn.indexOf(event.target.innerHTML) > -1 ||
          (event.target &&
            event.target.className &&
            this.isString(event.target.className) &&
            event.target.className.indexOf("el-button") > -1)
        ) {
          if (event.target.style.pointerEvents !== "none") {
            event.target.style.pointerEvents = "none";
            setTimeout(() => {
              event.target.style.pointerEvents = "";
            }, 1000);
          }
        }
      },
      false
    );
  },
  methods: {
    reload() {
      this.refreshView = false;
      this.$nextTick(() => {
        this.refreshView = true;
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  /* text-align: center; */
  color: #2c3e50;
  background-color: #f1f1f1;
}
#nprogress .spinner {
  display: none !important;
}
.ep-tool-restore .el-form-item {
  padding: 0px 10px;
  margin-bottom: 5px !important;
}
.ep-form-tool-box .is-error {
  margin-bottom: 25px !important;
}
.el-form-item__error {
  top: 106%;
}
</style>
