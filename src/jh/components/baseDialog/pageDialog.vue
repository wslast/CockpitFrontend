<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description:  页面内部弹窗  父页面需相对定位
-->
<template>
  <div class="mask" @click.self="close" v-show="value">
    <el-card
      class="pageDialog"
      :style="{
        width: width,
        top: top,
        right: right,
        height: top === '0px' ? '100%' : 'auto'
      }"
      :body-style="{ height: 'calc(100% - 53px)' }"
    >
      <div slot="header" class="df jcc">
        <span class="title">{{ title }}</span>
        <div class="fg1" v-if="showClose"></div>
        <!-- 弹窗关闭按钮 -->
        <i class="el-icon el-icon-close" v-if="showClose" @click="close"></i>
      </div>
      <div class="pageDialogContent">
        <slot name="default" />
      </div>
      <div class="pageDialogFooter">
        <slot name="footer"></slot>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "pageDialog",
  props: {
    title: {
      type: String,
      default: "高级查询"
    },
    showClose: {
      type: Boolean,
      default: () => true
    },
    value: {
      type: Boolean,
      default: () => false
    },
    width: {
      type: String,
      default: "300px"
    },
    top: {
      type: String,
      default: "0px"
    },
    right: {
      type: String,
      default: "0px"
    }
  },

  methods: {
    close() {
      this.$emit("input", false);
      this.$emit("close");
    }
  }
};
</script>
<style lang="scss" scoped>
.mask {
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 994;
}
.pageDialog {
  position: absolute;
  background: #fff;
  z-index: 996;
  padding-top: 10px;
  .title {
    font-size: 16px;
  }
  .pageDialogContent {
    height: calc(100% - 53px);
    padding: 0px 10px;
    overflow: auto;
  }
  .pageDialogFooter {
    border-top: 1px solid #ebeef5;
    padding: 10px;
  }
}
/deep/ .el-card__body {
  padding: 0px !important;
}
/deep/ .el-card__header {
  padding: 8px 20px 18px 20px !important;
}
.el-icon-close {
  font-size: 20px;
  cursor: pointer;
}
</style>
