<template lang="html">
  <div :val="value_">
    <el-radio-group v-model="type">
      <div>
        <el-radio label="1" >每时</el-radio>
      </div>
      <div>
        <el-radio label="2" >周期</el-radio>
        <span style="margin-left: 10px; margin-right: 5px;">从</span>
        <el-input-number  @change="type = '2'" :max="23" :min="0" v-model="cycle.start"></el-input-number>
        <span style="margin-left: 5px; margin-right: 5px;">点，到</span>
        <el-input-number  @change="type = '2'" :max="23" :min="0" v-model="cycle.end"></el-input-number>
        点
      </div>
      <div>
        <el-radio label="3" >循环</el-radio>
        <span style="margin-left: 10px; margin-right: 5px;">从</span>
        <el-input-number  @change="type = '3'" :max="59" :min="0" v-model="loop.start"></el-input-number>
        <span style="margin-left: 5px; margin-right: 5px;">时开始，每</span>
        <el-input-number  @change="type = '3'" :max="59" :min="0" v-model="loop.end"></el-input-number>
        小时执行一次
      </div>  
      <div>
      <el-radio label="4" >指定</el-radio>
      <el-checkbox-group @change="type = '4'" v-model="appoint">
        <div v-for="i in 3" :key="i" style="margin-left: 10px; line-height: 25px;">
          <el-checkbox v-for="j in 10" v-if="parseInt((i - 1) + '' + (j - 1)) < 24" :key="j" :label="(i - 1) + '' + (j - 1)"></el-checkbox >
        </div>
      </el-checkbox-group >
      </div> 
    </el-radio-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: '1', // 类型
      cycle: { // 周期
        start: 0,
        end: 0
      },
      loop: { // 循环
        start: 0,
        end: 23
      },
      week: { // 指定周
        start: 0,
        end: 0
      },
      appoint: [] // 指定
    }
  },  
  computed: {
    value_ () {
      let result = []
      switch (this.type) {
        case '1': // 每秒
          result.push('*')
          break
        case '2': // 年期
          result.push(`${this.cycle.start}-${this.cycle.end}`)
          break
        case '3': // 循环
          result.push(`${this.loop.start}/${this.loop.end}`)
          break
        case '4': // 指定
          result.push(this.appoint.join(',') ? this.appoint.join(',') : '?')
          break
      };
      this.$emit('child-say',result.join(''));
      return result.join('')
    }
  },
  methods:{
    init(hVal) {
      if(hVal=='*' || hVal=='' || hVal=='0'){
        this.type='1';
        this.cycle.start=0;
        this.cycle.end=0;
        this.loop.start=0;
        this.loop.end=23;
        this.appoint=[];
        //console.log(1);
      }else if(hVal.indexOf('-')>=0){
        this.type='2';
        this.cycle.start=hVal.split('-')[0];
        this.cycle.end=hVal.split('-')[1];
        this.loop.start=0;
        this.loop.end=23;
        this.appoint=[];
        //console.log(2);
      }else if(hVal.indexOf('/')>=0){
        this.type='3';
        this.cycle.start=0;
        this.cycle.end=0;
        this.loop.start=hVal.split('/')[0];
        this.loop.end=hVal.split('/')[1];
        this.appoint=[];
        //console.log(3);
      }else{
        this.type='4';
        this.cycle.start=0;
        this.cycle.end=0;
        this.loop.start=0;
        this.loop.end=23;
        this.appoint=[];
        let larray = hVal.split(',');
        larray.forEach(e => {
          this.appoint.push(e);
        });
      }      
    },
  }
}
</script>

<style lang="css" scoped>
.el-checkbox+.el-checkbox {
    margin-left: 10px;
}
</style>
