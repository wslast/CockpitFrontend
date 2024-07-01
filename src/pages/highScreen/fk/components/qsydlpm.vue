<!--
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description:  全省疑点率排名
-->
<template>
<div class="qsydlpm" v-if="list.length > 0">
    <div class="df fdc" style="flex-shrink:0;flex-grow:0;">
        <div class="df aic mb34">
            <img class="pm" src="../../../../assets/images/dp/fk/icon_one.svg" alt="" />
            <div class="df fdc">
                <div class="name">{{ list[0].sm }}</div>
                <div class="value df">
                    <div class="pct">{{ list[0].ydl }}</div>
                    <div class="unit">%</div>
                </div>
            </div>
        </div>
        <div class="df aic mb34">
            <img class="pm" src="../../../../assets/images/dp/fk/icon_two.svg" alt="" />
            <div class="df fdc">
                <div class="name">{{ list[1].sm }}</div>
                <div class="value df">
                    <div class="pct">{{ list[1].ydl }}</div>
                    <div class="unit">%</div>
                </div>
            </div>
        </div>
        <div class="df aic">
            <img class="pm" src="../../../../assets/images/dp/fk/icon_three.svg" alt="" />
            <div class="df fdc">
                <div class="name">{{ list[2].sm }}</div>
                <div class="value df">
                    <div class="pct">{{ list[2].ydl }}</div>
                    <div class="unit">%</div>
                </div>
            </div>
        </div>
    </div>
    <div class="line"></div>
    <div class="fg1 df fww jca">
        <div class="city" v-for="(item, index) in list.slice(3, 11)">
            <div class="no">
                {{item.pm}}
            </div>
            <div class="no">
                {{ item.sm }}
            </div>
            <div class="df" style="align-items:baseline">
                <div class="percent">
                    {{ item.ydl }}
                </div>
                <div class="unit2">
                    %
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'qsydlpm',
    components: {},

    data() {
        return {
            list: [],
        };
    },

    computed: {},

    created() {
        this,
        this.getData();
    },

    methods: {
        getData() {
            this.$api
                .formPost("/api/dyncscript/scriptRule/query", {
                    scriptId: "fk_sp_qsydlpm"
                })
                .then(res => {
                    this.list = res.retBody.retList;
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.qsydlpm {
    display: flex;
    padding-top: 20.006px;
    padding-left: 10.003px;

    .pm {
        height: 60px;
        width: 60px;
        margin-right: 10.003px;
    }

    .name {
        font-size: 18.01px;
        font-weight: 400;
        color: #ffffff;
    }

    .value {
        display: flex;
        align-items: baseline;
    }

    .pct {
        font-size: 24px;
        font-weight: bold;
        color: #31edff;
    }

    .unit {
        font-size: 13.997px;
        font-weight: 400;
        color: #aab5b5;
        margin-left: 0.156vw;
    }

    .line {
        margin: 0vw 10.003px;
        width: 0.104vw;
        flex-shrink: 0;
        flex-grow: 0;
        height: 100%;
        background: linear-gradient(0deg,
                rgba(0, 255, 240, 0) 0%,
                rgba(0, 255, 240, 0.99) 47%,
                rgba(0, 255, 240, 0) 100%);
    }
}

.mb34 {
    margin-bottom: 34.003px;
}

.city {
    height: 39.994px;
    width: 144.998px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: url('../../../../assets/images/dp/fk/paiming_bg.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .no {
        font-size: 13.997px;
        font-weight: 400;
        color: #ffffff;
        margin-left: 8.006px;
    }

    .percent {
        font-size: 18.01px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #31edff;
    }

    .unit2 {
        font-size: 13.997px;
        font-weight: 400;
        color: #31edff;
    }
}

.fww {
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
