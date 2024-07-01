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
        class="pl10 pr10"
        :model="form"
        :rules="rules"
        ref="form"
        labelWidth="110px"
        label-position="right"
      >
        <el-tabs v-model="activeName" :before-leave="beforeLeave">
          <el-tab-pane label="基本信息" name="first">
            <el-row>
              <el-col :span="8">
                <el-form-item label="真实姓名" prop="realName">
                  <el-input
                    v-model="form.realName"
                    placeholder="请输入"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="移动电话" prop="mobile">
                  <el-input
                    v-model="form.mobile"
                    autocomplete="off"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电子邮箱" prop="email">
                  <el-input
                    v-model="form.email"
                    autocomplete="off"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="用户类型" prop="userType">
                  <el-select
                    class="pctw100"
                    v-model="form.userType"
                    :disabled="userInfo.userType != '1'"
                    placeholder="请选择"
                  >
                    <el-option
                      label="超级管理员"
                      v-if="
												userInfo.userType === '1' ||
													infoDialogConfig.type === 'edit'
											"
                      value="1"
                    ></el-option>
                    <el-option
                      v-if="
												userInfo.userType === '1' ||
													infoDialogConfig.type === 'edit'
											"
                      label="普通管理员"
                      value="2"
                    ></el-option>
                    <el-option label="普通用户" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="用户机构" prop="organId">
                  <el-cascader
                    filterable
                    change-on-select
                    :options="options"
                    :props="cascaderProps"
                    v-model="form.organId"
                    style="width: 100%;"
                  ></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="是否领导">
                  <el-radio-group v-model="form.userLevel">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="启用状态">
                  <el-radio-group v-model="form.userStatus">
                    <el-radio label="1">启用</el-radio>
                    <el-radio label="0">禁用</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="同时登陆">
                  <el-radio-group v-model="form.enableParallelLogin">
                    <el-radio label="1">允许</el-radio>
                    <el-radio label="0">不允许</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="登陆账号"
                  prop="username"
                  v-if="form.userStatus == 1"
                >
                  <el-input
                    v-model="form.username"
                    placeholder="请输入"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="登陆密码"
                  prop="password"
                  v-if="form.userStatus == 1"
                >
                  <el-input
                    v-model.trim="form.password"
                    type="password"
                    placeholder="请输入"
                    autocomplete="new-password"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="确认密码"
                  prop="confirmPassword"
                  v-if="form.userStatus == 1"
                >
                  <el-input
                    v-model.trim="form.confirmPassword"
                    type="password"
                    placeholder="请输入"
                    autocomplete="new-password"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="用户资料" name="second">
            <el-row>
              <el-col :span="8">
                <el-form-item label="性别">
                  <el-radio-group v-model="form.sex">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="出生日期">
                  <el-date-picker
                    style="width: 100%;"
                    v-model="form.birthday"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="固定电话">
                  <el-input
                    v-model="form.telephone"
                    placeholder="请输入"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="证件类型">
                  <el-select
                    v-model="form.identificationType"
                    placeholder="请选择"
                    autocomplete="off"
                  >
                    <el-option
                      v-for="item in $validOption.isCard"
                      :key="item.value"
                      :label="item.key"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件号码" prop="identificationNumber">
                  <el-input
                    v-model="form.identificationNumber"
                    placeholder="请输入"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="邮政编码" prop="postcode">
                  <el-input
                    v-model="form.postcode"
                    placeholder="请输入"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="家庭住址">
                  <el-input
                    v-model="form.address"
                    placeholder="请输入"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="岗位">
                  <el-input
                    v-model="form.userPost"
                    placeholder="请输入"
                    autocomplete="off"
                    style="width: 100%;"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="职称">
                  <el-input
                    v-model="form.title"
                    autocomplete="off"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="职员类别">
                  <el-input
                    v-model="form.categoryStaff"
                    placeholder="请输入"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="毕业学校">
                  <el-input
                    v-model="form.school"
                    autocomplete="off"
                    placeholder="请输入"
                    style="width: 100%;"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="最高学历">
                  <el-input
                    v-model="form.highEducation"
                    placeholder="请输入"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="职员属性">
                  <el-input
                    placeholder="请输入"
                    v-model="form.staffAttribute"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="员工编号">
                  <el-input
                    v-model="form.userCode"
                    placeholder="请输入"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="QQ号码">
                  <el-input
                    v-model="form.qqNumber"
                    placeholder="请输入"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="微信号">
                  <el-input
                    v-model="form.wechatNumber"
                    placeholder="请输入"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="登录次数限制">
                  <el-input-number
                    :min="0"
                    :max="999"
                    v-model="form.loginFailNum"
                    autocomplete="off"
                  ></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="IP登录限制">
                  <el-input
                    v-model="form.allowIp"
                    type="textarea"
                    :placeholder="placeholder"
                    autocomplete="off"
                    autosize
                    style="width:100%;"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注">
                  <el-input
                    v-model="form.remark"
                    placeholder="请输入"
                    autosize
                    type="textarea"
                    autocomplete="off"
                    style="width:100%;"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
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
  name: 'infoDialog',
  props: {
    infoDialogConfig: {
      type: Object,
      default: () => {},
    },
    infoDialogVisible: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    let that = this;
    let validatePass2 = (rule, value, callback) => {
      if (that.form.password && value === '') {
        callback(new Error('请再次输入密码'));
      } else if (that.form.password && value !== that.form.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    let validateSimplePwd = (rule, value, callback) => {
      if (value === '') {
        callback();
      } else if (that.$validPwd(value)) {
        callback(new Error('密码强度过低'));
      } else {
        callback();
      }
    };
    let validatePassCard = (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (that.form.identificationType) {
        let valid = that.$validOption.isCard.filter(
          (item) => item.value === that.form.identificationType
        );
        if (valid && valid.length > 0) {
          if (valid[0].reg && !valid[0].reg.test(value)) {
            callback(new Error('格式错误'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      userInfo: JSON.parse(sessionStorage.getItem('user')),
      activeName: 'first',
      form: {
        id: '',
        username: '',
        enableParallelLogin: '1',
        password: '',
        realName: '',
        mobile: '',
        telephone: '',
        email: '',
        userStatus: '1',
        userType: '0',
        organId: '',
        userCode: '',
        sex: '',
        identificationType: '',
        identificationNumber: '',
        birthday: '',
        address: '',
        postcode: '',
        userPost: '',
        title: '',
        categoryStaff: '',
        school: '',
        highEducation: '',
        staffAttribute: '',
        qqNumber: '',
        remark: '',
        confirmPassword: '',
        wechatNumber: '',
        userLevel: '0',
        loginFailNum: '',
        allowIp: '',
      },
      rules: {
        userType: [
          { required: true, message: '用户类型不能为空！', trigger: 'blur' },
        ],
        organId: [
          { required: true, message: '用户机构不能为空！', trigger: 'blur' },
        ],
        username: [
          { required: true, message: '用户名不能为空！', trigger: 'blur' },
        ],
        realName: [
          { required: true, message: '真实姓名不能为空！', trigger: 'blur' },
        ],
        password: [{ validator: validateSimplePwd, trigger: 'blur' }],
        identificationNumber: [
          { validator: validatePassCard, trigger: 'blur' },
        ],
        mobile: [{ validator: this.$validOption.isPhone, trigger: 'blur' }],
        email: [{ validator: this.$validOption.isEmail, trigger: 'blur' }],
        confirmPassword: [
          { required: false, validator: validatePass2, trigger: 'blur' },
        ],
        postcode: [
          { validator: this.$validOption.isPostCode, trigger: 'blur' },
        ],
      },
      options: [],
      cascaderProps: {
        value: 'id',
        label: 'organName',
        children: 'children',
      },
      placeholder:
        '1.完整IP,例：192.168.1.1 \n2.IP区间,例：192.168.70.180-190  \n3.通配IP,例：192.168.70.* \n可设置多个规则，逗号分隔',
    };
  },

  computed: {},

  created() {
    if (this.infoDialogConfig.data) {
      for (const key in this.infoDialogConfig.data) {
        if (Object.hasOwnProperty.call(this.form, key)) {
          this.form[key] = this.infoDialogConfig.data[key];
        }
      }
      for (const key in this.infoDialogConfig.data.sysUserExt) {
        if (Object.hasOwnProperty.call(this.form, key)) {
          this.form[key] = this.infoDialogConfig.data.sysUserExt[key];
        }
      }
    }
    //后台为星号即为空串
    if (this.form.allowIp === '*') {
      this.form.allowIp = '';
    }
    this.getGlbOptions();
  },

  methods: {
    getGlbOptions() {
      this.$api
        .formPost('/api/auth/sysorgan/doGetSysOrganObject', {})
        .then((res) => {
          if (res.retHead.code == '0000000') {
            this.options = this.deleteChildren(res.retBody);
            if(this.form.organId && this.isString(this.form.organId)) {
              this.form.organId = this.getOrganIdList(this.form.organId,this.options)
            }
          }
        });
    },
    getOrganIdList(curKey, data){
      let result = [];
      let traverse = (curKey, path, data) => {
        if (data.length === 0) {
          return;
        }
        for (let item of data) {
          path.push(item);
          if (item.id === curKey) {
            result = JSON.parse(JSON.stringify(path));
            return;
          }
          const children = Array.isArray(item.children) ? item.children : [];
          traverse(curKey, path, children);
          path.pop();
        }
      };
      traverse(curKey, [], data);
      return result.map(item => item.id);
    },
    close() {
      this.$emit('update:infoDialogVisible', false);
    },
    confirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
          if (
            !this.isArray(params.organId) &&
            params.organId.indexOf(',') > -1
          ) {
            params.organId = params.organId.split(',');
          } else if (!this.isArray(params.organId)) {
            params.organId = [params.organId];
          }else {
            params.organId = params.organId.pop()
          }
          if (!params.password) {
            delete params.password;
          } else {
            if (this.$jhEncrypt) {
              params.password = this.$jhEncrypt.transferInfoEncrypt(
                params.password
              );
            }
          }
          //为空串传星号
          if (params.allowIp === '') {
            params.allowIp = '*';
          }
          if (params.id) {
            delete params.confirmPassword;
            this.$api
              .formPost('/api/auth/sysuser/doMod', params)
              .then((res) => {
                this.$message({
                  message: '操作成功！',
                  type: 'success',
                });
                this.close();
                this.$emit('onSuccess');
              });
          } else {
            delete params.id;
            delete params.confirmPassword;
            this.$api
              .formPost('/api/auth/sysuser/doSave', params)
              .then((res) => {
                this.$message({
                  message: '操作成功！',
                  type: 'success',
                });
                this.close();
                this.$emit('onSuccess');
              });
          }
        }
      });
    },
    beforeLeave() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve();
          } else {
            reject();
          }
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
