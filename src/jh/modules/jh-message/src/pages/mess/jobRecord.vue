<template>
	<div class="routerContent">
		<div class="card form df">
			<el-button type="primary" @click="submitForm('ruleForm')">刷新</el-button>
			<div class="fg1"></div>
			<searchDialog
				v-model="ruleForm.jobId"
				placeholder="请输入调度任务ID"
				@resetForm="resetForm('ruleForm')"
				@searchData="submitForm"
				:showForm.sync="formShow"
			>
				<el-form
					:style="style"
					:model="ruleForm"
					label-width="100px"
					ref="ruleForm"
					label-position="top"
					class="demo-ruleForm"
				>
					<el-form-item label="调度内容">
						<el-input
							v-model="ruleForm.jobContent"
							placeholder="请选择"
						></el-input>
					</el-form-item>
					<el-form-item label="调度任务ID">
						<el-input v-model="ruleForm.jobId" placeholder="请选择"> </el-input>
					</el-form-item>
					<el-form-item label="执行时间">
						<el-date-picker
							v-model="ruleForm.createTime"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							style="width: 258px"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="执行时长">
						<el-input v-model="ruleForm.execDuration"></el-input>
					</el-form-item>
				</el-form>
				<div class="df jce" slot="footer">
					<el-button @click="resetForm('ruleForm')">重置</el-button>
					<el-button type="primary" @click="submitForm">查询</el-button>
				</div>
			</searchDialog>
		</div>

		<div class="ova fg1">
			<el-table
				height="100%"
				ref="elTable"
				:data="tableData"
				border
				style="width: 100%"
			>
				<el-table-column
					type="index"
					width="60px"
					align="center"
					fixed="left"
					label="序号"
				></el-table-column>
				<el-table-column align="center" label="调度内容">
					<template slot-scope="scope">
						<div :title="scope.row.jobContent" class="overFlow">
							{{ scope.row.jobContent }}
						</div>
					</template>
				</el-table-column>
				<el-table-column align="center" label="调度任务ID">
					<template slot-scope="scope">
						<div :title="scope.row.jobId" class="overFlow">
							{{ scope.row.jobId }}
						</div>
					</template>
				</el-table-column>
				<el-table-column align="center" label="执行时间">
					<template slot-scope="scope">
						<span>{{
							scope.row.execStartTime == null
								? ''
								: new Date(scope.row.execStartTime).toLocaleString()
						}}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="执行时间">
					<template slot-scope="scope">
						<span>{{
							scope.row.execEndTime == null
								? ''
								: new Date(scope.row.execEndTime).toLocaleString()
						}}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="执行时长">
					<template slot-scope="scope">
						<span>{{ scope.row.execDuration }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="80px" fixed="right" align="center">
					<template slot-scope="scope">
						<el-button @click="showEditDialog(scope.$index, scope.row)"
							>查看</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div style="text-align:right;" class="pt10 pb10">
			<el-pagination
				@size-change="sizeChange"
				@current-change="currentChange"
				:current-page="currentPage"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="pageSize"
				background
				layout="total, sizes, prev, pager, next"
				:total="total"
			></el-pagination>
		</div>

		<!-- --------------------------------------------------------编辑弹出框 -->
		<el-dialog
			title="执行信息"
			:visible.sync="dialogEditVisible111"
			:close-on-click-modal="false"
			:modal="false"
		>
			<el-form :model="editForm" ref="editForm" :rules="rules">
				<el-form-item
					label="调度内容"
					:label-width="formLabelWidth"
					prop="jobContent"
				>
					<el-input v-model="editForm.jobContent" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="任务ID" :label-width="formLabelWidth" prop="jobId">
					<el-input v-model="editForm.jobId" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item
					label="开始时间"
					:label-width="formLabelWidth"
					prop="execStartTime"
				>
					<el-date-picker
						v-model="editForm.execStartTime"
						type="datetime"
						format="yyyy-MM-dd HH:mm:ss"
						placeholder="选择日期时间"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item
					label="结束时间"
					:label-width="formLabelWidth"
					prop="execEndTime"
				>
					<el-date-picker
						v-model="editForm.execEndTime"
						type="datetime"
						format="yyyy-MM-dd HH:mm:ss"
						placeholder="选择日期时间"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item
					label="执行时长"
					:label-width="formLabelWidth"
					prop="execDuration"
				>
					<el-input
						v-model="editForm.execDuration"
						autocomplete="off"
					></el-input>
				</el-form-item>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditVisible111 = false">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	props: ['that'],
	components: {},
	data() {
		return {
			formShow: false,
			dialogFormVisible: false,
			dialogEditVisible111: false,
			offForm: true, //是否折叠
			folding: false, //表单是否超过一行
			formLabelWidth: '80px',
			tableData: [],
			total: 0,
			pageSize: 20,
			currentPage: 1,
			ruleForm: {
				jobContent: '',
				jobId: '',
				execDuration: '',
				createTime: '',
			},
			style: {},
			rules: {},
			form: {
				jobContent: '',
				jobId: '',
				execDuration: '',
			},
			editForm: {
				id: '',
				jobContent: '',
				jobId: '',
				execStartTime: '',
				execEndTime: '',
				execDuration: '',
			},
		};
	},

	mounted() {
		this.init();
		this.folding = false;
		this.style = {
			height: 'auto',
			overflow: 'hidden',
		};
	},
	computed: {},
	watch: {
		offForm: function(v) {
			if (v) {
				this.style = {
					height: '62px',
					overflow: 'hidden',
				};
			} else {
				this.style = {
					height: 'auto',
					overflow: 'hidden',
				};
			}
		},
	},
	methods: {
		sizeChange(n) {
			this.pageSize = n;
			this.init();
		},
		currentChange(n) {
			this.currentPage = n;
			this.init();
		},
		init() {
			let param = {};
			param.jobContent = this.ruleForm.jobContent;
			param.execDuration = this.ruleForm.execDuration;
			if (this.ruleForm.createTime && this.ruleForm.createTime.length == 2) {
				param.execStartTime = this.ruleForm.createTime[0];
				param.execEndTime = this.ruleForm.createTime[1]; //this.formatDate(this.ruleForm.createTime[1],"yyyy-MM-dd");
			}
			if (this.that) {
				param.jobId = this.that.jobId;
			}
			let params = {
				pageNum: this.currentPage,
				pageSize: this.pageSize,
				...param,
			};
			let load = null;
			this.$nextTick(() => {
				load = this.$loading({
					target: this.$refs.elTable.$el,
				});
			});
			this.formShow = false;
			this.$api
				.formPost('/api/mess/jobRecord/doGetList', params)
				.then((res) => {
					if (res.retHead.code == '0000000') {
						load.close();
						this.tableData = res.retBody.list;
						this.total = res.retBody.total;
						this.currentPage = res.retBody.pageNum;
					}
				});
		},
		showDialog() {
			this.dialogFormVisible = true;
			this.form = {};
		},
		showEditDialog(index, row) {
			this.editForm.id = row.id;
			this.editForm.jobContent = row.jobContent;
			this.editForm.jobId = row.jobId;
			this.editForm.execStartTime = new Date(row.execStartTime);
			this.editForm.execEndTime = new Date(row.execEndTime);
			this.editForm.execDuration = row.execDuration;
			this.dialogEditVisible111 = true;
		},
		handleAdd() {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					this.$api
						.formPost('/api/mess/jobRecord/doSave', this.form)
						.then((res) => {
							if (res.retHead.code == '0000000') {
								this.$message({
									message: '添加成功！',
									type: 'success',
								});
								this.dialogFormVisible = false;
								this.init();
							} else {
								this.$message({
									message: '添加失败！',
									type: 'error',
								});
							}
						});
				}
			});
		},
		handleEdit() {
			this.$refs.editForm.validate((valid) => {
				if (valid) {
					let params = this.editForm;
					this.$api
						.formPost('/api/mess/jobRecord/doModById', params)
						.then((res) => {
							if (res.retHead.code == '0000000') {
								this.$message.success('执行成功！');
								this.init();
								this.dialogEditVisible111 = false;
							} else {
								this.$message.error('执行失败！');
							}
						});
				}
			});
		},
		submitForm(formName) {
			this.init();
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.submitForm();
		},
	},
	created() {},
};
</script>
<style lang="scss" scoped>
.btns {
	text-align: right;
}
.icon-arrow {
	position: absolute;
	bottom: 5px;
	left: 0;
	width: 100%;
	height: 1px;
	background-color: #f1f1f1;
	i {
		background-color: #fff;
		position: absolute;
		color: #999;
		bottom: -7px;
		margin-left: 50%;
		transform: translateX(-50%);
		cursor: pointer;
	}
}

.overFlow {
	max-height: 40px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
