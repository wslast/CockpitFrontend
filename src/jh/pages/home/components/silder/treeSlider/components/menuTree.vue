<template>
  <el-submenu
    :index="list.functionName"
    v-if="list.children && list.children.length !== 0"
  >
    <template slot="title">
      <i :class="list.menuStyle"></i>
      <span slot="title">{{ list.functionName }}</span>
    </template>
    <menu-tree :list="i" v-for="i in list.children" :key="i.id"></menu-tree>
  </el-submenu>
  <router-link :to="list.functionUrl || '#'" v-else>
    <!-- <i :class="list.menuStyle"></i> -->
    <el-menu-item :index="list.functionUrl">{{
      list.functionName
    }}</el-menu-item>
  </router-link>
</template>

<script>
export default {
  name: "menuTree",
  props: {
    list: Object,
    index: ""
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {
    // console.log(this.list)
  },
  methods: {},
  created() {}
};
</script>
