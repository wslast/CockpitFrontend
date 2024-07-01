/* * @Author: NeverLeave * @Date: 2019-10-18 16:42:30 * @Last Modified by: gtw *
@Last Modified time: 2019-10-24 16:51:16 */

<template>
  <div class>
    <div class="card">
      <el-input
        v-model="roleName"
        placeholder="输入角色名称进行查询"
        style="width:200px"
      ></el-input>
      <el-button type="primary" @click="getlist">查询</el-button>
    </div>
    <el-table
      :data="list"
      ref="multipleTable"
      border
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleType" label="角色类型"></el-table-column>
    </el-table>
    <div style="text-align:right; padding:10px">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        background
        layout="total, sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    defaultData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    onelyOne: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      roleName: "",
      pageSize: 20,
      currentPage: 1
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    init() {
      this.getlist();
    },
    renderCheck() {
      this.$nextTick(() => {
        this.$refs.multipleTable.clearSelection();
        this.defaultData.forEach(item => {
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].id == item.id) {
              this.$refs.multipleTable.toggleRowSelection(this.list[i], true);
            }
          }
        });
      });
    },
    getlist() {
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        roleName: this.roleName
      };
      this.$api.formPost("/api/auth/sysrole/doGetList", params).then(res => {
        if (res.retHead.code == "0000000") {
          this.list = res.retBody.list;
          this.total = res.retBody.total;
          this.currentPage = res.retBody.pageNum;
          this.renderCheck();
        }
      });
    },
    handleSelectionChange(val) {
      if (this.onelyOne && val.length > 1) {
        this.$message.error("你能选取一个角色！");
        return;
      }
      this.$emit("selection", val);
    },
    sizeChange(n) {
      this.pageSize = n;
      this.init();
    },
    currentChange(n) {
      this.currentPage = n;
      this.init();
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped></style>
