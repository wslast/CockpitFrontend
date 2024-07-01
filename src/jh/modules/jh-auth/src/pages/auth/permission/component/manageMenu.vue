<!--  -->
<template>
  <div class="manageMenu">
    <div class="fg1 tree-box">
      <div class="tree-nav">
        <div class="item">
          <el-checkbox
              v-model="isCheckedAll"
              :indeterminate="isIndeterminate"
              :disabled="tableData.length === 0"
              class="checkbox-style"
              @change="handleCheckAllChange"
          >
          </el-checkbox
          >操作菜单
        </div>
        <div class="item tl" style="width: calc(100% - 200px)" ref="checkWidth">
          子页面及功能
        </div>
      </div>
      <el-tree
          ref="tree"
          class="tree-content fg1 ova"
          style="width:100%"
          :data="tableData"
          show-checkbox
          node-key="id"
          :expand-on-click-node="false"
          @check="check"
          @check-change="checkTree"
          :props="{
					label: 'functionName',
				}"
      >
        <div class="custom-tree-node" slot-scope="{ node, data }">
          <div class="item showOne">{{ node.label }}</div>
          <div
              class="check"
              :style="{ width: clientWidth ? clientWidth + 'px' : '600px' }"
              v-if="data.functionList && data.functionList.length > 0"
          >
            <el-checkbox
                class="checkbox"
                @change="setParent(data)"
                v-model="item.ownerFlag"
                v-for="item in data.functionList"
                :key="item.id"
            >
              {{ item.functionName }}</el-checkbox
            >
          </div>
        </div>
      </el-tree>
    </div>
    <div class="df jce mt15">
      <el-button type="primary" @click="() => $emit('save')">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'manageMenu',
  props: {
    roleId: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      tableData: [],
      isCheckedAll: false,
      isIndeterminate: false,
      clientWidth: 0,
    };
  },
  watch: {
    roleId: {
      handler: function(val) {
        if (val) {
          this.tableData = [];
          this.isCheckedAll = false;
          this.isIndeterminate = false;
          this.getManageMenuListByRoleId({
            roleId: val,
            menuFlag: 1,
          });
        }
      },
      immediate: true,
    },
  },

  mounted() {
    this.clientWidth = this.$refs.checkWidth.clientWidth;
  },
  methods: {
    //顶部多选点击触发
    async handleCheckAllChange(val) {
      if (val) {
        // 全选
        this.$refs.tree.setCheckedNodes(this.tableData);
        this.setAllStatus(this.tableData, true);
      } else {
        // 取消全选
        this.$refs.tree.setCheckedNodes([]);
        this.setAllStatus(this.tableData, false);
      }
    },
    //配合顶部多选
    setAllStatus(list, status) {
      for (const iterator of list) {
        iterator.ownerFlag = status;
        for (const item of iterator.functionList) {
          item.ownerFlag = status;
        }
        if (iterator.children && iterator.children.length > 0) {
          this.setAllStatus(iterator.children, status);
        }
      }
    },
    //列表中多选触发
    setParent(item) {
      if (item.functionList.filter((item) => item.ownerFlag).length === 0) {
        this.$refs.tree.setChecked(item, false, false);
      }
    },
    //tree点击复选触发事件
    checkTree(data, status) {
      for (const iterator of data.functionList) {
        iterator.ownerFlag = status;
      }
      data.ownerFlag = status;
      this.isAllSelect();
    },
    check(data, cur) {
      if(data.children && data.children.length > 0) {
        this.setAllStatus(data.children,data.ownerFlag)
      }
      for (const iterator of cur.halfCheckedNodes) {
        iterator.ownerFlag = true;
      }
      this.isAllSelect();
    },
    //获取选中的数组
    getSelectTree(tree) {
      return tree
          .filter((item) => item.ownerFlag === true)
          .map((item) => {
            item = Object.assign({}, item);
            if (item.children) {
              item.children = this.getSelectTree(item.children);
            }
            return item;
          });
    },
    //顶部多选判断是否全选
    isAllSelect() {
      let selectList = this.getSelectTree(this.tableData);
      this.isCheckedAll = selectList.length === this.tableData.length;
      this.isIndeterminate =
          selectList.length > 0 && selectList.length < this.tableData.length;
    },
    save(list) {
      let funcs = [];
      funcs = funcs.concat(this.getSelectFunc(this.tableData, []));
      return funcs;
    },
    //获取所有选中id
    getSelectFunc(list, result) {
      for (const iterator of list) {
        if (iterator.ownerFlag) {
          result.push(iterator.id);
        }
        if (iterator.functionList && iterator.functionList.length > 0) {
          for (const item of iterator.functionList) {
            if (item.ownerFlag) {
              result.push(item.id);
            }
          }
        }
        if (iterator.children && iterator.children.length > 0) {
          this.getSelectFunc(iterator.children, result);
        }
      }
      return result;
    },
    getManageMenuListByRoleId(params) {
      this.$api
          .formPost('/api/auth/sysrolefun/doGetAllFunctionJsonByRoleId', params)
          .then((res) => {
            this.tableData = this.setIsSelect(res.retBody);
            this.isAllSelect(this.tableData);
            this.$nextTick(() => {
              this.setMenuSelet(this.tableData);
            });
          });
    },

    /**
     * @description: 设置全选状态
     * @param {*} list
     * @return {*}
     * @author: Junchi Zhao
     */
    setMenuSelet(list) {
      if (list.length > 0) {
        for (const iterator of list) {
          if (iterator.ownerFlag) {
            this.$refs.tree.setChecked(iterator, true, false);
          }
          if (iterator.children && iterator.children.length > 0) {
            this.setMenuSelet(iterator.children);
          }
        }
      }
    },
    /**
     * @description: 设置全选状态
     * @param {*} list
     * @return {*}
     * @author: Junchi Zhao
     */
    setIsSelect(list) {
      if (list.length > 0) {
        for (const iterator of list) {
          if (iterator.functionList && iterator.functionList.length > 0) {
            let isSelect = true;
            for (const item of iterator.functionList) {
              if (!item.ownerFlag) {
                isSelect = false;
              }
            }
            iterator.isSelect = isSelect;
          }
          if (iterator.children && iterator.children.length > 0) {
            this.setIsSelect(iterator.children);
          }
        }
      }
      return list;
    },
  },
};
</script>
<style lang="scss" scoped>
.manageMenu {
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  .checkbox {
    margin: 10px 30px 10px 0px;
  }
}
/deep/ .el-table tr,
.el-table td {
  height: auto !important;
  vertical-align: top;
}
/deep/ .el-table .el-table__body .cell {
  height: 100%;
  min-height: 37px !important;
  white-space: pre-wrap !important;
  line-height: 37px;
}
/deep/ .el-table .el-table__body td {
  vertical-align: top !important;
}
.tree-box {
  position: relative;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e6e6;
  .tree-nav {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    background: rgb(249, 250, 252);
    padding: 12px 0;
    .item {
      font-size: var(--text-size);
      color: rgb(102, 102, 102);
      font-weight: 700;
      text-align: left;
      .checkbox-style {
        &.el-checkbox:last-of-type {
          margin-right: 12px;
          margin-left: 8px;
        }
      }
      &:nth-child(1) {
        max-width: 200px;
        flex-grow: 1;
        text-align: left;
        padding-left: 16px;
      }
      div {
        flex-grow: 1;
      }
    }
  }
  .tree-content {
    .custom-tree-node {
      width: 100%;
      font-size: var(--text-size);
      display: flex;
      .item {
        flex-grow: 1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        width: 14px;
      }
      .check {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        text-align: left;
        flex-shrink: 0;
        flex-grow: 0;
        width: 600px;
        padding-left: 16px;
      }
    }
  }
}
/deep/ .el-tree-node__content {
  min-height: 50px;
  height: auto;
  border-bottom: 1px solid #e6e6e6;
}
</style>
