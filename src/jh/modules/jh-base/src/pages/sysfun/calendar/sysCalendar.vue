<template>
  <div class="sysCalendar">
    <div class="head">
      <div class="left">
        选择年份：
        <el-select v-model="year" @change="selectYearChange" placeholder="请选择" >
          <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="right">
        <div class="item">
          <div class="label">工作日</div>
          <div class="activeBox"></div>
        </div>
        <div class="item">
          <div class="label">非工作日</div>
          <div class="defaultBox"></div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="box" v-for="(item,key) in 12" :key="key">
        <calendar
          ref="calendar"
          @setActive="setActive"
          @getItem="getItem"
          :showBtn="false"
          :year="year"
          :list="noWorkingList "
          :month="item-1"
        ></calendar>
      </div>
    </div>
    <el-dialog :title="selectData.value" :visible.sync="dialogVisible" width="240px">
      <span style="margin-left:65px;">
        <el-switch v-model="working" active-text="工作日"></el-switch>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" >取 消</el-button>
        <el-button type="primary" @click="ok" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import calendar from "../../../components/calendar/calendar";
export default {
  components: { calendar },
  data() {
    return {
      options: [
        new Date().getFullYear() - 1,
        new Date().getFullYear(),
        new Date().getFullYear() + 1,
        new Date().getFullYear() + 2
      ],
      dialogVisible: false,
      year: new Date().getFullYear(),
      selectData: {},
      working: false,
      noWorkingList: []
    };
  },
  computed: {},
  mounted() {
    this.getNoworkingList();
  },
  methods: {
    selectYearChange() {
      this.getNoworkingList();
    },
    getNoworkingList() {
      let params = { year: this.year };
      this.$api.formPost("/api/basfun/calendar/doGetList",params).then(res => {
        if (res.retHead.code == "0000000") {
          this.noWorkingList = [];
          this.noWorkingList = res.retBody;
        }
      });
    },
    ok() {
      this.dialogVisible = false;
      if (!this.working) {
        this.addNoWorking();
      } else {
        this.delNoWorking();
      }
    },
    addNoWorking() {
      let params = {
        value: this.selectData.value
      };
      this.$api.formPost("/api/basfun/calendar/doSave",params).then(res => {
        if (res.retHead.code == "0000000") {
          this.getNoworkingList();
          this.$message.success("操作成功！");
        }
      });
    },
    delNoWorking() {
      let params = {
        value: this.selectData.value
      };
      this.$api.formPost("/api/basfun/calendar/doRmByValue",params).then(res => {
        if (res.retHead.code == "0000000") {
          this.getNoworkingList();
          this.$message.success("操作成功！");
        }
      });
    },
    setActive(v) {
      for (let index = 0; index < 12; index++) {
        this.$refs.calendar[index].clearAllActive(v.value);
      }
    },
    getItem(v) {
      this.dialogVisible = true;
      this.selectData = v;
      this.working = v.params.working;
    }
  },
  created() {}
};
</script>
<style lang='scss' scoped>
.sysCalendar {
  padding: 16px;
}
.content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .box {
    width: 380px;
    min-height: 240px;
    background-color: #fff;
    padding: 10px;
    margin-bottom: 16px;
    margin-right: 16px;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
  }
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  .right {
    display: flex;
    .item {
      display: flex;
      margin-right: 30px;
      .label{
        margin-right: 10px;
      }
      .box {
        width: 30px;
        height: 20px;
        border: 1px solid #ccc;
      }
    }
  }
}
.defaultBox {
  width: 20px;
  height: 20px;
  background: rgba(255, 24, 24, 0.1);
  border-radius: 16px;
  border: 1px solid #FF1818;
}
.activeBox {
  width: 20px;
  height: 20px;
  border-radius: 16px;
  border: 1px solid #CCCCCC;
}
</style>