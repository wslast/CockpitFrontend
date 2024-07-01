<!-- 桌面组件管理 -->
<template>
	<div class="bizLine">
		<div class="card df p12">
			<el-button type="primary" @click="editItem()">新增</el-button>
			<div class="fg1"></div>
			<searchDialog
				v-model="searchForm.roleName"
				placeholder="请输入角色名称"
				@resetForm="resetForm('searchForm')"
				@searchData="init"
				:showForm.sync="formShow"
			>
				<el-form
					:model="searchForm"
					label-width="70px"
					label-position="top"
					ref="searchForm"
				>
					<el-form-item label="角色名称" prop="roleName">
						<el-input
							v-model="searchForm.roleName"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item label="角色状态" prop="roleStatus">
						<el-select
							v-model="searchForm.roleStatus"
							placeholder="请选择"
							style="width: 100%;"
						>
							<el-option label="启用" value="1"></el-option>
							<el-option label="停用" value="2"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<div class="df jce" slot="footer">
					<el-button @click="resetForm('searchForm')">重置</el-button>
					<el-button type="primary" @click="init">查询</el-button>
				</div>
			</searchDialog>
		</div>

		<div class="tableContent ml10 mr10">
			<el-table
				:data="tableData"
				ref="elTable"
				border
				height="100%"
				style="width: 100%"
			>
				<el-table-column type="index" label="序号" align="center" width="60">
				</el-table-column>
				<el-table-column
					align="center"
					prop="roleName"
					show-overflow-tooltip
					label="角色名称"
				>
				</el-table-column>
				<el-table-column align="center" prop="roleStatus" label="角色状态">
					<template slot-scope="scope">
						<div v-for="item in compStatusList" :key="item.key">
							<span v-if="scope.row.roleStatus == item.key">{{
								item.value
							}}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column align="center" prop="createName" label="创建人">
				</el-table-column>
				<el-table-column align="center" prop="createTime" label="创建时间">
				</el-table-column>
				<el-table-column align="center" fixed="right" label="操作" width="350">
					<template slot-scope="scope">
						<el-button type="text" @click="editItem(scope.row)">修改</el-button
						><el-button type="text" @click="privilege(scope.row)"
							>权限</el-button
						><el-button type="text" @click="showUser(scope.row)">用户</el-button
						><el-button type="text" @click="setDefaultDesk(scope.row)"
							>默认桌面配置</el-button
						><el-button type="text" @click="deleteItem(scope.row)"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-pagination
			style="text-align: center"
			v-show="tableData.length > 0"
			class="pt10 pb10"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="pager.page"
			background
			:page-size="pager.size"
			layout="total, sizes, prev, pager, next"
			:total="pager.total"
		>
		</el-pagination>
		<el-dialog :title="title" width="600px" :visible.sync="dialogFormVisible">
			<el-form :model="form" :rules="rules" ref="form" label-width="auto">
				<el-form-item label="角色名称" prop="roleName">
					<el-input v-model="form.roleName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色状态" prop="roleStatus">
					<el-select
						v-model="form.roleStatus"
						placeholder="请选择"
						class="pctw100"
					>
						<el-option label="启用" value="1"></el-option>
						<el-option label="停用" value="2"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancle()">取 消</el-button>
				<el-button type="primary" @click="saveItem()">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="用户" :visible.sync="dialogUser" width="1200px">
			<div class="card df aic" style>
				<el-button
					type="primary"
					icon="el-icon-plus"
					@click="dialogAllUser = true"
					>添加</el-button
				>
				<div class="fg1"></div>
				<el-form
					:model="searchUserForm"
					inline
					ref="searchUserForm"
					label-width="auto"
				>
					<el-form-item label="登陆账号" prop="username">
						<el-input
							style="width: 150px;"
							v-model="searchUserForm.username"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item label="用户机构" prop="organId">
						<cascader-user
							style="width: 150px;"
							v-model="searchUserForm.organId"
						></cascader-user>
					</el-form-item>
					<el-form-item label="是否包含下级" prop="organRecurFlag">
						<el-select
							style="width: 150px;"
							v-model="searchUserForm.organRecurFlag"
						>
							<el-option label="本级机构" value="0"></el-option>
							<el-option label="所有子机构" value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button @click="resetSearch">重置</el-button>
						<el-button type="primary" @click="searchData">查询</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="userTableData" border style="width: 100%">
				<el-table-column
					type="index"
					width="60px"
					align="center"
					fixed="left"
					label="序号"
				></el-table-column>
				<el-table-column
					align="center"
					prop="username"
					label="用户名"
				></el-table-column>
				<el-table-column
					align="center"
					prop="realName"
					label="真实姓名"
				></el-table-column>
				<el-table-column
					align="center"
					prop="organName"
					label="机构名称"
				></el-table-column>
				<el-table-column
					align="center"
					prop="mobile"
					label="手机号码"
				></el-table-column>
				<el-table-column
					align="center"
					prop="email"
					label="电子邮箱"
				></el-table-column>
				<el-table-column align="center" label="操作" width="100">
					<template slot-scope="scope">
						<el-button type="text" @click="delUser(scope.$index, scope.row)"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
			<div class="card" style="text-align: center">
				<el-pagination
					@size-change="sizeChange1"
					@current-change="currentChange1"
					:current-page="currentPage1"
					:page-size="pageSize1"
					background
					layout="total, sizes, prev, pager, next"
					:total="total1"
				></el-pagination>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogUser = false">取 消</el-button>
				<el-button type="primary" @click="dialogUser = false">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog
			title="所有用户"
			width="1500px"
			:visible.sync="dialogAllUser"
			:fullscreen="fullscreen"
		>
			<users ref="user" />
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addUserOk">确 定</el-button>
			</span>
		</el-dialog>
		<defaultDeskDialog
			@onSuccess="init('refresh')"
			:defaultDeskDialogVisible.sync="defaultDeskDialogVisible"
			v-if="defaultDeskDialogVisible"
			:defaultDeskDialogConfig="defaultDeskDialogConfig"
		/>
	</div>
