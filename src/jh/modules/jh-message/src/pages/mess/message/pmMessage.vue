<template>
	<div class="routerContent">
		<div class="card form df">
			<el-button type="primary" @click="handleDelete">批量删除</el-button>
			<div class="fg1"></div>
			<searchDialog
				v-model="ruleForm.title"
				placeholder="请输入消息标题"
				@resetForm="resetForm('ruleForm')"
				@searchData="submitForm('ruleForm')"
				:showForm.sync="formShow"
			>
				<el-form
					:style="style"
					:model="ruleForm"
					ref="ruleForm"
					label-position="top"
					label-width="100px"
					class="demo-ruleForm"
				>
					<el-form-item label="消息标题">
						<el-input v-model="ruleForm.title"></el-input>
					</el-form-item>
					<el-form-item label="消息内容">
						<el-input v-model="ruleForm.content"></el-input>
					</el-form-item>
					<el-form-item label="创建时间">
						<el-date-picker
							v-model="ruleForm.createTime"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							style="width: 100%;"
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

		<el-tabs v-model="activeName" @tab-click="handleTabClick">
			<el-tab-pane label="待发送(挂起)" name="first"> </el-tab-pane>
			<el-tab-pane label="未读消息" name="second"> </el-tab-pane>
			<el-tab-pane label="已读消息" name="third"> </el-tab-pane>
		</el-tabs>
		<template v-if="activeName === 'first'">
			<div class="fg1 ova ml10 mr10">
				<el-table
					ref="hangTable"
					:data="hangtableData"
					:key="'hangTable'"
					height="100%"
					border
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
						header-align="center"
					></el-table-column>
					<el-table-column
						prop="content"
						label="消息内容"
						:show-overflow-tooltip="true"
						header-align="center"
					>
						<template slot-scope="scope">
							<span
								style="pointer-events: none;"
								v-html="scope.row.content"
							></span>
						</template>
					</el-table-column>
					<el-table-column
						prop="params"
						label="消息参数"
						:show-overflow-tooltip="true"
						header-align="center"
					></el-table-column>
					<el-table-column
						prop="createTime"
						label="创建时间"
						:show-overflow-tooltip="true"
						header-align="center"
						width="120px"
					></el-table-column>
					<el-table-column
						prop="sendCount"
						label="发送次数"
						:show-overflow-tooltip="true"
						header-align="center"
						width="120px"
					></el-table-column>
					<el-table-column
						prop="firstSendTime"
						label="第一次发送时间"
						:show-overflow-tooltip="true"
						header-align="center"
						width="150px"
					></el-table-column>
					<el-table-column
						prop="lastSendTime"
						label="最近一次发送时间"
						:show-overflow-tooltip="true"
						header-align="center"
						width="150px"
					></el-table-column>
					<el-table-column
						width="120px"
						label="操作"
						fixed="right"
						align="center"
					>
						<template slot-scope="scope">
							<el-button type="text" @click="handleViewDetail(scope.row)"
								>查看</el-button
							>
							<el-button type="text" @click="handleDelete1(scope.row)"
								>删除</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div style="text-align:center;">
				<el-pagination
					class="pt10 pb10"
					@size-change="sizeChange"
					@current-change="currentChange"
					:current-page="currentPage"
					:page-size="pageSize"
					background
					layout="total, sizes,prev, pager, next"
					:total="total"
				></el-pagination>
			</div>
		</template>
		<template v-if="activeName === 'second'">
			<div class="fg1 ova ml10 mr10">
				<el-table
					ref="unreadTable"
					:key="'unreadTable'"
					:data="unreadtableData"
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
						label="序号"
					></el-table-column>
					<el-table-column
						prop="title"
						label="消息标题"
						width="120px"
						align="center"
					></el-table-column>
					<el-table-column
						prop="content"
						label="消息内容"
						align="center"
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
						prop="params"
						label="消息参数"
						:show-overflow-tooltip="true"
						align="center"
					></el-table-column>
					<el-table-column
						prop="createTime"
						label="创建时间"
						:show-overflow-tooltip="true"
						width="150px"
						align="center"
					></el-table-column>
					<el-table-column
						prop="unreadDays"
						label="未读时长(天)"
						width="120px"
						align="center"
					></el-table-column>
					<el-table-column width="120px" label="操作" align="center">
						<template slot-scope="scope">
							<el-button type="text" @click="handleViewDetail(scope.row)"
								>查看</el-button
							>
							<el-button type="text" @click="handleDelete1(scope.row)"
								>删除</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div style="text-align:center;">
				<el-pagination
					class="pt10 pb10"
					@size-change="sizeChange1"
					@current-change="currentChange1"
					:current-page="currentPage1"
					:page-size="pageSize1"
					background
					layout="total, sizes,prev, pager, next"
					:total="total1"
				></el-pagination>
			</div>
		</template>
		<template v-if="activeName === 'third'">
			<div class="fg1 ova ml10 mr10">
				<el-table
					ref="readTable"
					:key="'readTable'"
					:data="readtableData"
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
						label="序号"
					></el-table-column>
					<el-table-column
						prop="title"
						label="消息标题"
						width="120px"
						align="center"
					></el-table-column>
					<el-table-column
						prop="content"
						label="消息内容"
						:show-overflow-tooltip="true"
						align="center"
					>
						<template slot-scope="scope">
							<span
								style="pointer-events: none;"
								v-html="scope.row.content"
							></span>
						</template>
					</el-table-column>
					<el-table-column
						prop="params"
						label="消息参数"
						align="center"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="createTime"
						label="创建时间"
						:show-overflow-tooltip="true"
						width="150px"
						align="center"
					></el-table-column>
					<el-table-column width="120px" label="操作" align="center">
						<template slot-scope="scope">
							<el-button type="text" @click="handleViewDetail(scope.row)"
								>查看</el-button
							>
							<el-button type="text" @click="handleDelete1(scope.row)"
								>删除</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div style="text-align:center;">
				<el-pagination
					class="pt10 pb10"
					@size-change="sizeChange2"
					@current-change="currentChange2"
					:current-page="currentPage2"
					:page-size="pageSize2"
					background
					layout="total,sizes, prev, pager, next"
					:total="total2"
				></el-pagination>
			</div>
		</template>

		<el-dialog
			title="消息详情"
			:visible.sync="showMessDetailVisible"
			append-to-body
			:close-on-click-modal="false"
			width="600px"
		>
			<el-form
				:model="editForm"
				ref="editForm"
				label-width="auto"
				class="demo-ruleForm"
			>
				<el-form-item label="消息的标题" prop="title">
					<el-input
						show-word-limit
						v-model="editForm.title"
						:readonly="true"
					></el-input>
				</el-form-item>
				<el-form-item label="消息内容" prop="content">
					<el-input
						type="textarea"
						:autosize="{ minRows: 2, maxRows: 10 }"
						v-model="editForm.content"
						:readonly="true"
					></el-input>
				</el-form-item>
				<el-form-item label="消息参数" prop="params">
					<el-input
						type="textarea"
						:autosize="{ minRows: 2, maxRows: 10 }"
						v-model="editForm.params"
						:readonly="true"
					></el-input>
				</el-form-item>
				<el-form-item label="创建人" prop="createUserName">
					<el-input
						v-model="editForm.createUserName"
						:readonly="true"
					></el-input>
				</el-form-item>
				<el-form-item label="创建时间" prop="createTime">
					<el-input v-model="editForm.createTime" :readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="showMessDetailVisible = false">关 闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
