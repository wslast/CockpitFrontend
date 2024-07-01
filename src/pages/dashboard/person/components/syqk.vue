<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 使用情况
-->
<template>
    <div class="pcth100">
        <empty
            :image-size="50"
            v-if="!dataList || dataList.length == 0"
        ></empty>
        <template v-else>
            <div class="box">
                <div
                    class="df fdc aic item"
                    v-for="item in dataList"
                    :key="item.yearmonth"
                >
                    <div class="card">
                        <div class="value showOne">{{ item.tqje }}</div>
                        <div class="unit">元</div>
                        <div class="reason showOne">{{ item.tqyy }}</div>
                    </div>
                    <img
                        class="icon"
                        src="../../../../assets/images/portrait/person/icon_grhx_zuo2_1.svg"
                        alt=""
                    />
                    <div class="circle"></div>
                    <div class="line"></div>
                    <div class="date">{{ item.yearmonth }}</div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'syqk',
    components: {},
    props: {
        personInfo: {
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            dataList: [],
        };
    },
    watch: {
        personInfo: {
            handler(newVal, oldVal) {
                if (newVal.grzh != '') {
                    this.getData();
                }
            },
            deep: true,
            immediate: true,
        },
    },
    computed: {},

    created() {},

    methods: {
        async getData() {
            this.dataList = [];
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'grhx_tqqk',
                        grzh: this.personInfo.grzh,
                    })
                    .then((res) => {
                        this.dataList = res.retBody.retList;
                        resolve();
                    });
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.box {
    display: flex;
    justify-content: space-around;
    overflow: auto;
    padding-bottom: 30px;
    .item {
        min-width: 200px;
        flex-grow: 1;
    }
}
.card {
    margin-top: 12px;
    background: #ffffff;
    box-shadow: 0px 0px 8px 0px rgba(3, 47, 94, 0.15);
    padding: 13px 20px 20px;
    .value {
        text-align: center;
        color: rgba(64, 158, 255, 1);
        font-size: 18px;
    }
    .unit {
        text-align: center;
        margin-top: 4px;
        color: rgba(168, 168, 168, 1);
        font-size: 12px;
    }
    .reason {
        text-align: center;
        color: rgba(29, 29, 29, 1);
        font-size: 14px;
        margin-top: 20px;
    }
}
.line {
    height: 1px;
    width: 100%;
    margin-top: -5px;
    background: #bfc2c5;
    justify-self: stretch;
}
.icon {
    width: 24px;
    height: 27px;
    margin-top: 10px;
    margin-bottom: 8px;
}
.circle {
    height: 8px;
    width: 8px;
    border-radius: 4px;
    background: rgba(191, 194, 197, 1);
}
.date {
    margin-top: 3px;
    font-size: 12px;
    color: #999999;
}
</style>
