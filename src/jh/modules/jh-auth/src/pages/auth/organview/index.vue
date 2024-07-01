<template>
	<div class="organView">
		<el-row style="height:100%;">
			<el-col :span="6">
				<div class style="background:#fff; padding:10px;">
					<el-switch
						style="margin-bottom:10px;"
						v-model="organRecurFlag"
						@change="getUsers"
						active-text="含下级"
						inactive-text="不含下级"
					></el-switch>
					<el-input
						placeholder="输入关键字进行查询"
						prefix-icon="el-icon-search"
						v-model="filterText"
					></el-input>
				</div>
				<el-tree
					class="ova"
					style="min-height:calc(100vh - 210px);"
					highlight-current
					:expand-on-click-node="false"
					@node-click="handleNodeClick"
					:props="props"
					:data="data"
					node-key="id"
					:default-expanded-keys="defauleArr"
					:filter-node-method="filterNode"
					ref="tree"
				></el-tree>
			</el-col>

			<el-col :span="18" class="rightContent">
				<div
					class="card"
					style="display:flex;justify-content: space-between;item-align:center;"
				>
					<span class="current">部门名称：{{ chackedNode.organName }}</span>
					<el-form label-width="80px" inline :model="searchForm">
						<el-form-item label="用户级别">
							<el-select
								clearable
								v-model="searchForm.userLevel"
								@change="getUsers"
								placeholder="请选择"
							>
								<el-option label="全部" value=""></el-option>
								<el-option label="机构负责人" value="1"></el-option>
								<!-- <el-option label="二级负责人" value="2"></el-option>
                    <el-option label="三级负责人" value="3"></el-option> -->
								<el-option label="非负责人" value="0"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</div>
				<el-tabs
					type="border-card"
					v-model="userOrganType"
					@tab-click="tabsClick"
				>
					<el-tab-pane label="机构用户" name="0"></el-tab-pane>
					<el-tab-pane name="1" label="兼职用户"></el-tab-pane>
				</el-tabs>
				<template v-if="userOrganType == 0">
					<div class="fg1 ova" style="height:100px;">
						<el-table
							height="100%"
							min-height="100%"
							:data="tableData"
							border
							style="width: 100%;"
						>
							<el-table-column
								type="index"
								width="60px"
								align="center"
								label="序号"
							></el-table-column>
							<el-table-column
								prop="realName"
								align="center"
								label="姓名"
							></el-table-column>
							<el-table-column
								prop="username"
								align="center"
								label="登录名"
							></el-table-column>
							<el-table-column
								prop="organName"
								align="center"
								label="所属机构"
							></el-table-column>
							<el-table-column
								prop="userLevel"
								align="center"
								:formatter="userLevelFormatter"
								label="用户级别"
							></el-table-column>
							<el-table-column label="操作" width="180px" align="center">
								<template slot-scope="scope">
									<el-button type="text" @click="handleSeeMore(scope.row)"
										>详情</el-button
									>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div class="card" style="text-align:right;">
						<el-pagination
							@size-change="sizeChange"
							@current-change="currentChange"
							:current-page="currentPage"
							:page-size="pageSize"
							background
							layout="total, sizes, prev, pager, next"
							:total="total"
						></el-pagination>
					</div>
				</template>
				<template v-if="userOrganType == 1">
					<!--组织机构中的用户信息-->

					<div class="fg1 ova" style="height:100px;">
						<el-table
							:data="tableData"
							border
							height="100%"
							style="width: 100%;"
						>
							<el-table-column
								type="index"
								width="60px"
								align="center"
								label="序号"
							></el-table-column>
							<el-table-column
								prop="realName"
								align="center"
								label="姓名"
							></el-table-column>
							<el-table-column
								prop="username"
								align="center"
								label="登录名"
							></el-table-column>
							<el-table-column
								prop="organName"
								align="center"
								label="兼职机构"
							></el-table-column>
							<el-table-column
								prop="userLevel"
								align="center"
								width="120"
								label="用户级别"
								:formatter="userLevelFormatter"
							></el-table-column>
						</el-table>
					</div>
					<div class="card" style="text-align:right;">
						<el-pagination
							@size-change="sizeChange"
							@current-change="currentChange"
							:current-page="currentPage"
							:page-size="pageSize"
							background
							layout="total, sizes, prev, pager, next"
							:total="total"
						></el-pagination>
					</div>
				</template>
			</el-col>
		</el-row>

		<el-dialog title="用户详情" :visible.sync="dialogUser" width="1000px">
			<searchUser ref="searchUser"></searchUser>
		</el-dialog>
	</div>
