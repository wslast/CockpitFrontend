<template lang="html">
  <div :val="value_">
    <el-radio-group v-model="type">
      <div>
        <el-radio label="1" >每周</el-radio>
      </div>
      <div>
        <el-radio label="5" >不指定</el-radio>
      </div>
      <div>
        <el-radio label="2" >周&emsp;期</el-radio>
        <span style="margin-left: 10px; margin-right: 5px;">从星期</span>
        <el-input-number  @change="type = '2'" :max="7" :min="1" v-model="cycle.start"></el-input-number>
        <span style="margin-left: 5px; margin-right: 5px;">至星期</span>
        <el-input-number  @change="type = '2'" :max="7" :min="1" v-model="cycle.end"></el-input-number>
      </div>
      <div>
        <el-radio label="3" >循&emsp;环</el-radio>
        <span style="margin-left: 10px; margin-right: 5px;">从星期</span>
        <el-input-number  @change="type = '3'" :max="7" :min="1" v-model="loop.start"></el-input-number>
        <span style="margin-left: 5px; margin-right: 5px;">开始，每</span>
        <el-input-number  @change="type = '3'" :max="7" :min="1" v-model="loop.end"></el-input-number>
        天执行一次
      </div> 
      <div>
        <el-radio label="7">指定周</el-radio>
        <span style="margin-left: 10px; margin-right: 5px;">本月第</span>
        <el-input-number  @change="type = '7'" v-model="week.start" :min="1" :max="4"></el-input-number>
        <span style="margin-left: 5px; margin-right: 5px;">周，星期</span>
        <el-input-number  @change="type = '7'" v-model="week.end" :min="1" :max="7"></el-input-number>
      </div> 
      <div>
        <el-radio v-model="type" label="6" size="small">本月最后一个</el-radio>
        <span style="margin-left: 10px; margin-right: 5px;">星期</span>
        <el-input-number  @change="type = '6'" v-model="last" :min="1" :max="7"></el-input-number>
      </div>
      <div>
        <el-radio label="4">指定</el-radio>
        <el-checkbox-group @change="type = '4'" v-model="appoint">
        <div v-for="i in 2" :key="i" style="margin-left: 10px; line-height: 25px;">
          <el-checkbox v-for="j in 8" v-if="parseInt((i - 1) + '' + (j - 1)) < 8 && !(i === 1 && j === 1)" :key="j" :label="(i - 1) + '' + (j - 1)"></el-checkbox >
        </div>
      </el-checkbox-group >
      </div> 
    </el-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "5", // 类型
      cycle: {
        // 周期
        start: 0,
        end: 0
      },
      loop: {
        // 循环
        start: 0,
        end: 0
      },
      week: {
        // 指定周
        start: 0,
        end: 0
      },
      work: 0,
      last: 0,
      appoint: [] // 指定
    };
  },
  computed: {
    value_() {
      let result = [];
      switch (this.type) {
        case "1": // 每秒
          result.push("*");
          break;
        case "2": // 年期
          result.push(`${this.cycle.start}-${this.cycle.end}`);
          break;
        case "3": // 循环
          result.push(`${this.loop.start}/${this.loop.end}`);
          break;
        case "4": // 指定
          result.push(this.appoint.join(",") ? this.appoint.join(",") : "?");
          break;
        case "6": // 最后
          result.push(`${this.last === 0 ? "" : this.last}L`);
          break;
        case "7": // 指定周
          result.push(`${this.week.start}#${this.week.end}`);
          break;
        default:
          // 不指定
          result.push("?");
          break;
      }
      this.$emit("child-say", result.join(""));
      return result.join("");
    }
  },
  methods:{
    init(val) {
      if(val=='*'  || val=='0'){
        this.type='1';
        this.cycle.start=1;
        this.cycle.end=1;
        this.loop.start=1;
        this.loop.end=1;
        this.week.start=1;
        this.week.end=1;
        this.last=0;
        this.work=1;
        this.appoint=[];
      }else if(val=='?' || val==''){
        this.type='5';
        this.cycle.start=1;
        this.cycle.end=1;
        this.loop.start=1;
        this.loop.end=1;
        this.week.start=1;
        this.week.end=1;
        this.last=0;
        this.work=1;
        this.appoint=[];
      }else if(val.indexOf('L')>=0){
        this.type='6';
        this.cycle.start=1;
        this.cycle.end=1;
        this.loop.start=1;
        this.loop.end=1;
        this.week.start=1;
        this.week.end=1;
        this.last=0;
        this.work=1;
        this.appoint=[];
        this.work=val.split('L')[0];
      }else if(val.indexOf('-')>=0){
        this.type='2';
        this.cycle.start=val.split('-')[0];
        this.cycle.end=val.split('-')[1];
        this.loop.start=1;
        this.loop.end=1;
        this.week.start=1;
        this.week.end=1;
        this.last=0;
        this.work=1;
        this.appoint=[];
      }else if(val.indexOf('/')>=0){
        this.type='3';
        this.cycle.start=1;
        this.cycle.end=1;
        this.week.start=1;
        this.week.end=1;
        this.last=0;
        this.work=1;
        this.loop.start=val.split('/')[0];
        this.loop.end=val.split('/')[1];
        this.appoint=[];
        this.last=0;
        this.work=1;
      }else if(val.indexOf('#')>=0){
        this.type='7';
        this.cycle.start=1;
        this.cycle.end=1;
        this.week.start=1;
        this.week.end=1;
        this.last=0;
        this.work=1;
        this.loop.start=val.split('#')[0];
        this.loop.end=val.split('#')[1];
        this.appoint=[];
        this.last=0;
        this.work=1;
      }else{
        this.type='4';
        this.cycle.start=1;
        this.cycle.end=31;
        this.loop.start=0;
        this.loop.end=0;
        this.last=0;
        this.work=1;
        this.appoint=[];
        let larray = val.split(',');
        larray.forEach(e => {
          this.appoint.push(e);
        });
      }      
    },
  }
};
</script>

<style lang="css" scoped>
.el-checkbox + .el-checkbox {
  margin-left: 10px;
}
</style>
