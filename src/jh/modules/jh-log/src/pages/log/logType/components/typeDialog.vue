<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 编辑模块信息
-->
<template>
	<BaseDialog
		:title="typeDialogConfig.title"
		:visible="typeDialogVisible"
		top="15vh"
		append-to-body
		width="600px"
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
						<el-form-item label="所属模块" prop="moduleId">
							<el-select
								v-model="form.moduleId"
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
					<el-col :span="24">
						<el-form-item label="类型编码" prop="typeCode">
							<el-input v-model="form.typeCode" placeholder="请输入"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="类型名称" prop="typeName">
							<el-input v-model="form.typeName" placeholder="请输入"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="备注">
							<el-input
								v-model="form.remark"
								type="textarea"
								autosize
								placeholder="请输入"
							></el-input>
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
	name: 'typeDialog',
	props: {
		typeDialogConfig: {
			type: Object,
			default: () => {},
		},
		typeDialogVisible: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			form: {
				moduleId: '',
				typeName: '',
				typeCode: '',
				remark: '',
				id: '',
			},
			rules: {
				moduleId: [
					{ required: true, message: '请选择模块', trigger: 'submit' },
				],
				typeName: [
					{ required: true, message: '请输入类型编码', trigger: 'submit' },
				],
				typeCode: [
					{ required: true, message: '请输入类型名称', trigger: 'submit' },
				],
			},
			options: [],
		};
	},

	computed: {},

	created() {
		if (this.typeDialogConfig.data) {
			for (const key in this.typeDialogConfig.data) {
				for (const k in this.form) {
					if (key === k) {
						this.form[k] = this.typeDialogConfig.data[key];
					}
				}
			}
		}
		this.getModuleOption();
	},

	methods: {
		getModuleOption() {
			this.$api.formPost('/api/log/module/doGetSelectList', {}).then((res) => {
				this.options = res.retBody;
			});
		},
		close() {
			this.$emit('update:typeDialogVisible', false);
		},
		confirm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					let params = JSON.parse(JSON.stringify(this.form));
					if (params.id) {
						this.$api
							.formPost('/api/log/type/doModById', params)
							.then((res) => {
								this.$message.success('操作成功');
								this.close();
								this.$emit('onSuccess');
							});
					} else {
						delete params.id;
						this.$api.formPost('/api/log/type/doSave', params).then((res) => {
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
