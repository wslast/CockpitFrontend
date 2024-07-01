<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 
-->
<template>
  <div class="routesView p10">
    <el-breadcrumb>
      <template v-for="item in routes">
        <el-breadcrumb-item v-if="!item.path">{{
          item.name
        }}</el-breadcrumb-item>
        <el-breadcrumb-item
          v-if="item.path"
          :to="{ path: item.path, query: item.query }"
          >{{ item.name }}</el-breadcrumb-item
        >
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "routesView",
  components: {},

  data() {
    return {};
  },

  computed: {
    ...mapState({
      routes: state => state.routeView.routes
    })
  },

  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.routesView {
  background: #fff;
}
.p18 {
  padding: 18px;
}
.fg2 {
  flex-grow: 2;
}
</style>
