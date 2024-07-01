<template>
  <div class>
    <el-card class="form">
      <el-form inline  :model="searchForm" label-width="80px" ref="search">
        <el-form-item label="登陆账号" prop="username">
          <el-input v-model="searchForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="组织机构" prop="organ">
          <el-cascader
            change-on-select
            :options="options"
            :props="cascaderProps"
            v-model="searchForm.organ"
          ></el-cascader>
        </el-form-item>

        <el-form-item>
          <el-button  @click="resetForm('search')">重置</el-button>
          <el-button  type="primary" @click="init">查询</el-button>
          <el-button  type="success" @click="sure">确定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-table  :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column width="180px" prop="realName" fixed="left" align="center" label="真实姓名"></el-table-column>
      <el-table-column width="180px" prop="username" fixed="left" align="center" label="登陆账号"></el-table-column>   
      <el-table-column width="180px" prop="organName" align="center" label="所属部门"></el-table-column>
      <el-table-column width="180px" prop="usertype" align="center" label="用户类别"></el-table-column>
      <el-table-column width="180px" prop="roleId" align="center" label="分配角色"></el-table-column>
      <el-table-column width="180px" prop="roleAttribute" align="center" label="角色属性"></el-table-column>
      <el-table-column width="180px" prop="createTime" align="center" label="创建日期"></el-table-column>
      <el-table-column width="180px" prop="outageDate" align="center" label="禁用日期"></el-table-column>
      <el-table-column width="180px" prop="enabledState" align="center" label="启用状态"></el-table-column>
    </el-table>

    <!-- <el-card style="text-align:right;">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="currentPage"
        :page-sizes="[ 10, 20,30, 40]"
        :page-size="pageSize"
        background
        layout="total, sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-card> -->
    
  </div>
</template>

<script>
import {
  getList,
} from "./function";
export default {
  props: ['parent'],
  data() {
    return {
      multipleSelection: [],
      qxUserId: "",
      checkbox: {
        checkedRoles: [],
        Roles: []
      },
      dialogFormVisible: false,
      dialogEditVisible: false,
      dialogQsVisible: false,
      formLabelWidth: "80px",
      tableData: [],
      addForm: {
        createTime: "",
        email: "",
        id: "",
        mobile: "",
        password: "",
        realName: "",
        telephone: "",
        username: "",
        organCode: "",
        deptId: "",
        loginIp: ""
      },
      searchForm: {
        username: "",
        usertype: "",
        organ: ""
      },
      options: [],
      cascaderProps: {
        value: "organCode",
        label: "organName",
        children: "children"
      },
      total: 0,
      pageSize: 1000,
      currentPage: 1
    };
  },
  computed: {},
  mounted() {
    this.init();
    this.getGlbOptions();
  },
  methods: {
    sure() {
      let receiveIds = '';
      let receiveNames = '';
      if (this.multipleSelection && 0 != this.multipleSelection.length) {
        for (const obj of this.multipleSelection) {
          receiveIds += receiveIds ? ',' + obj.id : obj.id;
          receiveNames += receiveNames ? ',' + obj.realName : obj.realName;
        }
      }
      this.parent.form.receiveIds = receiveIds;
      this.parent.form.receiveNames = receiveNames;
      this.parent.dialogUserVisible = false;
    },
    getGlbOptions() {
      this.$api.formPost("/api/auth/sysorgan/doGetSysOrganObject",{}).then(res => {
        if (res.retHead.code == "0000000") {
          this.options = res.retBody;
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    sizeChange(n) {
      this.pageSize = n;
      this.init();
    },
    currentChange(n) {
      this.currentPage = n;
      this.init();
    },
    init() {
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        username: this.searchForm.username,
        organCode: this.searchForm.organ[this.searchForm.organ.length - 1] || ""

        // usertype: this.searchForm.usertype
      };
      getList(params).then(res => {
        if (res.retHead.code == "0000000") {
          this.tableData = res.retBody.list;
          this.total = res.retBody.total;
          this.currentPage = res.retBody.pageNum;
        }
      });
    },
   
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {}
};
</script>
<style lang='scss' scoped>
.btns {
  text-align: right;
}
</style>
