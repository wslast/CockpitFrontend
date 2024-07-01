<!-- 核心组件 -->
<template>
  <div class="p10">
    <el-form v-model="form">
      <div style="font-size: 24px;margin: 20px;">jh-number</div>
      <div style="font-size: 24px;margin: 20px;">
        获取value:{{ form.money }}
      </div>
      <jh-number
        :decimalNumber="2"
        :isMoney="false"
        v-model="form.money"
      ></jh-number>
      <div style="font-size: 24px;margin: 20px;">jh-enu-select</div>
      <div style="font-size: 24px;margin: 20px;">
        获取value:{{ form.hyzk }},获取key:{{ form.label }}
      </div>
      <jh-enu-select
        @change="getval"
        multiple
        v-model="form.hyzk"
        type="hyzk"
        :valName.sync="form.label"
      ></jh-enu-select>
      <div style="font-size: 24px;margin: 20px;">jh-cascader</div>
      <div style="font-size: 24px;margin: 20px;">
        获取value:{{ JSON.stringify(form.area) }},末尾key:{{
          form.areaEndCode
        }},末尾中文:
        {{ form.areaName }}
      </div>
      <jh-cascader v-model="form" :attr="attr"></jh-cascader>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "coreCpt",
  components: {},

  data() {
    return {
      form: {
        money: 0,
        hyzk: "",
        label: "",
        area: [],
        area1: [],
        areaValue: "",
        areaEndCode: "",
        areaName: ""
      },
      attr: {
        type: "area",
        name: "area",
        endName: "areaEndCode",
        labelName: "areaName",
        label: "注册地址",
        labelWidth: 90,
        required: "1" //1为禁用
        // disabled: "1"  //1为禁用
      }
    };
  },

  computed: {},

  created() {},

  methods: {
    getval(item) {
      console.log(item);
    }
  }
};
</script>
<style lang="scss" scoped></style>
