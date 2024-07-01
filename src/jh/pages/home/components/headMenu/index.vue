<template>
  <div class="box" ref="box">
    <div class="list">
      <router-link
        :to="item.functionUrl"
        class="menuItem"
        v-for="item in list"
        :key="item.id"
        >{{ item.functionName }}</router-link
      >
    </div>

    <div class="icon" v-show="iconShow">
      <el-popover ref="popover" placement="bottom" title trigger="hover">
        <div class="otherBox">
          <div class="otherItem" v-for="item in otherList" :key="item.id">
            <router-link :to="item.functionUrl" class>{{
              item.functionName
            }}</router-link>
          </div>
        </div>
      </el-popover>
      <i
        class="el-icon-menu"
        style="font-size:24px;line-height:60px;"
        v-popover:popover
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iconShow: true,
      list: [],
      otherList: [],
      screenWidth: document.body.clientWidth
    };
  },
  mounted() {
    window.onresize = () => {
      this.watchMenu();
    };
    setTimeout(() => {
      this.watchMenu();
    }, 1000);
  },
  updated() {
    // this.watchMenu();
  },
  watch: {},
  methods: {
    watchMenu() {
      this.$nextTick(() => {
        let items = document.querySelectorAll(".menuItem");
        this.otherList = [];
        this.iconShow = true;
        let otherListNum = 0;
        for (let key in items) {
          if (items[key].offsetTop > 0) {
            otherListNum++;
          }
        }
        // items.forEach(item => {
        //   if (item.offsetTop > 0) {
        //     otherListNum++;
        //   }
        // });
        this.otherList = this.list.slice(this.list.length - otherListNum);
        // debugger;
        if (this.otherList.length == 0) {
          this.iconShow = false;
        }
      });
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: flex-start;
  .list {
    height: 60px;
    overflow: hidden;
    .menuItem,
    .item {
      display: inline-block;
      font-size: 14px;
      padding: 0 10px;
      cursor: pointer;
      &:hover {
        background-color: #f1f1f1;
      }
    }
  }
  .icon {
    cursor: pointer;
  }
}
.el-popover {
  .otherBox {
    max-height: 300px;
    overflow: auto;
    .otherItem {
      a {
        display: block;
        box-sizing: border-box;
        line-height: 30px;
        padding: 4px 10px;
        width: 100%;
        &:hover {
          background-color: #f2f2f2;
        }
      }
    }
  }
}
</style>
