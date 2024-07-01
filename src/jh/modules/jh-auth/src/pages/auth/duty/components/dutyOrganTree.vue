<template>
  <div class>
    <el-dialog title="职务权限" width="340" :visible.sync="qxDialogShow">
      <div class style="padding:20px;height:70vh;overflow:auto;">
        <el-tree
          ref="tree"
          :data="allOrgansJson"
          show-checkbox
          :props="props"
          node-key="id"
          :default-expanded-keys="checks"
          :default-checked-keys="checks"
        >
          <!-- <span class="custom-tree-node" slot-scope="{ node,data }">
            <span>{{ node.label }}</span>
            <span v-for="item in data.functionList" :key="item.id">
              {{item.functionName}}
              <el-switch @change="switchChange(item)" v-model="item.ownerFlag"></el-switch>
            </span>
          </span>-->
        </el-tree>

        <el-table 
            ref="multipleTable" 
            row-key="id"
            :data="allOrgansJson" 
            tooltip-effect="dark" 
            style="width: 100%" 
            default-expand-all
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            @selection-change="handleSelectionChange">

          <el-table-column  type="selection" checked="ownerFlag" width="55"></el-table-column>
          <el-table-column  prop="organName" label="机构名称" width="220"></el-table-column>
          <el-table-column  prop="superName" label="上级机构" show-overflow-tooltip></el-table-column>
        </el-table>



      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary"  @click="getNewChenked">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    dutyId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      qxDialogShow: false, //权限
      allOrgansJson: [],
      allOrgansList: [],
      multipleSelection: [],
      checks: [],
      props: {
        label: "organName",
        children: "children"
      }
    };
  },
  watch: {
    dutyId: function(v) {
      this.init();
    },
    multipleTable(n,o){
        this.$nextTick( ()=> {
            this.allOrgansJson.forEach(row => {
              if(row.ownerFlag==true){
                this.$refs.multipleTable.toggleRowSelection(row,true);
              }
            })
        })
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      let params = {
        dutyId: this.dutyId
      };
      this.allOrgansJson = await this.doGetAllOrganJson(params);
      this.allOrgansList = await this.doGetAllOrganList(params);
      this.getListCkecked();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    doGetAllOrganJson(params) {
      return new Promise((resolve, reject) => {
        this.$api.formPost( "/api/auth/sysdutyorgan/doGetAllOrganJsonByDutyId",params).then(res => {
          if (res.retHead.code == "0000000") {
            resolve(res.retBody);
          } else {
            this.$message.error("发生错误！");
          }
        });
      });
    },
    doGetAllOrganList(params) {
      return new Promise((resolve, reject) => {
        this.$api.formPost( "/api/auth/sysdutyorgan/doGetAllOrganListByDutyId",params).then(res => {
          if (res.retHead.code == "0000000") {
            resolve(res.retBody);
          } else {
            this.$message.error("发生错误！");
          }
        });
      });
    },
    getListCkecked() {
      this.checks = [];
      this.deepFor(this.allOrgansJson);
    },
    getNewChenked() {
      let list = this.$refs.tree.getCheckedNodes();
      let arr = []; //功能id
      list.forEach(item => {
        arr.push(item.id);
      });

      let params = {
        dutyId: this.dutyId,
        organIds: [
          ...this.$refs.tree.getHalfCheckedKeys(),
          ...arr
        ]
      };
      this.edit(params);
    },
    edit(params) {
      this.$api.formPost( "/api/auth/sysdutyorgan/doAddDutyOrgan",prams).then(res => {
        if (res.retHead.code == "0000000") {
          this.$message.success(res.retHead.message);
          this.qxDialogShow = false;
        } else {
          this.$message.error("发生错误！");
        }
      });
    },
    deepFor(list) {
      list.forEach(item => {
        if (item.children.length > 0) {
          this.deepFor(item.children);
        } else {
          if (item.ownerFlag) {

            this.$refs.multipleTable.toggleRowSelection(item,true);

            if (this.checks.indexOf(item.id) < 0) {
              this.checks.push(item.id);
            }
          }
        }
      });
    }
  },
  created() {}
};
</script>
<style lang='scss' scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>