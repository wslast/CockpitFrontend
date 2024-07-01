<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: json编码管理
-->
<template>
    <div class="jsonCodeList">
      <div class="card df">
        <el-button type="primary" @click="editData()">增 加</el-button>
        <div class="fg1"></div>
         <searchDialog 
          v-model="searchForm.codeName"
          placeholder="请输入类型名称"
          @resetForm="reset"
          @searchData="getData('refresh')"
          :showForm.sync="formShow"
        >
        <el-form
          :model="searchForm"
          label-width="70px"
          label-position="top"
          
          ref="searchForm">
          <el-form-item label="类型名称" prop="codeName">
            <el-input v-model="searchForm.codeName"  placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-form>
        <div class="df jce" slot="footer">
          <el-button class="ml20"  @click="reset">重置</el-button>
          <el-button type="primary" class="ml20"  @click="getData('refresh')">查询</el-button>
        </div>
      </searchDialog>
      </div>
     
        <jh-table
            class="fg1 ova"
            height="100%"
            border
            ref="jhTable"
            :columnList="columnList"
            @deleteData="delData"
            :data="dataList">
        </jh-table>
        <div class="card" style="text-align:center">
          <el-pagination
            v-show="delData.length > 0"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pager.page"
            background
            :page-size="pager.size"
            layout="total, sizes, prev, pager, next"
            :total="pager.total">
          </el-pagination>
        </div> 
        <infoDialog @onSuccess="getData('refresh')" :jsonCodeInfoDialogConfig="jsonCodeInfoDialogConfig" v-if="jsonCodeInfoDialogVisible" :jsonCodeInfoDialogVisible.sync="jsonCodeInfoDialogVisible" />
        <paramsDialog :paramsDialogConfig="paramsDialogConfig" v-if="paramsDialogVisible" :paramsDialogVisible.sync="paramsDialogVisible"  />
    </div>
</template>  

<script>
export default {
  name: "jsonCodeList",
  components: {
    infoDialog: resolve => resolve(require("./components/infoDialog")),
    // paramsDialog: resolve => resolve(require("./components/paramsDialog"))
  },
  data() {
    return {
      dataList: [{1:1}],
      columnList: [
        {
          type: "index",
          width: '50px',
          align: "center",
          label: "序号",
        },
        {
          prop: "codeName",
          label: "编码名称",
          align: "center",
          showOverflowTooltip: true
        },
        {
          prop: "codeValue",
          label: "编码值",
          align: "center",
          showOverflowTooltip: true
        },
        {
          prop: "status",
          label: "是否启用",
          align: "center",
          formatter: (row) => {
              if(row.status == '1') {
                  return "启用"
              }else if(row.status == '0'){
                  return "禁用"
              }else {
                  return ""
              }
          }
        },
        {
          prop: "",
          fixed: "right",
          label: "操作",
          align: "center",
          width: "200px",
          render: (h, scope) => {
            let that = this;
            return h("div", {}, [
              h("el-button", {
                on: {
                  click: that.editData.bind(this, scope.row)
                },
                props: {
                  size: "medium",
                  type: "text"
                },
                domProps: {
                  innerHTML: "修改"
                }
              }),
              h("el-button", {
                on: {
                  click: that.editParams.bind(this, scope.row)
                },
                props: {
                  size: "medium",
                  type: "text"
                },
                domProps: {
                  innerHTML: "参数设置"
                }
              }),
              h("el-button", {
                on: {
                  click: scope._self.deleteRow.bind(this, scope.row)
                },
                props: {
                  size: "medium",
                  type: "text"
                },
                domProps: {
                  innerHTML: "删除"
                }
              })
            ]);
          }
        }
      ],
      jsonCodeInfoDialogVisible: false,
      jsonCodeInfoDialogConfig: {
        title: ""
      },
      paramsDialogVisible: false,
      paramsDialogConfig: {
        title: "参数设置"
      },
      formShow: false,
      pager: {
        page: 1,
        size: 10,
        total: 0
      },
      searchForm: {
        name: ""
      },
    };
  },
  mounted() {
      this.getData();
  },

  methods: {
    editParams(row) {
        this.paramsDialogConfig.data = JSON.parse(JSON.stringify(row));
        this.paramsDialogVisible = true;
    },
    editData(row) {
      if (row) {
        this.jsonCodeInfoDialogConfig.title = "修改编码类型";
        this.jsonCodeInfoDialogConfig.data = JSON.parse(JSON.stringify(row));
      } else {
        this.jsonCodeInfoDialogConfig.title = "添加编码类型";
        this.jsonCodeInfoDialogConfig.data = null;
      }
      this.jsonCodeInfoDialogVisible = true;
    },
    delData(row) {
      let params = { id: row.id }
      this.$api.formPost("/api/basfun/syscode/type/doRmById",params).then(res => {
        this.$message.success("删除成功");
        this.getData();
      });
    },
    reset() {
      for (const key in this.searchForm) {
        this.searchForm[key] = "";
      }
      this.getData("refresh");
    },
    getData(type) {
      if(type == 'refresh') {
        this.pager.page = 1;
      }
      let params = {
        pageNum: this.pager.page,
        pageSize: this.pager.size,
        ...this.searchForm
      };
      let load = this.$loading({
          target: this.$refs.jhTable.$el
      })
      this.formShow = false;
      this.$api.formPost("/api/basfun/syscode/treeitem/doGetList",params).then(res => {
        load.close();
        this.dataList = res.retBody.list;
        this.pager.total = res.retBody.total;
      });
    },
    initData(){
      this.pager.page = 1;
      this.getData();
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pager.size = val;
        this.getData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pager.page = val;
      this.getData();
    },
  }
};
</script>
<style lang="scss" scoped>
.jsonCodeList{
    height: 100%;
    display: flex;
    flex-direction: column;
    padding:0px 10px;
}
</style>