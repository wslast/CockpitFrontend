<!-- 高级搜索 -->
<template>
  <div class="searchDialog">
    <el-input
      v-if="!hideInput"
      class="topSearch"
      v-bind="$attrs"
      clearable
      v-model="search"
      style="width:300px;height:30px;"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="initData"
      ></el-button>
    </el-input>
    <el-button
      v-if="!hideInput"
      class="searchButton"
      icon="el-icon-refresh"
      @click="resetForm"
      style="font-size:var(--text-size);"
      type="text"
      >重置</el-button
    >
    <div></div>
    <el-button
      class="searchButton"
      icon="el-icon-s-operation"
      @click="showPage = !showPage"
      style="font-size:var(--text-size);"
      type="text"
      >高级搜索</el-button
    >
    <pageDialog ref="pageDialog" class="card" v-model="showPage">
      <slot> </slot>
      <div class="df jce" slot="footer">
        <slot name="footer"></slot>
      </div>
    </pageDialog>
  </div>
</template>

<script>
export default {
  name: "searchDialog",
  components: {},
  props: {
    value: {
      type: String | Number,
      default: ""
    },
    showForm: {
      type: Boolean,
      default: false
    },
    hideInput: {
      type: Boolean,
      default: false
    },
    el: {
      // 获取例如tab的el属性 解决组件在tab标签里无法展示pageDialog的问题
      type: HTMLElement,
      default: null
    }
  },
  data() {
    return {
      pageHeight: 0,
      pageWidth: 0
    };
  },

  computed: {
    showPage: {
      get() {
        return this.showForm;
      },
      set(v) {
        this.$emit("update:showForm", v);
      }
    },
    search: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      }
    }
  },
  mounted() {
    //将高级搜索放到父组件里面
    if (this.el) {
      this.pageHeight = window.getComputedStyle(this.el).height;
      this.pageWidth = window.getComputedStyle(this.el).width;
      this.el.append(this.$refs.pageDialog.$el);
    } else {
      this.pageHeight = window.getComputedStyle(this.$parent.$el).height;
      this.pageWidth = window.getComputedStyle(this.$parent.$el).width;
      this.$parent.$el.append(this.$refs.pageDialog.$el);
    }
  },

  methods: {
    resetForm() {
      //判断父组件时候自定义重置事件
      if (this.$listeners.resetForm) {
        this.$emit("resetForm");
      } else {
        this.getForm(this.$refs.pageDialog.$slots.default);
        this.$nextTick(() => {
          this.initData();
        });
      }
    },
    //查找插槽中表单
    getForm(context) {
      if (!context) return;
      if (this.isArray(context)) {
        for (const iterator of context) {
          if (
            iterator.$el &&
            iterator.$el.className &&
            this.isString(iterator.$el.className) &&
            iterator.$el.className.indexOf("el-form") > -1 &&
            typeof iterator.resetFields === "function"
          ) {
            iterator.resetFields();
            return;
          }
          if (iterator.child) {
            this.getForm(iterator.child);
          }
        }
      } else if (this.isObject(context)) {
        if (
          context.$el &&
          context.$el.className &&
          this.isString(context.$el.className) &&
          context.$el.className.indexOf("el-form") > -1 &&
          typeof context.resetFields === "function"
        ) {
          context.resetFields();
          return;
        }
        if (context.child) {
          this.getForm(context.child);
        }
      }
    },
    initData() {
      this.$emit("searchData");
    }
  }
};
</script>
<style lang="scss" scoped>
.searchDialog {
  display: flex;
}
/deep/ .searchButton {
  padding: 8px 5px !important;
}
</style>
