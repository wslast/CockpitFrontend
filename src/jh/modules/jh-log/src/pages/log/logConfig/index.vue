<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 日志类型
-->
<template>
	<div class="logType routerContent">
		<div class="card df p12">
			<el-button type="primary" @click="editData()">新增</el-button>
			<div class="fg1"></div>
			<searchDialog 
				v-model="searchForm.logName"
				placeholder="请输入日志名称"
				@resetForm="reset"
				@searchData="getData('refresh')"
				:showForm.sync="formShow"
			>
			<el-form
				:model="searchForm"
				label-width="auto"
				label-position="top"
				ref="searchForm"
			>
				<el-form-item label="日志名称">
					<el-input v-model="searchForm.logName" placeholder="请输入" clearable>
					</el-input>
				</el-form-item>
				<el-form-item label="模块名称">
					<el-select
						v-model="searchForm.moduleId"
						style="width:100%;"
						placeholder="请选择"
					>
						<el-option
							v-for="item in options"
							:key="item.id"
							:label="item.moduleName"
							:value="item.id"
						>
						</el-option>
					</el-select>
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
		<configDialog
			@onSuccess="getData"
			:configDialogConfig="configDialogConfig"
			v-if="configDialogVisible"
			:configDialogVisible.sync="configDialogVisible"
		/>
	</div>
</template>

<script>
export default {
	name: 'logType',
	components: {
		configDialog: (resolve) => resolve(require('./components/configDialog')),
	},

	data() {
		return {
			pageSize: 20,
			currentPage: 0,
			total: 0,
			formShow: false,
			searchForm: {
				moduleId: '',
				logName: '',
			},
			configDialogVisible: false,
			configDialogConfig: {
				title: '添加数据源',
			},
			dataList: [],
			columnList: [
				{
					type: 'index',
					align: 'center',
				},
				{ prop: 'logName', label: '日志名称', align: 'center' },
				{
					prop: 'logTmpl',
					label: '日志模板',
					align: 'center',
					showOverflowTooltip: true,
				},
				{ prop: 'moduleName', label: '模块名称', align: 'center' },
				{ prop: 'typName', label: '类型名称', align: 'center' },
				{ prop: 'operateTypeName', label: '操作名称', align: 'center' },
				{
					prop: '',
					label: '当前状态',
					align: 'center',
					render: (h, scope) => {
						let that = this;
						return h(
							'el-switch',
							{
								props: {
									'active-text': '开',
									'inactive-text': '关',
									size: 'small',
									value: scope.row.enable === '1', //控制开关的打开或关闭状态，官网文档属性是value
								},
								on: {
									change: (value) => {
										that.controlLog(scope.row);
									},
								},
							},
							[]
						);
					},
				},
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
								class: {
									test1: true,
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
			options: [],
		};
	},
	mounted() {
		this.getData();
	},
	created() {
		this.getModuleOption();
	},

	methods: {
		getModuleOption() {
			this.$api.formPost('/api/log/module/doGetSelectList', {}).then((res) => {
				this.options = res.retBody;
			});
		},
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
			this.$api.formPost('/api/log/config/doGetList', params).then((res) => {
				if (res.retHead.code == '0000000') {
					load.close();
					this.dataList = res.retBody.list;
					this.total = res.retBody.total;
				}
			});
		},
		editData(row) {
			if (row) {
				this.configDialogConfig.title = '修改日志配置';
				this.configDialogConfig.data = JSON.parse(JSON.stringify(row));
			} else {
				this.configDialogConfig.title = '添加日志配置';
				this.configDialogConfig.data = null;
			}
			this.configDialogVisible = true;
		},
		delData(row) {
			let params = { id: row.id };
			this.$api.formPost('/api/log/config/doRmById', params).then((res) => {
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
		controlLog(row) {
			let params = JSON.parse(JSON.stringify(row));
			params.enable = params.enable === '1' ? '0' : '1';
			this.$api.formPost('/api/log/config/doModById', params).then((res) => {
				this.$message.success('操作成功');
				this.getData();
			});
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
.logType {
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}
</style>
