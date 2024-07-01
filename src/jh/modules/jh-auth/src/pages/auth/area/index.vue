<template>
  <div>
    <div class="card tr mb2">
      <el-button  type="primary" icon="el-icon-plus" @click="showDialog" style="float:left">添加</el-button>
      <el-button  plain @click="expandAll()" style="float:left">展开/折叠所有</el-button>
      <el-popover placement="bottom" width="200" trigger="click">
        <el-checkbox-group v-model="showItemList">
          <el-checkbox v-for="(item,key) in allItemList" :key="key" :label="item"></el-checkbox>
        </el-checkbox-group>
        <el-button slot="reference" icon="el-icon-menu"  type="primary" circle></el-button>
      </el-popover>
      <el-button icon="el-icon-search" @click="formShow= !formShow"  type="primary" circle></el-button>
    </div>
    <el-table border  style="width: 100%" ref="tableTreeRef" @select-all="selectAll" :data="tableData" row-key="id"  :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <!-- <el-table-column
      type="selection"
      width="55">
    </el-table-column> -->
      <el-table-column prop="areaName" label="区域名称"  min-width="200">
      </el-table-column>
      <el-table-column prop="areaCode" label="区域编码"  min-width="180">
      </el-table-column>
      <el-table-column prop="areaTypeName" label="区域类型" min-width="180">
      </el-table-column>
      <el-table-column prop="address" label="备注" min-width="180">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="300">
        <template slot-scope="scope">
          <el-button type="primary"  icon="el-icon-edit" @click="edit(scope.row,scope.$index)">
            修改
          </el-button>
          <el-button type="danger"  icon="el-icon-delete" @click="deleteArea(scope.row,scope.$index)">
            删除
          </el-button>
          <el-button type="success"  icon="el-icon-add" @click="addChildren(scope.row,scope.$index)">
            添加下级区域
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="cancle">
      <el-form  :model="form" ref="addForm" :rules="rules">
        <el-form-item label="上级区域"  :label-width="formLabelWidth">
          <el-select v-model="form.parentId"  disabled>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.areaName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域名称"  :label-width="formLabelWidth" prop="areaName">
          <el-input v-model="form.areaName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="区域编码"  :label-width="formLabelWidth" prop="areaCode">
          <el-input v-model="form.areaCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="区域类型" :label-width="formLabelWidth" prop="areaType">
          <el-select v-model="form.areaType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注"  :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectflag:false,
      title:"新增区域",
      form:{},
      dialogFormVisible:false,
        options: [{
          value: '1',
          label: '国家'
        }, {
          value: '2',
          label: '省份、直辖市'
        }, {
          value: '3',
          label: '地市'
        }, {
          value: '4',
          label: '区县'
        }],
      formLabelWidth: "80px",
      isExpandAll: false,
      showItemList: [],
      allItemList: [],
      tableData: [
      ],
       list:[],
       rules:{
         areaName:[{ required: true, message: '请输入区域名称', trigger: 'change' },],
         areaCode:[{ required: true, message: '请输入区域编码', trigger: 'change' },],
         areaType:[{ required: true, message: '请输入区域类型', trigger: 'change' },]
       }
    };
  },
  mounted() {
        this.getAll();
        this.getList();
    },
  methods: {
    cancle(){
     this.form={};
     this.dialogFormVisible=false;
    },
    selectAll(val){
      if(this.selectflag){
        this.selectflag=false;
        this.select(this.tableData,false);
      }else{
        this.selectflag=true;
        this.select(this.tableData,true);
      }
    },
    select(val,flag){
    val.forEach(row => {
            this.$refs.tableTreeRef.toggleRowSelection(row,flag);
            if(row.children&&row.children.length>0){
              this.select(row.children,flag);
            }
          });
    },
    
    handleAdd(){
      
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                     this.$api.formPost( '/api/auth/sysArea/doSave',this.form).then(res => {
                        if (res.retHead.code === '0000000') {
                            this.getAll();
                            this.getList();
                            this.cancle();
                            this.$message({
                                type: 'success',
                                message: '保存成功!'
                            });
                        }else{
                          this.cancle();
                          this.$message({
                                type: 'error',
                                message: res.retHead.message
                            });
                        }
                    });
                } else {
                  return false;
                }
              });
    },
    edit(row,index){
      this.title="修改区域信息"

      this.form=JSON.parse(JSON.stringify(row));
      delete this.form.children;
      this.dialogFormVisible=true;
    },
    //新增下级区域
    addChildren(row,index){
      this.title="新增区域信息"
      this.dialogFormVisible=true;
      this.form.parentId=row.id;
    },
    getList(){
        let params={
          pageNum:1,
          pageSize:9999
        };
        this.$api.formPost( '/api/auth/sysArea/doGetList',params).then(res => {
            if (res.retHead.code === '0000000') {
                this.list = res.retBody.list;
            }
        });
    },
    getAll(){
        this.$api.formPost( '/api/auth/sysArea/doGetAll').then(res => {
            if (res.retHead.code === '0000000') {
                this.tableData = res.retBody;
            }
        });
    },
    deleteArea(row,index) {
        if(row.children&&row.children.length>0){

        }
    },
    showDialog() {
      this.title="新增区域信息"
      this.dialogFormVisible=true;
    },
    expandAll() {
      if (this.isExpandAll) {
        this. foldAll();
        this.isExpandAll = false;
      } else {
        this.unFoldAll();
        this.isExpandAll = true;
      }
    },
    /**
     * 展开所有下级
     */
    unFoldAll() {
      let queryResult = this.$refs.tableTreeRef.$el.children[2].querySelectorAll(
        "tr"
      );
      for (let i = 0; i < queryResult.length; i++) {
        let item = queryResult[i];
        item.style.display = "";
        let div = item.querySelectorAll("td > div > div")[0];
        if(div){
           div.setAttribute("class","el-table__expand-icon el-table__expand-icon--expanded");
        }
        
      }
    },
    /**
     * 收起所有下级
     */
    foldAll() {
      let queryResult = this.$refs.tableTreeRef.$el.children[2].querySelectorAll(
        "tr"
      );
      for (let i = 0; i < queryResult.length; i++) {
        let item = queryResult[i];
        if (item.getAttribute("class")!="el-table__row el-table__row--level-0") {
          item.style.display = "none";
        }
       let div = item.querySelectorAll("td > div > div")[0];
        if(div){
           div.setAttribute("class","el-table__expand-icon");
        }
      }
      // IE 不支持 forEach
      // this.$refs.tableTreeRef.$el.children[2].querySelectorAll('tr').forEach((item, index) => {
      //   if (index !== 0) {
      //     item.style.display = 'none'
      //   }
      //   let classList = item.querySelectorAll('td > div > div')[0].classList
      //   classList.contains('el-table__expand-icon') && item.querySelectorAll('td > div > div')[0].classList.remove('el-table__expand-icon--expanded')
      // })
    }
  }
};
</script>