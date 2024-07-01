<!-- 三种弹窗 -->
<template>
  <div>
    <div style="font-size:24px;padding: 30px;">数据项1-5项 600px</div>
    <div style="font-size:24px;padding: 30px;">
      <el-button @click="showDiaog(1)">单列弹窗</el-button>
    </div>
    <div style="font-size:24px;padding: 30px;">数据项6-12项 800px</div>
    <div style="font-size:24px;padding: 30px;">
      <el-button @click="showDiaog(2)">双列弹窗</el-button>
    </div>
    <div style="font-size:24px;padding: 30px;">数据项12项以上 1000px</div>
    <div style="font-size:24px;padding: 30px;">
      <el-button @click="showDiaog(3)">三列弹窗</el-button>
    </div>
    <singleDialog
      @onSuccess="getData"
      :infoDialogConfig="infoDialogConfig"
      v-if="infoDialogVisible1"
      :infoDialogVisible.sync="infoDialogVisible1"
    />
    <doubleDialog
      @onSuccess="getData"
      :infoDialogConfig="infoDialogConfig"
      v-if="infoDialogVisible2"
      :infoDialogVisible.sync="infoDialogVisible2"
    />
    <tripleDialog
      @onSuccess="getData"
      :infoDialogConfig="infoDialogConfig"
      v-if="infoDialogVisible3"
      :infoDialogVisible.sync="infoDialogVisible3"
    />
  </div>
</template>

<script>
export default {
  name: "threeTypesDialog",
  components: {
    singleDialog: resolve => resolve(require("./components/singleDialog.vue")),
    doubleDialog: resolve => resolve(require("./components/doubleDialog.vue")),
    tripleDialog: resolve => resolve(require("./components/tripleDialog.vue"))
  },

  data() {
    return {
      infoDialogVisible1: false,
      infoDialogVisible2: false,
      infoDialogVisible3: false,
      infoDialogConfig: {
        title: "添加信息",
        data: null
      }
    };
  },

  computed: {},

  created() {},

  methods: {
    showDiaog(type) {
      switch (type) {
        case 1:
          this.infoDialogVisible1 = true;
          break;
        case 2:
          this.infoDialogVisible2 = true;
          break;
        case 3:
          this.infoDialogVisible3 = true;
          break;
        default:
          break;
      }
    },
    getData() {
      alert("刷新数据");
    }
  }
};
</script>
<style lang="scss" scoped></style>
