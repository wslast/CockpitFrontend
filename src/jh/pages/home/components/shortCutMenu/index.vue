<!-- 快捷菜单 -->
<template>
  <div class="shortCutmenu">
    <div class="title mr10">常用菜单 :</div>
    <div class="ovh df fg1 routes">
      <div
        class="routeLink poi"
        :class="{ activeLink: item.menuUrl === $route.fullPath }"
        v-for="item in menuList"
        :key="item.menuId"
        @click="goToRoute(item.menuUrl)"
      >
        {{ item.menuName }}
      </div>
    </div>
    <img
      class="collect"
      v-if="!activeCollect && allMenuList[$route.fullPath]"
      @click="addMenu"
      src="@/assets/images/collect.svg"
      alt=""
      srcset=""
    />
    <img
      class="selectCollect"
      v-if="activeCollect && allMenuList[$route.fullPath]"
      @click="deleteCurrentMenu"
      src="@/assets/images/select-collect.svg"
      alt=""
      srcset=""
    />
    <el-dropdown
      @visible-change="handleChange"
      @command="goToRoute"
      style="height: 20px;"
      trigger="click"
    >
      <span class="poi df jcc aic">
        <img src="@/assets/images/more.svg" v-show="!activeMore" alt="" />
        <img src="@/assets/images/selectMore.svg" v-show="activeMore" alt="" />
      </span>
      <el-dropdown-menu slot="dropdown" class="shortCut">
        <draggable v-model="menuList" @end="finishDrag">
          <el-dropdown-item
            :command="item.menuUrl"
            v-for="item in menuList"
            :key="item.menuId"
          >
            <span class="df aic">
              <img
                style="height:24px;"
                src="@/assets/images/drag.svg"
                class="mr10"
                alt=""
                srcset=""
              />
              <span
                class="routeLink"
                :class="{ activeLink: item.menuUrl === $route.fullPath }"
              >
                {{ item.menuName }}
              </span>
              <span class="fg1"></span>
              <i
                class="el-icon-close ml30"
                style="color:#FF1818;"
                @click.stop="deleteMenu(item)"
              ></i>
            </span>
          </el-dropdown-item>
        </draggable>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="line"></div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "shortCutMenu",
  components: {
    draggable
  },

  data() {
    return {
      activeMore: false,
      activeCollect: false,
      allMenuList: {},
      menuList: []
    };
  },

  watch: {
    $route: {
      handler: function(route) {
        this.setActive(route);
      },
      immediate: true
    }
  },

  created() {
    this.getMenu();
    this.getAllMenu();
  },

  methods: {
    setActive(route) {
      this.activeCollect = false;
      for (const iterator of this.menuList) {
        if (route.fullPath === iterator.menuUrl) {
          this.activeCollect = true;
        }
      }
    },
    getAllMenu() {
      this.$api
        .formPost("/api/auth/sysuserfun/doGetMenuJsonSelf", {})
        .then(res => {
          this.getMenuMap(res.retBody);
        });
    },
    getMenuMap(list) {
      if (list && list.length > 0) {
        for (const iterator of list) {
          if (iterator.functionUrl) {
            this.allMenuList[iterator.functionUrl] = iterator.id;
          }
          if (iterator.children && iterator.children.length > 0) {
            this.getMenuMap(iterator.children);
          }
        }
      }
    },
    addMenu() {
      let params = {
        menuOrderNum: 100 + this.menuList.length,
        menuId: this.allMenuList[this.$route.fullPath],
        menuName: this.$route.meta.multiple
          ? this.$route.query[this.$route.meta.multiple]
          : this.$route.meta.title,
        menuUrl: this.$route.fullPath
      };
      this.$api
        .formPost("/api/auth/shotcut/menu/doSaveUserMenu", params)
        .then(res => {
          this.$message.success("添加成功");
          this.getMenu();
        });
    },
    getMenu() {
      this.$api
        .formPost("/api/auth/shotcut/menu/doGetUserMenuList", {})
        .then(res => {
          console.log(res);
          this.menuList = res.retBody.list;
          this.setActive(this.$route);
        });
    },
    finishDrag() {
      console.log("结束拖动");
      let menuList = this.menuList.map((item, index) => {
        item.menuOrderNum = index + 100;
        return item;
      });
      this.$api
        .post("/api/auth/shotcut/menu/doChangeUserMenu", menuList)
        .then(res => {
          this.getMenu();
        });
    },
    goToRoute(command) {
      console.log(command);
      this.$router.push(command);
    },
    deleteCurrentMenu() {
      for (const iterator of this.menuList) {
        if (iterator.menuUrl === this.$route.fullPath) {
          this.deleteMenu(iterator);
        }
      }
    },
    deleteMenu(menu) {
      this.$api
        .formPost("/api/auth/shotcut/menu/doRmUserMenu", {
          menuId: menu.menuId
        })
        .then(res => {
          this.$message.success("删除成功");
          this.getMenu();
        });
    },
    handleChange(visible) {
      this.active = visible;
    }
  }
};
</script>
<style lang="scss" scoped>
.shortCutmenu {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: end;
  .title {
    color: rgba(153, 153, 153, 1);
    font-size: var(--text-size) !important;
    margin-right: 8px;
    min-width: 85px;
  }
  .collect {
    margin-right: 7px;
    cursor: pointer;
  }
  .selectCollect {
    margin-right: 7px;
    cursor: pointer;
  }
  .routes {
    flex-wrap: wrap;
    height: 60px;
  }
  .line {
    border-right: 1px solid #ccc;
    height: 20px;
    margin: 0px 18px;
  }
}
/deep/ .el-dropdown-menu__item {
  padding: 0px 10px;
}
.routeLink {
  color: rgba(153, 153, 153, 1);
  font-size: var(--text-size) !important;
  margin: 0px 8px;
  &:hover {
    color: #1890ff;
  }
}
.activeLink {
  color: #1890ff !important;
}
.shortCut {
  max-height: 60vh;
  overflow: auto;
}
</style>
