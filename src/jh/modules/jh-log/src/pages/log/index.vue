<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 日志类型
-->
<template>
	<div class="log routerContent">
		<div class="card df p12">
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
				<el-form-item label="开始时间">
					<el-date-picker
						v-model="searchForm.queryBeginTime"
						type="datetime"
						style="width:100%;"
						value-format="yyyy-MM-dd HH:mm:ss"
						placeholder="选择日期时间"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="结束时间">
					<el-date-picker
						v-model="searchForm.queryEndTime"
						type="datetime"
						style="width:100%;"
						value-format="yyyy-MM-dd HH:mm:ss"
						placeholder="选择日期时间"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="模块名称">
					<el-select
						v-model="searchForm.moduleId"
						style="width:100%;"
						placeholder="请选择"
						@change="moduleChange"
						clearable
					>
						<el-option
							v-for="item in moduleOptions"
							:key="item.id"
							:label="item.moduleName"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="类型名称">
					<el-select
						v-model="searchForm.logTypeId"
						style="width:100%;"
						placeholder="请选择"
					>
						<el-option
							v-for="item in typeOptions"
							:key="item.id"
							:label="item.typeName"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="操作名称">
					<el-select
						v-model="searchForm.operateTypeId"
						style="width:100%;"
						placeholder="请选择"
					>
						<el-option
							v-for="item in operateTypeOptions"
							:key="item.id"
							:label="item.operateName"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态">
					<el-select
						v-model="searchForm.status"
						style="width:100%;"
						placeholder="请选择"
					>
						<el-option label="开始执行" value="0"></el-option>
						<el-option label="执行成功" value="1"></el-option>
						<el-option label="执行失败" value="2"></el-option>
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
		<BaseDialog
			:title="logDialogConfig.title"
			v-if="logDialogVisible"
			:visible.sync="logDialogVisible"
			top="15vh"
			append-to-body
			width="1000px"
		>
			<template slot="body">
				<el-form
					:model="form"
					disabled
					ref="form"
					label-width="auto"
					label-position="right"
				>
					<el-row>
						<el-col :span="8">
							<el-form-item label="日志名称">
								<el-input v-model="logDialogConfig.data.logName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="操作人">
								<el-input v-model="logDialogConfig.data.userName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="创建时间">
								<el-input v-model="logDialogConfig.data.createTime"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="模块名称">
								<el-input v-model="logDialogConfig.data.moduleName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="类型名称">
								<el-input v-model="logDialogConfig.data.logTypeName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="操作名称">
								<el-input
									v-model="logDialogConfig.data.operateTypeName"
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="操作内容">
								<el-input
									type="textarea"
									autosize
									v-model="logDialogConfig.data.content"
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="错误信息">
								<el-input
									type="textarea"
									autosize
									v-model="logDialogConfig.data.errMessage"
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<!-- <el-collapse v-model="activeNames">
                    <el-collapse-item title="请求信息" name="1"> -->
					<el-row>
						<el-col :span="8">
							<el-form-item label="IP地址">
								<el-input v-model="logDialogConfig.data.reqIp"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="请求URL">
								<el-input v-model="logDialogConfig.data.reqUrl"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="请求时长">
								<el-input v-model="logDialogConfig.data.reqDuration"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="请求方法">
								<el-input v-model="logDialogConfig.data.reqMethod"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="浏览器">
								<el-input v-model="logDialogConfig.data.reqBrowser"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="类名">
								<el-input v-model="logDialogConfig.data.className"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="请求参数">
								<el-input
									type="textarea"
									autosize
									v-model="logDialogConfig.data.reqParams"
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<!-- </el-collapse-item>
                </el-collapse> -->
					<!-- <el-row>
                    <el-col :span="8">
                        <el-form-item label="变更前内容">
                            <el-input v-model="logDialogConfig.data.beforeChange"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="变更后内容">
                            <el-input v-model="logDialogConfig.data.afterChange"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="表名称">
                            <el-input v-model="logDialogConfig.data.tabName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> -->
				</el-form>
			</template>
			<span slot="footer" class="dialog-footer">
				<el-button @click="logDialogVisible = false" size="small"
					>关 闭</el-button
				>
			</span>
		</BaseDialog>
	</div>
</template>

