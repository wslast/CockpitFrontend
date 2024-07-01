<template>
    <div class="df">
        <div class="fg1 w0 df fdc" v-if="dataList && dataList.length">
            <div
                class="h0 fg1 df fdc"
                style="margin-top: 44px;"
                v-for="(item, index) in dataList"
                :key="item.lx"
            >
                <div
                    style="height:72px;"
                    class="df"
                    v-if="index < dataList.length - 1"
                >
                    <div
                        class="leftBar"
                        :style="{ backgroundColor: item.color }"
                    ></div>
                    <div
                        class="leftDiv"
                        :style="{
                            color: item.color,
                            backgroundColor: item.color2,
                        }"
                    >
                        {{ item.sx }}
                    </div>
                    <div class="fg1 w0 df fdc centerDiv">
                        <div
                            class="h0 fg1 textDiv1"
                            :style="{ color: item.color }"
                        >
                            {{ item.name }}
                        </div>
                        <div class="h0 fg1 df">
                            <div class="textDiv2">{{ item.value }}</div>
                            <div class="textDiv3">{{ item.unit }}</div>
                        </div>
                    </div>
                    <div
                        class="rightBar"
                        :style="{ backgroundColor: item.color2 }"
                    ></div>
                </div>
                <div style="height:72px;" class="df" v-else>
                    <div
                        class="leftBar"
                        :style="{ backgroundColor: item.color }"
                    ></div>
                    <div
                        class="leftDiv df"
                        :style="{
                            color: item.color,
                            backgroundColor: item.color2,
                        }"
                    >
                        <div class="w0 fg1 lezzsyDiv bg"></div>
                    </div>
                    <div class="fg1 w0 df fdc centerDiv">
                        <div
                            class="h0 fg1 textDiv1"
                            :style="{ color: item.color }"
                        >
                            {{ item.name }}
                        </div>
                        <div class="h0 fg1 df">
                            <div class="textDiv2">{{ item.value }}</div>
                            <div class="textDiv3">{{ item.unit }}</div>
                        </div>
                    </div>
                    <div
                        class="rightBar"
                        :style="{ backgroundColor: item.color2 }"
                    ></div>
                </div>
                <div v-if="index < dataList.length - 1" class="h0 fg1"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dataList: [],
            color: ['#1AF3FD', '#A0B965 ', '#83C6FA', '#E59F3D'],
            color2: [
                'rgba(26,243,253,0.3)',
                'rgba(160,185,101,0.3)',
                '	rgba(131,198,250,0.3)',
                'rgba(229,159,61,0.3)',
            ],
        };
    },
    computed: {},
    watch: {},
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
        this.getData();
    },
    beforeDestroy() {},
    methods: {
        getData() {
            this.$api
                .formPost('/api/dyncscript/scriptRule/query', {
                    scriptId: 'sy_cwgk',
                })
                .then((res) => {
                    let data = res.retBody.retList[0];
                    this.dataList = [
                        {
                            value: data.dqye,
                            lx: 'dqye',
                            name: '定期余额',
                            sx: '定',
                        },
                        {
                            value: data.hqye,
                            lx: 'hqye',
                            name: '活期余额',
                            sx: '活',
                        },
                        {
                            value: data.zcfzl,
                            lx: 'zcfzl',
                            name: '个贷率',
                            sx: '%',
                        },
                        {
                            value: data.ljzzsy,
                            lx: 'ljzzsy',
                            name: '当年累计增值收益',
                            sx: '',
                        },
                    ];
                    this.dataList.forEach((item, index) => {
                        item.color = this.color[index];
                        item.color2 = this.color2[index];
                        item.unit = item.lx == 'zcfzl' ? '%' : '万元';
                    });
                });
        },
    },
};
</script>
<style scoped lang="scss">
.leftBar {
    margin-left: 36.998px;
    width: 3.994px;
}
.leftDiv {
    width: 80.006px;
    line-height: 80.006px;
    font-size: 36px;
    text-align: center;
}
.rightBar {
    margin-right: 35.002px;
    width: 3.994px;
    height: 72px;
}
.lezzsyDiv {
    margin: 18.01px 22.003px 18.01px 22.003px;
}
.bg {
    background-image: url('../../../../assets/images/dp/sy/icon_ljzzsy.svg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.centerDiv {
    margin-left: 20.006px;
    line-height: 36px;
    .textDiv1 {
        font-size: 18.01px;
    }
    .textDiv2 {
        font-size: 24px;
        color: #ffffff;
    }
    .textDiv3 {
        font-size: 13.997px;
        color: #aab5b5;
        margin-left: 5px;
        line-height: 13.997px;
        margin-top: 13.997px;
    }
}
</style>
