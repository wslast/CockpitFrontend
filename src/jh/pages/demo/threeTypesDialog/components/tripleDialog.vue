<!-- 三列弹窗 -->
<template>
  <jh-base-dialog
    :title="infoDialogConfig.title"
    :visible="infoDialogVisible"
    append-to-body
    width="1000px"
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
          <el-col :span="8">
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
          <el-col :span="8">
            <el-form-item label="标签2" prop="value2">
              <el-input v-model="form.value2" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="标签3" prop="value3">
              <el-radio-group v-model="form.value3">
                <el-radio :label="3">男</el-radio>
                <el-radio :label="6">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="标签4" prop="value4">
              <el-checkbox-group v-model="form.value4">
                <el-checkbox
                  label="美食/餐厅线上活动"
                  name="type"
                ></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="标签5" prop="value5">
              <el-switch
                v-model="form.value5"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                v-model="form.value6"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 6 }"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="附件" prop="fileList">
              <jh-file-upload
                v-model="form.fileList"
                ref="upload"
              ></jh-file-upload>
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
  name: "tripleDialog",
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
      headers: {
        "Auth-User-Token": window.sessionStorage.token
      },
      form: {
        value1: "",
        value2: "",
        value3: "",
        value4: [],
        value5: "",
        value5: "",
        value6: "",
        fileList: [],
        id: ""
      },
      rules: {
        value1: [{ required: true, message: "请选择", trigger: "change" }],
        value2: [{ required: true, message: "请输入", trigger: "blur" }],
        value3: [{ required: true, message: "请选择", trigger: "change" }],
        value4: [{ required: true, message: "请选择", trigger: "change" }],
        value5: [{ required: true, message: "请选择", trigger: "change" }],
        fileList: [{ required: true, message: "请选择", trigger: "change" }]
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
      //触发表单校验 确认文件列表不为空
      this.$refs.form.validate("fileList");
      //确认没有上传中的文件
      if (!this.$refs.upload.validUpload()) {
        this.$message.warning("文件正在上传");
        return;
      }
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
