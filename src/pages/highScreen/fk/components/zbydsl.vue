<template>
    <div class="zbydsl">
        <div class="zbydsl-title">
            <div class="zbydsl-title-label">排名</div>
            <div class="zbydsl-title-name">指标名称</div>
            <div class="zbydsl-title-value">指标数量</div>
        </div>
        <div class="zbydsl-list" v-for="(item, index) in list" :key="index">
            <div class="zbydsl-list-name">{{item.name}}</div>
            <div class="zbydsl-list-value">{{item.value}}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {name: '一人多户', value:'381'},
                {name: '睡眠账户（正常）', value:'320'},
                {name: '单位欠缴24个月以上', value:'164'},
            ]
        }
    },

}
</script>

<style scoped lang="scss">
.zbydsl {
    $baseUrl: '../../../../assets/images/dp/fk/';
    $leftWidth: 120px;
    display: flex;
    flex-direction: column;
    gap: 16px 0;
    padding: 50px 12px 16px;

    &-title {
        display: flex;
        align-items: center;
        width: 457px;
        height: 42px;
        background-color: rgba(255, 255, 255, 0.1);
        font-size: 16px;
        color: #92F9F8;
        font-family: MicrosoftYaHei,serif;

        &-label {
            padding-right: 10px;
        }

        &-label,
        &-value {
            flex-grow: 0;
            flex-shrink: 0;
            width: $leftWidth;
            text-align: center;
        }

        &-value {
            text-align: left;
        }

        &-name {
            flex-grow: 1;
            flex-shrink: 1;
            width: 100%;
        }
    }

    &-list {
        display: flex;
        align-items: center;
        width: 450px;
        height: 51px;
        padding-left: $leftWidth;
        font-size: 18px;
        font-family: MicrosoftYaHei,serif;
        font-weight: bold;
        color: #31EDFF;
        background-image: url('#{$baseUrl}fk_you3_neikuang1.svg');

        @for $i from 2 through 3 {
            &:nth-child(#{$i + 1}) {
                background-image: url('#{$baseUrl}fk_you3_neikuang#{$i}.svg');
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
