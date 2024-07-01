/*
getFulleYear(); // 年
getMonth(); // 月， 0-11
getDate();  // 日，也就是几号
getDay();   // 星期几，0-6
new Date(2019,2,10);  // 实际上就是 2019-03-10
new Date(2019,2,0);   // 实际上是 2019-02-28, 也就是2月份的最后一天
new Date(2019,2,-1);  // 实际上是 2019-02-27, 也就是2月份的倒数第二天

var d = new Date();
d.setTime( new Date(2018,1,1).getTime() );   
d.getFullYear();   // 2018 , setTime 允许传入毫秒数来更改实例对象
*/

<template>
  <div class="calendar">
    <div class="calendar-title">
      <div v-show="showBtn" class="arrow" @click="prevMonth">上一月</div>
      <div class>{{ `${current.month+1}月`}}</div>
      <div v-show="showBtn" class="arrow" @click="nextMonth">下一月</div>
    </div>
    <div class="calendar-body">
      <div class="calendar-week">
        <div class="week-item" v-for="item of weekList" :key="item">{{ item }}</div>
      </div>
      <div class="calendar-day">
        <div
          @click="setActive(item)"
          @dblclick="getItem(item)"
          class="day-item"
          :class="[item.disable ? 'disabled' : '',item.type ? item.type : '',item.today?'today':'',item.params.working?'':'noworking']"
          v-for="(item,index) in calendarList"
          :key="index"
        >
          <div>
            {{item.date}}
          </div>
          <span
            class="something"
            v-if="item.params.something"
          >{{item.params.something}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weekList: ["日", "一", "二", "三", "四", "五", "六"],
      current: {},
      calendarList: [],
      shareDate: new Date()
    };
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    year: {
      type: Number,
      default: new Date().getFullYear()
    },
    month: {
      type: Number,
      default: new Date().getMonth()
    },
    showBtn: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    list: function(v) {
      this.calendarList.forEach(item => {
          item.params.working = true
        if (v.length > 0) {
          v.forEach(item1 => {
            if (item1.value == item.value) {
              item.params.working = false;
            }
          });
        }
      });
    },
    year:function(v){
      this.current.year = v
      this.init()
    }
  },
  methods: {
    setCurrent(d = new Date()) {
      let year = this.year;
      let month = this.month;
      let date = d.getDate();
      this.current = {
        year:year,
        month,
        date
      };
    },
    setActive(v) {
      if (v.disable) {
        return false;
      }
      this.calendarList.forEach(item => {
        if (item.type == "active") {
          item.type = "";
        }
      });
      v.type = "active";
      this.$emit("setActive", v);
    },
    getItem(v) {
      this.$emit("getItem", v);
    },
    clearAllActive(v) {
      this.calendarList.forEach(item => {
        if (item.type == "active") {
          item.type = "";
        }
        if (item.value == v && !item.disable) {
          item.type = "active";
        }
      });
    },
    init() {
      this.setCurrent();
      this.calendarCreator();
      this.setSomething();
    },
    setSomething() {
      this.calendarList.forEach(item => {
        if (this.list.length > 0) {
          this.list.forEach(item1 => {
            if (item1.value == item.value) {
              //   alert(1234);
              //   item.params.something = item1.value;
              item.params.working = false;
            }
          });
        }
      });
    },
    stringify(year, month, date) {
      let str = [year, this.pad(month + 1), this.pad(date)].join("-");
      return str;
    },
    // 当前月的第一天是星期几
    getFirstDayByMonths(year, month) {
      return new Date(year, month, 1).getDay();
    },
    // 当前月的最后一天是星期几
    getLastDayByMonth(year, month) {
      return new Date(year, month + 1, 0).getDay();
    },
    // 点击上一月
    prevMonth() {
      this.current.month--;
      // 因为 month的变化 会超出 0-11 的范围， 所以需要重新计算
      this.correctCurrent();
      // 生成新日期
      this.calendarCreator();
      this.setSomething();
    },
    // 点击下一月
    nextMonth() {
      this.current.month++;
      // 因为 month的变化 会超出 0-11 的范围， 所以需要重新计算
      this.correctCurrent();
      // 生成新日期
      this.calendarCreator();
      this.setSomething();
    },
    // 修正 current
    correctCurrent() {
      let { year, month, date } = this.current;

      let maxDate = this.getDaysByMonth(year, month);
      // 预防其他月跳转到2月，2月最多只有29天，没有30-31
      date = Math.min(maxDate, date);
      let instance = new Date(year, month, date);
      this.setCurrent(instance);
    },
    // 判断当前月有多少天
    getDaysByMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    },
    // 对小于 10 的数字，前面补 0
    pad(str) {
      return str < 10 ? `0${str}` : str;
    },
    // 生成日期
    calendarCreator() {
      // 一天有多少毫秒
      const oneDayMS = 24 * 60 * 60 * 1000;

      let list = [];
      let { year, month } = this.current;

      // 当前月，第一天和最后一天的毫秒数
      // 当前月份第一天是星期几, 0-6
      let firstDay = this.getFirstDayByMonths(year, month);
      // 填充多少天，因为我将星期日放到最后了，所以需要另外调整下
      let prefixDaysLen = firstDay;
      // 向前移动之后的毫秒数
      let begin = new Date(year, month, 1).getTime() - oneDayMS * prefixDaysLen;

      // 当前月份最后一天是星期几, 0-6
      let lastDay = this.getLastDayByMonth(year, month);
      // 填充多少天，因为我将星期日放到最后了，所以需要另外调整下
      let suffixDaysLen = 6 - lastDay;
      // 向后移动之后的毫秒数
      let end =
        new Date(year, month + 1, 0).getTime() + oneDayMS * suffixDaysLen;

      while (begin <= end) {
        // 享元模式，避免重复 new Date
        this.shareDate.setTime(begin);
        let year = this.shareDate.getFullYear();
        let curMonth = this.shareDate.getMonth();
        let date = this.shareDate.getDate();
        let day = this.shareDate.getDay();
        let value = this.stringify(year, curMonth, date);

        list.push({
          year: year,
          month: curMonth,
          date: date,
          day: day,
          type: "",
          disable: curMonth !== month, // 新增 disable 属性
          value: value,
          today:
            value ==
            this.stringify(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate()
            )
              ? true
              : false,
          params: {
            // working: day == 6 || day == 0 ? false : true,
            working: true,
            something: ""
          }
        });
        begin += oneDayMS;
      }
      this.calendarList = list;
    }
  }
};
</script>

<style lang="scss" scoped>
.calendar {
  background-color: #fff;
  padding: 10px;
  .calendar-title {
    padding: 10px;
    display: flex;
    font-size: 24px;
    font-weight: bold;
    justify-content: space-around;
    .arrow {
      cursor: pointer;
    }
  }
  .calendar-body {
    // border-bottom: 1px solid #f1f1f1;
    // border-right: 1px solid #f1f1f1;
    .calendar-week,
    .calendar-day {
      display: flex;
      flex-wrap: wrap;
    }

    .week-item,
    .day-item {
      width: calc(100%/7);
      height: 32px;
      margin: 3px auto;
      text-align: center;
      min-height: 30px;
      line-height: 30px;
      // border: 1px solid #f1f1f1;
      // border-bottom: none;
      // border-right: none;
      .something {
        padding: 0 10px;
      }
    }
    .today {
      color: #1890ff;
    }
    .noworking {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .noworking div{
      width: 32px;
      height: 32px;
      background: rgba(255, 24, 24, 0.1);
      border: 1px solid #FF1818;
      border-radius: 30px;
    }
    .active {
      background-color: #1890ff;
      color: #fff;
    }
    .disabled {
      cursor: no-drop;
      color: #ccc;
    }
  }
}
</style>