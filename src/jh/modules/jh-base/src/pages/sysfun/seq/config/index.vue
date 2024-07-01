<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 序列格式管理
-->
<template>
	<div class="seqConfig routerContent">
		<div class="card df p12">
			<el-button type="primary" @click="editData()">增 加</el-button>
			<div class="fg1"></div>
			<searchDialog 
		v-model="searchForm.codeType"
				placeholder="请输入序列编码"
				@resetForm="reset"
				@searchData="getData('refresh')"
				:showForm.sync="formShow"
			>
			<el-form
				:model="searchForm"
				label-width="70px"
				label-position="top"
				ref="searchForm"
			>
				<el-form-item label="序列编码">
					<el-input
						v-model="searchForm.codeType"
						placeholder="请输入"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="初始值">
					<el-input
						v-model="searchForm.initDefaultValue"
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
			:seqConfigConfig="seqConfigConfig"
			v-if="seqConfigVisible"
			:seqConfigVisible.sync="seqConfigVisible"
		/>
	</div>
</template>

<script>
export default {
	name: 'codeTypeMgt',
	components: {
		infoDialog: (resolve) => resolve(require('./components/infoDialog.vue')),
	},
	data() {
		return {
			dataList: [],
			columnList: [
				{
					type: 'index',
					align: 'center',
					label: '序号',
					width: '60px',
				},
				{
					prop: 'codeType',
					label: '序列编码',
					align: 'center',
					showOverflowTooltip: true,
				},
				{
					prop: 'codeFormate',
					label: '格式化方法',
					align: 'center',
					showOverflowTooltip: true,
				},
				{
					prop: 'initDefaultValue',
					label: '初始值',
					align: 'center',
				},
				{
					prop: '',
					fixed: 'right',
					label: '操作',
					align: 'center',
					width: '150px',
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
			seqConfigVisible: false,
			seqConfigConfig: {
				title: '添加证书',
			},
			formShow: false,
			pager: {
				page: 1,
				size: 10,
				total: 0,
			},
			searchForm: {
				codeType: '',
				initDefaultValue: '',
			},
		};
	},
	mounted() {
		this.getData();
	},

	methods: {
		editData(row) {
			if (row) {
				this.seqConfigConfig.title = '修改序列格式';
				this.seqConfigConfig.data = JSON.parse(JSON.stringify(row));
			} else {
				this.seqConfigConfig.title = '添加序列格式';
				this.seqConfigConfig.data = null;
			}
			this.seqConfigVisible = true;
		},
		delData(row) {
			let params = { id: row.id };
			this.$api
				.formPost('/api/core/seq/config/doRmById', params)
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
				.formPost('/api/core/seq/config/doGetList', params)
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
.seqConfig {
	.searchToolBox {
		display: flex;
	}
}
</style>
