<template>
    <div class="qspm">
        <div class="qspm-top">
            <div class="qspm-tops" v-for="(item, index) in list.slice(0, 3)" :key="index">
                <div class="qspm-tops-icon" :class="'qspm-tops-icon' + (index + 1)"></div>
                <div class="qspm-tops-data">
                    <div class="qspm-tops-data-name">{{ item.name }}</div>
                    <div class="qspm-tops-data-value">{{ item.value }}<span>%</span></div>
                </div>
            </div>
        </div>
        <div class="qspm-list">
            <div class="qspm-list-row" v-for="(column, columnIndex) in columns" :key="columnIndex">
                <div class="qspm-lists" v-for="(item, itemIndex) in column" :key="itemIndex">
                    <div class="qspm-lists-num">{{ item.rank }}</div>
                    <div class="qspm-lists-name">{{ item.name }}</div>
                    <div class="qspm-lists-value">{{ item.value }}<span>%</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {name: '湘直', value: 14.2},
                {name: '长沙市', value: 15.5},
                {name: '株洲市', value: 17.8},
                {name: '湘潭市', value: 20.4},
                {name: '衡阳市', value: 22.3},
                {name: '邵阳市', value: 23.1},
                {name: '永州市', value: 24.2},
                {name: '怀化市', value: 25.2},
                {name: '岳阳市', value: 26.2},
                {name: '娄底市', value: 26.4},
                {name: '湘西州', value: 27.3},
                {name: '常德市', value: 28.1},
                {name: '益阳市', value: 28.8},
                {name: '彬州市', value: 29.2},
            ]
        }
    },
    computed: {
        columns() {
            const list = this.list.map((item, index) => ({
                ...item,
                rank: index + 1
            })).slice(3);
            const midIndex = Math.ceil(list.length / 2);
            return [
                list.slice(0, midIndex),
                list.slice(midIndex)
            ];
        }
    }
}
</script>

<style scoped lang="scss">
.qspm {
    $baseUrl: '../../../../assets/images/dp/fk/';
    display: flex;
    padding: 50px 10px 16px 16px;

    &-top {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 142px;
        padding-right: 14px;
        background-image: url('#{$baseUrl}fk_fengexian.svg');
        background-position: right center;
        background-repeat: no-repeat;

        &s {
            display: flex;
            gap: 10px;

            &-icon {
                width: 50px;
                height: 50px;
                background-image: url('#{$baseUrl}icon_no1.svg');
                background-size: 100%;
                background-position: center center;
            }

            @for $i from 2 through 3 {
                &-icon#{$i} {
                    background-image: url('#{$baseUrl}icon_no#{$i}.svg');
                }
            }

            &-data {
                &-name {
                    font-size: 18px;
                    color: #fff;
                }

                &-value {
                    font-size: 24px;
                    color: #31EDFF;
                    font-family: 'pmzdfont', sans-serif;

                    span {
                        font-size: 14px;
                        color: #AAB5B5;
                    }
                }
            }
        }
    }

    &-list {
        flex-grow: 1;
        flex-shrink: 1;
        display: flex;
        gap: 10px;
        width: 100%;
        padding-left: 10px;

        &-row {
            display: flex;
            flex-direction: column;
            gap: 13px;
        }

        &s {
            flex-shrink: 0;
            flex-grow: 0;
            display: flex;
            align-items: center;
            width: 148px;
            height: 42px;
            padding: 0 6px;
            color: #fff;
            font-family: MicrosoftYaHei, serif;
            background-image: url('#{$baseUrl}fk_you2_xiaokuang.svg');

            &-num {
                flex-grow: 0;
                flex-shrink: 0;
                width: 26px;
                text-align: center;
            }

            &-name {
                flex-grow: 0;
                flex-shrink: 0;
                width: 58px;
            }

            &-value {
                flex-grow: 1;
                flex-shrink: 1;
                width: 100%;
                font-size: 18px;
                color: #31EDFF;

                span {
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
