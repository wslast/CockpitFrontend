<!--
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 
-->
<template>
    <div>
        <img class="screen" key="exit" src="@/assets/images/exit-fullscreen.svg" @click="click"  v-show="isFullscreen" alt="">
        <img class="screen" key="screen" src="@/assets/images/fullscreen.svg" @click="click"  v-show="!isFullscreen" alt="">
    </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
    name: 'Screenfull',
    data() {
        return {
            isFullscreen: false
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        click() {
            if (!screenfull.isEnabled) {
                this.$message({
                    message: '浏览器缩放失效',
                    type: 'warning'
                })
                return false
            }
            screenfull.toggle();
        },
        change() {
            this.isFullscreen = screenfull.isFullscreen;
        },
        init() {
            if (screenfull.isEnabled) {
                screenfull.on('change', this.change);
            }
        }
    }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
.screen {
    margin-top: 25px;
    height: 16px;
    width: 16px;
    cursor: pointer;
}
</style>
