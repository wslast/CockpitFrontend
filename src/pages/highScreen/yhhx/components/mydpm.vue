<template>
    <div class="mydpm">
        <div class="mydpm-title">
            <div class="mydpm-title-label">排名</div>
            <div class="mydpm-title-name">银行名称</div>
            <div class="mydpm-title-value">满意度</div>
        </div>
        <div class="mydpm-list" v-for="(item, index) in list" :key="index">
            <div class="mydpm-list-name">{{item.name}}</div>
            <div class="mydpm-list-value">{{item.value}}%</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {name: '工商银行', value:'81'},
                {name: '农业银行', value:'20'},
                {name: '湖南银行', value:'20'},
                {name: '长沙银行', value:'20'},
                {name: '建设银行', value:'64'},
            ]
        }
    },

}
</script>

<style scoped lang="scss">
.mydpm {
    $baseUrl: '../../../../assets/images/dp/yhhx/';
    $leftWidth: 120px;
    display: flex;
    flex-direction: column;
    gap: 10px 0;
    padding: 50px 12px 16px;

    &-title {
        $labelWidth: 76px;
        flex-shrink: 0;
        flex-grow: 0;
        display: flex;
        align-items: center;
        width: 450px;
        height: 30px;
        background-color: rgba(255, 255, 255, 0.1);
        font-size: 16px;
        color: #92F9F8;
        font-family: MicrosoftYaHei,serif;

        &-label {
            flex-grow: 0;
            flex-shrink: 0;
            width: $labelWidth;
            padding-right: 10px;
            text-align: center;
        }

        &-value {
            flex-grow: 0;
            flex-shrink: 0;
            width: 100px;
            text-align: left;
        }

        &-name {
            padding-left: $leftWidth - $labelWidth;
            flex-grow: 1;
            flex-shrink: 1;
            width: 100%;
        }
    }

    &-list {
        flex-shrink: 0;
        flex-grow: 0;
        display: flex;
        align-items: center;
        width: 450px;
        height: 36px;
        padding-left: $leftWidth;
        font-size: 18px;
        font-family: MicrosoftYaHei,serif;
        font-weight: bold;
        color: #31EDFF;
        background-image: url('#{$baseUrl}yhhx_mydpm_top1.svg');

        @for $i from 2 through 5 {
            &:nth-child(#{$i + 1}) {
                background-image: url('#{$baseUrl}yhhx_mydpm_top#{$i}.svg');
            }
        }


        &-name {
            flex-grow: 1;
            flex-shrink: 1;
            width: 100%;
        }

        &-value {
            flex-grow: 0;
            flex-shrink: 0;
            width: 100px;
            font-size: 24px;
        }
    }
}
</style>
