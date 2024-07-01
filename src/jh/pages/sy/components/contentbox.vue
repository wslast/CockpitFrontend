<script>
export default {
    name: "contentbox",
    data(){
        return{
            btnList:[
                {
                    title:'缴存',
                    value:'/highScreen/jc'
                },
                {
                    title:'提取',
                    value:'/highScreen/tq'
                },
                {
                    title:'贷款',
                    value:'/highScreen/dk'
                },
                {
                    title:'风控',
                    value:'/highScreen/fk'
                },
                {
                    title:'资金流动',
                    value:'/highScreen/zjld'
                },
                {
                    title:'银行画像',
                    value:'/highScreen/yhhx'
                },
                {
                    title:'数字化成果',
                    value:'/highScreen/szhcg'
                },
                {
                    title:'网格化服务',
                    value:'/highScreen/map'
                },
                {
                    title:'安全监管',
                    value:''
                },


            ]
        }
    },
    methods:{
        handleItem(v) {
            if(v.length > 0) {
                this.$router.push(v)
            }
        }
    }
}
</script>

<template>
    <div class="cb">
        <div class="cb-btn" :key="index"  :class="`cb-btn`+(index+1)" v-for="(item,index) in btnList" @click="handleItem(item.value)">
            <div class="cb-btn-text" :class="`cb-btn${index+1}-text`+(index+1)"   >{{item.title}}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
 .cb {
     height: 100%;
     width: 100%;
     //background: #cccccc;
     display: flex;
     align-items: center;
     $baseUrl: '../../../../assets/images/dp/shouye/';
     //background: url('#{$baseUrl}shouye_bgimg.jpg');
     &-btn {
         width: 173.94px;
         height: 277.09px;
         background: url("#{$baseUrl}shouye_jc.svg");
         cursor: pointer;
         &-text {
            text-align: center;
             margin-top: 178px;
             font-family: MicrosoftYaHei;
             font-weight: bold;
             font-size: 24px;
             color: #FEFFFF;
             line-height: 24px;
         }

         &:nth-child(2n) {
             margin-left: 10px;
         }

         &:nth-child(odd) {
             margin-left: 11px;
         }
         &:first-child {
             margin-left: 0px;
         }
     }

     &-btn2 {
         background: url("#{$baseUrl}shouye_tq.svg");
         height: 258.09px;
         &-text2 {
             margin-top: 169px;
         }
     }

     &-btn3 {
         background: url("#{$baseUrl}shouye-dk.svg");
         height: 245.09px;
         &-text3 {
             margin-top: 162px;
         }
     }

     &-btn4 {
         background: url("#{$baseUrl}shouye_fk.svg");
         height: 235.09px;
         &-text4 {
             margin-top: 158px;
             margin-left: 4px;
         }
     }


     &-btn5 {
         background: url("#{$baseUrl}shouye_zjld.svg");
         height: 231.31px;
         &-text5 {
             margin-top: 156px;
             margin-left: 5px;
         }
     }

     &-btn6 {
         background: url("#{$baseUrl}shouye_yhhx.svg");
         height: 236.97px;
         &-text6 {
             margin-top: 159px;
             margin-left: 6px;
         }
     }

     &-btn7 {
         background: url("#{$baseUrl}shouye_szhcg.svg");
         height: 243.97px;
         &-text7 {
             margin-top: 163px;
             margin-left: 5px;
         }
     }

     &-btn8 {
         background: url("#{$baseUrl}shouye_hghfw.svg");
         height: 257.97px;
         &-text8 {
             margin-top: 169px;
             margin-left: 8px;
         }
     }

     &-btn9 {
         background: url("#{$baseUrl}shouye_aqjg.svg");
         height: 275.97px;
         &-text9 {
             margin-top: 177px;
             margin-left: 12px;
         }
     }

 }
</style>
