<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description:  编辑编码类型信息
-->
<template>
	<BaseDialog
		:title="codeTypeInfoDialogConfig.title"
		:visible="codeTypeInfoDialogVisible"
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
						<el-form-item label="类型名称" prop="name">
							<el-input v-model="form.name" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="类型代码" prop="code">
							<el-input v-model="form.code" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="状态" prop="status">
							<el-select
								v-model="form.status"
								placeholder="请选择"
								style="width: 100%;"
							>
								<el-option label="启用" value="1"></el-option>
								<el-option label="禁用" value="0"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="备注" prop="codeType">
							<el-input v-model="form.remark" placeholder="请输入"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</template>
		<div slot="footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="confirm">保 存</el-button>
		</div>
	</BaseDialog>
</template>

<script>
export default {
	name: 'codeTypeInfoDialog',
	props: {
		codeTypeInfoDialogConfig: {
			type: Object,
			default: () => {},
		},
		codeTypeInfoDialogVisible: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			form: {
				code: '',
				name: '',
				remark: '',
				status: '1',
				id: '',
			},
			rules: {
				code: [
					{ required: true, message: '请输入编码类型', trigger: 'submit' },
				],
				name: [
					{ required: true, message: '请输入编码名称', trigger: 'submit' },
				],
			},
		};
	},

	computed: {},

	created() {
		if (this.codeTypeInfoDialogConfig.data) {
			for (const key in this.codeTypeInfoDialogConfig.data) {
				for (const k in this.form) {
					if (key === k) {
						this.form[k] = this.codeTypeInfoDialogConfig.data[key];
					}
				}
			}
		}
	},

	methods: {
		close() {
			this.$emit('update:codeTypeInfoDialogVisible', false);
		},
		confirm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					let params = JSON.parse(JSON.stringify(this.form));
					if (params.id) {
						this.$api
							.formPost('/api/basfun/syscode/type/doModById', params)
							.then((res) => {
								this.$message.success('操作成功');
								this.close();
								this.$emit('onSuccess');
							});
					} else {
						delete params.id;
						this.$api
							.formPost('/api/basfun/syscode/type/doSave', params)
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
<style lang="scss" scoped>
.footer {
	display: flex;
	justify-content: center;
}
</style>
