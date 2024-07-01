<!--
 * @Description: 列动态选中
-->
<template>
  <pageDialog
    v-bind="$attrs"
    class="card selectColumnDialog"
    v-model="selectDialogVisible"
    title="请选择显示列"
    top="80px"
    right="40px"
  >
    <div class="ova" style="max-height:40vh">
      <el-checkbox
        :indeterminate="isIndeterminate"
        class="pl20 pt10"
        v-model="checkAll"
        @change="handleCheckAllChange"
        >全选</el-checkbox
      >
      <el-checkbox-group v-model="checkColumn" @change="checkedCol">
        <el-checkbox
          class="db pl20 pt10"
          :label="item"
          v-for="item in allColumn
            .map(item => item.label)
            .filter(item => item && item != '操作')"
          :key="item"
          >{{ item }}</el-checkbox
        >
      </el-checkbox-group>
    </div>
  </pageDialog>
</template>

<script>
export default {
  name: "selectColumnDialog",
  props: {
    columnList: {
      type: Array,
      default: () => []
    },
    value: {
      type: Boolean,
      default: () => false
    }
  },

  data() {
    return {
      isIndeterminate: false,
      checkColumn: [],
      checkAll: true,
      allColumn: []
    };
  },

  computed: {
    selectDialogVisible: {
      get: function() {
        return this.value;
      },
      set: function(v) {
        this.$emit("input", v);
      }
    }
  },

  created() {
    this.allColumn = JSON.parse(JSON.stringify(this.columnList));
    this.checkColumn = this.allColumn
      .map(item => item.label)
      .filter(item => item != "操作");
  },

  methods: {
    /**
     * @description: 监听选中
     * @param {*} val
     * @return {*}
     * @author: Junchi Zhao
     */
    checkedCol(val) {
      this.$emit("update:selectCol", val);
      this.checkAll =
        val.length ===
        this.allColumn.map(item => item.label).filter(item => item != "操作")
          .length;
      this.isIndeterminate =
        val.length > 0 &&
        val.length <
          this.allColumn.map(item => item.label).filter(item => item != "操作")
            .length;
    },
    /**
     * @description: 全选
     * @param {*} val
     * @return {*}
     * @author: Junchi Zhao
     */
    handleCheckAllChange(val) {
      let checkedColumns = val
        ? this.allColumn.map(item => item.label).filter(item => item != "操作")
        : ["操作"];
      this.checkAll = val;
      this.checkColumn = val
        ? this.allColumn.map(item => item.label).filter(item => item != "操作")
        : [];
      this.$emit("update:selectCol", checkedColumns);
      this.isIndeterminate = false;
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .selectColumnDialog .pageDialogFooter {
  display: none;
}
/deep/.el-checkbox {
  display: block;
}
</style>
