<!--  -->
<template>
	<div class="userList">
		<div class="card df aic">
			<el-button type="primary" @click="dialogVisible = true">添加</el-button>
			<el-button type="primary" @click="batchDelete">批量删除</el-button>
			<div class="fg1"></div>
			<searchDialog
				v-if="$el"
				v-model="searchForm.username"
				placeholder="请输入用户名"
				@resetForm="resetSearch"
				@searchData="searchData"
				:el="$parent.$el"
				:showForm.sync="formShow"
			>
				<el-form
					:model="searchForm"
					label-position="top"
					ref="searchForm"
					label-width="auto"
				>
					<el-form-item label="用户名" prop="username">
						<el-input
							v-model="searchForm.username"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item label="用户机构" prop="organId">
						<cascader-user v-model="searchForm.organId"></cascader-user>
					</el-form-item>
					<el-form-item label="是否包含下级" prop="organRecurFlag">
						<el-select v-model="searchForm.organRecurFlag" style="width: 100%;">
							<el-option label="本级机构" value="0"></el-option>
							<el-option label="所有子机构" value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<div class="df jce" slot="footer">
					<el-button @click="resetSearch">重置</el-button>
					<el-button type="primary" @click="searchData">查询</el-button>
				</div>
			</searchDialog>
		</div>
		<el-table
			:data="tableData"
			border
			@selection-change="handleSelectionChange"
			style="width: 100%;max-height:calc(100vh - 300px);overflow:auto;"
		>
			<el-table-column type="selection" width="55"> </el-table-column>
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
		</el-table>

		<el-dialog
			title="所有用户"
			top="5vh"
			width="1200px"
			:visible.sync="dialogVisible"
			:fullscreen="fullscreen"
		>
			<users ref="user" style="height:75vh" :authorized="false" />
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addUserOk">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'userList',
	props: {
		roleId: {
			type: String,
			default: '',
		},
	},
	components: {},

	data() {
		return {
			dialogVisible: false,
			fullscreen: false,
			tableData: [],
			selectRows: [],
			formShow: false,
			searchForm: {
				username: '',
				organId: '',
				organRecurFlag: '1',
			},
		};
	},
	watch: {
		roleId: {
			handler: function(val) {
				console.log(this);
				if (val) {
					this.getUserListByRoleId();
				}
			},
			immediate: true,
		},
	},

	methods: {
		getUserListByRoleId() {
			let params = {
				roleId: this.roleId,
				...this.searchForm,
			};
			if (this.searchForm.organId && this.searchForm.organId.length > 0) {
				params.organId = this.searchForm.organId[
					this.searchForm.organId.length - 1
				];
			} else {
				params.organId = '';
			}
			this.formShow = false;
			this.$api
				.formPost('/api/auth/sysuser/doGetListWithRoleId', params)
				.then((res) => {
					console.log(res);
					if (res.retHead.code == '0000000') {
						this.tableData = res.retBody.list;
					} else {
						this.$message.error('发生错误！');
					}
				});
		},
		searchData() {
			this.getUserListByRoleId();
		},
		resetSearch() {
			this.$refs.searchForm.resetFields();
			this.getUserListByRoleId();
		},
		handleSelectionChange(row) {
			this.selectRows = row;
		},
		batchDelete() {
			if (this.selectRows.length === 0) {
				this.$message.warning('当前未选择数据');
				return;
			}
			this.$confirm('此操作将永久删除这些项, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					let params = {
						roleId: this.roleId,
						userIds: this.selectRows.map((item) => {
							return item.id;
						}),
					};
					this.$api
						.formPost('/api/auth/sysrole/doDelRoleUser', params)
						.then((res) => {
							this.$message.success('删除成功');
							this.getUserListByRoleId();
						});
				})
				.catch(() => {});
		},
		addUserOk() {
			let checkedUsers = this.$refs.user.selectedTableData;
			let userids = '';
			checkedUsers.forEach((item) => {
				userids += item.id + ',';
			});

			let params = {
				roleId: this.roleId,
				userIds: userids,
			};
			this.$api
				.formPost('/api/auth/sysrole/doAddRoleUser', params)
				.then((res) => {
					this.dialogVisible = false;
					if (res.retHead.code == '0000000') {
						this.$message.success(res.retHead.message);
						this.getUserListByRoleId();
					} else {
						this.$message.error(res.retHead.message);
					}
				});
		},
	},
};
</script>
<style lang="scss" scoped></style>