</template>
<script>
import searchUser from '../organ/components/searchUserById.vue';

export default {
	watch: {
		filterText(val) {
			this.$refs.tree.filter(val);
		},
	},
	components: {
		searchUser,
	},
	data() {
		return {
			defauleArr: [],
			userOrganType: '0',
			searchForm: {
				userLevel: '',
			},
			organRecurFlag: true,
			filterText: '',
			total: 0,
			pageSize: 20,
			currentPage: 1,
			organId: '',
			dialogUser: false,
			tableData: [],
			chackedNode: {},
			data: [],
			props: {
				label: 'organName',
				children: 'children',
			},
		};
	},
	computed: {
		autoH() {
			return window.innerHeight - 380 + 'px';
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		tabsClick() {
			this.total = 0;
			this.pageSize = 20;
			this.currentPage = 1;
			this.getUsers();
		},
		getUsers() {
			if (!this.chackedNode.id) {
				this.$message.error('请先选择部门！');
				return;
			}
			let params = {
				organId: this.chackedNode.id,
				userOrganType: this.userOrganType,
				organRecurFlag: this.organRecurFlag ? 1 : 0,
				userLevel: this.searchForm.userLevel,
				pageNum: this.currentPage,
				pageSize: this.pageSize,
			};
			this.$api
				.formPost('/api/auth/sysuser/doGetOrganAllSysUserList', params)
				.then((res) => {
					if (res.retHead.code == '0000000') {
						this.tableData = res.retBody.list;
						this.total = res.retBody.total;
						this.currentPage = res.retBody.pageNum;
					} else {
						this.$message({
							type: 'error',
							message: res.retHead.message,
						});
					}
				});
		},
		filterNode(value, data) {
			if (!value) return true;
			return data.organName.indexOf(value) !== -1;
		},
		authStatusFilter(row, column, cellValue) {
			if (cellValue == 0) {
				return '否';
			}
			if (cellValue == 1) {
				return '是';
			} else {
				return '';
			}
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
		sizeChange(n) {
			this.pageSize = n;
			this.getUsers();
		},
		currentChange(n) {
			this.currentPage = n;
			this.getUsers();
		},
		handleSeeMore(row) {
			this.dialogUser = true;
			let id = row.id;
			this.userId = id;
			this.$nextTick(() => {
				this.$refs.searchUser.init(this.userId);
			});
		},
		init() {
			this.$api
				.formPost('/api/auth/sysorgan/doGetSysOrganObject', {})
				.then((res) => {
					console.log(res);
					if (res.retHead.code == '0000000') {
						this.data = this.deleteChildren(res.retBody);
						let arr = [];
						this.data[0].children.forEach((item) => {
							arr.push(item.id);
						});
						this.defauleArr = arr;
					}
				});
			this.chackedNode = {};
		},
		handleNodeClick(v) {
			this.tableData = [];
			this.chackedNode = v;
			this.getUsers();
			for (let key in this.form) {
				this.form[key] = this.chackedNode[key];
			}
		},
	},
	created() {},
};
</script>
<style lang="scss" scoped>
.btns {
	margin-bottom: 10px;
	text-align: left;
}
.table {
	display: table;
	width: 100%;
	border: 1px solid #ccc;
	border-bottom: none;
	border-right: none;
	.row {
		display: table-row;
		.item {
			padding: 10px;
			display: table-cell;
			border: 1px solid #ccc;
			border-top: none;
			border-left: none;
			.lable {
				width: 100px;
				display: inline-block;
				font-weight: 700;
			}
			.lable:after {
				content: ':';
			}
			.value {
				display: inline-block;
			}
		}
	}
}
.current {
	font-size: 16px;
	line-height: 32px;
	font-weight: 800;
	color: #008dff;
}
.rightContent {
	background: #fff;
	padding: 10px;
	height: 100%;
	display: flex;
	flex-direction: column;
}
/deep/ .el-tabs__content {
	display: none;
}
.organView {
	height: 100%;
}
</style>
