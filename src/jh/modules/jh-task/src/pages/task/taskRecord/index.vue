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
				<el-form-item label="任务类型" prop="taskType">
					<el-select
						v-model="searchForm.taskType"
						style="width:100%;"
						placeholder="请选择"
					>
						<el-option label="java" value="java"> </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="执行主体" prop="excSubject">
					<el-select
						v-model="searchForm.excSubject"
						style="width:100%;"
						placeholder="请选择"
					>
						<el-option
							label="org.springframework.boot.autoconfigure.SpringBootApplication"
							value="org.springframework.boot.autoconfigure.SpringBootApplication"
						>
						</el-option>
					</el-select>
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
			showForm: false,
			searchForm: {
				taskName: '',
				taskType: '',
				excSubject: '',
				enable: '',
			},
			infoDialogVisible: false,
			infoDialogConfig: {
				title: '查看信息',
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
					prop: 'createTime',
					label: '任务开始时间',
					align: 'center',
					width: '140px',
				},
				{
					prop: 'overTime',
					label: '任务结束时间',
					align: 'center',
					width: '140px',
				},
				{
					prop: 'statusDesc',
					label: '执行状态',
					align: 'center',
					width: '180px',
				},
				{
					prop: 'duration',
					label: '执行时长',
					align: 'center',
					width: '90px',
				},
				{
					prop: 'errMessage',
					label: '错误信息',
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
									click: this.editData.bind(this, scope.row),
								},
								props: {
									type: 'text',
								},
								domProps: {
									innerHTML: '查看',
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
				.formPost('/api/schedule/excute/history/doGetList', params)
				.then((res) => {
					if (res.retHead.code == '0000000') {
						load.close();
						this.dataList = res.retBody.list;
						this.pager.total = res.retBody.total;
					}
				});
		},
		editData(row) {
			if (row) {
				this.infoDialogConfig.title = '查看信息';
				this.infoDialogConfig.data = JSON.parse(JSON.stringify(row));
			} else {
				this.infoDialogConfig.title = '查看信息';
				this.infoDialogConfig.data = null;
			}
			this.infoDialogVisible = true;
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
