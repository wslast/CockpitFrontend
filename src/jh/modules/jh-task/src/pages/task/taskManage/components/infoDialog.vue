<!-- 单列弹窗 -->
<template>
	<jh-base-dialog
		:title="infoDialogConfig.title"
		:visible="infoDialogVisible"
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
						<el-form-item label="任务名" prop="taskName">
							<el-input v-model="form.taskName" placeholder="请输入"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="任务类型" prop="taskType">
							<el-select
								v-model="form.taskType"
								style="width:100%;"
								placeholder="请选择"
								@change="typeChange"
							>
								<el-option label="SpringBean" value="1"> </el-option>
								<el-option label="JavaBean" value="2"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="执行主体" prop="excSubject">
							<el-select
								v-if="form.taskType === '1'"
								clearable
								v-model="form.excSubject"
								style="width:100%;"
								placeholder="请选择"
							>
								<el-option
									v-for="item in infoDialogConfig.options"
									:key="item"
									:label="item"
									:value="item"
								>
								</el-option>
							</el-select>
							<el-input
								v-else
								v-model="form.excSubject"
								placeholder="请输入"
								clearable
							>
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="是否启用" prop="enable">
							<el-radio-group v-model="form.enable">
								<el-radio :label="'1'">启用</el-radio>
								<el-radio :label="'0'">不启用</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="cron表达式" prop="crontab">
							<el-input
								v-model="form.crontab"
								@focus="focus"
								placeholder="请输入"
							></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="" prop="">
							<div style="font-size:12px;color:#008dff;">{{ desc }}</div>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<cronExpress ref="cronExpress" @backCall="onReflushCron"></cronExpress>
		</template>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="confirm">确 定</el-button>
		</span>
	</jh-base-dialog>
</template>
<script>
import cronstrue from 'cronstrue/i18n';
export default {
	name: 'infoDialog',
	components: {
		cronExpress: () => import('../../../../components/cron/index.vue'),
	},
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
				taskType: '',
				excSubject:
					'org.springframework.boot.autoconfigure.SpringBootApplication',
				crontab: '',
				enable: '1',
				id: '',
			},
			rules: {
				taskName: [{ required: true, message: '请输入', trigger: 'blur' }],
				crontab: [{ required: true, message: '请选择', trigger: 'change' }],
			},
			desc: '',
		};
	},
	watch: {
		form: {
			handler: function(val) {
				if (val.crontab) {
					this.desc = cronstrue.toString(val.crontab, { locale: 'zh_CN' });
				}
			},
			deep: true,
			immediate: true,
		},
	},

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
		typeChange() {
			this.form.excSubject = '';
		},
		focus() {
			this.$refs.cronExpress.onInit(this.form.crontab);
		},
		onReflushCron(cron) {
			this.form.crontab = cron;
		},
		close() {
			this.$emit('update:infoDialogVisible', false);
		},
		confirm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					let params = JSON.parse(JSON.stringify(this.form));
					if (params.id) {
						this.$api
							.formPost('/api/schedule/doModById', params)
							.then((res) => {
								this.$message.success('操作成功');
								this.close();
								this.$emit('onSuccess');
							});
					} else {
						delete params.id;
						this.$api.formPost('/api/schedule/doSave', params).then((res) => {
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
