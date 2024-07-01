<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 看板
-->
<template>
<div class="kb" v-if="list.length > 0">
    <div class="fg1 df w14 jca">
        <img class="logo" src="../../../../assets/images/dp/fk/icon_zydgs.svg" alt="" />
        <div class="df fdc">
            <!-- <div class="value primary">
                    {{ list[0].ztydgs }}
                </div> -->
            <div class="value primary fontPMZD">
                <animate-number duration="2000" from="0"  :to="list[0].ztyds" ref="errorCount"></animate-number>
            </div>
            <div class="name ">总体疑点数（个）</div>
        </div>
        <div class="df fdc">
            <!-- <div class="value primary">{{ list[0].ydl }}</div>-->
            <div class="value primary fontPMZD">
                <animate-number duration="2000" from="0" :formatter="format" :to="list[0].ydl" ref="errorCount"></animate-number>
                %
            </div>
            <div class="name">
                疑点率
            </div>
        </div>
    </div>
    <div class="fg1 df w14 jca">
        <img class="logo" src="../../../../assets/images/dp/fk/icon_dyxz.svg" alt="" />
        <div class="df fdc">
            <!-- <div class="value primary">{{ list[0].dyxz }}</div> -->
            <div class="value primary fontPMZD">
                <animate-number duration="2000" from="0" :to="list[0].dyxz" ref="errorCount"></animate-number>
            </div>
            <div class="name">当月新增（个）</div>
        </div>
        <div class="df fdc">
            <!-- <div class="value">{{ list[0].xzhb }}%</div> -->
            <div class="value fontPMZD" :class="{ down: list[0].xzhb < 0, up: list[0].xzhb > 0 }">
                <animate-number duration="2000" from="0"  :formatter="format" :to="list[0].xzhb" ref="errorCount"></animate-number>
                %
            </div>
            <div class="name">
                新增环比
                <img v-if="list[0].xzhb > 0" src="../../../../assets/images/dp/jc-old/icon_up.svg" alt="" />
                <img v-if="list[0].xzhb < 0" src="../../../../assets/images/dp/jc-old/icon_down.svg" alt="" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'kb',
    components: {},

    data() {
        return {
            list: [],
        };
    },

    created() {
        this,
        this.getData();
    },

    methods: {
        format(val) {
            return val.toFixed(2);
        },
        getData() {
            this.$api.formPost("/api/dyncscript/scriptRule/query", {
                scriptId: "fk_sp_kb"
            }).then(res => {
                this.list = res.retBody.retList;
            });
        },
        /**
         * @description: number组件保留几位小数
         * @return {*}
         * @param {*} num
         */
        formatter(num) {
            return num.toFixed(2); //小数点后几位，数字就是几小数点后几位
        },
    },
};
</script>

<style lang="scss" scoped>
.kb {
    display: flex;
    margin-top: 34.003px;
}

.logo {
    height: 68.006px;
    width: 74.995px;
}

.primary {
    color: #ffc35a;
}

.up {
    color: #ef3628;
}

.down {
    color: #28ef6e;
}

.name {
    font-size: 15.994px;
    font-weight: 400;
    color: #ffffff;
}

/deep/ .value {
    font-size: 36px;
    font-weight: 400;
    font-family: PangMenZhengDao !important;
    box-sizing: border-box;
    -webkit-box-reflect: below -10.003px -webkit-gradient(linear,
            left top,
            left bottom,
            from(rgba(0, 0, 0, 0)),
            to(rgba(255, 255, 255, 0.6)));
}

/deep/ .fontPMZD span {
    font-family: PangMenZhengDao !important;
}
</style>
