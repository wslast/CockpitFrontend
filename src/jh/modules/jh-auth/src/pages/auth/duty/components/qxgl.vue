<template>
  <div class>
    <el-dialog title="职务权限" width="340" :visible.sync="qxDialogShow">
      <div class style="padding:20px;height:70vh;overflow:auto;">
        <el-tree
          ref="tree"
          :data="functionList"
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
      functionList: [],
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
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      let params = {
        dutyId: this.dutyId
      };
      this.functionList = await this.getAllOrganJsonByDutyId(params);
      this.getListCkecked();
    },
    getAllOrganJsonByDutyId(params) {
      return new Promise((resolve, reject) => {
        this.$api.formPost( "/api/auth/sysdutyorgan/doGetAllOrganJsonByDutyId",params).then(res => {
          // console.log(res);
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
      this.deepFor(this.functionList);
    },
    getNewChenked() {
      // console.log(this.$refs.tree.getCheckedNodes()); //菜单id
      // console.log(this.$refs.tree.getHalfCheckedNodes()); //菜单id

      let list = this.$refs.tree.getCheckedNodes();
      let arr = []; //功能id
      list.forEach(item => {
        // item.functionList.forEach(item1 => {
        //   if (item1.ownerFlag) {
        arr.push(item.id);
        //   }
        // });
      });

      let params = {
        dutyId: this.dutyId,

        organIds: [
          // ...this.$refs.tree.getCheckedKeys(),
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
      console.log(list);
      list.forEach(item => {
        if (item.children.length > 0) {
          this.deepFor(item.children);
        } else {
          if (item.ownerFlag) {
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