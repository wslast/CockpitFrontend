<template>
    <div class="quota">
        <div class="quota-num">

            <div class="quota-num-l" >
                <bfjl></bfjl>
            </div>
            <div class="quota-num-c" >
                <zzsyl></zzsyl>
            </div>
            <div class="quota-num-r" >

                <zjyyl></zjyyl>
            </div>


        </div>
        <div class="quota-deposit">
            <div class="quota-deposit-l">
                <div class="quota-deposit-value">{{dq.value}}</div>
                <div class="quota-deposit-unit">{{ dq.unit }}元</div>
            </div>
            <div class="quota-deposit-r">
                <div class="quota-deposit-value">{{hq.value}}</div>
                <div class="quota-deposit-unit">{{ hq.unit }}元</div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            dq: {value: 23.69,unit: '亿'},
            hq: {value: 15.5,unit: '亿'},
        };
    },
    components:{
      bfjl:()=>import('./bfjl.vue'),
        zzsyl:()=>import('./zzsyl.vue'),
        zjyyl:()=>import('./zjyyl.vue')
    },
    async created() {
        // await this.getData();
    },
    methods: {
    },
};
</script>
<style lang="scss">
.quota {
    &-num {
        height: 190px;
        //background-color: #FFFFFF;
        display: flex;
        &-l{
            margin-right: 12px;
            flex: 1;
        }
        &-c {
            margin-right: 12px;
            flex: 1;
        }
        &-r {
            flex: 1;
        }

    }

    &-deposit {
        display: flex;
        height: 69px;
        color: #C0F6FB;

        &-l,
        &-r {
            padding-left: 80px;
            padding-right: 16px;
            text-align: right;
            text-shadow: 2px 0 2px #000000;
        }

        &-l {
            flex-shrink: 0;
            flex-grow: 0;
            width: 260px;
        }

        &-r {
            flex-shrink: 1;
            flex-grow: 1;
            width: 100%;
        }

        &-value {
            padding-top: 8px;
            line-height: 34px;
            font-size: 34px;
            font-weight: bold;
            font-family: MicrosoftYaHei,serif;
        }

        &-lable {
            font-size: 14px;
        }
    }
}
</style>
