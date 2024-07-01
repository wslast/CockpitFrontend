/* eslin-disable */
<template>
  <div class="slider">
    <el-menu
      class="el-menu-vertical-demo ovh"
      unique-opened
      :default-active="active"
      @select="handleSelect"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <template v-for="item in menuList">
        <!-- <menu-tree :list="item"></menu-tree> -->
        <el-submenu
          :index="item.id"
          :key="item.id"
          v-if="item.children && item.children.length !== 0"
        >
          <template slot="title">
            <i :class="item.menuStyle"></i>
            <span slot="title">{{ item.functionName }}</span>
          </template>
          <menu-tree
            :list="i"
            v-for="i in item.children"
            :key="i.id"
          ></menu-tree>
        </el-submenu>
        <router-link
          :key="item.functionUrl"
          :to="item.functionUrl || '#'"
          v-else
        >
          <el-menu-item :index="item.functionUrl">
            <i :class="item.menuStyle"></i>
            <span slot="title">{{ item.functionName }}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  cursor: pointer;
  padding: 10px;
  text-align: center;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  overflow-x: hidden;
  width: 200px;
  /* min-height: 400px; */
}

/deep/.el-menu {
  border-right: none;
  a {
    text-decoration: none;
  }
}
</style>

<script>
import menuTree from "./components/menuTree";
import Logo from "./components/Logo";
export default {
  name: "silder",
  components: {
    menuTree,
    Logo
  },
  data() {
    return {
      menuList: [],
      treeList: [],
      active: ""
    };
  },
  computed: {
    isCollapse: function() {
      return this.$store.state.init.isCollapse;
    }
  },
  watch: {
    $route() {
      this.setActive();
    },
    menuList: function(val) {
      this.setActive();
    }
  },
  methods: {
    gotoIndex() {
      this.$router.push("/");
    },
    handleSelect(key, keyPath) {
      try {
        //不断将最新的路由对应id更新进入tagviews数组
        let visitedPath = JSON.parse(
          JSON.stringify(this.$store.state.tagsView.visitedPath)
        );
        let isIn = false;
        for (const iterator of visitedPath) {
          if (iterator.fullPath === key.split("@")[0] && iterator.id) {
            isIn = true;
            iterator.id = key.split("@")[1];
          }
        }
        if (isIn) {
          this.$store.commit("visitedPathAdd", visitedPath);
        } else {
          this.$store.commit("setCurrentId", key.split("@")[1]);
        }
      } catch (error) {}
      //菜单选中优先级最高
      this.$nextTick(() => {
        setTimeout(() => {
          this.active = key;
        }, 50);
      });
    },
    getTreeData(v) {
      v.forEach(item => {
        if (item.parentId == 0) {
          item.icon = "el-icon-menu";
          if (!item.functionUrl || item.functionUrl == "#") {
            item.children = [];
          }
          this.treeList.push(item);
        }
      });

      this.deepTree(this.treeList);
    },
    deepTree(v) {
      this.menuList.forEach(item => {
        v.forEach(index => {
          if (item.parentId == index.id) {
            index.children.push(item);
            if (!item.functionUrl || item.functionUrl == "#") {
              this.deepTree(index.children);
            }
          }
        });
      });
    },
    async getTreeMenu() {
      return new Promise(resolve => {
        this.$api
          .formPost("/api/auth/sysuserfun/doGetMenuJsonSelf", { })
          .then(res => {
            if (res.retHead.code == "0000000") {
              this.menuList = res.retBody;
            }
            resolve();
          });
      });
    },
    setActive() {
      if (this.menuList.length === 0) {
        return;
      }
      this.active = this.$route.fullPath;
    }
  },
  async created() {
    await this.getTreeMenu();
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
/deep/ .el-menu .is-active {
  background-color: $subMenuHover !important;
}
.slider {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
