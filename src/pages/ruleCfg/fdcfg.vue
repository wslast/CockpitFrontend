<template>
  <div class>
    <div class="card tr mb2">
      <el-tooltip content="显示字段筛选" placement="bottom" effect="light">
        <el-popover placement="bottom" width="200" trigger="click">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="showItemList" @change="handleCheckedChange">
            <el-checkbox v-for="(item,key) in allItemList" :key="key" :label="item">{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <el-button slot="reference" icon="el-icon-menu" size="mini" type="primary" circle></el-button>
        </el-popover>
      </el-tooltip>
      <el-tooltip content="展开/收起表单" placement="bottom" effect="light">
        <el-button icon="el-icon-search" @click="formShow= !formShow" size="mini" type="primary" circle></el-button>
      </el-tooltip>
      <el-button size="mini" type="primary" icon="el-icon-plus" @click="showDialog">添加</el-button>
    </div>
    <div class="card" v-show="formShow">
      <el-form size="mini" :style="style" :model="ruleForm" ref="ruleForm" inline label-width="80px" class="demo-ruleForm">
        <el-form-item label="配置编号" prop="fdCfgCode" >
          <el-input size="mini" v-model="ruleForm.fdCfgCode"></el-input>
        </el-form-item>
        <el-form-item label="需求编号" prop="xqbh">
          <el-input size="mini" v-model="ruleForm.xqbh"></el-input>
        </el-form-item>
        <el-form-item label="功能名称" prop="fdCfgName">
          <el-input size="mini" v-model="ruleForm.fdCfgName"></el-input>
        </el-form-item>
        <el-form-item label="脚本编号" prop="fdScriptId">
          <el-input size="mini" v-model="ruleForm.fdScriptId"></el-input>
        </el-form-item>
        <el-form-item label="脚本名称" prop="fdScriptName">
          <el-input v-model="ruleForm.fdScriptName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="submitForm('ruleForm')">查询</el-button>
          <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table stripe highlight-current-row ref="dragTable" :height="autoHeight" row-key="id" :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="60px" align="center" fixed="left" label="序号"></el-table-column>
      <el-table-column show-overflow-tooltip :formatter="item.formatter" v-for="(item,index) in allItemList" :key="index" :align="item.align" :label="item.name" v-if="item.show">
        <template slot-scope="scope">
          <template v-if="!item.formatter">{{ scope.row[item.key] }}</template>
          <template v-else>
            <span v-text="item.formatter(scope.row, item)"></span>
          </template>
        </template>
      </el-table-column>
      <el-table-column  label="操作" width="200px" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showEditDialog(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" type="success" @click="scriptConfig(scope.$index, scope.row)">脚本配置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="card tr">
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="currentPage" :page-sizes="[ 10, 20,30, 40]" :page-size="pageSize" background layout="total, sizes, prev, pager, next" :total="total"></el-pagination>
    </div>
    <!-- --------------------------------------------------------添加弹出框 -->
    <el-dialog title="功能管理" width="640" :visible.sync="dialogFormVisible">
      <el-form :model="form" inline size="mini" label-width="100px" ref="addForm" :rules="rules">
        <el-form-item label="配置编号" prop="fdCfgCode" :label-width="formLabelWidth">
          <el-input v-model="form.fdCfgCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="需求编号" prop="xqbh" :label-width="formLabelWidth">
          <el-input v-model="form.xqbh" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能名称" prop="fdCfgName" :label-width="formLabelWidth">
          <el-input v-model="form.fdCfgName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleAdd()" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- --------------------------------------------------------编辑弹出框 -->
    <el-dialog title="功能管理管理" width="640px" :visible.sync="dialogEditVisible">
      <el-form :model="editForm" inline size="mini" label-width="100px" ref="editForm" :rules="rules">
        <el-form-item label="原配置编号"  prop="fdCfgCode" :label-width="formLabelWidth">
          <el-input v-model="editForm.fdCfgCode" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新配置编号" prop="newFdCfgCode" :label-width="formLabelWidth">
          <el-input v-model="editForm.newFdCfgCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="需求编号" prop="xqbh" :label-width="formLabelWidth">
          <el-input v-model="editForm.xqbh" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能名称" prop="fdCfgName" :label-width="formLabelWidth">
          <el-input v-model="editForm.fdCfgName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogEditVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleEdit()">确 定</el-button>
      </div>
    </el-dialog>
    
   
  </div>
</template>
<script>
const defaultFormThead = [
  { key: "fdCfgCode", name: "配置编号", show: true,align:"center" },
  { key: "xqbh", name: "需求编号", show: true,align:"center" },

  { key: "fdCfgName", name: "功能名称", show: true, align:"center"},
];
export default {

  data() {
    return {
      gnlxList:[],
      fullscreen: false,
      checkAll: true,
      isIndeterminate: false,
      sortable: null,
      allItemList: defaultFormThead,
      showItemList: defaultFormThead,
      formShow: false,
      roleId: "",
      key: 1,
      dialogFormVisible: false,
      dialogEditVisible: false,
      dialogUser: false,
      dialogAllUser: false,
      offForm: true, //是否折叠
      folding: false, //表单是否超过一行
      formLabelWidth: "200px",
      tableData: [],
      tableData1: [],
      userTableData: [],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      total1: 0,
      pageSize1: 20,
      currentPage1: 1,
      ruleForm: {
        fdCfgCode: "",
        fdCfgDist: "",
        fdCfgType: "",
        fdCfgName: "",
        isUsed:"",
        fdScriptId:"",
        fdScriptName:"",
        xqbh:"",
      },
      style: {},
      rules: {
        fdCfgCode: [
          { required: true, message: "请输入功能编号", trigger: "blur" }
        ],
        xqbh: [
          { required: true, message: "需求编号", trigger: "blur" }
        ],
         fdCfgName: [
          { required: true, message: "请输入功能名称", trigger: "blur" }
        ],
      },
      form: {
        fdCfgCode: "",
        xqbh:"",
        fdCfgDist: "13050",
        fdCfgType: "",
        fdCfgName: "",
        fdCfgRemark: "",
        fdCfgVersion:"",
        isUsed:"",
        fdCfgFunction:"1",
        isEl:""
      },
      editForm: {
        fdCfgCode: "",
        xqbh:"",
        fdCfgDist: "13050",
        fdCfgType: "",
        fdCfgName: "",
        fdCfgRemark: "",
        fdCfgVersion:"",
        isUsed:"",
        fdCfgFunction:"",
        isEl:""
      }
    };
  },

  mounted() {
    // this.getDic();
    this.init();
   
  },
  computed: {
    autoHeight: function() {
      if (this.formShow) {
        return window.innerHeight - 230 - 55;
      } else {
        return window.innerHeight - 230;
      }
    }
  },
  watch: {
    offForm: function(v) {
      if (v) {
        this.style = {
          height: "62px",
          overflow: "hidden"
        };
      } else {
        this.style = {
          height: "auto",
          overflow: "hidden"
        };
      }
    },
    showItemList(valArr) {
      for (let key in this.allItemList) {
        this.allItemList[key].show = false;
        for (let key1 in valArr) {
          if (this.allItemList[key].key == valArr[key1].key) {
            this.allItemList[key].show = true;
          }
        }
      }
      this.$nextTick(() => {
        this.$refs.dragTable.doLayout();
      });
    }
  },
  methods: {
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === defaultFormThead.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < defaultFormThead.length;
    },
    handleCheckAllChange(val) {
      this.showItemList = val ? defaultFormThead : [];
      this.isIndeterminate = false;
    },
    formatJson(filterVal, jsonData) {
      let i = 0;
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "id") {
            i++;
            return i;
          } else if (j === "fdCfgType") {
            if (v[j] == '1') {
              return "一致性";
            } else if (v[j] == '2') {
              return "合规性";
            }else {
              return "合理性";
            }
          } else if (j === "createTime") {
            if (v[j] ) {
              return (new Date(v[j])).toLocaleString();
            } else {
              return "";
            }
          }else if (j === "isUsed") {
            if (v[j] == '1') {
              return "使用";
            } else {
              return "未使用";
            }
          }else if (j === "isEl") {
            if (v[j] == '1') {
              return "是";
            } else if (v[j] == '0') {
              return "否";
            } else {
              return "";
            }
          } else if (j === "fdCfgFunction") {
            if (v[j] == '1') {
              return "财务";
            } else if(v[j] == '2'){
              return "外部数据"
            }else {
              return "";
            }
          } else {
            return v[j];
          }
        })
      );
    },
    cancle() {
      this.dialogFormVisible = false;
      this.resetForm("addForm");
    },
   
    // showAssignUser(index, row) {},
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
        ...this.ruleForm
      };
      this.$api.formPost("/api/dyncscript/cfg/doGetList", params).then(res => {
        console.log(res);
        if (res.retHead.code == "0000000") {
          this.tableData = res.retBody.list;
          this.total = res.retBody.total;
          this.currentPage = res.retBody.pageNum;
        }
      });
    },
    showDialog() {
      this.dialogFormVisible = true;
      this.form.roleName = "";
    },
    showEditDialog(index, row) {
      this.dialogEditVisible = true;
      let id=row.fdCfgCode;
      this.$nextTick(()=>{
           this.editForm = JSON.parse(JSON.stringify(row));
          this.$set(this.editForm, 'newFdCfgCode',id);
          
      });
    },
    handleAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$api
            .formPost("/api/dyncscript/cfg/doSave", this.form)
            .then(res => {
              if (res.retHead.code == "0000000") {
                this.dialogFormVisible = false;
                this.$message({
                  message: "添加成功！",
                  type: "success"
                });
                this.init();
                this.resetForm("addForm");
              } else {
                this.dialogFormVisible = true;
                this.$message({
                  message: "添加失败：" + res.retHead.message,
                  type: "error"
                });
              }
            });
        } else {
          this.$message.error("请完善表单！");
        }
      });
    },
    handleEdit() {
      this.$refs.editForm.validate(valid => {
        this.editForm.createTime=new Date();
        if (valid) {
          this.$api
            .formPost("/api/dyncscript/cfg/doModByCfgCodeAndCfgDist", this.editForm)
            .then(res => {
              this.dialogEditVisible = false;
              if (res.retHead.code == "0000000") {
                this.$message.success("修改成功！");
                this.init();
              } else {
                this.$message.error("修改失败！");
              }
            });
        } else {
          this.$message.error("请完善表单！");
        }
      });
    },

    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .formPost("/api/dyncscript/cfg/doRmByCfgCodeAndCfgDist", {
              fdCfgCode: row.fdCfgCode,
              fdCfgDist: row.fdCfgDist
            })
            .then(res => {
              if (res.retHead.code == "0000000") {
                this.$message({
                  message: "删除成功！",
                  type: "success"
                });
                this.init();
              } else {
                this.$message({
                  message: "删除失败！"+res.retHead.message,
                  type: "error"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    submitForm(formName) {
      this.init();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.init();
    },
     scriptConfig(index,row){
        let obj = {};
      obj.path = "/fd/fdScriptCfg"; //必须用于路由跳转
      obj.functionName = "脚本配置"; //必须用于多页签显示详情页title
      obj.id = "fdScriptCfg";  //必须用于多页签标示唯一ID
      obj.compName = "fdScriptCfg"; //必须用于多页签进行组件渲染
      obj.query = {   //必须用于多页签进行传参
        fdCfgCode: row.fdCfgCode,
        fdCfgDist:row.fdCfgDist
      };
      //this.jump(obj); 
          this.$router.push({
                 path: "/fd/fdScriptCfg",
                 query: { fdCfgCode: row.fdCfgCode,fdCfgDist:row.fdCfgDist }
             });
    }
  },
  created() {}
};
</script>
<style lang='scss' scoped>
// /deep/ .sortable-ghost  {
//   opacity: 0.8 !important;
//   color: #fff !important;
//   background: #42b983 !important;
// }
</style>