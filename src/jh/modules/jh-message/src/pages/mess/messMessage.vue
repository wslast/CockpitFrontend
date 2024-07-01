<template>
	<div class="messMessage">
		<div class="card form df">
			<el-button type="primary" v-show="formShow" @click="batchMarkRead"
				>标为已读</el-button
			>
			<el-button type="primary" v-show="formShow" @click="batchMarkReadAll"
				>全部标为已读</el-button
			>
			<el-button type="primary" @click="handleDelete">批量删除</el-button>
			<div class="fg1"></div>
			<searchDialog
				v-model="ruleForm.title"
				placeholder="请输入消息标题"
				@resetForm="resetForm('ruleForm')"
				@searchData="submitForm()"
				:showForm.sync="searchShow"
			>
				<el-form
					:style="style"
					:model="ruleForm"
					ref="ruleForm"
					label-position="top"
					label-width="100px"
					class="demo-ruleForm"
				>
					<el-form-item label="消息标题" prop="title">
						<el-input v-model="ruleForm.title"></el-input>
					</el-form-item>
					<el-form-item label="消息内容" prop="content">
						<el-input v-model="ruleForm.content"></el-input>
					</el-form-item>
					<el-form-item label="创建时间" prop="createTime">
						<el-date-picker
							v-model="ruleForm.createTime"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							style="width: 100%"
						></el-date-picker>
					</el-form-item>
				</el-form>
				<div class="df jce" slot="footer">
					<el-button @click="resetForm('ruleForm')">重置</el-button>
					<el-button type="primary" @click="submitForm('ruleForm')"
						>查询</el-button
					>
				</div>
			</searchDialog>
		</div>
		<el-tabs v-model="activeName" @tab-click="handleTabClick" class="df fg1">
			<el-tab-pane label="未读消息" name="first"></el-tab-pane>
			<el-tab-pane label="已读消息" name="second"></el-tab-pane>
		</el-tabs>
		<div class="fg1 ova mb10 pl10 pr10">
			<el-table
				ref="singleTable"
				:data="tableData"
				border
				height="100%"
				style="width: 100%"
				@selection-change="handleSelectionChange"
			>
				<el-table-column
					type="selection"
					width="55"
					align="center"
				></el-table-column>
				<el-table-column
					type="index"
					width="60px"
					align="center"
					fixed="left"
					label="序号"
				></el-table-column>
				<el-table-column
					prop="title"
					label="消息标题"
					width="100px"
				></el-table-column>
				<el-table-column
					prop="content"
					label="消息内容"
					:show-overflow-tooltip="true"
				>
					<template slot-scope="scope">
						<span
							style="pointer-events: none;"
							v-html="scope.row.content"
						></span>
					</template>
				</el-table-column>
				<el-table-column
					prop="createName"
					label="创建人"
					:show-overflow-tooltip="true"
					width="100px"
				></el-table-column>
				<el-table-column
					prop="createTime"
					label="创建时间"
					:show-overflow-tooltip="true"
					width="120px"
				></el-table-column>
				<el-table-column width="80px" label="操作" fixed="right">
					<template slot-scope="scope">
						<el-button @click="handleViewDetail(scope.row)">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div style="text-align:center;" class="mb10">
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

		<el-dialog
			title="消息详情"
			:visible.sync="showMessDetailVisible"
			append-to-body
			:close-on-click-modal="false"
			@close="handleClose"
		>
			<el-form
				:model="editForm"
				ref="editForm"
				inline
				label-width="120px"
				class="demo-ruleForm"
			>
				<el-form-item
					label="消息的标题"
					:label-width="formLabelWidth"
					prop="title"
				>
					<el-input
						show-word-limit
						v-model="editForm.title"
						:readonly="true"
						style="width: 500px"
					></el-input>
				</el-form-item>
				<el-form-item
					label="创建人"
					:label-width="formLabelWidth"
					prop="createName"
				>
					<el-input
						v-model="editForm.createName"
						:readonly="true"
						style="width: 200px"
					></el-input>
				</el-form-item>
				<el-form-item
					label="创建时间"
					:label-width="formLabelWidth"
					prop="createTime"
				>
					<el-input
						v-model="editForm.createTime"
						:readonly="true"
						style="width: 200px"
					></el-input>
				</el-form-item>
				<el-form-item
					label="消息内容"
					:label-width="formLabelWidth"
					prop="content"
				>
					<p style="width: 500px">
						{{ editForm.content }}
					</p>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleClose()">关 闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
