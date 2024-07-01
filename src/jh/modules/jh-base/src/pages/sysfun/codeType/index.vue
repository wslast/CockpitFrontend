<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 编码类型管理
-->
<template>
	<div class="codeTypeMgt routerContent">
		<div class="card df p12">
			<el-button type="primary" @click="editData()">增 加</el-button>
			<div class="fg1"></div>
			<searchDialog 
		v-model="searchForm.name"
				placeholder="请输入类型名称"
				@resetForm="reset"
				@searchData="getData('refresh')"
				:showForm.sync="formShow"
			>
			<el-form
				:model="searchForm"
				label-width="80px"
				label-position="top"
				ref="searchForm"
			>
				<el-form-item label="编码名称">
					<el-input
						v-model="searchForm.name"
						placeholder="请输入"
						clearable
					></el-input>
				</el-form-item>
			</el-form>
			<div class="df jce" slot="footer">
				<el-button class="ml20" @click="reset">重置</el-button>
				<el-button type="primary" class="ml20" @click="getData('refresh')"
					>查询</el-button
				>
			</div>
		</searchDialog>
		</div>
		
		<jh-table
			class="fg1 ova ml10 mr10"
			height="100%"
			border
			ref="jhTable"
			:columnList="columnList"
			@deleteData="delData"
			:data="dataList"
		>
		</jh-table>
		<div class="card" style="text-align:center">
			<el-pagination
				v-show="delData.length > 0"
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
		<infoDialog
			@onSuccess="getData('refresh')"
			:codeTypeInfoDialogConfig="codeTypeInfoDialogConfig"
			v-if="codeTypeInfoDialogVisible"
			:codeTypeInfoDialogVisible.sync="codeTypeInfoDialogVisible"
		/>
	</div>
</template>

<script>
export default {
	name: 'codeTypeMgt',
	components: {
		infoDialog: (resolve) => resolve(require('./components/infoDialog')),
	},
	data() {
		return {
			dataList: [],
			columnList: [
				{
					type: 'index',
					label: '序号',
					width: '60px',
					align: 'center',
				},
				{
					prop: 'name',
					label: '类型名称',
					align: 'center',
					showOverflowTooltip: true,
				},
				{
					prop: 'code',
					label: '类型代码',
					align: 'center',
					showOverflowTooltip: true,
				},
				{
					prop: 'status',
					label: '状态',
					align: 'center',
					formatter: (row) => {
						if (row.status == '1') {
							return '启用';
						} else if (row.status == '0') {
							return '禁用';
						} else {
							return '';
						}
					},
				},
				{
					prop: 'remark',
					label: '备注',
					align: 'center',
					showOverflowTooltip: true,
				},
				{
					prop: '',
					fixed: 'right',
					label: '操作',
					align: 'center',
					width: '200px',
					render: (h, scope) => {
						let that = this;
						return h('div', {}, [
							h(
								'el-button',
								{
									on: {
										click: that.editData.bind(this, scope.row),
									},
									props: {
										size: 'medium',
										type: 'text',
									},
								},
								[
									h('span', {
										domProps: {
											innerHTML: '修改',
										},
									}),
								]
							),
							h(
								'el-button',
								{
									on: {
										click: scope._self.deleteRow.bind(this, scope.row),
									},
									props: {
										size: 'medium',
										type: 'text',
									},
								},
								[
									h('span', {
										domProps: {
											innerHTML: '删除',
										},
									}),
								]
							),
						]);
					},
				},
			],
			codeTypeInfoDialogVisible: false,
			codeTypeInfoDialogConfig: {
				title: '添加证书',
			},
			formShow: false,
			pager: {
				page: 1,
				size: 10,
				total: 0,
			},
			searchForm: {
				name: '',
			},
		};
	},
	mounted() {
		this.getData();
	},

	methods: {
		editData(row) {
			if (row) {
				this.codeTypeInfoDialogConfig.title = '修改编码类型';
				this.codeTypeInfoDialogConfig.data = JSON.parse(JSON.stringify(row));
			} else {
				this.codeTypeInfoDialogConfig.title = '添加编码类型';
				this.codeTypeInfoDialogConfig.data = null;
			}
			this.codeTypeInfoDialogVisible = true;
		},
		delData(row) {
			let params = { id: row.id };
			this.$api
				.formPost('/api/basfun/syscode/type/doRmById', params)
				.then((res) => {
					this.$message.success('删除成功');
					this.getData();
				});
		},
		reset() {
			for (const key in this.searchForm) {
				this.searchForm[key] = '';
			}
			this.getData('refresh');
		},
		getData(type) {
			if (type == 'refresh') {
				this.pager.page = 1;
			}
			let params = {
				pageNum: this.pager.page,
				pageSize: this.pager.size,
				...this.searchForm,
			};
			let load = this.$loading({
				target: this.$refs.jhTable.$el,
			});
			this.formShow = false;
			this.$api
				.formPost('/api/basfun/syscode/type/doGetList', params)
				.then((res) => {
					load.close();
					this.dataList = res.retBody.list;
					this.pager.total = res.retBody.total;
				});
		},
		initData() {
			this.pager.page = 1;
			this.getData();
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.pager.size = val;
			this.getData();
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.pager.page = val;
			this.getData();
		},
	},
};
</script>
<style lang="scss" scoped>
.codeTypeMgt {
	.searchToolBox {
		display: flex;
	}
}
</style>
