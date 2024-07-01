<!-- 自定义弹窗模板 -->
<template>
    <el-dialog
      v-bind="$attrs"
      :fullscreen="isFull"
      :close-on-click-modal="$attrs['close-on-click-modal'] ? $attrs['close-on-click-modal'] : false"
      :close-on-press-escape="$attrs['close-on-press-escape'] ? $attrs['close-on-press-escape'] : false"
      v-on="$listeners">
      <!-- <slot name="dialog" /> -->
      <template slot="title">
        <div class="title">
          <div class="titleContent">{{title}}</div>
          <div class="flexBlank"></div>
          <i class="el-icon-full-screen" @click="setFullscreen"></i>
        </div>
      </template>
      <slot name="body" />
      <template slot="footer">
        <slot name="footer" />
      </template>
    </el-dialog>
</template>

<script>
export default {
  name: "baseDialog",
  props: {
    title: {
      type: String,
      default: () => "默认",
    },
    fullscreen: {
      type: Boolean,
      default: () => false,
    }
  },
  data() {
    return {
      isFull: false,
    }
  },
 
  mounted() {
    //初始化title,防止冲突
    this.$el.title="";
    this.isFull = JSON.parse(JSON.stringify(this.fullscreen));
  },

  methods: {
    setFullscreen() {
      this.isFull = !this.isFull;
      this.$emit("isFullScreen",this.isFull);
    }
  },
  
};
</script>
<style lang='scss' scoped>
.title{
  display: flex;
  margin-right: 25px;
  font-size: 14px;
  .titleContent{
    line-height: 24px !important;
    font-size: 16px !important;
    color: #303133 !important;
    font-weight: 600 !important;
  }
  .flexBlank{
    flex-grow: 1;
  }
}
.el-icon-full-screen{
  cursor: pointer;
}
.flexFooter{
    display: flex;
    justify-content: flex-end;
}
</style>