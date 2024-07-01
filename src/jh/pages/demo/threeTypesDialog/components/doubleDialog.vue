<!-- 双列弹窗 -->
<template>
  <jh-base-dialog
    :title="infoDialogConfig.title"
    :visible="infoDialogVisible"
    append-to-body
    width="800px"
    @close="close"
  >
    <template slot="body">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="auto"
        label-position="right"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="标签1" prop="value1">
              <el-select
                v-model="form.value1"
                style="width:100%;"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.moduleName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签2" prop="value2">
              <el-input v-model="form.value2" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标签3" prop="value3">
              <el-radio-group v-model="form.value3">
                <el-radio :label="3">男</el-radio>
                <el-radio :label="6">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签4" prop="value4">
              <el-switch v-model="form.value4"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标签5" prop="value5">
              <el-radio-group v-model="form.value5">
                <el-radio :label="3">男</el-radio>
                <el-radio :label="6">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签6" prop="value6">
              <el-switch v-model="form.value6"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </jh-base-dialog>
</template>
<script>
export default {
  name: "doubleDialog",
  props: {
    infoDialogConfig: {
      type: Object,
      default: () => {}
    },
    infoDialogVisible: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      form: {
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        value5: "",
        value6: "",
        id: ""
      },
      rules: {
        value1: [{ required: true, message: "请选择", trigger: "change" }],
        value2: [{ required: true, message: "请输入", trigger: "blur" }],
        value3: [{ required: true, message: "请选择", trigger: "change" }],
        value4: [{ required: true, message: "请选择", trigger: "change" }],
        value5: [{ required: true, message: "请选择", trigger: "change" }],
        value6: [{ required: true, message: "请选择", trigger: "change" }]
      },
      options: []
    };
  },

  computed: {},

  mounted() {
    if (this.infoDialogConfig.data) {
      for (const key in this.infoDialogConfig.data) {
        if (Object.hasOwnProperty.call(this.form, key)) {
          this.form[key] = this.infoDialogConfig.data[key];
        }
      }
    }
    this.getModuleOption();
  },

  methods: {
    getModuleOption() {
      this.$api.formPost("/api/log/module/doGetSelectList", {}).then(res => {
        this.options = res.retBody;
      });
    },
    close() {
      this.$emit("update:infoDialogVisible", false);
    },
    confirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
          if (params.id) {
            this.$apiData.demo.editData(params).then(res => {
              this.$message.success("操作成功");
              this.close();
              this.$emit("onSuccess");
            });
          } else {
            delete params.id;
            this.$apiData.demo.addData(params).then(res => {
              this.$message.success("操作成功");
              this.close();
              this.$emit("onSuccess");
            });
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
