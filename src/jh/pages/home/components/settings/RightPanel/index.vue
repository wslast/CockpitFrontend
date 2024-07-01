<template>
  <el-drawer
    title="页面样式设置"
    :visible.sync="show"
    size="240px"
    :direction="direction"
    :before-close="handleClose"
  >
    <slot />
  </el-drawer>
</template>

<script>
export default {
  name: "RightPanel",

  data() {
    return {
      show: this.$store.state.settings.setShow,
      direction: "rtl"
    };
  },
  watch: {
    "$store.state.settings.setShow": function(v) {
      this.show = v;
    }
  },
  mounted() {},

  methods: {
    handleClose(done) {
      this.$store.commit("setShow", false);
      done();
    }
  }
};
</script>

<style lang="scss" scoped>
// /deep/ .el-dialog__close{
//   // color:#72767b;
//   color:red;
// }
</style>
