<!-- 子菜单 -->
<template>
  <router-link :to="menu.functionUrl || '#'">
    <div
      @click="closePopover"
      class="menuItem"
      :class="{ active: menu.functionUrl === $route.fullPath }"
    >
      {{ menu.functionName }}
    </div>
  </router-link>
</template>

<script>
export default {
  name: "menuItem",
  props: {
    menu: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    closePopover() {
      this.$emit("close", this.menu);
    }
  }
};
</script>
<style lang="scss" scoped>
.menuItem {
  font-size: var(--title-size);
  font-weight: 400;
  color: #ffffff;
  margin: 5px 20px;
  &:hover {
    color: rgba(255, 208, 75, 0.9);
  }
}
.active {
  color: rgb(255, 208, 75) !important;
}
</style>
