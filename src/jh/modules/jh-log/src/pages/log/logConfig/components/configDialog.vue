<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 编辑模块信息
-->
<template>
	<BaseDialog
		:title="configDialogConfig.title"
		:visible="configDialogVisible"
		top="15vh"
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
					<el-col :span="24">
						<el-form-item label="日志名称" prop="logName">
							<el-input v-model="form.logName" placeholder="请输入"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="class" prop="className">
							<el-input
								v-model="form.className"
								placeholder="请输入"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="method" prop="methodName">
							<el-input
								v-model="form.methodName"
								placeholder="请输入"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="bean" prop="beanName">
							<el-input v-model="form.beanName" placeholder="请输入"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="是否开启" prop="beanName">
							<el-radio-group v-model="form.enable">
								<el-radio label="1">开启</el-radio>
								<el-radio label="0">关闭</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="日志模板" prop="logTmpl">
							<el-input
								v-model="form.logTmpl"
								type="textarea"
								placeholder="获取参数值语法：{#paramName#}"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="所属模块" prop="moduleId">
							<el-select
								v-model="form.moduleId"
								style="width:100%;"
								placeholder="请选择"
								@change="moduleChange"
							>
								<el-option
									v-for="item in moduleOptions"
									:key="item.id"
									:label="item.moduleName"
									:value="item.id"
								>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="所属类型" prop="typId">
							<el-select
								v-model="form.typId"
								style="width:100%;"
								placeholder="请选择"
							>
								<el-option
									v-for="item in typeOptions"
									:key="item.id"
									:label="item.typeName"
									:value="item.id"
								>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="所属操作" prop="operateTypeId">
							<el-select
								v-model="form.operateTypeId"
								style="width:100%;"
								placeholder="请选择"
							>
								<el-option
									v-for="item in operateTypeOptions"
									:key="item.id"
									:label="item.operateName"
									:value="item.id"
								>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</template>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close" size="small">取 消</el-button>
			<el-button type="primary" @click="confirm" size="small">确 定</el-button>
		</span>
	</BaseDialog>
</template>

<script>
export default {
	name: 'configDialog',
	props: {
		configDialogConfig: {
			type: Object,
			default: () => {},
		},
		configDialogVisible: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			form: {
				logName: '',
				className: '',
				beanName: '',
				methodName: '',
				logTmpl: '',
				moduleId: '',
				typId: '',
				operateTypeId: '',
				enable: '1',
				id: '',
			},
			rules: {
				logName: [
					{ required: true, message: '请输入日志名称', trigger: 'submit' },
				],
				className: [
					{ required: true, message: '请输入class', trigger: 'submit' },
				],
				methodName: [
					{ required: true, message: '请输入method', trigger: 'submit' },
				],
			},
			moduleOptions: [],
			typeOptions: [],
			operateTypeOptions: [],
		};
	},

	computed: {},

	created() {
		if (this.configDialogConfig.data) {
			for (const key in this.configDialogConfig.data) {
				for (const k in this.form) {
					if (key === k) {
						this.form[k] = this.configDialogConfig.data[key];
					}
				}
			}
		}
		this.getOptions();
	},

	methods: {
		moduleChange(val) {
			this.form.typId = '';
			this.$api
				.formPost('/api/log/type/doGetSelectList', { moduleId: val ? val : '' })
				.then((res) => {
					this.typeOptions = res.retBody;
				});
		},
		getOptions() {
			this.$api.formPost('/api/log/module/doGetSelectList', {}).then((res) => {
				this.moduleOptions = res.retBody;
			});
			this.$api
				.formPost('/api/log/type/doGetSelectList', {
					moduleId: this.form.moduleId ? this.form.moduleId : '',
				})
				.then((res) => {
					this.typeOptions = res.retBody;
				});
			this.$api
				.formPost('/api/log/operatetype/doGetSelectList', {})
				.then((res) => {
					this.operateTypeOptions = res.retBody;
				});
		},
		close() {
			this.$emit('update:configDialogVisible', false);
		},
		confirm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					let params = JSON.parse(JSON.stringify(this.form));
					if (params.id) {
						this.$api
							.formPost('/api/log/config/doModById', params)
							.then((res) => {
								this.$message.success('操作成功');
								this.close();
								this.$emit('onSuccess');
							});
					} else {
						delete params.id;
						this.$api.formPost('/api/log/config/doSave', params).then((res) => {
							this.$message.success('操作成功');
							this.close();
							this.$emit('onSuccess');
						});
					}
				}
			});
		},
	},
};
</script>
<style lang="scss" scoped></style>
