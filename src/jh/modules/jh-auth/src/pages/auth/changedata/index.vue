<template>
	<div class="df" style="padding:10px">
		<el-card
			class="df mr20"
			style="width: 290px;min-width: 290px;max-width: 290px;"
		>
			<info :form="editForm" v-if="editForm && editForm.id"></info>
		</el-card>
		<el-card class="fg1">
			<el-tabs v-model="activeName" :before-leave="beforeLeave">
				<el-tab-pane label="基本信息" name="first">
					<el-form
						class="pl10 pr10"
						:model="editForm"
						:rules="rules"
						ref="editForm"
						labelWidth="90px"
						label-position="right"
					>
						<el-row>
							<el-col :span="8">
								<el-form-item label="真实姓名" prop="realName">
									<el-input
										v-model="editForm.realName"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="移动电话" prop="mobile">
									<el-input
										v-model="editForm.mobile"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="电子邮箱" prop="email">
									<el-input
										v-model="editForm.email"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="8">
								<el-form-item label="用户类型" prop="userType">
									<el-select
										class="pctw100"
										v-model="editForm.userType"
										:disabled="userInfo.userType != '1'"
										placeholder="请选择"
									>
										<el-option label="超级管理员" value="1"></el-option>
										<el-option label="普通管理员" value="2"></el-option>
										<el-option label="普通用户" value="0"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="16">
								<el-form-item label="用户机构" prop="organId">
									<el-cascader
										disabled
										change-on-select
										:options="options"
										:props="cascaderProps"
										v-model="editForm.organId"
										style="width: 100%;"
									></el-cascader>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24" class="tr">
								<el-form-item label="">
									<el-button @click="submitForm" type="primary">提交</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="个人资料" name="second">
					<el-form
						class="pl10 pr10"
						:model="editForm"
						:rules="rules"
						ref="editForm1"
						labelWidth="110px"
						label-position="right"
					>
						<el-row>
							<el-col :span="8">
								<el-form-item label="性别">
									<el-radio-group v-model="editForm.sex">
										<el-radio label="1">男</el-radio>
										<el-radio label="2">女</el-radio>
									</el-radio-group>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="出生日期">
									<el-date-picker
										style="width: 100%;"
										v-model="editForm.birthday"
										type="date"
										value-format="yyyy-MM-dd"
										placeholder="选择日期"
									></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="固定电话">
									<el-input
										v-model="editForm.telephone"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="8">
								<el-form-item label="证件类型">
									<el-select
										v-model="editForm.identificationType"
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
										v-model="editForm.identificationNumber"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="邮政编码" prop="postcode">
									<el-input
										v-model="editForm.postcode"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="家庭住址">
									<el-input
										v-model="editForm.address"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="8">
								<el-form-item label="岗位">
									<el-input
										v-model="editForm.userPost"
										autocomplete="off"
										style="width: 100%;"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="职称">
									<el-input
										v-model="editForm.title"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="职员类别">
									<el-input
										v-model="editForm.categoryStaff"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="8">
								<el-form-item label="毕业学校">
									<el-input
										v-model="editForm.school"
										autocomplete="off"
										style="width: 100%;"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="最高学历">
									<el-input
										v-model="editForm.highEducation"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="职员属性">
									<el-input
										v-model="editForm.staffAttribute"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="8">
								<el-form-item label="员工编号">
									<el-input
										v-model="editForm.userCode"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="QQ号码">
									<el-input
										v-model="editForm.qqNumber"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="微信号">
									<el-input
										v-model="editForm.wechatNumber"
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
										v-model="editForm.loginFailNum"
										autocomplete="off"
									></el-input-number>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="IP登录限制">
									<el-input
										v-model="editForm.allowIp"
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
										v-model="editForm.remark"
										type="textarea"
										autocomplete="off"
										style="width:100%;"
									></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24" class="tr">
								<el-form-item label="">
									<el-button @click="submitForm" type="primary">提交</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="修改密码" name="third">
					<el-form
						:model="ruleForm"
						:rules="ruleFormRules"
						ref="ruleForm"
						label-width="120px"
					>
						<div class="mt10 mb10 f16">
							上次修改密码时间 : {{ updatePasswordTime }}
						</div>
						<el-form-item label="用户名">
							<el-input
								type="username"
								v-model="username"
								autocomplete="off"
								disabled="disabled"
							></el-input>
						</el-form-item>
						<el-form-item label="旧密码" prop="oldPassword">
							<el-input
								type="password"
								v-model.trim="ruleForm.oldPassword"
								autocomplete="new-password"
							></el-input>
						</el-form-item>
						<el-row>
							<el-col>
								<el-form-item label="新密码" prop="password">
									<el-input
										type="password"
										v-model.trim="ruleForm.password"
										autocomplete="new-password"
									></el-input>
								</el-form-item>
							</el-col>
						</el-row>

						<el-form-item label="确认新密码" prop="checkPass">
							<el-input
								type="password"
								v-model.trim="ruleForm.checkPass"
								autocomplete="new-password"
							></el-input>
						</el-form-item>
						<el-form-item style="text-align:right;" class="mt20">
							<el-button @click="resetForm('ruleForm')">重置</el-button>
							<el-button type="primary" @click="changePwd('ruleForm')"
								>提交</el-button
							>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
		</el-card>
	</div>
