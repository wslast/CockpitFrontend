<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description:  序列格式信息
-->
<template>
	<BaseDialog
		:title="seqConfigConfig.title"
		:visible="seqConfigVisible"
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
						<el-form-item label="序列编码" prop="codeType">
							<el-input v-model="form.codeType" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="初始值" prop="initDefaultValue">
							<el-input
								v-model="form.initDefaultValue"
								placeholder="请输入"
							></el-input>
						</el-form-item>
						<el-form-item label="格式化方法" prop="codeFormate">
							<el-input
								type="textarea"
								:autosize="{ minRows: 4, maxRows: 8 }"
								v-model="form.codeFormate"
								:placeholder="placeHolder"
							></el-input>
						</el-form-item>
						<div style="margin-left:110px;">
							<p>添加 codeFormate 说明：</p>
							<p>
								1. 取序列 {seq:5} ， ":"
								后为序列位数，小于位数补0，大于位数取实际值。
							</p>
							<p>2. 取日期 {date:yyyy}， ":" 后为日期格式</p>
							<p>3. 取随机数 {random:5} ， ":" 后为随机位数</p>
							<p>
								4. 取自定义值 {def:username} ，":"
								后为自定义参数（参数通过穿件序列调用）
							</p>
						</div>
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
	name: 'seqConfig',
	props: {
		seqConfigConfig: {
			type: Object,
			default: () => {},
		},
		seqConfigVisible: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			placeHolder:
				'例: {date:yyyy}-{date:MM}-{seq:5}-{random:2}-{def:username}',
			form: {
				initDefaultValue: '',
				codeType: '',
				codeFormate: '',
				id: '',
			},
			rules: {
				codeType: [
					{ required: true, message: '请输入序列编码', trigger: 'submit' },
				],
				codeFormate: [
					{ required: true, message: '请输入格式化方法', trigger: 'submit' },
				],
			},
		};
	},

	computed: {},

	created() {
		if (this.seqConfigConfig.data) {
			for (const key in this.seqConfigConfig.data) {
				for (const k in this.form) {
					if (key === k) {
						this.form[k] = this.seqConfigConfig.data[key];
					}
				}
			}
		}
	},

	methods: {
		close() {
			this.$emit('update:seqConfigVisible', false);
		},
		confirm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					let params = JSON.parse(JSON.stringify(this.form));
					if (params.id) {
						this.$api
							.formPost('/api/core/seq/config/doModById', params)
							.then((res) => {
								this.$message.success('操作成功');
								this.close();
								this.$emit('onSuccess');
							});
					} else {
						delete params.id;
						this.$api
							.formPost('/api/core/seq/config/doSave', params)
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