</template>

<script>
import users from '../../components/checkUser/uesrs.vue';
export default {
	components: {
		users,
		defaultDeskDialog: (resolve) => resolve(require('./defaultDeskDialog')),
	},
	name: 'deskComp',
	data() {
		return {
			dialogAllUser: false,
			dialogUser: false,
			dialogFormVisible: false,
			form: {
				id: '',
				roleName: '',
				roleStatus: '',
				createName: '',
			},
			title: '',
			tableData: [],
			formShow: false,
			searchForm: {
				roleName: '',
				roleStatus: '',
			},
			pager: {
				size: 20,
				page: 1,
				total: 1,
			},
			rules: {
				roleName: [{ required: true, message: '请输入', trigger: 'blur' }],
				roleStatus: [{ required: true, message: '请输入', trigger: 'blur' }],
			},
			list: [],
			compStatusList: [
				{ key: 1, value: '启用' },
				{ key: 2, value: '停用' },
			],
			userTableData: [],
			total1: 0,
			pageSize1: 10,
			currentPage1: 1,
			fullscreen: false,
			defaultDeskDialogVisible: false,
			defaultDeskDialogConfig: { title: '默认桌面设置' },
			searchUserForm: {
				username: '',
				organId: '',
				organRecurFlag: '1',
			},
		};
	},

	computed: {},
	mounted() {
		this.init();
	},
	created() {
		this.getRoleUserList();
	},

	methods: {
		searchData() {
			this.getUserListByRoleId();
		},
		resetSearch() {
			this.$refs.searchUserForm.resetFields();
			this.getUserListByRoleId();
		},
		setDefaultDesk(row) {
			this.defaultDeskDialogConfig.data = JSON.parse(JSON.stringify(row));
			this.defaultDeskDialogVisible = true;
		},
		privilege(row) {
			let path = '/sysfun/desk/deskRoleComp';
			this.$router.push({
				path: path,
				query: {
					roleId: row.id,
				},
			});
		},
		cancle() {
			this.dialogFormVisible = false;
		},
		/* change() {
      let compName = this.form.compName;
      this.form.refId = this.list.find((c) => c.compname == compName).refid;
    }, */
		getRoleUserList() {
			this.$api
				.formPost('/api/basfun/desk/deskUserRole/doGetList')
				.then((res) => {
					this.list = res.retBody.list;
				});
		},
		init(type) {
			if (type == 'refresh') {
				this.pager.page = 1;
			}
			let param = {
				pageSize: this.pager.size,
				pageNum: this.pager.page,
			};
			if (this.searchForm.roleName) {
				param.roleName = this.searchForm.roleName;
			}
			if (this.searchForm.roleStatus) {
				param.roleStatus = this.searchForm.roleStatus;
			}
			let load = this.$loading({
				target: this.$refs.elTable.$el,
			});
			this.formShow = false;
			this.$api
				.formPost('/api/basfun/desk/deskRole/doGetList', param)
				.then((res) => {
					load.close();
					this.tableData = res.retBody.list;
					this.pager.total = res.retBody.total;
				});
		},
		editItem(row) {
			if (row) {
				this.title = '修改桌面角色';
				this.dialogFormVisible = true;
				this.$nextTick(() => {
					this.$refs.form.resetFields();
					this.form = JSON.parse(JSON.stringify(row));
				});
			} else {
				this.title = '新增桌面角色';
				this.dialogFormVisible = true;
				this.$nextTick(() => {
					this.$refs.form.resetFields();
					this.form = {};
				});
			}
		},
		deleteItem(row) {
			this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				this.$api
					.formPost('/api/basfun/desk/deskRole/doRmById', { id: row.id })
					.then((res) => {
						this.$message.success('删除成功');
						this.init('refresh');
					});
			});
		},
		handleSizeChange(val) {
			this.pager.size = val;
			this.init();
		},

		handleCurrentChange(val) {
			this.pager.page = val;
			this.init();
		},
		saveItem() {
			this.$refs['form'].validate((valid) => {
				if (!valid) {
					return;
				}
				if (!this.form.id) {
					this.$api
						.formPost('/api/basfun/desk/deskRole/doSave', this.form)
						.then((res) => {
							if (res.retHead.code === '0000000') {
								this.init();
								this.$message.success('操作成功');
							}
							this.dialogFormVisible = false;
						});
				} else {
					this.$api
						.formPost('/api/basfun/desk/deskRole/doModById', this.form)
						.then((res) => {
							if (res.retHead.code === '0000000') {
								this.init();
								this.$message.success('操作成功');
							}
							this.dialogFormVisible = false;
						});
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.init();
		},

		showUser(row) {
			this.$refs.searchUserForm && this.$refs.searchUserForm.resetFields();
			this.dialogUser = true;
			let id = row.id;
			this.roleId = id;
			this.getUserListByRoleId();
		},
		getUserListByRoleId() {
			let params = {
				pageNum: this.currentPage1,
				pageSize: this.pageSize1,
				roleId: this.roleId,
				...this.searchUserForm,
			};
			if (
				this.searchUserForm.organId &&
				this.searchUserForm.organId.length > 0
			) {
				params.organId = this.searchUserForm.organId[
					this.searchUserForm.organId.length - 1
				];
			} else {
				params.organId = '';
			}
			this.$api
				.formPost(
					'/api/basfun/desk/deskUserRole/getUserListByRoleIdAndUser',
					params
				)
				.then((res) => {
					if (res.retHead.code == '0000000') {
						this.userTableData = res.retBody.list;
						this.total1 = res.retBody.total;
						this.currentPage1 = res.retBody.pageNum;
					} else {
						this.$message.error('发生错误！');
					}
				});
		},
		delUser(index, row) {
			let params = {
				roleId: this.roleId,
				userId: row.id,
			};
			this.$api
				.formPost('/api/basfun/desk/deskUserRole/deleteByUserId', params)
				.then((res) => {
					if (res.retHead.code == '0000000') {
						this.$message.success(res.retHead.message);
						this.getUserListByRoleId();
					} else {
						this.$message.error(res.retHead.message);
					}
				});
		},
		sizeChange1(n) {
			this.pageSize1 = n;
			this.getUserListByRoleId();
		},
		currentChange1(n) {
			this.currentPage1 = n;
			this.getUserListByRoleId();
		},
		addUserOk() {
			let checkedUsers = this.$refs.user.selectedTableData;
			let userids = '';
			let userNames = '';
			checkedUsers.forEach((item) => {
				userids += item.id + ',';
				this.list.forEach((old) => {
					if (old.userId == item.id) {
						userNames += item.realName + ',';
					}
				});
			});
			let params = {
				roleId: this.roleId,
				userIds: userids,
			};
			if (userNames) {
				this.$confirm(
					'存在用户' + userNames + '已经拥有桌面角色, 是否强制更新?',
					'提示',
					{
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
					}
				).then(() => {
					this.$api
						.formPost('/api/basfun/desk/deskUserRole/doSaveByUserIds', params)
						.then((res) => {
							this.dialogAllUser = false;
							if (res.retHead.code == '0000000') {
								this.$message.success(res.retHead.message);
								this.getUserListByRoleId();
							} else {
								this.$message.error(res.retHead.message);
							}
						});
				});
			} else {
				this.$api
					.formPost('/api/basfun/desk/deskUserRole/doSaveByUserIds', params)
					.then((res) => {
						this.dialogAllUser = false;
						if (res.retHead.code == '0000000') {
							this.$message.success(res.retHead.message);
							this.getUserListByRoleId();
						} else {
							this.$message.error(res.retHead.message);
						}
					});
			}
		},
		initData() {
			this.pager.page = 1;
			this.init();
		},
	},
};
</script>
<style lang="scss" scoped>
.bizLine {
	height: 100%;
	display: flex;
	flex-direction: column;
	.tableContent {
		flex-grow: 1;
		overflow: auto;
	}
}
/deep/ .el-form-item {
	margin-bottom: 0px !important;
}
</style>
