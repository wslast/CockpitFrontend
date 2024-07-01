<!-- 选择角色 -->
<template>
  <div class style="display:flex;overflow:auto;border:1px solid #f1f1f1;">
    <div class="card" style="flex:3;">
      <div class="form" >
        <el-form inline :model="searchForm"  label-width="80px">
          <el-form-item label="角色名称">
            <el-input v-model="searchForm.roleName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色编码">
            <el-input v-model="searchForm.roleCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  type="primary" @click="init(1)">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="flex">
        <div class="all" style="flex:1">
          <h4>查询结果:</h4>
          <el-table
            ref="role"
            :data="tableData"
            highlight-current-row
            @current-change="handleCurrentChange"
            max-height="400"
            border
          >
            <el-table-column align="center" width="65">
                <template slot-scope="scope">
                    <el-radio :label="scope.row.id" v-model="radio"></el-radio>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="roleName" label="角色名称"></el-table-column>
            <el-table-column align="center" prop="roleType" label="角色属性"></el-table-column>
            <el-table-column align="center" prop="roleCode" label="角色编码"></el-table-column>
            <el-table-column align="center" prop="remark" label="备注"></el-table-column>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"role",
  props:{
    onlyOne:{
      // 控制是否可以多选
      type:Boolean,
      default:false
    },
    id:{
        type:String,
        default: "0",
    }
  },
  components: {},
  computed: {
    parentId: {
        get: function(){
          return this.id;
        },
        set:function(v){
            
        },
    },
  },
  data() {
    return {
      tableData: [],
      selectedTableData: null,
      searchForm: {
        roleName: "",
        roleCode: "",
        roleEnabledState: 1,
      },
      total: 0,
      pageSize: 20,
      currentPage: 1,
      radio: null,
    };
  },
  watch: {
    // selectedTableData:{
    //   handler: function(newV,oldV){
    //     if(newV){
    //       this.searchForm.roleName = newV.roleName;
    //       this.searchForm.roleCode = newV.roleCode;
    //     }
    //   },
    //   deep:true,
    // }
  },
  mounted() {
    this.radio = this.parentId?this.parentId:-1;
    this.init();
  },
  methods: {
    sizeChange(n) {
      this.pageSize = n;
      this.init();
    },
    currentChange(n) {
      this.currentPage = n;
      this.init();
    },
    handleCurrentChange(row) {
      this.selectedTableData = row;
      this.radio = row.id;
    },
    init(v) {
      if(v){
        this.currentPage = 1;
      }
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        ...this.searchForm
      };
      this.$api.formPost("/api/auth/sysrole/doGetList", params).then(res => {
        if (res.retHead.code == "0000000") {
          this.tableData = res.retBody.list;
          for (const iterator of this.tableData) {
            if(this.parentId == iterator.id){
              this.selectedTableData = iterator;
              this.$refs.role.setCurrentRow(iterator);
            }
          }
          this.total = res.retBody.total;
          this.currentPage = res.retBody.pageNum;
          // this.setSort();//可移动
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
/deep/ .el-radio__label{
  display: none;
}
</style>