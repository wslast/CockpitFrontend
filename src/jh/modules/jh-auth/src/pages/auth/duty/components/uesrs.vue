/*
 * @Author: NeverLeave 
 * @Date: 2019-10-25 14:58:11 
 * @Last Modified by: gtw
 * @Last Modified time: 2019-10-25 17:54:35
 */

<template>
  <div class>
    <el-button type="primary" icon="el-icon-search"  @click="dialogAllUser=true"></el-button>
    <el-input v-model="user" style="width:200px;" clearable  disabled></el-input>

    <el-dialog title="所有用户" width="80%" :visible.sync="dialogAllUser" :append-to-body="appendToBody">
      <div class style="display:flex;overflow:auto;border:1px solid #f1f1f1;">
        <div class="left card" style="margin-right:10px;flex:1;overflow:auto;">
          <div class style="padding:10px;">
            <el-switch v-model="conChild" @change="init" active-text="含下级" inactive-text="不含下级"></el-switch>
          </div>

          <el-input  placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
          <el-tree
            style="min-height:300px;"
            highlight-current
            @node-click="handleNodeClick"
            :props="props"
            :data="data"
            node-key="id"
            :filter-node-method="filterNode"
            ref="tree"
          ></el-tree>
        </div>
        <div class="right card" style="flex:3;">
          <div class="form">
            <el-form inline :model="searchForm"  label-width="80px">
              <el-form-item label="用户名">
                <el-input v-model="searchForm.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="searchForm.realName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button  type="primary" @click="init">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="flex">
            <div class="all" style="flex:1">
              <h4>查询结果:</h4>
              <el-table
                :data="tableData"
                @selection-change="selectionChange"
                max-height="400"
                border
              >
                <el-table-column type="selection" fixed="left" align="center"></el-table-column>
                <el-table-column prop="username" fixed="left" align="center" label="用户名"></el-table-column>
                <el-table-column prop="realName" fixed="left" align="center" label="真实姓名"></el-table-column>
              </el-table>
              <div class="card" style="text-align:right; ">
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
            <div class="btnbox">
              <div class>
                <el-button  type="primary" icon="el-icon-d-arrow-right" @click="toright"></el-button>
                <br />
                <el-button  type="primary" icon="el-icon-d-arrow-left" @click="toleft"></el-button>
              </div>
            </div>
            <div class="select" style="flex:1">
              <h4>已选择用户:</h4>
              <el-table
                :data="selectedTableData"
                @selection-change="selectedSelectionChange"
                border
                max-height="400"
              >
                <el-table-column type="selection" fixed="left" align="center"></el-table-column>
                <el-table-column prop="username" fixed="left" align="center" label="用户名"></el-table-column>
                <el-table-column prop="realName" fixed="left" align="center" label="真实姓名"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUserOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    onlyOne: {
      // 控制是否可以多选
      type: Boolean,
      default: false
    },
    appendToBody:{
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      user: "",
      dialogAllUser: false,
      conChild: true,
      formLabelWidth: "80px",
      tableData: [],
      selectedTableData: [],
      searchForm: {
        username: "",
        usertype: "",
        realName: ""
      },
      data: [],
      props: {
        label: "organName",
        children: "children"
      },
      filterText: "",
      checkedData: [],
      rightCheckedData: [],
      chackedNode: {},
      organCheck: {},
      total: 0,
      pageSize: 20,
      currentPage: 1
    };
  },
  computed: {},
  mounted() {
    this.init();
    this.initOrange();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    addUserOk() {
      console.log("选择用户");
      let checkedUsers = this.selectedTableData;
      if(checkedUsers.length!=1){
        this.$message.error("请选择一个用户！")
        return
      }
      //  
      this.user = checkedUsers[0].realName;
      this.$emit('input', checkedUsers[0]);
      this.dialogAllUser = false;
    },
    toright() {
      if (this.onlyOne) {
        if (this.checkedData.length > 1) {
          this.$message.error("只能选择一个用户！");
          return false;
        }
      }
      this.checkedData.forEach(item => {
        console.log(this.selectedTableData.indexOf(item));
        if (this.selectedTableData.indexOf(item) < 0) {
          this.selectedTableData.push(item);
        }
      });
    },
    toleft() {
      this.rightCheckedData.forEach(item => {
        let index = this.selectedTableData.indexOf(item);
        if (index >= 0) {
          this.selectedTableData.splice(index, 1);
        }
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.organName.indexOf(value) !== -1;
    },
    initOrange() {
      this.$api.formPost( "/api/auth/sysorgan/doGetSysOrganObject",{}).then(res => {
        if (res.retHead.code == "0000000") {
          this.options = this.deleteChildren(res.retBody);
        }
      });
      this.chackedNode = {};
    },
    handleNodeClick(v) {
      console.log(v);
      this.organCheck = v;
      this.init();
    },
    selectedSelectionChange(v) {
      this.rightCheckedData = v;
    },
    selectionChange(v) {
      this.checkedData = v;
      console.log(v);
    },
    sizeChange(n) {
      this.pageSize = n;
      this.init();
    },
    currentChange(n) {
      this.currentPage = n;
      this.init();
    },

    init(v) {
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        username: this.searchForm.username,
        realName: this.searchForm.realName,
        organId: this.organCheck.id || "",
        organRecurFlag: this.conChild ? "1" : "0"
      };
      this.$api.formPost( "/api/auth/sysuser/doGetList",params).then(res => {
        if (res.retHead.code == "0000000") {
          this.tableData = res.retBody.list;
          this.total = res.retBody.total;
          this.currentPage = res.retBody.pageNum;
        }
      });
    }
  },
  created() {}
};
</script>
<style lang='scss' scoped>
.btns {
  text-align: right;
}
.btnbox {
  display: flex;
  padding: 10px;
  align-items: center;
  button {
    margin-bottom: 10px;
  }
}
</style>