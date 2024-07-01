<template>
    <v-scale-screen width="1920" height="1080">
        <div class="simpleTable df fdc" ref="fatherView">
            <div class="topBar df">
                <template v-for="(item, index) in btn">
                    <div
                        :key="index"
                        @click.stop="changePage(index)"
                        class="topBar-btns"
                        :class="{'select':item.isActive,big:item.name.length>4}">
                        {{ item.name }}
                    </div>
                    <div
                        v-if="index === 5"
                        :key="index"
                        class="topBar-name"
                        @click="changePollingType">
                        湘直公积金管理驾驶舱
                    </div>
                </template>
                <div class="topBar-dateBar">
                    {{ time[0] + '&nbsp;' + time[1] }}
                </div>
<!--                <div class="topBar-iconBar">-->
<!--                    <i class="el-icon-time icon1"></i>-->
<!--                </div>-->
<!--                <div class="topBar-timeBar">-->
<!--                    {{ time[2] }}-->
<!--                </div>-->
            </div>
            <transition>
                <router-view
                    v-if="!showFrame"
                    class="fg1"
                    :key="$route.fullpath"
                ></router-view>
                <iframe v-else :src="iframeSrc" class="iframe fg1"></iframe>
            </transition>
        </div>
    </v-scale-screen>
</template>
<script>
export default {
    data() {
        return {
            time: [],
            timer: null,
            iframeSrc: 'http://200.200.210.248/YBMAPZH-WEB/fullScreenMonitoringcity.html',
            showFrame: false,
            pollingTimer: null,
            isStopPolling: false, //控制大页面轮询
            noPollingPage: false, //不轮询页面
            btn: [
                // { name: '首页', isActive: true, router: '/highScreen/sy' },
                {name: '缴存', isActive: false, router: '/highScreen/jc'},
                {name: '提取', isActive: false, router: '/highScreen/tq'},
                {name: '贷款', isActive: false, router: '/highScreen/dk'},
                {name: '资金流动', isActive: false, router: '/highScreen/zjld',},
                {name: '银行画像', isActive: false, router: '/highScreen/yhhx',},
                {name: '风控', isActive: false, router: '/highScreen/fk'},
                // {name: '银行画像', isActive: false, router: '/highScreen/fk'},
                // {name: '数字化成果', isActive: false, router: '/highScreen/fk'},
                // {
                //     name: '单位画像',
                //     isActive: false,
                //     router: '/highScreen/portrait/organ',
                // },
                // {
                //     name: '个人画像',
                //     isActive: false,
                //     router: '/highScreen/portrait/person',
                // },
                {
                    name: '数字化成果',
                    isActive: false,
                    router: '/highScreen/szhcg',
                },
                {
                    name: '网格化服务',
                    isActive: false,
                    router: '/highScreen/map',
                },
            ],
            // 按照顺序取值，请勿调整顺序
            imgUrl: [
                // require('../../assets/images/dp/sy/shouye_bgimg.jpg'),
                // 缴存
                require('../../assets/images/dp/jc-old/jc_bgimg.jpg'),
                // 提取
                // require('../../assets/images/dp/tq/tiqu_bgimg.jpg'),
                require('../../assets/images/dp/zjld/zjld_beijing.jpg'),
                // 贷款
                require('../../assets/images/dp/zjld/zjld_beijing.jpg'),
                // 资金流动
                require('../../assets/images/dp/zjld/zjld_beijing.jpg'),
                require('../../assets/images/dp/fk/fengkong_bgimg.jpg'),
                require('../../assets/images/dp/zjld/zjld_beijing.jpg'),
                // 数字化成果
                require('../../assets/images/dp/zjld/zjld_beijing.jpg'),
                // 地图纯色背景
                require('../../assets/images/dp/map/index.svg'),
            ],
            pageIndex: 0,
            listenMouseTimer: null,
        };
    },
    created() {
        document.querySelector('#app').style.overflow = 'hidden';
    },
    mounted() {
        this.interval(this.getTime(), 1000);
        this.gotoFirstPage();
        // this.startPolling(this.changePage, 60000);
        // window.addEventListener('mousemove', this.listenMouseMove);
    },
    beforeDestroy() {
        this.clearTime();
        if (this.listenMouseTimer) {
            clearTimeout(this.listenMouseTimer);
        }
        this.listenMouseTimer = null;
        if (this.pollingTimer) {
            clearTimeout(this.pollingTimer);
        }
        this.pollingTimer = null;
        window.removeEventListener('mousemove', this.listenMouseMove);
        document.querySelector('#app').style.overflow = 'auto';
    },
    methods: {
        clearTime() {
            clearTimeout(this.timer);
            this.timer = null;
        },
        interval(func, wait) {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.getTime();
                this.interval(func, wait);
            }, wait);
        },
        getTime() {
            this.time = this.dateFormat();
        },
        /**
         * 时间格式化函数
         * 此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
         * @returns {(string|string)[]}
         */
        dateFormat() {
            let date = new Date();
            let year = date.getFullYear();
            /* 在日期格式中，月份是从0开始的，因此要加0
             * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
             * */
            let month =
                date.getMonth() + 1 < 10
                    ? '0' + (date.getMonth() + 1)
                    : date.getMonth() + 1;
            let day =
                date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            let hours =
                date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
            let minutes =
                date.getMinutes() < 10
                    ? '0' + date.getMinutes()
                    : date.getMinutes();
            let seconds =
                date.getSeconds() < 10
                    ? '0' + date.getSeconds()
                    : date.getSeconds();
            let weekDay = '';
            let weekDayType = date.getDay();
            switch (weekDayType) {
                case 0:
                    weekDay = '星期天';
                    break;
                case 1:
                    weekDay = '星期一';
                    break;
                case 2:
                    weekDay = '星期二';
                    break;
                case 3:
                    weekDay = '星期三';
                    break;
                case 4:
                    weekDay = '星期四';
                    break;
                case 5:
                    weekDay = '星期五';
                    break;
                case 6:
                    weekDay = '星期六';
                    break;
            }
            return [
                year + '年' + month + '月' + day + '日',
                weekDay,
                hours + ':' + minutes + ':' + seconds,
            ];
        },
        /**
         * 切换沦陷模式
         */
        changePollingType() {
            const elem = document.getElementById('app');
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { // Firefox
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { // IE/Edge
                elem.msRequestFullscreen();
            }
            return
            this.isStopPolling = !this.isStopPolling;
            if (this.isStopPolling) {
                this.$message({
                    message: '已停止页面轮询',
                    type: 'success',
                });
                this.stopPolling(); //清除页面轮询
                //清除鼠标轮询
            } else {
                this.$message({
                    message: '已启动页面轮询',
                    type: 'success',
                });
                this.startPolling(this.changePage, 60000);
            }
        },
        /**
         * @description: 启动轮询
         * @return {*}
         * @param func
         * @param {*} wait
         */
        startPolling(func, wait) {
            // if (immediate) {
            //     func();
            // }
            if (this.pollingTimer) {
                clearTimeout(this.pollingTimer);
            }
            this.pollingTimer = setTimeout(() => {
                // console.log('执行轮询方法');
                func();
                // console.log('func被执行');
                this.startPolling(func, wait);
            }, 60000);
        },

        /**
         * @description: 关闭轮询
         * @return {*}
         */
        stopPolling() {
            if (this.pollingTimer) {
                clearTimeout(this.pollingTimer);
                this.pollingTimer = null;
            }
        },
        /**
         * @description: 关闭鼠标移动轮询
         * @return {*}
         */

        listenMouseMove() {
            // 关闭页面轮询时,停止鼠标
            if (this.isStopPolling === true) {
                if (this.listenMouseTimer) {
                    clearTimeout(this.listenMouseTimer);
                }
            } else if (
                this.isStopPolling === false &&
                this.noPollingPage === false
            ) {
                if (this.listenMouseTimer) {
                    clearTimeout(this.listenMouseTimer);
                }
                if (this.pollingTimer) {
                    clearTimeout(this.pollingTimer);
                }
                // console.log('鼠标移动,清空定时器');
                this.listenMouseTimer = setTimeout(() => {
                    this.startPolling(this.changePage, 60000);
                }, 5000);
            }
        },
        //进入首页
        gotoFirstPage() {
            this.btn[this.pageIndex].isActive = true;
            // this.$router.push({ path: this.btn[this.pageIndex].router });
            this.$refs.fatherView.style.backgroundImage =
                'url(' + this.imgUrl[this.pageIndex] + ')';
        },
        /**
         * @description: 跳转
         * @return {*}
         * @param num
         */
        changePage(num) {
            // console.log(num);
            // 跳转对应页面,终止轮询,阻止鼠标移动轮询事件
            // if (num == 6 || num == 7) {
            //     if (this.pollingTimer) {
            //         clearTimeout(this.pollingTimer);
            //     }
            //     if (this.listenMouseTimer) {
            //         clearTimeout(this.listenMouseTimer);
            //     }
            //     this.btn.forEach((item, index) => {
            //         if (index == num) {
            //             item.isActive = true;
            //         } else {
            //             item.isActive = false;
            //         }
            //     });
            //     this.$router.push({ path: this.btn[num].router });
            //     this.noPollingPage = true;
            //     return;
            // }
            this.noPollingPage = false;
            // 如果轮询,重启定时器
            if (this.isStopPolling == false) {
                // console.log('pageIndex清除定时器');
                if (this.pollingTimer) {
                    clearTimeout(this.pollingTimer);
                }
                // console.log('pageIndex重新轮询');
                // this.startPolling(this.changePage, 60000);
            }
            // if (num === 6) {
            //     window.open(this.iframeSrc);
            //     return;
            // }
            // 轮询时,手动修改跳转变量
            if (num === undefined || !this.isNumber(num)) {
                if (this.pageIndex == 5) {
                    this.pageIndex = 0;
                } else {
                    this.pageIndex++;
                }
                this.btn.forEach((item, index) => {
                    item.isActive = false;
                    if (this.pageIndex == index) {
                        item.isActive = true;
                        if (item.router) {
                            this.showFrame = false;
                            this.$router.push({ path: item.router });
                        }
                        this.$refs.fatherView.style.backgroundImage =
                            'url(' + this.imgUrl[index] + ')';
                    }
                });
            }
            //不轮询时,函数传参存入跳转变量
            else {
                this.pageIndex = num;
                this.btn.forEach((item, index) => {
                    item.isActive = false;
                    if (this.pageIndex == index) {
                        item.isActive = true;
                        if (item.router) {
                            this.showFrame = false;
                            this.$router.push({ path: item.router });
                        }
                        this.$refs.fatherView.style.backgroundImage =
                            'url(' + this.imgUrl[index] + ')';
                    }
                });
            }
        },
    },
};
</script>
<style scoped lang="scss">
.simpleTable {
    width: 100%;
    height: 100%;
    // background-image: url("../../assets/images/dp/jc-old/jc_bgimg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.topBar {
    z-index: 99;
    height: 72px !important;
    padding: 17px 60px 0;
    /*margin: 0 1.997px;*/
    background-image: url('../../assets/images/dp/jc-old/top_title.png');
    background-repeat: no-repeat;
    background-size: 100%;
    color: #ffffff;
    font-size: 16px;
    flex-grow: 0;
    flex-shrink: 0;

    &-btns {
        flex-grow: 0;
        flex-shrink: 0;
        width: 102px;
        height: 32px;
        margin: 0 -2px;
        line-height: 30.12px;
        text-align: center;
        background-image: url('../../assets/images/dp/index/tab_defult.svg');
        background-size: 100%;
        background-repeat: no-repeat;
        color: #ffffff;
        cursor: pointer;

        &.select {
            background-image: url('../../assets/images/dp/index/tab_selected.svg');
            color: #005aff;
        }

        &.big {
            width: 123px;
            background-image: url('../../assets/images/dp/index/tab_big_defult.svg');
            &.select {
                background-image: url('../../assets/images/dp/index/tab_big_selected.svg');
                color: #005aff;
            }
        }
    }

    &-name {
        flex-grow: 0;
        flex-shrink: 0;
        width: 648px;
        text-align: center;
        font-size: 36px;
        font-family: 'pmzdfont', sans-serif;
        font-weight: 400;
        color: #ffffff;
        line-height: 41px;
        text-shadow: 0 2px 0 #01092f;
        letter-spacing: 3px;
    }

    &-dateBar {
        width: 100%;
        font-size: 15.994px;
        text-align: right;
    }
    &-iconBar {
        width: 12px;
        .icon1 {
            color: #10f2fd;
        }
    }
    &-timeBar {
        margin-left: 11.002px;
        font-size: 15.994px;
    }
}

.iframe {
    border: 0 !important;
    width: 100%;
}
</style>