<script>
export default {
	name: 'log',
	components: {},

	data() {
		return {
			activeNames: '',
			formShow: false,
			pageSize: 20,
			currentPage: 0,
			total: 0,
			searchForm: {
				moduleId: '',
				logTypeId: '',
				operateTypeId: '',
				logName: '',
				status: '',
				queryBeginTime: '',
				queryEndTime: '',
			},
			dataList: [],
			columnList: [
				{
					type: 'index',
					align: 'center',
					fixed: 'left',
					width: '50px',
				},
				{
					prop: 'logName',
					label: '日志名称',
					align: 'center',
					showOverflowTooltip: true,
					fixed: 'left',
					width: '120px',
				},
				{
					prop: 'moduleName',
					label: '模块名称',
					align: 'center',
					showOverflowTooltip: true,
					fixed: 'left',
					width: '100px',
				},
				{
					prop: 'logTypeName',
					label: '类型名称',
					align: 'center',
					showOverflowTooltip: true,
					fixed: 'left',
					width: '100px',
				},
				{
					prop: 'operateTypeName',
					label: '操作名称',
					align: 'center',
					showOverflowTooltip: true,
					fixed: 'left',
					width: '100px',
				},
				{
					prop: 'content',
					label: '内容',
					align: 'center',
					showOverflowTooltip: true,
				},
				{
					prop: 'userName',
					label: '操作人',
					align: 'center',
					showOverflowTooltip: true,
					width: '90px',
				},
				{
					prop: 'reqIp',
					label: 'IP地址',
					align: 'center',
					showOverflowTooltip: true,
					width: '100px',
				},
				{
					prop: 'createTime',
					label: '访问时间',
					align: 'center',
					showOverflowTooltip: true,
					width: '170px',
				},
				{
					prop: 'status',
					label: '状态',
					align: 'center',
					showOverflowTooltip: true,
					width: '100px',
					formatter: (row) => {
						if (row.status == '1') {
							return '执行成功';
						} else if (row.status == '2') {
							return '执行失败';
						} else if (row.status == '0') {
							return '开始执行';
						}
					},
				},
				{
					prop: '',
					fixed: 'right',
					label: '操作',
					align: 'center',
					width: '60px',
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
									innerHTML: '查看',
								},
							}),
						]);
					},
				},
			],
			logDialogConfig: {
				title: '日志详细信息',
			},
			logDialogVisible: false,
			form: {},
			typeOptions: [],
			moduleOptions: [],
			operateTypeOptions: [],
		};
	},
	mounted() {
		this.getData();
	},
	created() {
		this.getOptions();
	},
	methods: {
		moduleChange(val) {
			this.searchForm.logTypeId = '';
			this.$api
				.formPost('/api/log/type/doGetSelectList', { moduleId: val ? val : '' })
				.then((res) => {
					this.typeOptions = res.retBody;
				});
		},
		getOptions() {
			this.$api.formPost('/api/log/module/doGetSelectList', {}).then((res) => {
				this.moduleOptions = res.retBody;
			});
			this.$api
				.formPost('/api/log/type/doGetSelectList', {
					moduleId: this.searchForm.moduleId ? this.searchForm.moduleId : '',
				})
				.then((res) => {
					this.typeOptions = res.retBody;
				});
			this.$api
				.formPost('/api/log/operatetype/doGetSelectList', {})
				.then((res) => {
					this.operateTypeOptions = res.retBody;
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
			if (
				(params.queryBeginTime && !params.queryEndTime) ||
				(!params.queryBeginTime && params.queryEndTime)
			) {
				this.$message.warning('请完善起止时间');
				return;
			}
			if (
				this.searchForm.queryBeginTime &&
				this.searchForm.queryEndTime &&
				new Date(this.searchForm.queryBeginTime).getTime() >
					new Date(this.searchForm.queryEndTime).getTime()
			) {
				this.$message.warning('结束时间不能大于开始时间');
				return;
			}
			let load = this.$loading({
				target: this.$refs.jhTable.$el,
			});
			this.formShow = false;
			this.$api
				.formPost('/api/log/collection/doGetList', params)
				.then((res) => {
					if (res.retHead.code == '0000000') {
						load.close();
						this.dataList = res.retBody.list;
						this.total = res.retBody.total;
					}
				});
		},
		editData(row) {
			this.logDialogConfig.data = JSON.parse(JSON.stringify(row));
			this.logDialogVisible = true;
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
.log {
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}
</style>
