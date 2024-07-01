<!--
 * @Author: Junchi Zhao
 * @LastEditors: zjc2684613 1984937455@qq.com
 * @Description: 日志类型
-->
<template>
	<div class="loginUrl routerContent">
		<div class="card df p12" style="padding-top:0px;">
			<el-button type="primary" @click="editData()">新增</el-button>
			<div class="fg1"></div>
			<searchDialog
				v-if="$el"
				v-model="searchForm.apiName"
				placeholder="请输入接口名称"
				@resetForm="reset"
				@searchData="getData('refresh')"
				:el="$parent.$el"
				:showForm.sync="formShow"
			>
				<el-form
					:model="searchForm"
					label-width="auto"
					label-position="top"
					ref="searchForm"
				>
					<el-form-item label="接口名称">
						<el-input
							v-model="searchForm.apiName"
							placeholder="请输入"
							clearable
						>
						</el-input>
					</el-form-item>
					<el-form-item label="接口路径">
						<el-input
							v-model="searchForm.apiUrl"
							placeholder="请输入"
							clearable
						>
						</el-input>
					</el-form-item>
				</el-form>
				<div class="df jce" slot="footer">
					<el-button @click="reset">重置</el-button>
					<el-button type="primary" @click="getData('refresh')">查询</el-button>
				</div>
			</searchDialog>
		</div>

		<div class="fg1 df fdc h14 ml10 mr10">
			<jh-table
				class="fg1 ova"
				height="100%"
				size="small"
				ref="jhTable"
				:columnList="columnList"
				:data="dataList"
				@deleteData="delData"
			>
			</jh-table>
			<div class="tc pt10 pb10">
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
		</div>
		<infoDialog
			@onSuccess="getData"
			:infoDialogConfig="infoDialogConfig"
			v-if="infoDialogVisible"
			:infoDialogVisible.sync="infoDialogVisible"
		/>
	</div>
</template>

<script>
export default {
	name: 'loginUrl',
	components: {
		infoDialog: (resolve) => resolve(require('./infoDialog.vue')),
	},

	data() {
		return {
			showSearch: false,
			formShow: false,
			pageSize: 20,
			currentPage: 0,
			total: 0,
			searchForm: {
				apiUrl: '',
				apiName: '',
			},
			infoDialogVisible: false,
			infoDialogConfig: {
				title: '添加数据源',
			},
			dataList: [],
			columnList: [
				{
					type: 'index',
					label: '序号',
					align: 'center',
					width: 60,
				},
				{ prop: 'apiName', label: '接口名称', align: 'center' },
				{ prop: 'apiUrl', label: '接口路径', align: 'center' },
				{
					prop: '',
					fixed: 'right',
					label: '操作',
					align: 'center',
					width: '120px',
					render: (h, scope) => {
						let that = this;
						return h('div', {}, [
							h('el-button', {
								on: {
									click: that.editData.bind(this, scope.row),
								},
								props: {
									type: 'text',
								},
								domProps: {
									innerHTML: '修改',
								},
							}),
							h('el-button', {
								on: {
									click: scope._self.deleteRow.bind(this, scope.row),
								},
								props: {
									type: 'text',
								},
								domProps: {
									innerHTML: '删除',
								},
							}),
						]);
					},
				},
			],
		};
	},
	mounted() {
		this.getData();
	},

	methods: {
		getData(type) {
			if (type === 'refresh') {
				this.currentPage = 1;
			}
			let params = {
				pageNum: this.currentPage,
				pageSize: this.pageSize,
				...this.searchForm,
			};
			let load = this.$loading({
				target: this.$refs.jhTable.$el,
			});
			this.formShow = false;
			this.$api
				.formPost('/api/auth/conturl/doGetContUrlList', params)
				.then((res) => {
					if (res.retHead.code == '0000000') {
						load.close();
						this.dataList = res.retBody.list;
						this.total = res.retBody.total;
					}
				});
		},
		editData(row) {
			if (row) {
				this.infoDialogConfig.title = '修改接口信息';
				this.infoDialogConfig.data = JSON.parse(JSON.stringify(row));
			} else {
				this.infoDialogConfig.title = '添加接口信息';
				this.infoDialogConfig.data = null;
			}
			this.infoDialogVisible = true;
		},
		delData(row) {
			let params = { id: row.id };
			this.$api
				.formPost('/api/auth/conturl/doRmContUrlById', params)
				.then((res) => {
					this.$message.success('删除成功');
					this.getData();
				});
		},
		reset() {
			this.$refs.searchForm.resetFields();
			for (const key in this.searchForm) {
				this.searchForm[key] = '';
			}
			this.currentPage = 1;
			this.getData('refresh');
		},
		sizeChange(n) {
			this.pageSize = n;
			this.getData();
		},
		currentChange(n) {
			this.currentPage = n;
			this.getData();
		},
		initData() {
			this.currentPage = 1;
			this.getData();
		},
	},
};
</script>
<style lang="scss" scoped>
.loginUrl {
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}
</style>