const defaultFormThead = [];
export default {
	data() {
		return {
			ruleForm: {
				title: '',
				content: '',
			},
			folding: false,
			style: {},
			searchShow: false,
			formShow: true,
			formLabelWidth: '100px',
			tableData: [],
			activeName: 'first',
			currentPage: 1,
			pageSize: 20,
			total: 0,
			editForm: {
				id: '',
				channel: '',
				account: '',
				title: '',
				content: '',
				params: '',
				status: '',
			},
			showMessDetailVisible: false,
			selectionList: [],
		};
	},

	mounted() {
		this.getData();
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
		activeName: function(val) {
			this.getData();
		},
	},
	methods: {
		getData() {
			let load = null;
			this.$nextTick(() => {
				load = this.$loading({
					target: this.$refs.singleTable.$el,
				});
			});
			this.searchShow = false;
			let param = {};
			param.title = this.ruleForm.title;
			param.content = this.ruleForm.content;
			if (this.ruleForm.createTime && this.ruleForm.createTime.length == 2) {
				param.fromCreateTime = this.ruleForm.createTime[0];
				param.toCreateTime = this.ruleForm.createTime[1]; //this.formatDate(this.ruleForm.createTime[1],"yyyy-MM-dd");
			}
			let params = {
				pageNum: this.currentPage,
				pageSize: this.pageSize,
				account: JSON.parse(window.sessionStorage.user).id,
				...param,
			};
			if (this.activeName === 'first') {
				this.$api.formPost('/api/msg/pm/doGetList', params).then((res) => {
					load.close();
					this.tableData = res.retBody.list;
					this.total = res.retBody.total;
					this.currentPage = res.retBody.pageNum;
					if (this.tableData) {
						this.tableData.forEach((it) => {
							if (it.createTime) {
								it.createTime = this.formatDate(
									it.createTime,
									'yyyy-MM-dd HH:mm:ss'
								);
							}
						});
					}
				});
			} else {
				this.$api.formPost('/api/msg/pm/doGetHisList', params).then((res) => {
					load.close();
					this.tableData = res.retBody.list;
					this.total = res.retBody.total;
					this.currentPage = res.retBody.pageNum;
					if (this.tableData) {
						this.tableData.forEach((it) => {
							if (it.createTime) {
								it.createTime = this.formatDate(
									it.createTime,
									'yyyy-MM-dd HH:mm:ss'
								);
							}
						});
					}
				});
			}
		},
		sizeChange(n) {
			this.pageSize = n;
			this.getData();
		},
		currentChange(n) {
			this.currentPage = n;
			this.getData();
		},
		handleTabClick(tab, event) {
			this.formShow = tab.name == 'first';
		},
		handleViewDetail(row) {
			if (row.id) {
				this.editForm.id = row.id;
			} else {
				this.editForm.id = '';
			}
			if (row.channel) {
				this.editForm.channel = row.channel;
			} else {
				this.editForm.channel = '';
			}
			if (row.userId) {
				this.editForm.account = row.account;
			} else {
				this.editForm.account = '';
			}
			if (row.title) {
				this.editForm.title = row.title;
			} else {
				this.editForm.title = '';
			}
			if (row.params) {
				this.editForm.params = row.params;
			} else {
				this.editForm.params = '';
			}
			if (row.content) {
				this.editForm.content = row.content;
			} else {
				this.editForm.content = '';
			}
			this.editForm.createTime = row.createTime;
			this.editForm.createName = row.createName;
			if (this.activeName == 'first') {
				let params = {};
				params.ids = row.id;
				params.userId = row.account;
				this.$api
					.formPost('/api/msg/pm/updateReadStatus', params)
					.then((res) => {
						if (res.retHead.code == '0000000') {
							if (res.retBody && res.retBody != '') {
								row.status = 1;
								row.readDate = res.retBody;
							}
						} else {
							this.$message({
								message: res.retHead.message,
								type: 'error',
							});
						}
					});
			}
			this.showMessDetailVisible = true;
		},
		handleDelete() {
			let ids = '';
			let userId = JSON.parse(window.sessionStorage.user).id;
			this.selectionList.forEach((it) => {
				ids = ids + it.id + ',';
			});
			if (ids == '') {
				return;
			}
			this.$confirm('此操作将永久删除该消息, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					let params = {};
					params.ids = ids;
					params.userId = userId;

					var url = '/api/msg/pm/doRmHisByIds';
					if (this.activeName == 'first') {
						url = '/api/msg/pm/doRmByIds';
					}
					this.$api.formPost(url, params).then((res) => {
						if (res.retHead.code == '0000000') {
							this.$message({
								message: '操作成功！',
								type: 'success',
							});
							this.getData();
						} else {
							this.$message({
								message: res.retHead.message,
								type: 'error',
							});
						}
					});
				})
				.catch(() => {});
		},
		handleSelectionChange(val) {
			this.selectionList = val;
		},
		batchMarkRead() {
			if (this.selectionList.length > 0) {
				let ids = '';
				let userId = JSON.parse(window.sessionStorage.user).id;
				this.selectionList.forEach((it) => {
					ids = ids + it.id + ',';
				});
				if (ids != '') {
					let params = {};
					params.ids = ids;
					params.userId = userId;
					this.$api
						.formPost('/api/msg/pm/updateReadStatus', params)
						.then((res) => {
							if (res.retHead.code == '0000000') {
								this.getData();
							} else {
								this.$message({
									message: res.retHead.message,
									type: 'error',
								});
							}
						});
				}
			}
		},
		batchMarkReadAll() {
			let params = {};
			params.ids = '';
			params.userId = JSON.parse(window.sessionStorage.user).id;
			this.$api.formPost('/api/msg/pm/updateReadStatus', params).then((res) => {
				if (res.retHead.code == '0000000') {
					this.getData();
				} else {
					this.$message({
						message: res.retHead.message,
						type: 'error',
					});
				}
			});
		},
		handleClose() {
			this.showMessDetailVisible = false;
			if (this.activeName == 'first') {
				this.getData();
			}
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.submitForm();
		},
		submitForm(formName) {
			this.getData();
		},
	},
	created() {},
};
</script>
<style lang="scss" scoped>
.messMessage {
	height: 100%;
	display: flex;
	flex-direction: column;
}
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
</style>
