<!-- 自定义表单弹窗 -->
<template>
	<BaseDialog
		:title="messageDialogConfig.title"
		:visible="messageDialogVisible"
		width="1000px"
		top="5vh"
		append-to-body
		@close="close"
	>
		<template slot="body">
			<div class="content">
				<div class="card tr mb2">
					<el-button
						type="primary"
						icon="el-icon-plus"
						v-show="formShow"
						@click="batchMarkRead"
						>标为已读</el-button
					>
					<el-button
						type="primary"
						icon="el-icon-plus"
						v-show="formShow"
						@click="batchMarkReadAll"
						>全部标为已读</el-button
					>
					<el-button type="primary" icon="el-icon-delete" @click="handleDelete"
						>批量删除</el-button
					>
				</div>
				<el-tabs v-model="activeName" @tab-click="handleTabClick">
					<el-tab-pane label="未读消息" name="first"></el-tab-pane>
					<el-tab-pane label="已读消息" name="second"></el-tab-pane>
				</el-tabs>
				<div class="tableContent">
					<el-table
						ref="singleTable"
						:data="tableData"
						highlight-current-row
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
							:show-overflow-tooltip="false"
						></el-table-column>
						<el-table-column width="80px" label="操作" fixed="right">
							<template slot-scope="scope">
								<el-button @click="handleViewDetail(scope.row)">查看</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div class="pagerBox tr">
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
					width="70%"
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
							label="消息内容"
							:label-width="formLabelWidth"
							prop="content"
						>
							<p v-html="editForm.content">
								{{ editForm.content }}
							</p>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="showMessDetailVisible = false">关 闭</el-button>
					</div>
				</el-dialog>
			</div>
		</template>
	</BaseDialog>
</template>

<script>
export default {
	name: 'messageDialog',

	props: {
		messageDialogVisible: {
			type: Boolean,
			default: false,
		},
		messageDialogConfig: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
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
	watch: {
		activeName: function(val) {
			this.getData();
		},
	},
	created() {
		this.getData();
	},
	methods: {
		goURL(url) {
			this.showMessDetailVisible = false;
			this.$emit('update:messageDialogVisible', false);
		},
		getData() {
			let params = {
				pageNum: this.currentPage,
				pageSize: this.pageSize,
				userId: JSON.parse(window.sessionStorage.user).id,
			};
			if (this.activeName === 'first') {
				this.$api.formPost('/api/msg/pm/doGetList', params).then((res) => {
					this.tableData = res.retBody.list;
					this.total = res.retBody.total;
					this.currentPage = res.retBody.pageNum;
				});
			} else {
				this.$api.formPost('/api/msg/pm/doGetHisList', params).then((res) => {
					this.tableData = res.retBody.list;
					this.total = res.retBody.total;
					this.currentPage = res.retBody.pageNum;
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
		confirm() {
			this.close();
		},
		close() {
			this.$emit('update:messageDialogVisible', false);
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
	},
};
</script>
<style lang="scss" scoped>
.content {
	padding: 0px 20px;
}
.tableContent {
	height: 60vh;
}
/deep/.el-table td .cell {
	white-space: normal !important;
}
</style>
