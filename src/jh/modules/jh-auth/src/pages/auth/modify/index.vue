<template>
	<div class style="padding:10px">
		<el-form
			:model="ruleForm"
			label-width="auto"
			status-icon
			:rules="rules"
			ref="ruleForm"
		>
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
					v-model="ruleForm.oldPassword"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-row>
				<el-col>
					<el-form-item label="新密码" prop="password">
						<el-input type="password" v-model="ruleForm.password"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-form-item label="确认新密码" prop="checkPass">
				<el-input
					type="password"
					v-model="ruleForm.checkPass"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item style="text-align:right;">
				<el-button type="primary" @click="submitForm('ruleForm')"
					>提交</el-button
				>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
export default {
	data() {
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
		let validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入新密码'));
			} else if (value.indexOf(' ') > -1) {
				callback(new Error('密码不能含有空格！'));
			} else if (!this.isSimplePwd(value)) {
				callback(new Error('长度6-12位,至少包含数字及字母'));
			} else {
				if (this.ruleForm.checkPass !== '') {
					this.$refs.ruleForm.validateField('checkPass');
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

		return {
			username: JSON.parse(sessionStorage.getItem('user')).username,
			ruleForm: {
				oldPassword: '',
				password: '',
				checkPass: '',
			},
			msgText: '',
			rules: {
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
		};
	},
	mounted() {},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				let user = JSON.parse(sessionStorage.getItem('user'));
				let params = {
					oldPassword: this.ruleForm.oldPassword,
					password: this.ruleForm.password,
					checkPass: this.ruleForm.checkPass,
					username: user.username,
				};
				console.log(params);
				if (valid) {
					this.$api
						.formPost('/api/auth/sysuser/doModPass', params)
						.then((res) => {
							console.log(res);
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
	},
};
</script>
<style lang="scss" scoped>
.input_span span {
	display: inline-block;
	width: 85px;
	height: 10px;
	background: #ccc;
	margin-top: 8px;
}

.input_span,
.font {
	display: table-cell;
}
.font span {
	text-align: center;
}
#one {
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-right: 0px solid;
	margin-left: 20px;
	margin-right: 3px;
}

#two {
	border-left: 0px solid;
	border-right: 0px solid;
	margin-left: -5px;
	margin-right: 3px;
}

#three {
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	border-left: 0px solid;
	margin-left: -5px;
}
#font span:nth-child(1) {
	color: red;
	margin-left: 60px;
}
#font span:nth-child(2) {
	color: orange;
	margin: 0 60px;
}
#font span:nth-child(3) {
	color: #00d1b2;
}
</style>
