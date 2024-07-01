<template>
  <div class="content">
    <template v-if="!showDefault && cops.length > 0">
      <div
        v-for="item in cops"
        :key="item.name"
        :style="item.style"
        class="borderBox"
      >
        <template v-if="showIndex && item.isUse === '1'">
          <component
            v-if="item.compStyle == '1'"
            :is="item.compUrl"
          ></component>
          <iframe
            v-if="item.compStyle == '3'"
            :src="item.compUrl"
            frameborder="0"
            style="height:100%;width:100%;"
          ></iframe>
          <iframe
            v-if="item.compStyle == '2'"
            :src="origin + item.compUrl"
            frameborder="0"
            style="height:100%;width:100%;"
          ></iframe>
        </template>
        <template v-if="item.isUse != '1'">
          <div class="noPermisson"><span>暂无权限</span></div>
        </template>
      </div>
    </template>
    <template v-if="!showDefault && showIndex && cops.length === 0">
      <div class="welcome">
        <div>
          <img class="welcomeImg" src="@/assets/images/welcome.png" alt="" />
          <div class="welcomeContent">
            <el-link type="primary" href="/#/sysfun/desk/layout"
              >您还没有配置首页,点击这里去配置</el-link
            >
          </div>
        </div>
      </div>
    </template>
    <defaultDesk v-if="showDefault"></defaultDesk>
  </div>
</template>

<script>
export default {
  components: {
    defaultDesk: () => import("./components/default.vue")
  },
  data() {
    return {
      showDefault: false,
      showIndex: false, //设置默认都不显示
      origin: window.location.origin,
      cops: [],
      timer: null, //简单节流
      list: [
        {
          name: "测试组件1",
          url: "http://www.baidu.com",
          x: 450,
          y: 10,
          width: 540,
          height: 160
        },
        {
          name: "测试组件2",
          url: "http://www.baidu.com",
          x: 860,
          y: 180,
          width: 130,
          height: 290
        },
        {
          name: "测试组件3",
          url: "http://www.baidu.com",
          x: 10,
          y: 10,
          width: 430,
          height: 160
        },
        {
          name: "测试组件4",
          url: "http://www.baidu.com",
          x: 10,
          y: 180,
          width: 840,
          height: 130
        },
        {
          name: "测试组件5",
          url: "http://www.baidu.com",
          x: 10,
          y: 320,
          width: 840,
          height: 150
        }
      ]
    };
  },
  created() {
    try {
      this.user = JSON.parse(window.sessionStorage.getItem("user"));
    } catch (error) {}
  },
  mounted() {
    //获取桌面数据
    this.$api
      .formPost("/api/basfun/desk/deskUserComp/doGetListByUserId", {})
      .then(res => {
        if (res.retHead.code === "0000000") {
          this.list = res.retBody.list;
          this.$nextTick(() => {
            this.init();
          });
        } else {
          this.showDefault = true;
        }
      })
      .catch(err => {
        console.log(err);
      });
    window.addEventListener("resize", this.setLayout);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setLayout);
  },
  watch: {
    "$store.state.init.isCollapse": function(v) {
      setTimeout(() => {
        this.init();
      }, 300);
    }
  },
  computed: {
    indexTool: function() {
      return this.$store.state.settings.indexTool;
    }
  },
  methods: {
    setLayout(e) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.init();
      }, 500);
    },
    init() {
      this.showIndex = false;
      let width = parseInt(
        window.getComputedStyle(document.querySelector(".content")).width
      );
      let height = parseInt(
        window.getComputedStyle(document.querySelector(".content")).height
      );
      for (let iterator of this.list) {
        iterator.style = {
          position: "absolute",
          height: height * (iterator.h / 480) + "px",
          width: width * (iterator.w / 1000) + "px",
          left: width * (iterator.x / 1000) + "px",
          top: height * (iterator.y / 480) + "px"
        };
      }
      this.cops = [];
      this.$nextTick(() => {
        this.cops = this.list;
        this.showIndex = true;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  height: 100%;
  position: relative;
  width: 100%;
  .welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    .welcomeContent {
      text-align: center;
      color: #008dff;
      cursor: pointer;
    }
  }
  .noPermisson {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  }
}
.borderBox {
  // border: 1px solid #000;
}
</style>
