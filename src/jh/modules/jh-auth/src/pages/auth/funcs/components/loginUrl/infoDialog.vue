<!--
 * @Author: Junchi Zhao
 * @LastEditors: zjc2684613 1984937455@qq.com
 * @Description: 编辑模块信息
-->
<template>
	<BaseDialog
		:title="infoDialogConfig.title"
		:visible="infoDialogVisible"
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
						<el-form-item label="接口名称" prop="apiName">
							<el-input v-model="form.apiName" placeholder="请输入"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="接口路径" prop="apiUrl">
							<el-input
								v-model="form.apiUrl"
								placeholder="路径以   /  开头"
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
		return {
			form: {
				apiName: '',
				apiUrl: '',
				id: '',
			},
			rules: {
				apiName: [
					{ required: true, message: '请输入接口名称', trigger: 'submit' },
				],
				apiUrl: [
					{ required: true, message: '请输入接口路径', trigger: 'submit' },
				],
			},
		};
	},

	computed: {},

	created() {
		if (this.infoDialogConfig.data) {
			for (const key in this.infoDialogConfig.data) {
				for (const k in this.form) {
					if (key === k) {
						this.form[k] = this.infoDialogConfig.data[key];
					}
				}
			}
		}
	},

	methods: {
		close() {
			this.$emit('update:infoDialogVisible', false);
		},
		confirm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					let params = JSON.parse(JSON.stringify(this.form));
					if (params.id) {
						this.$api
							.formPost('/api/auth/conturl/doModContUrlById', params)
							.then((res) => {
								this.$message.success('操作成功');
								this.close();
								this.$emit('onSuccess');
							});
					} else {
						delete params.id;
						this.$api
							.formPost('/api/auth/conturl/doSaveContUrl', params)
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
