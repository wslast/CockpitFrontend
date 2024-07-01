<template>
  <div class="demo routerContent">
    <div class="fg1 df fdc h14 p10">
      <jh-table
        class="fg1 ova"
        height="100%"
        size="small"
        row-key="id"
        ref="jhTable"
        :columnList="columnList"
        :data="dataList"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "demo",

  data() {
    return {
      dataList: [
        {
          type: "简单表格",
          explain: "数据列较少的简单表格,单条删除.",
          filePath: "@/pages/demo/simpleTable/index",
          route: "/demo/simpleTable"
        },
        {
          type: "批量删除表格",
          explain: "数据列较少的简单表格,批量删除.",
          filePath: "@/pages/demo/batchDeleteTable/index",
          route: "/demo/batchDeleteTable"
        },
        {
          type: "动态列表格",
          explain: "针对出现横向滚动条的多列表格增加可以勾选显示列的功能.",
          filePath: "@/pages/demo/dynamicColTable/index",
          route: "/demo/dynamicColTable"
        },
        {
          type: "3种尺寸的弹窗",
          explain: "根据表单数量分为1,2,3列.",
          filePath: "@/pages/demo/threeTypesDialog/index",
          route: "/demo/threeTypesDialog"
        },
        {
          type: "单文件/多文件预览",
          explain: "需要配合文件服务使用.",
          filePath: "@/pages/demo/filePreview/index",
          route: "/demo/filePreview"
        },
        {
          type: "获取用户信息等公共变量",
          explain: "token,账号信息,系统设置,面包屑,页签,侧边栏状态.",
          filePath: "@/pages/demo/getSystemValue/index",
          route: "/demo/getSystemValue"
        },
        {
          type: "接口同步调用",
          explain: "",
          filePath: "@/pages/demo/syncInterface/index",
          route: "/demo/syncInterface"
        },
        {
          type: "核心包组件使用",
          explain: "",
          filePath: "@/pages/demo/coreCpt/index",
          route: "/demo/coreCpt"
        }
      ],
      columnList: [
        {
          type: "index",
          align: "center"
        },
        {
          prop: "type",
          label: "类型",
          align: "center",
          width: "200px"
        },
        {
          prop: "explain",
          label: "说明",
          align: "center"
        },
        {
          prop: "filePath",
          label: "文件地址",
          align: "center"
        },
        {
          prop: "route",
          label: "路由地址",
          align: "center"
        },
        {
          prop: "",
          fixed: "right",
          label: "操作",
          align: "center",
          width: "90px",
          render: (h, scope) => {
            return h("div", {}, [
              h("el-button", {
                on: {
                  click: this.goto.bind(this, scope.row.route)
                },
                props: {
                  type: "text"
                },
                domProps: {
                  innerHTML: "查看"
                }
              })
            ]);
          }
        }
      ]
    };
  },
  methods: {
    goto(route) {
      this.$router.push(route);
    }
  }
};
</script>
<style lang="scss" scoped>
.demo {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
