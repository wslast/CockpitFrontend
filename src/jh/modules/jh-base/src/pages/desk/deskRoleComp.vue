<!-- 桌面组件管理 -->
<template>
	<div class="bizLine routerContent">
		<div class="card df p12">
			<el-button type="primary" @click="saveItem()">保存</el-button>
			<el-button type="primary" @click="goBack()">返回</el-button>
			<div class="fg1"></div>
			<searchDialog 
				v-model="searchForm.compName"
				placeholder="请输入组件名称"
				@resetForm="resetForm('searchForm')"
				@searchData="init"
				:showForm.sync="formShow"
			>
			<el-form
				:model="searchForm"
				label-width="120px"
				label-position="top"
				ref="searchForm"
			>
				<el-form-item label="组件名称" prop="compName">
					<el-input
						v-model="searchForm.compName"
						placeholder="请输入"
						clearable
					>
					</el-input>
				</el-form-item>
				<el-form-item label="组件状态" prop="compStatus">
					<el-select
						v-model="searchForm.compStatus"
						placeholder="请选择"
						style="width: 100%"
					>
						<el-option label="有效" value="1"></el-option>
						<el-option label="无效" value="0"></el-option>
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
				border
				height="100%"
				style="width: 100%"
				ref="multipleTable"
				@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column type="index" label="序号" align="center" width="60">
				</el-table-column>
				<el-table-column
					align="center"
					prop="compName"
					show-overflow-tooltip
					label="组件名称"
				>
				</el-table-column>
				<el-table-column align="center" prop="compType" label="组件类型">
					<template slot-scope="scope">
						<div v-for="item in compTypeList" :key="item.key">
							<span v-if="scope.row.compType == item.key">{{
								item.value
							}}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column align="center" prop="compUrl" label="组件地址">
				</el-table-column>
				<el-table-column align="center" prop="createName" label="创建人">
				</el-table-column>
				<el-table-column align="center" prop="remark" label="备注">
				</el-table-column>
				<el-table-column align="center" prop="compStatus" label="组件状态">
					<template slot-scope="scope">
						<div v-for="item in compStatusList" :key="item.key">
							<span v-if="scope.row.compStatus == item.key">{{
								item.value
							}}</span>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="card" style="text-align:center">
			<el-pagination
				v-show="tableData.length > 0"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="pager.page"
				background
				:page-size="pager.size"
				layout="total, sizes, prev, pager, next"
				:total="pager.total"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script>
export default {
	name: 'deskRoleComp',
	data() {
		return {
			form: {
				id: '',
				refId: '',
				compName: '',
				compType: '',
				compUrl: '',
				createName: '',
				remark: '1', //固定参数
				compStatus: '',
			},
			title: '',
			tableData: [],
			formShow: false,
			searchForm: {
				compName: '',
				compStatus: '',
			},
			pager: {
				size: 20,
				page: 1,
				total: 1,
			},
			rules: {},
			compTypeList: [
				{ key: 1, value: '组件' },
				{ key: 2, value: '路由' },
				{ key: 3, value: '外链' },
			],
			compStatusList: [
				{ key: 1, value: '启用' },
				{ key: 2, value: '停用' },
			],
			multipleSelection: [],
			defaultData: [],
		};
	},

	computed: {},

	mounted() {
		this.init();
	},

	methods: {
		goBack() {
			let path = '/sysfun/desk/deskRole';
			this.$router.push({
				path: path,
				query: {},
			});
		},
		saveItem() {
			let ids = '';
			if (this.multipleSelection) {
				this.multipleSelection.forEach((item) => {
					ids += item.id + ',';
				});
			}
			this.$api
				.formPost('/api/basfun/desk/deskRoleComp/doSaveByIds', {
					roleId: this.$route.query.roleId,
					ids: ids,
				})
				.then((res) => {
					this.defaultData = res.retBody.list;
					this.$message.success('操作成功');
				});
		},
		getRoleCompList() {
			this.$api
				.formPost('/api/basfun/desk/deskRoleComp/doGetList', {
					roleId: this.$route.query.roleId,
				})
				.then((res) => {
					this.defaultData = res.retBody.list;
					this.renderCheck();
				});
		},
		renderCheck() {
			this.defaultData.forEach((item) => {
				for (let i = 0; i < this.tableData.length; i++) {
					if (this.tableData[i].id == item.compId) {
						this.$refs.multipleTable.toggleRowSelection(
							this.tableData[i],
							true
						);
					}
				}
			});
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		getEnumList() {
			this.$api
				.formPost('/api/basfun/syscode/code/doGetByCodeList', {
					codeList: 'compType,compStatus',
				})
				.then((res) => {
					this.compTypeList = res.compType;
					this.compStatusList = res.compStatus;
				});
		},
		cancle() {
			this.dialogFormVisible = false;
		},
		init(type) {
			if (type == 'refresh') {
				this.pager.page = 1;
			}
			let param = {
				pageSize: this.pager.size,
				pageNum: this.pager.page,
			};
			if (this.searchForm.compName) {
				param.compName = this.searchForm.compName;
			}
			if (this.searchForm.compStatus) {
				param.compStatus = this.searchForm.compStatus;
			}
			let load = this.$loading({
				target: this.$refs.multipleTable.$el,
			});
			this.formShow = false;
			this.$api
				.formPost('/api/basfun/desk/deskComp/doGetList', param)
				.then((res) => {
					load.close();
					this.tableData = res.retBody.list;
					this.pager.total = res.retBody.total;
					this.getRoleCompList();
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
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.pager.page = 1;
			this.init();
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
	.tableContent {
		flex-grow: 1;
		overflow: auto;
	}
}
</style>
