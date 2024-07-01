<template>
	<div class="routerContent">
		<div class="card df p10">
			<el-button type="primary" @click="editData()">新增</el-button>
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
				<el-form-item label="任务类型" prop="taskType">
					<el-select
						v-model="searchForm.taskType"
						style="width:100%;"
						placeholder="请选择"
					>
						<el-option label="SpringBean" value="1"> </el-option>
						<el-option label="JavaBean" value="2"> </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="执行主体" prop="excSubject">
					<el-select
						v-if="searchForm.taskType === '1'"
						clearable
						v-model="searchForm.excSubject"
						style="width:100%;"
						placeholder="请选择"
					>
						<el-option
							v-for="item in options"
							:key="item"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
					<el-input
						v-else
						v-model="searchForm.excSubject"
						placeholder="请输入"
						clearable
					>
					</el-input>
				</el-form-item>
				<el-form-item label="是否启用" prop="enable">
					<el-select v-model="searchForm.enable" style="width:100%;">
						<el-option :label="'启用'" value="1"></el-option>
						<el-option :label="'不启用'" value="0"></el-option>
					</el-select>
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
	name: 'taskManage',
	components: {
		infoDialog: (resolve) => resolve(require('./components/infoDialog.vue')),
	},

	data() {
		return {
			pager: {
				size: 20,
				total: 0,
				page: 1,
			},
			showForm: false, //高级搜索
			showSelect: false, //表格动态列
			searchForm: {
				taskName: '',
				taskType: '',
				excSubject: '',
				enable: '',
			},
			options: [],
			infoDialogVisible: false,
			infoDialogConfig: {
				title: '添加信息',
			},
			dataList: [], //表格数据
			columnList: [
				{
					type: 'index',
					align: 'center',
				},
				{
					prop: 'taskName',
					label: '任务名称',
					align: 'center',
					width: '200px',
				},
				{
					prop: 'excSubject',
					label: '执行主体',
					align: 'center',
				},
				{
					prop: 'crontab',
					label: 'cron表达式',
					align: 'center',
				},
				{
					prop: 'crontab',
					label: '是否启用',
					align: 'center',
					width: '100px',
					formatter: (row, column, store, index) => {
						if (row.enable === '1') {
							return '启用';
						} else {
							return '不启用';
						}
					},
				},
				{
					prop: 'lastExcTime',
					label: '最近执行时间',
					align: 'center',
					width: '140px',
				},
				{
					prop: '',
					fixed: 'right',
					label: '操作',
					align: 'center',
					width: '120px',
					render: (h, scope) => {
						return h('div', {}, [
							h('el-button', {
								on: {
									click: this.editData.bind(this, scope.row),
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
		this.getOptions();
	},

	methods: {
		getOptions() {
			this.$api
				.formPost('/api/schedule/user/doGetUserImplTaskClass', {})
				.then((res) => {
					this.options = res.retBody;
					this.infoDialogConfig.options = res.retBody;
				});
		},
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
			this.$api.formPost('/api/schedule/doGetList', params).then((res) => {
				if (res.retHead.code == '0000000') {
					load.close();
					this.dataList = res.retBody.list;
					this.pager.total = res.retBody.total;
				}
			});
		},
		editData(row) {
			if (row) {
				this.infoDialogConfig.title = '修改任务';
				this.infoDialogConfig.data = JSON.parse(JSON.stringify(row));
			} else {
				this.infoDialogConfig.title = '添加任务';
				this.infoDialogConfig.data = null;
			}
			this.infoDialogVisible = true;
		},
		delData(row) {
			let params = { id: row.id };
			this.$api.formPost('/api/schedule/doRmById', params).then((res) => {
				this.$message.success('删除成功');
				this.getData();
			});
		},
		reset() {
			this.$refs.searchForm.resetFields();
			this.getData('refresh');
		},
		initData() {
			this.getData('refresh');
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