const defaultFormThead = [];
export default {
	data() {
		return {
			folding: false,
			style: {},
			ruleForm: {
				title: '',
				content: '',
				status: '',
				createTime: [],
			},
			formShow: false,
			activeName: 'first',

			hangtableData: [],
			currentPage: 1,
			pageSize: 20,
			total: 0,

			unreadtableData: [],
			currentPage1: 1,
			pageSize1: 20,
			total1: 0,

			readtableData: [],
			currentPage2: 1,
			pageSize2: 20,
			total2: 0,

			editForm: {
				id: '',
				channel: '',
				account: '',
				title: '',
				content: '',
				params: '',
				status: '',
				createTime: '',
				createUserName: '',
				sendCount: 0,
				lastSendTime: '',
				firstSendTime: '',
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
			let param = {};
			param.title = this.ruleForm.title;
			param.status = this.ruleForm.status;
			param.content = this.ruleForm.content;
			param.channel = 'PM';
			if (this.ruleForm.createTime && this.ruleForm.createTime.length == 2) {
				param.fromCreateTime = this.ruleForm.createTime[0];
				param.toCreateTime = this.ruleForm.createTime[1]; //this.formatDate(this.ruleForm.createTime[1],"yyyy-MM-dd");
			}
			if (this.activeName === 'first') {
				let load = null;
				this.$nextTick(() => {
					load = this.$loading({
						target: this.$refs.hangTable.$el,
					});
				});
				this.formShow = false;
				let params = {
					pageNum: this.currentPage,
					pageSize: this.pageSize,
					...param,
				};
				this.$api.formPost('/api/msg/hang/doGetList', params).then((res) => {
					if (res.retHead.code == '0000000') {
						load.close();
						this.hangtableData = res.retBody.list;
						this.total = res.retBody.total;
						this.currentPage = res.retBody.pageNum;
						if (this.hangtableData) {
							this.hangtableData.forEach((it) => {
								if (it.createTime) {
									it.createTime = this.formatDate(
										it.createTime,
										'yyyy-MM-dd HH:mm:ss'
									);
								}
								if (it.lastSendTime)
									it.lastSendTime = this.formatDate(
										it.lastSendTime,
										'yyyy-MM-dd HH:mm:ss'
									);
								if (it.firstSendTime)
									it.firstSendTime = this.formatDate(
										it.firstSendTime,
										'yyyy-MM-dd HH:mm:ss'
									);
							});
						}
					}
				});
			} else if (this.activeName === 'second') {
				let load = null;
				this.$nextTick(() => {
					load = this.$loading({
						target: this.$refs.unreadTable.$el,
					});
				});
				this.formShow = false;
				let params = {
					pageNum: this.currentPage1,
					pageSize: this.pageSize1,
					...param,
				};
				this.$api.formPost('/api/msg/pm/doGetList', params).then((res) => {
					load.close();
					this.unreadtableData = res.retBody.list;
					this.total1 = res.retBody.total;
					this.currentPage1 = res.retBody.pageNum;
					if (this.unreadtableData) {
						this.unreadtableData.forEach((it) => {
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
				let load = null;
				this.$nextTick(() => {
					load = this.$loading({
						target: this.$refs.readTable.$el,
					});
				});
				this.formShow = false;
				let params = {
					pageNum: this.currentPage2,
					pageSize: this.pageSize2,
					...param,
				};
				this.$api.formPost('/api/msg/pm/doGetHisList', params).then((res) => {
					load.close();
					this.readtableData = res.retBody.list;
					this.total2 = res.retBody.total;
					this.currentPage2 = res.retBody.pageNum;
					if (this.readtableData) {
						this.readtableData.forEach((it) => {
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
		sizeChange1(n) {
			this.pageSize1 = n;
			this.getData();
		},
		currentChange1(n) {
			this.currentPage1 = n;
			this.getData();
		},
		sizeChange2(n) {
			this.pageSize2 = n;
			this.getData();
		},
		currentChange2(n) {
			this.currentPage2 = n;
			this.getData();
		},
		handleTabClick(tab, event) {
			//this.formShow= (tab.name == 'first');
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
			this.editForm.createUserName = row.createUserName;
			if (row.sendCount) this.editForm.sendCount = row.sendCount;
			else this.editForm.sendCount = 0;
			if (row.lastSendTime) this.editForm.lastSendTime = row.lastSendTime;
			else this.editForm.lastSendTime = '';
			if (row.firstSendTime) this.editForm.firstSendTime = row.firstSendTime;
			else this.editForm.firstSendTime = '';
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

					let url = '/api/msg/pm/doRmHisByIds';
					if (this.activeName == 'first') {
						url = '/api/msg/hang/doRmByIds';
					} else if (this.activeName == 'second') {
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
		handleDelete1(row) {
			this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					let params = {};
					let userId = JSON.parse(window.sessionStorage.user).id;
					params.ids = row.id;
					params.userId = userId;

					let url = '/api/msg/pm/doRmHisByIds';
					if (this.activeName == 'first') {
						url = '/api/msg/hang/doRmByIds';
					} else if (this.activeName == 'second') {
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
		submitForm(formName) {
			this.getData();
		},
		resetForm(formName) {
			this.ruleForm = {
				title: '',
				content: '',
				status: '',
				createTime: [],
			};
			this.$refs[formName].resetFields();
			this.submitForm('ruleForm');
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
</style>
