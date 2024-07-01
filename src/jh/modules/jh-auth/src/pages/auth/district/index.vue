<template>
	<div class="district">
		<div class="card" style="display:flex;justify-content: space-between;">
			<div class>
				<el-input
					prefix-icon="el-icon-search"
					v-model="dutyName"
					placeholder="输入角色名称进行查询"
					style="width:200px"
				>
				</el-input>
				<el-button type="primary" @click="getList">查询</el-button>
			</div>
			<div class="fg1"></div>
			<el-button type="primary" class="confirm" @click="getNewChenked"
				>确定</el-button
			>
		</div>
		<div class="card content">
			<div class="box">
				<div class="left">
					<el-tabs
						tab-position="left"
						class="leftSlider"
						v-model="activeName"
						@tab-click="handleClick"
					>
						<el-tab-pane
							v-for="i in dutyList"
							:key="i.id"
							:label="i.dutyName"
							:name="i.id"
						></el-tab-pane>
					</el-tabs>

					<el-pagination
						@current-change="currentChange"
						:current-page="currentPage"
						:page-size="pageSize"
						background
						layout=" prev, jumper, next"
						:total="total"
					></el-pagination>
				</div>

				<div class="right">
					<div class="df jcb">
						<el-tabs class="fg1" v-model="activeName1">
							<el-tab-pane label="机构" name="1"> </el-tab-pane>
							<el-tab-pane label="用户" name="2"> </el-tab-pane>
						</el-tabs>
					</div>
					<template v-if="activeName1 == 1">
						<div class="fg1 ova">
							<el-table
								ref="multipleTable"
								row-key="id"
								height="100%"
								:data="organList"
								tooltip-effect="dark"
								style="width: 100%"
								default-expand-all
								:tree-props="{
									children: 'children',
									hasChildren: 'hasChildren',
								}"
								@select-all="selectALl"
								@select="select"
								@selection-change="handleSelectionChange"
							>
								<el-table-column
									type="selection"
									checked="ownerFlag"
									width="55"
								></el-table-column>
								<el-table-column
									prop="organName"
									label="机构名称"
									width="220"
									align="left"
								></el-table-column>
								<el-table-column
									prop="superName"
									label="上级机构"
									show-overflow-tooltip
								></el-table-column>
							</el-table>
						</div>
					</template>
					<template v-if="activeName1 == 2">
						<div class="card df aic">
							<el-button type="primary" @click="dialogVisible = true"
								>添加</el-button
							>
							<el-button type="primary" @click="batchDelete"
								>批量删除</el-button
							>
							<div class="fg1"></div>
							<searchDialog
								v-if="$el"
								v-model="searchForm.username"
								placeholder="请输入用户名"
								@resetForm="resetSearch"
								@searchData="searchData"
								:el="$el"
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
										<el-select
											v-model="searchForm.organRecurFlag"
											style="width: 100%;"
										>
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
							:data="dutyUserData"
							@selection-change="handleSelectionChangeUser"
							border
							style="width: 100%;max-height:calc(100vh - 300px);overflow:auto;"
						>
							<el-table-column type="selection" width="55"></el-table-column>
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
								prop="mobile"
								label="手机号码"
							></el-table-column>
							<el-table-column
								align="center"
								prop="organName"
								label="所属部门"
							></el-table-column>
							<el-table-column
								align="center"
								prop="userLevel"
								label="用户级别"
								:formatter="userLevelFormatter"
							></el-table-column>
						</el-table>
					</template>
				</div>
			</div>
		</div>
		<el-dialog
			title="所有用户"
			top="10vh"
			width="1200px"
			:visible.sync="dialogVisible"
			:fullscreen="fullscreen"
		>
			<!--
      <users ref="user" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary"  @click="saveUserToDuty">确 定</el-button>
      </span>
      -->
			<users ref="user" />
			<span slot="footer" class="dialog-footer">
				<el-row>
					<el-col :span="8" :offset="12">
						<span class="vba">用户级别：</span>
						<el-select v-model="userLevel">
							<el-option label="机构负责人" value="1"></el-option>
							<!-- <el-option label="二级负责人" value="2"></el-option>
                <el-option label="三级负责人" value="3"></el-option> -->
							<el-option label="非负责人" value="0"></el-option>
						</el-select>
					</el-col>
					<el-col :span="4">
						<el-button type="primary" @click="saveUserToDuty">确 定</el-button>
					</el-col>
				</el-row>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dutyName: '',
			userLevel: '0',
			total: 0,
			pageSize: 10,
			currentPage: 1,
			fullscreen: false,
			checkList: [], //测试字段
			dialogVisible: false,
			activeName: '',
			activeName1: '1',
			dutyList: [],
			props: {
				label: 'organName',
				children: 'children',
			},
			selectflag: false,
			organList: [],
			checks: [],
			dutyUserData: [],
			multipleSelection: [],
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
		activeName1: function(val) {
			if (val == 1) {
				this.$nextTick(() => {
					this.getListCkecked(this.organList);
				});
			}
		},
	},
	mounted() {
		this.init();
	},

	methods: {
		handleSelectionChangeUser(row) {
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
						dutyId: this.activeName,
						userId: this.selectRows
							.map((item) => {
								return item.id;
							})
							.join(','),
					};
					this.$api
						.formPost('/api/auth/sysuserduty/doDeleteUserDuty', params)
						.then((res) => {
							this.$message.success('删除成功');
							this.getUserListByDutyId();
						});
				})
				.catch(() => {});
		},
		currentChange(n) {
			this.currentPage = n;
			this.getList();
		},

		searchData() {
			this.formShow = false;
			this.getUserListByDutyId();
		},
		resetSearch() {
			this.$refs.searchForm.resetFields();
			this.getUserListByDutyId();
		},
		saveUserToDuty() {
			let checkedUsers = this.$refs.user.selectedTableData;
			if (!checkedUsers || checkedUsers.length === 0) {
				this.$message.warning('请选择用户');
				return;
			}
			let userids = '';
			checkedUsers.forEach((item) => {
				userids += item.id + ',';
			});

			let params = {
				userLevel: this.userLevel,
				dutyId: this.activeName,
				userIds: userids,
			};
			this.$api
				.formPost('/api/auth/sysuserduty/doAddDutyUser', params)
				.then((res) => {
					this.dialogVisible = false;
					if (res.retHead.code == '0000000') {
						this.$message.success(res.retHead.message);
						this.getUserListByDutyId();
					} else {
						this.$message.error(res.retHead.message);
					}
				});
		},
		switchChange(v) {
			if (v.ownerFlag) {
				let id = v.parentId;
				let arr = this.$refs.tree.getCheckedKeys();
				if (arr.indexOf(id) < 0) {
					arr.push(id);
				}
				this.$refs.tree.setCheckedKeys(arr);
			}
		},
		delUser(i, row) {
			let params = {
				dutyId: this.activeName,
				userId: row.id,
			};
			this.$api
				.formPost('/api/auth/sysuserduty/doDeleteUserDuty', params)
				.then((res) => {
					if (res.retHead.code == '0000000') {
						this.$message.success(res.retHead.message);
						this.init();
					} else {
						this.$message.error(res.retHead.message);
					}
				});
		},
		handleClick(tab, event) {
			this.activeName = tab.name;
			this.toRender();
		},
		async toRender() {
			let params = {
				dutyId: this.activeName,
			};
			this.organList = await this.getAllOrganJsonList(params);
			this.getListCkecked(await this.organList);
			this.getUserListByDutyId();
		},
		init() {
			this.getList();
		},
		getList() {
			let params = {
				dutyName: this.dutyName,
				pageNum: this.currentPage,
				pageSize: this.pageSize,
			};
			this.$api.formPost('/api/auth/sysDuty/doGetList', params).then((res) => {
				if (res.retHead.code == '0000000') {
					this.dutyList = res.retBody.list;
					this.total = res.retBody.total;
					this.currentPage = res.retBody.pageNum;
					this.activeName = this.dutyList[0].id;
					this.toRender();
				} else {
					this.$message.error('发生错误！');
				}
			});
		},
		getListCkecked(list) {
			this.checks = [];
			this.deepFor(list);
		},
		getNewChenked() {
			let list = this.multipleSelection;
			let arrOrganId = [];
			list.forEach((item) => {
				arrOrganId.push(item.id);
			});

			let params = {
				dutyId: this.activeName,
				organIds: [...arrOrganId],
			};
			this.edit(params);
		},
		edit(params) {
			this.$api
				.formPost('/api/auth/sysdutyorgan/doAddDutyOrgan', params)
				.then((res) => {
					if (res.retHead.code == '0000000') {
						this.$message.success(res.retHead.message);
					} else {
						this.$message.error('发生错误！');
					}
				});
		},

		deepFor(list) {
			list.forEach((item) => {
				if (item.children.length > 0) {
					if (item.ownerFlag) {
						this.$refs.multipleTable &&
							this.$refs.multipleTable.toggleRowSelection(item, true);
					}
					this.deepFor(item.children);
				} else {
					if (item.ownerFlag) {
						this.$refs.multipleTable &&
							this.$refs.multipleTable.toggleRowSelection(item, true);
					}
				}
			});
		},

		getAllOrganJsonList(params) {
			return new Promise((resolve, reject) => {
				this.$api
					.formPost('/api/auth/sysdutyorgan/doGetAllOrganJsonByDutyId', params)
					.then((res) => {
						if (res.retHead.code == '0000000') {
							resolve(res.retBody);
						} else {
							this.$message.error('发生错误！');
						}
					});
			});
		},

		getUserListByDutyId() {
			let params = {
				dutyId: this.activeName,
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
				.formPost('/api/auth/sysuser/doGetSysUserListWithDutyId', params)
				.then((res) => {
					if (res.retHead.code == '0000000') {
						this.dutyUserData = res.retBody.list;
					} else {
						this.$message.error('发生错误！');
					}
				});
		},
    selectALl(selection) {
      for (const iterator of this.data) {
        this.toggleSelection(
            iterator,
            this.$refs.multipleTable.store.states.isAllSelected
        );
      }
    },
    select(selection, row) {
      if (selection.indexOf(row) > -1) {
        this.$refs.multipleTable.toggleRowSelection(row, true);
        //降低递归事件等级 延后执行 否则会被上面覆盖
        this.$nextTick(() => {
          this.toggleSelection(row, true);
        });
      } else {
        this.$nextTick(() => {
          this.toggleSelection(row, false);
        });
      }
    },
    toggleSelection(row, state) {
      if (row.children && row.children.length > 0) {
        for (const iterator of row.children) {
          this.$refs.multipleTable.toggleRowSelection(iterator, state);
          if (iterator.children && row.children.length > 0) {
            this.toggleSelection(iterator, state);
          }
        }
      }
    },
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		userLevelFormatter(row, column) {
			if (row.userLevel == 1) {
				return '机构负责人';
			} else if (row.userLevel == 2) {
				return '二级负责人';
			} else if (row.userLevel == 3) {
				return '三级负责人';
			} else if (row.userLevel == 0) {
				return '非负责人';
			}
			return '';
		},
	},
	created() {},
};
</script>
<style lang="scss" scoped>
.district {
	height: 100%;
	overflow: auto;
	display: flex;
	flex-direction: column;
	.content {
		height: calc(100% - 61px);
	}
}
.box {
	height: 100%;
	display: flex;
	.left {
		height: 100%;
		width: 200px;
		.leftSlider {
			height: calc(100% - 40px);
		}
	}
	.right {
		height: 100%;
		width: calc(100% - 200px);
		display: flex;
		flex-direction: column;
	}
}
.custom-tree-node {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 14px;
	padding-right: 8px;
}

/deep/ .el-tree-node__content {
	border: 1px solid #ddd;
	border-bottom: 0;
	padding: 10px;
}

/deep/.el-tree {
	border-bottom: 1px solid #ddd;
}
/deep/.el-tabs--left .el-tabs__header.is-left {
	width: 100%;
	padding-right: 10px;
}
.confirm {
	float: right;
	margin-top: 5px;
}
</style>
