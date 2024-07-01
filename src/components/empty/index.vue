<template>
  <div class="el-empty">
    <div class="el-empty__image" :style="imageStyle">
      <imgEmpty />
    </div>
    <div class="el-empty__description">
      <slot v-if="$slots.description" name="description"></slot>
      <p v-else>{{ emptyDescription }}</p>
    </div>
    <div v-if="$slots.default" class="el-empty__bottom">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ImgEmpty from "./empty";
export default {
  name: "ElEmpty",
  components: {
    imgEmpty: ImgEmpty
  },
  props: {
    image: {
      type: String,
      default: ""
    },
    imageSize: Number,
    description: {
      type: String,
      default: "暂无数据"
    }
  },
  computed: {
    emptyDescription() {
      return this.description;
    },
    imageStyle() {
      return {
        width: this.imageSize ? `${this.imageSize}px` : ""
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.el-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  box-sizing: border-box;
  padding: 40px 0;
}
.el-empty__image {
  width: 160px;
}
.el-empty__description {
  margin-top: 20px;
}
</style>
