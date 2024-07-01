<template>
    <div class="fwfs fwfs">
        <div class="fwfs-row" v-for="(item,key) in resData" :key="key">
            <div class="fwfs-row-item" v-for="it in item" :key="it.name">
                <div class="fwfs-row-item-value">
                    {{ it.value }}<span class="fwfs-row-item-value-unit">{{ it.unit }}</span>
                </div>
                <div class="fwfs-row-item-name">{{ it.name }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            resData: {
                ywbl: [
                    {name: '无纸化受理事项', value: '52',unit:'项'},
                    {name: '无纸化受理占比', value: '98%'},
                    {name: '无纸化审批事项', value: ''},
                    {name: '无纸化审批占比', value: ''},
                ],
                dagl: [
                    {name: '电子档案覆盖率', value: '98%'},
                    {name: '存量档案转化率', value: ''},
                    {name: '电子合同签署占比', value: ''},
                    {name: '档案数字化率', value: ''},
                ],
                zzsy: [
                    {name: '使用电子签章事项', value: '32项'},
                    {name: '电子签章事项占比', value: ''},
                    {name: '使用电子证照事项', value: ''},
                    {name: '电子证照事项占比', value: ''},
                ],
            }
        }
    }
}
</script>


<style lang="scss">
.fwfs {
    $baseUrl: '../../../../assets/images/dp/szhcg/';
    $colors: (
        #ED3628,
        #FFC35A,
        #457AFF,
        #28EF6E
    );

    display: flex;
    justify-content: center;
    gap: 20px;

    &-row {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
        width: 170px;
        padding-top: 84px;
        background-repeat: no-repeat;

        @for $i from 1 through 3 {
            &:nth-child(#{$i}) {
                background-image: url("#{$baseUrl}fwfs_lan_#{$i}.svg");
            }

            &:nth-child(#{$i}) &-item {
                background-image: url("#{$baseUrl}fwfs_lan_#{$i}_nei.svg");
                color: nth($colors, $i);
            }

        }

        &-item {
            width: 148px;
            height: 84px;
            text-align: center;

            &-value {
                height: 46px;
                line-height: 46px;
                font-size: 24px;
                font-weight: bolder;
                font-family: MicrosoftYaHei, serif;

                &-unit {
                    font-size: 18px;
                    color: #FFFFFF;
                    font-weight: normal;
                }
            }

            &-name {
                line-height: 38px;
                color: #FFFFFF;
            }
        }
    }
}
</style>
