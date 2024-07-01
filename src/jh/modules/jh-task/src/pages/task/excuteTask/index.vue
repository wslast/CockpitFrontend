<template>
	<div class="routerContent">
		<div class="card df p10">
			<div class="fg1"></div>
			<el-input
				class="topSearch"
				placeholder="请输入"
				clearable
				v-model="searchForm.taskName"
				style="width:300px;height:30px;"
			>
				<el-button
					slot="append"
					icon="el-icon-search"
					@click="initData"
				></el-button>
			</el-input>
			<el-button
				icon="el-icon-s-operation"
				class="ml10"
				@click="showForm = !showForm"
				style="font-size:14px;"
				type="text"
				>高级搜索</el-button
			>
		</div>
		<pageDialog class="card" v-model="showForm">
			<el-form
				:model="searchForm"
				label-width="auto"
				label-position="top"
				ref="searchForm"
			>
				<el-form-item label="任务名" prop="taskName">
					<el-input
						v-model="searchForm.taskName"
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
		</pageDialog>
		<div class="fg1 df fdc h14 ml10 mr10">
			<jh-table
				class="fg1 ova"
				height="100%"
				size="small"
				row-key="id"
				ref="jhTable"
				:columnList="columnList"
				:data="dataList"
				@deleteData="delData"
			/>
			<div class="tc pt10 pb10">
				<jh-pager :pager.sync="pager" @getData="getData" />
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'excuteTask',
	data() {
		return {
			pager: {
				size: 20,
				total: 0,
				page: 1,
			},
			showForm: false,
			searchForm: {
				taskName: '',
				taskType: '',
				excSubject: '',
				enable: '',
			},
			dataList: [], //表格数据
			columnList: [
				{
					type: 'index',
					align: 'center',
				},
				{
					prop: 'taskName',
					label: '任务名',
					align: 'center',
				},
				{
					prop: 'createTime',
					label: '任务开始时间',
					align: 'center',
				},
				{
					prop: '',
					fixed: 'right',
					label: '操作',
					align: 'center',
					width: '100px',
					render: (h, scope) => {
						return h('div', {}, [
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
			this.showForm = false;
			this.$api
				.formPost('/api/schedule/excute/doGetList', params)
				.then((res) => {
					if (res.retHead.code == '0000000') {
						load.close();
						this.dataList = res.retBody.list;
						this.pager.total = res.retBody.total;
					}
				});
		},
		reset() {
			this.$refs.searchForm.resetFields();
			this.getData('refresh');
		},
		initData() {
			this.getData('refresh');
		},
		delData(row) {
			let params = { id: row.id };
			this.$api
				.formPost('/api/schedule/excute/doRmById', params)
				.then((res) => {
					this.$message.success('删除成功');
					this.getData();
				});
		},
	},
};
</script>
<style lang="scss" scoped>
.simpleTable {
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}
</style>
