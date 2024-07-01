<template>
  <div class="ova poi">
    <div v-for="item in menuList" :key="item.id" class="submenu">
      <template v-if="item.children && item.children.length > 0">
        <el-popover
          :ref="item.id"
          placement="right"
          popper-class="menuList"
          trigger="hover"
          :open-delay="300"
        >
          <!-- 配置菜单 -->
          <div v-for="menu in item.children" :key="menu.id">
            <template v-if="menu.children && menu.children.length > 0">
              <div class="menuTitle">
                <i
                  :class="menu.menuStyle"
                  v-if="menu.menuStyle"
                  style="margin-right:9px"
                ></i
                >{{ menu.functionName }}
              </div>
              <div class="content">
                <menu-item
                  v-for="menuItem in menu.children"
                  :key="menuItem.id"
                  :menu="menuItem"
                  @close="closePopover"
                ></menu-item>
              </div>
            </template>
          </div>
          <!-- 其他菜单 -->
          <div
            v-if="
              item.children.filter(
                item => item.children.length === 0 || !item.children
              )
            "
          >
            <div class="menuTitle">
              <img
                class="other"
                src="@/assets/images/other.png"
                alt=""
                srcset=""
              />
              其他
            </div>
            <div class="content">
              <div
                class="menuItem"
                v-for="other in item.children.filter(
                  item => item.children.length === 0 || !item.children
                )"
                :key="other.id"
              >
                <menu-item :menu="other" @close="closePopover"></menu-item>
              </div>
            </div>
          </div>
          <!-- 点击菜单 -->
          <template slot="reference">
            <div
              class="db aic menu fg1"
              :class="{ active: item.id === active, collapse: isCollapse }"
            >
              <i :class="item.menuStyle" class="beforeIcon"></i>
              <span v-show="!isCollapse" class="fg1" style="color: #fff;">{{
                item.functionName
              }}</span>
              <i v-show="!isCollapse" class="el-icon-arrow-right"></i>
            </div>
          </template>
        </el-popover>
      </template>
      <!-- 直接路由 -->
      <template v-else>
        <router-link
          :to="item.functionUrl || '#'"
          class="db menu fg1"
          :class="{ active: item.id === active, collapse: isCollapse }"
        >
          <i :class="item.menuStyle" class="beforeIcon"></i>
          <span v-show="!isCollapse" class="fg1" style="color: #fff;">{{
            item.functionName
          }}</span>
        </router-link>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "customSlider",
  components: {
    menuItem: () => import("./menuItem.vue")
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
    //关闭popover
    closePopover(menu) {
      this.getParent(this.menuList, []);
    },
    setActive() {
      if (this.menuList.length === 0) {
        return;
      }
      for (const iterator of this.menuList) {
        if (iterator.functionUrl === this.$route.fullPath) {
          this.active = iterator.id;
        }
      }
      this.getParent(this.menuList, [], "active");
    },
    getParent(list, path) {
      for (const iterator of list) {
        if (iterator.parentId == "0") {
          path = [];
        }
        path.push(iterator.id);
        if (iterator.functionUrl === this.$route.fullPath) {
          this.$refs[path[0]] &&
            this.$refs[path[0]][0] &&
            this.$refs[path[0]][0].doClose();
          this.active = path[0];
          return path;
        }
        if (iterator.children && iterator.children.length > 0) {
          this.getParent(iterator.children, path);
        }
      }
    }
  },
  async created() {
    await this.getTreeMenu();
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
/deep/ .el-submenu__title {
  padding: 0px;
}
/deep/ .el-popper .popper__arrow {
  display: none;
}
.submenu {
  height: 50px;
  line-height: 50px;
  i {
    color: #fff;
    line-height: 50px;
  }
  &:hover {
    background: #263445;
  }
}
.active {
  background-color: #001528 !important;
  span {
    color: rgb(255, 208, 75) !important;
  }
  .beforeIcon {
    opacity: 1 !important;
  }
}
.menuTitle {
  font-size: var(--title-size);
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 23px;
  padding: 0px 32px;
}
.menu {
  display: flex;
  align-items: center;
  padding: 0px 20px 0px 10px;
  height: 50px;
  white-space: nowrap;
  .beforeIcon {
    padding: 0px 20px 0px 10px;
    opacity: 0.35;
    font-size: 18px;
  }
}
.collapse {
  padding: 0px 5px;
  .beforeIcon {
    padding: 0px 10px;
    font-size: 28px;
  }
}
.content {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 33px;
  padding: 0px 12px;
}
.other {
  margin-right: 9px;
  height: 14px;
  width: 14px;
}
</style>
<style lang="scss">
.menuList {
  background: rgb(48, 65, 86) !important;
  padding: 34px 0px 0px 0px !important;
  max-width: 1000px;
  overflow: auto;
  .popper__arrow {
    display: none !important;
  }
}
</style>
