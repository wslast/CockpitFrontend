<script>
export default {
    name: "sy",
    components:{
        contentbox:()=>import('./components/contentbox.vue')
    }
}
</script>

<template>
    <v-scale-screen width="1920" height="1080">
<div class="sy">
    <div class="sy-title"></div>
    <div class="sy-content">
        <contentbox></contentbox>
    </div>
</div>
    </v-scale-screen>
</template>

<style scoped lang="scss">
.sy {
    $titleGap: 33px;
    $baseUrl: '../../../assets/images/dp/shouye/';
    width: 100%;
    height: 100%;
    padding: 16px 24px 16px;
    background: url('#{$baseUrl}shouye_bgimg.jpg') no-repeat;
    background-size: cover;

    &-title {
        margin-left: 594px;
        margin-right: 592px;
        margin-top: 195px;
        background: url('#{$baseUrl}system_name.svg') ;
        width: 734px;
        background-size: cover;
        height: 70px;
    }

    &-content {
        margin-left: 135px;
        margin-right: 135px;
        margin-top: 234px;
        height: 278px;
    }
}
</style>
