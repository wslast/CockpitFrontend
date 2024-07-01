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
      <!-- <el-tooltip content="展开/收起表单" placement="bottom" effect="light">
        <el-button icon="el-icon-search" @click="formShow= !formShow" size="mini" type="primary" circle></el-button>
      </el-tooltip> -->
      <el-tooltip content="下载当前表格数据" placement="bottom" effect="light">
        <el-button icon="el-icon-download" @click="handleDownload" size="mini" type="primary" circle></el-button>
      </el-tooltip>
      <el-button size="mini" type="primary" icon="el-icon-plus" @click="showDialog">添加</el-button>
    </div>
    <!-- <div class="card" v-show="formShow">
      <el-form size="mini" :style="style" :model="ruleForm" ref="ruleForm" inline label-width="100px" class="demo-ruleForm">
         <el-form-item label="脚本编号" >
          <el-input size="mini" disabled v-model="ruleForm.fdScriptId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="submitForm('ruleForm')">查询</el-button>
          <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div> -->
    <el-table stripe highlight-current-row :height="autoHeight" ref="dragTable" row-key="id" :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="60px" align="center" fixed="left" label="序号"></el-table-column>
      <el-table-column show-overflow-tooltip :formatter="item.formatter" v-for="(item,index) in allItemList" :key="index" :label="item.name" v-if="item.show">
        <template slot-scope="scope">
          <template v-if="!item.formatter">{{ scope.row[item.key] }}</template>
          <template v-else>
            <span v-text="item.formatter(scope.row, item)"></span>
          </template>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="120px" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showEditDialog(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="card tr">
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="currentPage" :page-sizes="[ 10, 20,30, 40]" :page-size="pageSize" background layout="total, sizes, prev, pager, next" :total="total"></el-pagination>
    </div>
    <!-- --------------------------------------------------------添加弹出框 -->
    <el-dialog title="添加规则配置" width="50%" :visible.sync="dialogFormVisible" append-to-body>
      <el-form :model="form" size="mini" label-width="80px" ref="addForm" :rules="rules" inline>
        <!-- <el-form-item label="需求编号" prop="xqbh" :label-width="formLabelWidth">
          <el-input v-model="form.xqbh" autocomplete="off" disabled></el-input>
        </el-form-item>
         <el-form-item label="查询编号" prop="cxbh" :label-width="formLabelWidth">
          <el-input v-model="form.cxbh" autocomplete="off" disabled></el-input>
        </el-form-item> -->
        <el-form-item label="脚本编号" prop="fdScriptId" :label-width="formLabelWidth">
          <el-input v-model="form.fdScriptId" disabled autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="脚本序号" prop="scriptSort" :label-width="formLabelWidth">
          <el-input-number controls-position="right" v-model="form.scriptSort" :min="1" :max="100" autocomplete="off"></el-input-number>
        </el-form-item>
        <el-form-item label="脚本内容" prop="scriptContent" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.scriptContent" style="width:500px" maxlength="3000" show-word-limit :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="是否EL"  :label-width="formLabelWidth">
          <el-select size="mini" v-model="form.isEl">
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="EL表达式类型" :label-width="formLabelWidth">
          <el-select size="mini" v-model="form.fdElType" :clearable="true">
            <el-option label="EL" value="1"></el-option>
            <el-option label="SQL" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="EL表达式"  :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.fdElContent" style="width:500px" show-word-limit maxlength="1000"></el-input>
        </el-form-item>
        <el-form-item label="参数"  :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.fdElParam" placeholder="el表达式参数,多参数用‘,’隔开" style="width:500px" show-word-limit maxlength="200"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleAdd()" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- --------------------------------------------------------编辑弹出框 -->
    <el-dialog title="修改规则配置"  :visible.sync="dialogEditVisible" append-to-body>
      <el-form :model="editForm" size="mini" label-width="80px" ref="editForm" inline :rules="rules">
        <!-- <el-form-item label="需求编号" prop="xqbh" :label-width="formLabelWidth">
          <el-input v-model="editForm.xqbh" autocomplete="off" disabled></el-input>
        </el-form-item>
         <el-form-item label="查询编号" prop="cxbh" :label-width="formLabelWidth">
          <el-input v-model="editForm.cxbh" autocomplete="off" disabled></el-input>
        </el-form-item> -->
        <el-form-item label="脚本编号" prop="fdScriptId" :label-width="formLabelWidth">
          <el-input v-model="editForm.fdScriptId" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="原脚本序号" prop="scriptSort" :label-width="formLabelWidth">
          <el-input-number controls-position="right"  disabled v-model="editForm.scriptSort" :min="1" :max="100" autocomplete="off"></el-input-number>
        </el-form-item>
        <el-form-item label="新脚本序号" prop="scriptSort" :label-width="formLabelWidth">
          <el-input-number controls-position="right" v-model="editForm.newScriptSort" :min="1" :max="100" autocomplete="off"></el-input-number>
        </el-form-item>
        <el-form-item label="脚本内容" prop="scriptContent" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="editForm.scriptContent" style="width:500px" maxlength="3000" show-word-limit :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="是否EL" prop="scriptContent" :label-width="formLabelWidth">
          <el-select size="mini" v-model="editForm.isEl">
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="EL表达式类型" :label-width="formLabelWidth">
          <el-select size="mini" v-model="editForm.fdElType" :clearable="true">
            <el-option label="EL" value="1"></el-option>
            <el-option label="SQL" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="EL表达式"  :label-width="formLabelWidth">
          <el-input type="textarea" v-model="editForm.fdElContent" style="width:500px" show-word-limit maxlength="1000"></el-input>
        </el-form-item>
        <el-form-item label="参数"  :label-width="formLabelWidth">
          <el-input type="textarea" v-model="editForm.fdElParam" placeholder="el表达式参数,多参数用‘,’隔开" style="width:500px" show-word-limit maxlength="200"></el-input>
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
import Sortable from "sortablejs";
const defaultFormThead = [
  // { key: "xqbh", name: "需求编号", show: true },
  // { key: "cxbh", name: "查询编号", show: true },
  { key: "fdScriptId", name: "脚本编号", show: true },
  { key: "scriptSort", name: "脚本序号", show: true },
  { key: "scriptContent", name: "脚本内容", show: true },
  { key: "isEl", name: "是否EL", show: true,
    formatter: row => {
          if (row.isEl == "1") {
            return "是";
          }else  {
            return "否";
          }
        }  
  },
   { key: "fdElType", name: "EL表达式类型", show: true,
    formatter: row => {
          if (row.fdElType == "1") {
            return "EL";
          }else if (row.fdElType == "2") {
            return "SQL";
          }else  {
            return "";
          }
        }  
  },
  { key: "fdElContent", name: "EL表达式", show: true },
  { key: "fdElParam", name: "参数", show: true }
  
];
export default {
  props:{
      fdScriptId:{
          type:String,
          default:""
      }
  },
  data() {
    return {
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
      formLabelWidth: "120px",
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
        fdScriptId: "",
      },
      style: {},
      rules: {
        scriptSort: [
          { required: true, message: "请输入脚本序号", trigger: "blur" }
        ],
        scriptContent: [
          { required: true, message: "请输入脚本内容", trigger: "blur" }
        ],
        fdScriptId: [
          { required: true, message: "请输入脚本编号", trigger: "blur" }
        ],
        isEl: [
          { required: true, message: "请选择是否EL", trigger: "change" }
        ]
      },
   
      form: {
        isEl: "0",
        scriptContent: "",
        fdScriptId: "",
        scriptSort:1,
        fdElContent:"",
        fdElParam:"",
        fdElType:""
      },
      editForm: {
        isEl: "0",
        scriptContent: "",
        fdScriptId: "",
        scriptSort:1,
        newScriptSort:1,                        
        fdElContent:"",
        fdElParam:"",
        fdElType:""
      }
    };
  },

  mounted() {
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
   /*  handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "序号",
          "配置编号",
          "中心代码",
          "脚本编号",
          "EL表达式类型",
          "EL表达式"
        ];
        const filterVal = [
          "id",
          "fdCfgCode",
          "fdCfgDist",
          "fdScriptId",
          "fdElType",
          "fdElContent"
        ];
        const data = this.formatJson(filterVal, this.tableData);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list-role"
        });
        this.downloadLoading = false;
      });
    }, */
    formatJson(filterVal, jsonData) {
      let i = 0;
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "id") {
            i++;
            return i;
          } else if (j === "fdElType") {
            if (v[j] == '1') {
              return "EL";
            } else if (v[j] == '2') {
              return "SQL";
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
     this.ruleForm.fdScriptId =this.fdScriptId;
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        ...this.ruleForm
      };
      this.$api.formPost("/api/dyncscript/scriptRule/doGetList", params).then(res => {
        if (res.retHead.code == "0000000") {
          this.tableData = res.retBody.list;
          console.log(this.tableData );
          this.total = res.retBody.total;
          this.currentPage = res.retBody.pageNum;
          // this.setSort();//可移动
        }
      });
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      this.sortable = Sortable.create(el, {
        ghostClass: "sortable-ghost", // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData("Text", "");
        },
        onEnd: evt => {
          const targetRow = this.tableData.splice(evt.oldIndex, 1)[0];
          this.tableData.splice(evt.newIndex, 0, targetRow);
        }
      });
    },
    showDialog() {
      this.dialogFormVisible = true;
      this.form.fdScriptId=this.fdScriptId;
    },
    showEditDialog(index, row) {
      this.dialogEditVisible = true;
      let id=row.scriptSort;
      this.$nextTick(()=>{
           this.editForm = JSON.parse(JSON.stringify(row));
          this.$set(this.editForm, 'newScriptSort',id);
          
      });
     
    },
    handleAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          if(this.form.scriptContent){
            this.form.scriptContent=this.$jhEncrypt.ctxToSM4(this.form.scriptContent);
          }
          this.$api
            .formPost("/api/dyncscript/scriptRule/doSave", this.form)
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
        if (valid) {
          if(this.editForm.scriptContent){
            this.editForm.scriptContent=this.$jhEncrypt.ctxToSM4(this.editForm.scriptContent);
          }
          this.$api
            .formPost("/api/dyncscript/scriptRule/doModByFdScriptIdAndScriptSort", this.editForm)
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
            .formPost("/api/dyncscript/scriptRule/doRmByFdScriptIdAndScriptSort", {
              fdScriptId: row.fdScriptId,
              scriptSort: row.scriptSort
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
                  message: "删除失败！",
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
    },
   
  },
  created() {}
};
</script>
<style lang='scss' scoped>
@import '@/assets/dialogCenter.scss';
// /deep/ .sortable-ghost  {
//   opacity: 0.8 !important;
//   color: #fff !important;
//   background: #42b983 !important;
// }
</style>