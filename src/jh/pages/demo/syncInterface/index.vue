<!-- 同步获取数据 -->
<template>
  <div>
    <div v-for="item in resultList" :key="item" class="f24 p10">{{ item }}</div>
  </div>
</template>

<script>
export default {
  name: "syncInterface",
  components: {},

  data() {
    return {
      resultList: []
    };
  },

  computed: {},

  async created() {
    this.resultList.push("开始执行Api2");
    let api2 = await this.getApi2();
    this.resultList.push("api2返回数据" + api2);
    this.resultList.push("api2执行完毕");
    this.resultList.push("开始执行Api3");
    await this.getApi3();
    this.resultList.push("Api3执行完毕");
    this.resultList.push("开始执行getData");
    this.getData();
    this.resultList.push("开始执行链式调用");
    this.getApi1().then(res => {
      this.resultList.push("链式调用执行完毕");
    });
  },

  methods: {
    async getData() {
      let respone = await this.getApi4();
      this.resultList.push("getData执行完毕" + respone);
    },
    async getApi1() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("数据1");
        }, 6000);
      });
    },
    async getApi2() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("数据2");
        }, 3000);
      });
    },
    async getApi3() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("数据3");
        }, 3000);
      });
    },
    async getApi4() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("数据4");
        }, 3000);
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
