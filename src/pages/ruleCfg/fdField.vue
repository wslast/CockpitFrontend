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
      <el-table-column show-overflow-tooltip :formatter="item.formatter" :min-width="item.width" v-for="(item,index) in allItemList" :key="index" :label="item.name" v-if="item.show">
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
  <div>
        <el-input style="display:none" ref="isCount" v-model="ruleForm.isCount" disabled autocomplete="off"></el-input>
  </div>
    <!-- --------------------------------------------------------添加弹出框 -->
    <el-dialog title="添加脚本列配置" width="50%" :visible.sync="dialogFormVisible" append-to-body>
      <el-form :model="form" size="mini" label-width="80px" ref="addForm" :rules="rules" inline>
        <el-form-item label="脚本编号" prop="fdScriptId" :label-width="formLabelWidth">
          <el-input v-model="form.fdScriptId" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="列代码" prop="gdFiledCode" :label-width="formLabelWidth">
          <el-input controls-position="right" v-model="form.gdFiledCode"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="列名" prop="gdFiledName" :label-width="formLabelWidth">
          <el-input controls-position="right" v-model="form.gdFiledName"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="列序号" prop="colSort" :label-width="formLabelWidth">
          <el-input-number controls-position="right" v-model="form.colSort" :min="1" :max="999" autocomplete="off"></el-input-number>
        </el-form-item>
        <el-form-item label="是否显示" prop="isShow"  :label-width="formLabelWidth">
          <el-select size="mini" v-model="form.isShow">
            <el-option label="显示" value="1"></el-option>
            <el-option label="不显示" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字段类型" prop="fieldType" :label-width="formLabelWidth">
          <el-select size="mini" v-model="form.fieldType">
            <el-option label="字符串" value="1"></el-option>
            <el-option label="数值" value="2"></el-option>
            <el-option label="日期" value="3"></el-option>
            <el-option label="金额" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否枚举" prop="isEnum"  :label-width="formLabelWidth">
          <el-select size="mini" v-model="form.isEnum">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="枚举code"  :label-width="formLabelWidth">
          <el-input controls-position="right" v-model="form.enumCode"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否计算列"  :label-width="formLabelWidth">
          <el-select size="mini" v-model="form.isCalcFiled">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否合计"  :label-width="formLabelWidth">
          <el-select size="mini" v-model="form.isTotal">
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="列宽" prop="fieldWidth" :label-width="formLabelWidth">
          <el-input controls-position="right" v-model="form.fieldWidth"  autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleAdd()" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- --------------------------------------------------------编辑弹出框 -->
    <el-dialog title="修改脚本列配置"  :visible.sync="dialogEditVisible" append-to-body>
      <el-form :model="editForm" size="mini" label-width="80px" ref="editForm" inline :rules="rules">
        <el-form-item label="脚本编号" prop="fdScriptId" :label-width="formLabelWidth">
          <el-input v-model="editForm.fdScriptId" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="原列代码"  prop="gdFiledCode" :label-width="formLabelWidth">
          <el-input controls-position="right"  disabled v-model="editForm.gdFiledCode"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新列代码" prop="newGdFiledCode" :label-width="formLabelWidth">
          <el-input controls-position="right"  v-model="editForm.newGdFiledCode"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="列名"  prop="gdFiledName" :label-width="formLabelWidth">
          <el-input controls-position="right"   v-model="editForm.gdFiledName"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="列序号"  prop="colSort" :label-width="formLabelWidth">
          <el-input-number controls-position="right"   v-model="editForm.colSort" :min="1" :max="999"  autocomplete="off"></el-input-number>
        </el-form-item>
        <el-form-item label="是否显示" prop="isShow" :label-width="formLabelWidth">
          <el-select size="mini" v-model="editForm.isShow">
            <el-option label="显示" value="1"></el-option>
            <el-option label="不显示" value="0"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="字段类型" prop="fieldType" :label-width="formLabelWidth">
          <el-select size="mini" v-model="editForm.fieldType">
            <el-option label="字符串" value="1"></el-option>
            <el-option label="数值" value="2"></el-option>
            <el-option label="日期" value="3"></el-option>
            <el-option label="金额" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否枚举" prop="isEnum" :label-width="formLabelWidth">
          <el-select size="mini" v-model="editForm.isEnum">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="枚举code"   :label-width="formLabelWidth">
          <el-input controls-position="right"   v-model="editForm.enumCode"  autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="是否计算列"  :label-width="formLabelWidth">
          <el-select size="mini" v-model="editForm.isCalcFiled">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否合计"  :label-width="formLabelWidth">
          <el-select size="mini" v-model="editForm.isTotal">
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="列宽" prop="fieldWidth" :label-width="formLabelWidth">
          <el-input controls-position="right" v-model="editForm.fieldWidth" autocomplete="off"></el-input>
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
  { key: "fdScriptId", name: "脚本编号", show: true,width:"120px" },
  { key: "gdFiledCode", name: "列代码", show: true ,width:"80px"},
  { key: "gdFiledName", name: "列名", show: true ,width:"120px"},
  { key: "colSort", name:"列序号", show:true,width:"60px"},
  { key: "isShow", name: "是否显示", show: true,width:"80px",
    formatter: row => {
          if (row.isShow == '1') {
            return "是";
          }else if (row.isShow == '0') {
            return "否";
          }else  {
            return "";
          }
        }  
  },
   { key: "fieldType", name: "字段类型", show: true,width:"80px",
    formatter: row => {
          if (row.fieldType == '1') {
            return "字符串";
          }else if (row.fieldType == '2') {
            return "数值";
          }else if (row.fieldType =="3"){
            return "日期";
          }else if (row.fieldType =="4"){
            return "金额";
          }else  {
            return "";
          }
        }  
  },
  { key: "isEnum", name:"是否枚举", show:true,width:"80px",
    formatter: row => {
          if (row.isEnum == '1') {
            return "是";
          }else if (row.isEnum == '0') {
            return "否";
          }else  {
            return "";
          }
        }  
  },
  { key: "enumCode", name: "枚举code", show: true,width:"120px" },
  { key: "isCalcFiled", name: "是否计算列", show: true ,width:"100px",
      formatter: row => {
          if (row.isCalcFiled == '1') {
            return "是";
          }else if (row.isCalcFiled == '0') {
            return "否";
          }else  {
            return "";
          }
        }
    },
    { key: "isTotal", name: "是否合计", show: true ,width:"80px",
      formatter: row => {
          if (row.isTotal == '1') {
            return "是";
          }else if (row.isTotal == '0') {
            return "否";
          }else  {
            return "";
          }
        }
    },
  { key: "fieldWidth", name: "列宽", show: true ,width:"120px"},
];
export default {
  props:{
      fdScriptId:{
          type:String,
          default:""
      },
      isCount:{
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
        isCount:"",
      },
      style: {},
      rules: {
        gdFiledCode: [
          { required: true, message: "请输入列代码", trigger: "blur" }
        ],
        newGdFiledCode:[
          { required: true, message: "请输入新列代码", trigger: "blur" }
        ],
        fdScriptId: [
          { required: true, message: "请输入脚本编号", trigger: "blur" }
        ],
        gdFiledName: [
          { required: true, message: "请输入列名", trigger: "blur" }
        ],
         colSort: [
          { required: true, message: "请输入列序号", trigger: "blur" }
        ],
         isShow: [
          { required: true, message: "请选择是否显示", trigger: "change" }
        ],
         fieldType: [
          { required: true, message: "请选择字段类型", trigger: "change" }
        ],
         isEnum: [
          { required: true, message: "请选择是否枚举", trigger: "change" }
        ],
        fieldWidth:[
          { pattern: /^\d+$/, message: '请输入正整数',trigger: "blur" }
        ]
      },
   
      form: {
        gdFiledCode: "",
        gdFiledName: "",
        colSort: 1,
        isShow:"",
        fieldType:"",
        isEnum:"",
        enumCode:"",
        isCalcFiled:"",
        isTotal:"",
        fieldWidth:"",
      },
      editForm: {
        gdFiledCode: "",
        gdFiledName: "",
        colSort: 1,
        isShow:"",
        fieldType:"",
        isEnum:"",
        enumCode:"",
        isCalcFiled:"",
        isTotal:"",
        fieldWidth:""
      }
    };
  },

  mounted() {
    //this.init();
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
    /* handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "序号",
          "列代码",
          "脚本编号",
          "列名",
          "列序号",
          "是否显示",
          "字段类型",
          "是否枚举",
          "枚举code",
          "是否计算列",
          "是否合计"
        ];
        const filterVal = [
          "id",
          "gdFiledCode",
          "fdScriptId",
          "gdFiledName",
          "colSort",
          "isShow",
          "fieldType",
          "isEnum",
          "enumCode",
          "isCalcFiled",
          "isTotal"
        ];
        const data = this.formatJson(filterVal, this.tableData);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list-field"
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
          } else if (j == "isShow") {
            if (v[j] == '1') {
              return "显示";
            } else if (v[j] == '0') {
              return "不显示";
            }else {
              return "";
            }
          }else if (j == "isEnum"){
            if (v[j] == '1') {
              return "是";
            } else if (v[j] == '0') {
              return "否";
            }else {
              return "";
            }
          } else if (j === "fieldType"){
            if (v[j] == '1') {
              return "字符串";
            } else if (v[j] == '2') {
              return "数值";
            }else if (v[j] == '3') {
              return "日期";
            }else if (v[j] =="4"){
              return "金额";
             }else {
              return "";
            }
          } else if (j === "isCalcFiled"){
            if (v[j] == '1') {
              return "是";
            } else if (v[j] == '0') {
              return "否";
            }else {
              return "";
            } 
          }else if (j === "isTotal"){
            if (v[j] == '1') {
              return "是";
            } else if (v[j] == '0') {
              return "否";
            }else {
              return "";
            } 
          }else {
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
     this.ruleForm.isCount =this.isCount;
     this.ruleForm.fdScriptId =this.fdScriptId;
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        ...this.ruleForm
      };
      this.$api.formPost("/api/dyncscript/field/doGetList", params).then(res => {
        if (res.retHead.code == "0000000") {
          this.tableData = res.retBody.list;
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
      let id=row.gdFiledCode;
      this.$nextTick(()=>{
           this.editForm = JSON.parse(JSON.stringify(row));
          this.$set(this.editForm, 'newGdFiledCode',id);
          
      });
     
    },
    handleAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          let isCount = this.$refs.isCount.value;
          let isTotle = this.form.isTotal;
          if(isTotle == "1" && (isCount != undefined && isCount != "1")){
            this.$message.error("脚本配置未定义【是否统计】,该脚本列定义【是否合计】将不被启用,请修改脚本配置【是否统计】参数！");
            return ;
          }
          this.$api
            .formPost("/api/dyncscript/field/doSave", this.form)
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
        let isCount = this.$refs.isCount.value;
        let isTotle = this.editForm.isTotal;
        if(isTotle == "1" && (isCount != undefined && isCount != "1")){
          this.$message.error("脚本配置未定义【是否统计】,该脚本列定义【是否合计】将不被启用,请修改脚本配置【是否统计】参数！");
          return ;
        }
        if (valid) {
          this.$api
            .formPost("/api/dyncscript/field/doModByFdScriptIdAndGdFiledCode", this.editForm)
            .then(res => {
              this.dialogEditVisible = false;
              if (res.retHead.code == "0000000") {
                this.$message.success("修改成功！");
                this.init();
              } else {
                this.$message.error("修改失败！"+res.retHead.message);
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
            .formPost("/api/dyncscript/field/doRmByFdScriptIdAndGdFiledCode", {
              scriptId: row.fdScriptId,
              gdFiledCode: row.gdFiledCode
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