</template>

<script>
export default {
	components: {
		info: (resolve) => resolve(require('./components/info.vue')),
	},
	data() {
		let that = this;
		let validatePass = (rule, value, callback) => {
			if (that.editForm.password && value === '') {
				return callback(new Error('请再次输入密码'));
			}
			if (that.$validPwd(value)) {
				return callback(new Error('密码强度过低'));
			} else if (that.editForm.password && value !== that.editForm.password) {
				return callback(new Error('两次输入密码不一致'));
			} else {
				return callback();
			}
		};
		let validateOldPass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入旧密码'));
			} else {
				if (this.ruleForm.checkPass !== '') {
					this.$refs.ruleForm.validateField('password');
				}
				callback();
			}
		};
		let validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入新密码'));
			} else if (value !== this.ruleForm.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		let validatePassCard = (rule, value, callback) => {
			if (!value) {
				callback();
			} else if (that.editForm.identificationType) {
				let valid = that.$validOption.isCard.filter(
					(item) => item.value === that.editForm.identificationType
				);
				if (valid && valid.length > 0) {
					if (valid[0].reg && !valid[0].reg.test(value)) {
						callback(new Error('格式错误!'));
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
			pathArr: '',
			activeName: 'first',
			username: JSON.parse(sessionStorage.getItem('user')).username,
			updatePasswordTime: JSON.parse(sessionStorage.getItem('user'))
				.updatePasswordTime,
			ruleForm: {
				oldPassword: '',
				password: '',
				checkPass: '',
			},
			placeholder:
				'1.完整IP,例：192.168.1.1 \n2.IP区间,例：192.168.70.180-190  \n3.通配IP,例：192.168.70.* \n可设置多个规则，逗号分隔',
			ruleFormRules: {
				oldPassword: [
					{ required: true, validator: validateOldPass, trigger: 'blur' },
				],
				password: [
					{ required: true, validator: validatePass, trigger: 'blur' },
				],
				checkPass: [
					{ required: true, validator: validatePass2, trigger: 'blur' },
				],
			},
			tableData: [],
			rules: {
				identificationNumber: [
					{ validator: validatePassCard, trigger: 'blur' },
				],
				organId: [
					{ required: true, message: '部门名称不能为空！', trigger: 'blur' },
				],
				realName: [
					{ required: true, message: '真实姓名不能为空！', trigger: 'blur' },
				],
				mobile: [{ validator: that.$validOption.isPhone, trigger: 'blur' }],
				email: [{ validator: that.$validOption.isEmail, trigger: 'blur' }],
				username: [
					{ required: true, message: '用户名不能为空！', trigger: 'blur' },
				],
				postcode: [
					{ validator: that.$validOption.isPostCode, trigger: 'blur' },
				],
			},
			options: [],
			cascaderProps: {
				value: 'id',
				label: 'organName',
				children: 'children',
			},
			editForm: {
				id: '',
				username: '',
				realName: '',
				birthday: '',
				mobile: '',
				telephone: '',
				email: '',
				organId: '',
				organName: '',
				userType: '',
				userCode: '',
				sex: '',
				identificationType: '',
				identificationNumber: '',
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
				wechatNumber: '',
				loginFailNum: '',
				allowIp: '',
			},
			total: 0,
			pageSize: 10,
			currentPage: 1,
		};
	},
	watch: {
		editForm: {
			handler: function(val) {
				this.getCurrenPosition(this.options, '');
				if (this.pathArr && !this.isArray(val.organId)) {
					val.organId = this.pathArr
						? this.pathArr.split(',').filter((item) => {
								return item != '';
						  })
						: [];
				}
				//后台为星号即为空串
				if (val.allowIp === '*') {
					val.allowIp = '';
				}
			},
			deep: true,
		},
	},
	mounted() {
		if (this.$route.query.type && this.$route.query.type === '2') {
			this.activeName = 'third';
		}
		this.init();
	},
	methods: {
		//递归获取级联选择器值路径
		getCurrenPosition(list, path) {
			if (this.editForm.organId && list && list.length > 0) {
				for (const iterator of list) {
					iterator.path = '';
					iterator.path = path;
					iterator.path += iterator.id + ',';
					if (iterator.id == this.editForm.organId) {
						this.pathArr = iterator.path;
					}
					if (iterator.children && iterator.children.length > 0) {
						this.getCurrenPosition(iterator.children, iterator.path);
					}
				}
			} else {
				return '';
			}
		},
		getGlbOptions() {
			return new Promise((resolve, reject) => {
				this.$api
					.formPost('/api/auth/sysorgan/doGetSysOrganObject', {})
					.then((res) => {
						if (res.retHead.code == '0000000') {
							this.options = this.deleteChildren(res.retBody);
							if (this.pathArr) {
								this.editForm.organId = this.pathArr
									? this.pathArr.split(',')
									: [];
							}
						}
						resolve();
					});
			});
		},

		async init() {
			await this.getGlbOptions();
			let user = JSON.parse(sessionStorage.getItem('user'));
			this.$api.formPost('/api/auth/sysuser/doGetUserSelf', {}).then((res) => {
				if (res.retHead.code === '0000000') {
					for (let key in this.editForm) {
						this.editForm[key] = '';
					}
					for (const key in res.retBody) {
						if (Object.hasOwnProperty.call(this.editForm, key)) {
							this.editForm[key] = res.retBody[key];
						}
					}
					for (const key in res.retBody.sysUserExt) {
						if (Object.hasOwnProperty.call(this.editForm, key)) {
							this.editForm[key] = res.retBody.sysUserExt[key];
						}
					}
				}
			});
		},
		submitForm() {
			this.$refs.editForm.validate((validForm) => {
				if (validForm) {
					this.$refs.editForm1.validate((validForm1) => {
						if (validForm1) {
							let params = JSON.parse(JSON.stringify(this.editForm));
							if (
								!this.isArray(params.organId) &&
								params.organId.indexOf(',') > -1
							) {
								params.organId = params.organId.split(',');
							} else if (!this.isArray(params.organId)) {
								params.organId = [params.organId];
							}
							//为空串传星号
							if (params.allowIp === '') {
								params.allowIp = '*';
							}
							params.organName && delete params.organName;
							params.organId = params.organId[params.organId.length - 1];
							params.id && delete params.id;
							params.username && delete params.username;
							this.$api
								.formPost('/api/auth/sysuser/doModSelf', params)
								.then((res) => {
									if (res.retHead.code == '0000000') {
										this.init();
										this.$message.success('修改成功！');
									} else {
										this.$message.error('修改失败！');
									}
								});
						}
					});
				}
			});
		},
		changePwd(formName) {
			this.$refs[formName].validate((valid) => {
				let params = {
					oldPassword: this.ruleForm.oldPassword,
					password: this.ruleForm.password,
				};
				if (this.$jhEncrypt) {
					params.oldPassword = this.$jhEncrypt.transferInfoEncrypt(
						params.oldPassword
					);
					params.password = this.$jhEncrypt.transferInfoEncrypt(
						params.password
					);
				}
				if (valid) {
					this.$api
						.formPost('/api/auth/sysuser/doModPass', params)
						.then((res) => {
							if (res.retHead.code === '0000000') {
								this.ruleForm = {};
								this.$message({
									message: '修改成功',
									type: 'success',
								});
							} else {
								this.$message.error('修改失败：' + res.retHead.message);
							}
						});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		beforeLeave(activeName, oldActiveName) {
			return new Promise((resolve, reject) => {
				if (oldActiveName === 'first') {
					this.$refs.editForm.validate((valid) => {
						if (valid) {
							resolve();
						} else {
							reject();
						}
					});
				} else if (oldActiveName === 'second') {
					this.$refs.editForm1.validate((valid) => {
						if (valid) {
							resolve();
						} else {
							reject();
						}
					});
				} else if (oldActiveName === 'third') {
					resolve();
				}
			});
		},
	},
};
</script>
<style lang="scss" scoped>
.btns {
	text-align: right;
}
</style>
