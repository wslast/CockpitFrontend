<!-- 桌面组件管理 -->
<template>
	<div class="bizLine routerContent">
		<div class="card df p12">
			<el-button type="primary" @click="editItem()">新增</el-button>
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
				label-width="70px"
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
						@change="resetUrl"
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
		<!-- <div class="card tr mb2">
      <el-button
        icon="el-icon-search"
        @click=""
        
        type="primary"
        circle
      ></el-button>
    </div> -->

		
		<div class="tableContent ml10 mr10">
			<el-table
				:data="tableData"
				ref="elTable"
				border
				height="100%"
				style="width: 100%"
			>
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
				<el-table-column align="center" fixed="right" label="操作" width="120">
					<template slot-scope="scope">
						<div>
							<el-button type="text" @click="editItem(scope.row)"
								>修改</el-button
							><el-button type="text" @click="deleteItem(scope.row)"
								>删除</el-button
							>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-pagination
			class="pt10 pb10 tc"
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
		<el-dialog :title="title" width="600px" :visible.sync="dialogFormVisible">
			<el-form :model="form" :rules="rules" ref="form" label-width="auto">
				<el-form-item label="组件类型" prop="compType">
					<el-select
						v-model="form.compType"
						placeholder="请选择"
						style="width: 100%"
						@change="resetUrl"
					>
						<el-option label="组件" value="1"></el-option>
						<el-option label="路由" value="2"></el-option>
						<el-option label="外部链接" value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="组件名称" prop="compName">
					<el-input v-model="form.compName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="组件地址" prop="compUrl">
					<el-input v-model="form.compUrl" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input v-model="form.remark" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="组件状态" prop="compStatus">
					<el-select
						v-model="form.compStatus"
						placeholder="请选择"
						style="width: 100%"
					>
						<el-option label="有效" value="1"></el-option>
						<el-option label="无效" value="0"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancle()">取 消</el-button>
				<el-button type="primary" @click="saveItem()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'deskComp',
	data() {
		return {
			dialogFormVisible: false,
			form: {
				id: '',
				refId: '',
				compName: '',
				compType: '',
				compUrl: '',
				createName: '',
				remark: '', //固定参数
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
			rules: {
				compType: [{ required: true, message: '请输入', trigger: 'submit' }],
				compName: [{ required: true, message: '请输入', trigger: 'submit' }],
				compUrl: [{ required: true, message: '请输入', trigger: 'submit' }],
				compStatus: [{ required: true, message: '请输入', trigger: 'submit' }],
			},
			list: [],
			compTypeList: [
				{ key: 1, value: '组件' },
				{ key: 2, value: '路由' },
				{ key: 3, value: '外链' },
			],
			compStatusList: [
				{ key: 1, value: '启用' },
				{ key: 2, value: '停用' },
			],
		};
	},

	computed: {
		comList: function() {
			return this.$store.state.settings.regsiterComponentList;
		},
	},
	watch: {
		dialogFormVisible: function(val) {
			if (!val) {
				for (const key in this.form) {
					this.form[key] = '';
				}
			}
		},
	},
	mounted() {
		this.init();
	},

	methods: {
		resetUrl() {
			this.form.compUrl = '';
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
				target: this.$refs.elTable.$el,
			});
			this.formShow = false;
			this.$api
				.formPost('/api/basfun/desk/deskComp/doGetList', param)
				.then((res) => {
					load.close();
					this.tableData = res.retBody.list;
					this.pager.total = res.retBody.total;
				});
		},
		editItem(row) {
			if (row) {
				this.title = '修改桌面组件';
				this.form = JSON.parse(JSON.stringify(row));
				this.dialogFormVisible = true;
			} else {
				this.title = '新增桌面组件';
				this.form = {
					id: '',
					refId: '',
					compName: '',
					compType: '',
					compUrl: '',
					createName: '',
					remark: '', //固定参数
					compStatus: '',
				};
				this.dialogFormVisible = true;
			}
		},
		deleteItem(row) {
			this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				this.$api
					.formPost('/api/basfun/desk/deskComp/doRmById', { id: row.id })
					.then((res) => {
						this.$message.success('删除成功');
						this.init('refresh');
					});
			});
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.pager.size = val;
			this.init();
		},

		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.pager.page = val;
			this.init();
		},
		saveItem() {
			this.$refs['form'].validate((valid) => {
				if (!valid) {
					return;
				}
				if (!this.form.id) {
					this.$api
						.formPost('/api/basfun/desk/deskComp/doSave', this.form)
						.then((res) => {
							if (res.retHead.code === '0000000') {
								this.init();
								this.$message.success('操作成功');
							}
							this.dialogFormVisible = false;
						});
				} else {
					this.$api
						.formPost('/api/basfun/desk/deskComp/doModById', this.form)
						.then((res) => {
							if (res.retHead.code === '0000000') {
								this.init();
								this.$message.success('操作成功');
							}
							this.dialogFormVisible = false;
						});
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
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
	height: 100%;
	display: flex;
	flex-direction: column;
	.tableContent {
		flex-grow: 1;
		overflow: auto;
	}
}
</style>
