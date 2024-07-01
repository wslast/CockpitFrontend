<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description:  序列值信息
-->
<template>
	<BaseDialog
		:title="seqnumDialogConfig.title"
		:visible="seqnumDialogVisible"
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
				label-width="110px"
				label-position="right"
			>
				<el-form-item label="序列编码" prop="codeType">
					<el-input v-model="form.codeType" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="序列值" prop="codeValue">
					<el-input v-model="form.codeValue" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="格式化值">
					<el-input
						type="textarea"
						:autosize="{ minRows: 4, maxRows: 8 }"
						v-model="form.formateValue"
						placeholder="请输入"
					></el-input>
				</el-form-item>
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
	name: 'seqnumDialog',
	props: {
		seqnumDialogConfig: {
			type: Object,
			default: () => {},
		},
		seqnumDialogVisible: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			form: {
				codeType: '',
				codeValue: '',
				formateValue: '',
				id: '',
			},
			rules: {
				codeType: [
					{ required: true, message: '请输入序列编码', trigger: 'submit' },
				],
				codeValue: [
					{ required: true, message: '请输入序列值', trigger: 'submit' },
				],
				// formateValue: [{ required: true, message: '请输入格式化值', trigger: 'submit' }],
			},
		};
	},

	computed: {},

	created() {
		if (this.seqnumDialogConfig.data) {
			for (const key in this.seqnumDialogConfig.data) {
				for (const k in this.form) {
					if (key === k) {
						this.form[k] = this.seqnumDialogConfig.data[key];
					}
				}
			}
		}
	},

	methods: {
		close() {
			this.$emit('update:seqnumDialogVisible', false);
		},
		confirm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					let params = JSON.parse(JSON.stringify(this.form));
					if (params.id) {
						this.$api
							.formPost('/api/core/seq/seqnum/doModById', params)
							.then((res) => {
								this.$message.success('操作成功');
								this.close();
								this.$emit('onSuccess');
							});
					} else {
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
