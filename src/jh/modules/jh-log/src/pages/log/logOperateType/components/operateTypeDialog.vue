<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 编辑模块信息
-->
<template>
	<BaseDialog
		:title="operateTypeDialogConfig.title"
		:visible="operateTypeDialogVisible"
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
						<el-form-item label="操作编码" prop="operateCode">
							<el-input
								v-model="form.operateCode"
								placeholder="请输入"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="操作名称" prop="operateName">
							<el-input
								v-model="form.operateName"
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
	name: 'operateTypeDialog',
	props: {
		operateTypeDialogConfig: {
			type: Object,
			default: () => {},
		},
		operateTypeDialogVisible: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			form: {
				operateCode: '',
				operateName: '',
				remark: '',
				id: '',
			},
			rules: {
				operateName: [
					{ required: true, message: '请输入操作编码', trigger: 'submit' },
				],
				operateCode: [
					{ required: true, message: '请输入操作名称', trigger: 'submit' },
				],
			},
			options: [],
		};
	},

	computed: {},

	created() {
		if (this.operateTypeDialogConfig.data) {
			for (const key in this.operateTypeDialogConfig.data) {
				for (const k in this.form) {
					if (key === k) {
						this.form[k] = this.operateTypeDialogConfig.data[key];
					}
				}
			}
		}
	},

	methods: {
		close() {
			this.$emit('update:operateTypeDialogVisible', false);
		},
		confirm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					let params = JSON.parse(JSON.stringify(this.form));
					if (params.id) {
						this.$api
							.formPost('/api/log/operatetype/doModById', params)
							.then((res) => {
								this.$message.success('操作成功');
								this.close();
								this.$emit('onSuccess');
							});
					} else {
						delete params.id;
						this.$api
							.formPost('/api/log/operatetype/doSave', params)
							.then((res) => {
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
