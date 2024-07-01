<template>
  <div class="tags">
    <!-- <span class="span" v-for="item in views" :key="item.path">{{item.meta.title}}</span> -->
    <scrollPane
      ref="scrollPane"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <el-tag
        ref="tag"
        size="default"
        :class="{ active: item.fullPath === nowPath }"
        class="tag"
        :path="item.fullPath"
        :style="{
          background:
            item.fullPath === nowPath ? $store.state.settings.theme : '',
          color:
            item.fullPath === nowPath ? '#fff !important' : '#333 !important'
        }"
        :key="item.fullPath"
        v-for="(item, index) in views"
        :type="type"
        :closable="!item.meta.all"
        :disable-transitions="false"
        @contextmenu.prevent.native="rightMenu($event, item, index)"
        @close="handleClose(item)"
      >
        <router-link
          :to="{ path: item.path, query: item.query ? item.query : {} }"
          >{{ item.name }}</router-link
        >
      </el-tag>
    </scrollPane>
    <div class="rightMenu card" v-show="rightClick" :style="style">
      <div
        class="item"
        @click="refresh"
        v-show="rightClickItem.fullPath === nowPath"
      >
        刷新
      </div>
      <div class="item" @click="rightMenuSet(1)">关闭右侧</div>
      <div class="item" @click="rightMenuSet(2)">关闭左侧</div>
      <div class="item" @click="rightMenuSet(3)">关闭其他</div>
      <div class="item" @click="rightMenuSet(0)">关闭全部</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    scrollPane: resolve => resolve(require("./scrollPane.vue"))
  },
  data() {
    return {
      rightClick: false,
      type: "info",
      style: {
        position: "absolute",
        "z-index": "99999",
        top: "100px",
        left: 0
      },
      rightMenuKey: null,
      rightClickItem: {}
    };
  },
  computed: {
    views: function() {
      return this.$store.state.tagsView.visitedPath;
    },
    nowPath: function() {
      return this.$route.fullPath;
    }
  },
  watch: {
    $route() {
      this.moveToCurrentTag();
    },
    rightClick: function(v) {
      if (v) {
        window.addEventListener(
          "click",
          () => {
            this.rightClick = false;
          },
          true
        );
      }
    }
  },
  mounted() {
    //  console.log(this.$store.state.tagsView)
  },
  methods: {
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.$attrs.path === this.$route.fullPath) {
            this.$refs.scrollPane.moveToTarget(tag);
            break;
          }
        }
      });
    },
    refresh() {
      this.$emit("refresh");
    },
    rightMenuSet(v) {
      if (v == 0) {
        this.$store.commit("visitedPathReset");
      } else if (v == 1) {
        this.$store.commit("visitedRightSetR", this.rightMenuKey + 1);
      } else if (v == 2) {
        this.$store.commit("visitedRightSetL", this.rightMenuKey - 1);
      } else if (v == 3) {
        this.$store.commit("visitedRightSetR", this.rightMenuKey + 1);
        this.$store.commit("visitedRightSetL", this.rightMenuKey - 1);
      }
      this.resetPath();
    },
    rightMenu(event, item, i) {
      if (this.$store.state.init.isCollapse) {
        this.style.left = `${event.pageX - 64}px`;
      } else {
        this.style.left = `${event.pageX - 200}px`;
      }
      this.rightClick = true;
      this.rightClickItem = item;
      this.rightMenuKey = i;
      // console.log(item);
    },
    handleClose(item) {
      this.views.splice(this.views.indexOf(item), 1);
      this.resetPath();
    },
    resetPath() {
      let path = this.$store.state.tagsView.visitedPath[
        this.$store.state.tagsView.visitedPath.length - 1
      ].path;
      let query = this.$store.state.tagsView.visitedPath[
        this.$store.state.tagsView.visitedPath.length - 1
      ].query;
      if (path != this.$route.path && query != this.$route.query) {
        if (query != {}) {
          this.$router.push({ path, query });
        } else {
          this.$router.push(path);
        }
      }
    },
    closeMenu() {
      this.rightClick = false;
    },
    handleScroll() {
      this.closeMenu();
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.tags {
  line-height: normal;
  white-space: nowrap;
  .active {
    a,
    /deep/ i {
      color: #fff !important;
    }
  }
}
.rightMenu {
  .item {
    font-size: var(--text-size);
    line-height: 20px;
    padding: 6px;
    cursor: pointer;
    &:hover {
      background-color: #f1f1f1;
    }
  }
}
.tag {
  margin-right: 4px;
  font-size: var(--text-size);
  box-shadow: 2px 2px 2px #ccc;
  color: #fff;
}
</style>
