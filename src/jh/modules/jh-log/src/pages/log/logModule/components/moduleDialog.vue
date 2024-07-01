<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 编辑模块信息
-->
<template>
	<BaseDialog
		:title="moduleDialogConfig.title"
		:visible="moduleDialogVisible"
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
						<el-form-item label="模块编码" prop="moduleCode">
							<el-input
								v-model="form.moduleCode"
								placeholder="请输入"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="模块名称" prop="moduleName">
							<el-input
								v-model="form.moduleName"
								placeholder="请输入"
							></el-input>
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
	name: 'moduleDialog',
	props: {
		moduleDialogConfig: {
			type: Object,
			default: () => {},
		},
		moduleDialogVisible: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			form: {
				moduleCode: '',
				moduleName: '',
				remark: '',
				id: '',
			},
			rules: {
				moduleCode: [
					{ required: true, message: '请输入模块编码', trigger: 'submit' },
				],
				moduleName: [
					{ required: true, message: '请输入模块名称', trigger: 'submit' },
				],
			},
		};
	},

	computed: {},

	created() {
		if (this.moduleDialogConfig.data) {
			for (const key in this.moduleDialogConfig.data) {
				for (const k in this.form) {
					if (key === k) {
						this.form[k] = this.moduleDialogConfig.data[key];
					}
				}
			}
		}
	},

	methods: {
		close() {
			this.$emit('update:moduleDialogVisible', false);
		},
		confirm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					let params = JSON.parse(JSON.stringify(this.form));
					if (params.id) {
						this.$api
							.formPost('/api/log/module/doModById', params)
							.then((res) => {
								this.$message.success('操作成功');
								this.close();
								this.$emit('onSuccess');
							});
					} else {
						delete params.id;
						this.$api.formPost('/api/log/module/doSave', params).then((res) => {
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
