<template>
  <div class>
    <el-dialog title="职务权限" width="340" :visible.sync="organTableShow">
      <div class style="padding:20px;height:70vh;overflow:auto;">

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
      organTableShow: false, //权限
      allOrgansJson: [],
      allOrgansList: [],
      multipleSelection: [],
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
      this.getListCkecked(await this.allOrgansJson);
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
    getListCkecked(list) {
      this.deepFor(list);
    },
    deepFor(list) {
      list.forEach(item => {
        if (item.children.length > 0) {
          if (item.ownerFlag) {
            this.$refs.multipleTable.toggleRowSelection(item,true);
          }
          this.deepFor(item.children);
        } else {
          if (item.ownerFlag) {
            this.$refs.multipleTable.toggleRowSelection(item,true);
          }
        }
      });
    },
    getNewChenked() {

      let list = this.multipleSelection;
      let arrOrganId = []; 
      list.forEach(item => {
        arrOrganId.push(item.id);
      });

      let params = {
        dutyId: this.dutyId,
        organIds: [
          ...arrOrganId
        ]
      };
      this.edit(params);
    },
    edit(params) {
      this.$api.formPost( "/api/auth/sysdutyorgan/doAddDutyOrgan",params).then(res => {
        if (res.retHead.code == "0000000") {
          this.$message.success(res.retHead.message);
          this.organTableShow = false;
        } else {
          this.$message.error("发生错误！");
        }
      });
    },

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