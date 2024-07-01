<!-- 单列弹窗 -->
<template>
	<jh-base-dialog
		:title="infoDialogConfig.title"
		:visible="infoDialogVisible"
		append-to-body
		width="1000px"
		@close="close"
	>
		<template slot="body">
			<el-form
				:model="form"
				disabled
				ref="form"
				label-width="auto"
				label-position="right"
			>
				<el-row>
					<el-col :span="24">
						<el-form-item label="任务名" prop="taskName">
							<el-input v-model="form.taskName" placeholder=""></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="任务开始时间" prop="createTime">
							<el-input v-model="form.createTime" placeholder=""></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="任务结束时间" prop="overTime">
							<el-input v-model="form.overTime" placeholder=""></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="执行状态" prop="statusDesc">
							<el-input v-model="form.statusDesc" placeholder=""></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="执行时长" prop="duration">
							<el-input v-model="form.duration" placeholder=""></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="错误信息" prop="errMessage">
							<el-input
								type="textarea"
								:autosize="{
									minRows: 2,
									maxRows: 15,
								}"
								v-model="form.errMessage"
								placeholder=""
							></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</template>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">关 闭</el-button>
		</span>
	</jh-base-dialog>
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
				taskName: '',
				createTime: '',
				overTime: '',
				statusDesc: '',
				duration: '',
				errMessage: '',
				id: '',
			},
		};
	},

	computed: {},

	mounted() {
		if (this.infoDialogConfig.data) {
			for (const key in this.infoDialogConfig.data) {
				if (Object.hasOwnProperty.call(this.form, key)) {
					this.form[key] = this.infoDialogConfig.data[key];
				}
			}
		}
	},

	methods: {
		close() {
			this.$emit('update:infoDialogVisible', false);
		},
	},
};
</script>
<style lang="scss" scoped></style>
