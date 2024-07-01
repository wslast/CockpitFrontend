<!-- 锚点组件 -->
<template>
  <div class="jh-anchor">
    <div
      v-for="(item, index) in anchorLabelList"
      :key="item.id"
      @click="scrollTo(item, index)"
      class="poi"
      :class="{ link: true, active: active === index }"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: "jh-anchor",
  props: {
    offsetHeight: {
      type: Number,
      default: () => 0
    }
  },
  components: {},

  data() {
    return {
      active: 0,
      scrollEle: null, //滚动元素
      anchorList: [], //实际元素节点
      anchorLabelList: [] //锚点展示文本
    };
  },

  computed: {},

  mounted() {
    this.$nextTick(() => {
      this.getNodes(document.querySelectorAll("[data-anchor]"));
      this.getScrollElement();
    });
  },
  beforeDestroy() {
    if (this.scrollEle) {
      this.scrollEle.removeEventListener("scroll", this.listenScroll);
    }
    this.scrollEle = null;
    this.anchorList = [];
  },

  methods: {
    getScrollElement() {
      //判断如果父元素没有滚动 再爬一层
      if (this.isScrollEle(this.$el.parentElement)) {
        this.scrollEle = this.$el.parentElement;
      } else if (this.isScrollEle(this.$el.parentElement.parentElement)) {
        this.scrollEle = this.$el.parentElement.parentElement;
      }
      if (this.scrollEle) {
        this.scrollEle.addEventListener("scroll", this.listenScroll);
      }
    },
    listenScroll(e) {
      let scrollTop = e.target.scrollTop;
      let scrollHeight = e.target.scrollHeight;
      for (let i = 0, l = this.anchorList.length; i < l; i++) {
        const item = this.anchorList[i];
        if (item.offsetTop <= scrollTop) {
          this.active = i;
        }
      }
    },
    /**
     * @description: 获取锚点节点
     * @param {*} elementList 锚点元素
     * @return {*}
     * @author: Junchi Zhao
     */
    getNodes(elementList) {
      this.anchorList = [];
      this.anchorLabelList = [];
      this.anchorList = elementList;
      elementList.forEach((element, index) => {
        element.setAttribute("id", "jh-anchor-" + index);
        this.anchorLabelList.push({
          id: index,
          link: "#jh-anchor-" + index,
          label: element.dataset.anchor
        });
      });
    },
    /**
     * @description: 点击滚动
     * @param {*} item 点击锚点
     * @param {*} index 数组下标
     * @return {*}
     * @author: Junchi Zhao
     */
    scrollTo(item, index) {
      const elem = this.anchorList[index];
      elem.scrollTop = 0;
      if (elem) {
        const top = elem.offsetTop;
        this.scrollEle && this.scrollEle.scrollTo(0, top - this.offsetHeight);
      }
    },
    /**
     * @description: 判断当前元素是否有滚动条
     * @param {*} element 当前元素
     * @return {*}
     * @author: Junchi Zhao
     */
    isScrollEle(element) {
      return element.scrollHeight > element.clientHeight;
    }
  }
};
</script>
<style lang="scss" scoped>
.link {
  font-size: 20px;
}
.active {
  color: blue;
}
</style>
