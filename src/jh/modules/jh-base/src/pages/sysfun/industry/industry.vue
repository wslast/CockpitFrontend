<template>
	<div class="industry">
		<div class="card">
			<el-button type="primary" icon="el-icon-plus" @click="showDialog"
				>添加</el-button
			>
		</div>
		<div class="content">
			<el-table
				border
				v-if="showData"
				height="100%"
				ref="tableTreeRef"
				:data="tableData"
				row-key="code"
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
				lazy
				:load="load"
			>
				<el-table-column
					prop="code"
					label="行业编码"
					min-width="130"
					align="left"
				>
				</el-table-column>
				<el-table-column prop="name" label="行业名称" min-width="400">
				</el-table-column>

				<el-table-column label="操作" fixed="right" align="center" width="240">
					<template slot-scope="scope">
						<el-button type="text" @click="edit(scope.row, scope.$index)"
							>修改</el-button
						><el-button
							type="text"
							:disabled="scope.row.isHasChildren"
							@click="deleteIndustry(scope.row, scope.$index)"
							>删除</el-button
						><el-button
							type="text"
							@click="addChildren(scope.row, scope.$index)"
							>添加下级行业</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog
			:title="title"
			:visible.sync="dialogFormVisible"
			:before-close="addCancle"
			width="600px"
		>
			<el-form :model="form" ref="addForm" :rules="rules" label-width="auto">
				<!-- 添加 -->
				<el-form-item label="行业名称" prop="name">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="行业编码" prop="code">
					<el-input v-model="form.code" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addCancle">取 消</el-button>
				<el-button type="primary" @click="handleAdd()">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 修改 -->
		<el-dialog
			:title="title"
			:visible.sync="modFormVisible"
			:before-close="modCancle"
			width="600px"
		>
			<el-form
				:model="modform"
				ref="modForm"
				:rules="modRules"
				style="width:100%"
				label-width="auto"
			>
				<el-form-item label="行业名称" prop="name">
					<el-input v-model="modform.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="行业编码" prop="code">
					<el-input v-model="modform.code" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="modCancle">取 消</el-button>
				<el-button type="primary" @click="handleMod()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
export default {
	data() {
		return {
			selectflag: false,
			title: '新增行业',
			form: {},
			modform: {},
			dialogFormVisible: false,
			modFormVisible: false,
			id: ' ',

			formLabelWidth: '100px',
			isExpandAll: false,
			showItemList: [],
			allItemList: [],
			tableData: [],
			loading: true,
			list: [],
			rules: {
				name: [{ required: true, message: '请输入行业名称', trigger: 'blur' }],
				code: [{ required: true, message: '请输入行业编码', trigger: 'blur' }],
			},
			modRules: {
				name: [{ required: true, message: '请输入行业名称', trigger: 'blur' }],
				code: [{ required: true, message: '请输入行业编码', trigger: 'blur' }],
			},
			showData: false, //显示是否应该重绘表格
		};
	},
	mounted() {
		this.getAll();
	},
	methods: {
		setCollapse(list) {
			for (const iterator of list) {
				this.$refs.tableTreeRef.toggleRowExpansion(iterator, this.isExpandAll);
				if (iterator.children && iterator.children.length > 0) {
					this.setCollapse(iterator.children);
				}
			}
		},

		cancle() {
			this.form = {};
			this.dialogFormVisible = false;
			this.modform = {};
			this.modFormVisible = false;
			this.id = ' ';
		},
		selectAll(val) {
			if (this.selectflag) {
				this.selectflag = false;
				this.select(this.tableData, false);
			} else {
				this.selectflag = true;
				this.select(this.tableData, true);
			}
		},
		select(val, flag) {
			val.forEach((row) => {
				this.$refs.tableTreeRef.toggleRowSelection(row, flag);
				if (row.children && row.children.length > 0) {
					this.select(row.children, flag);
				}
			});
		},
		handleMod() {
			this.$refs.modForm.validate((vali) => {
				if (vali) {
					for (const key in this.modform) {
						if (!this.modform[key]) {
							delete this.modform[key];
						}
					}
					delete this.modform.children;
					this.$api
						.formPost('/api/basfun/industry/doModById', this.modform)
						.then((res) => {
							if (res.retHead.code === '0000000') {
								this.getAll();
								this.cancle();
								this.$message({
									type: 'success',
									message: '保存成功!',
								});
							} else {
								this.cancle();
								this.$message({
									type: 'error',
									message: res.retHead.message,
								});
							}
						});
				}
			});
		},

		addChildren(row, index) {
			this.title = '新增下级行业信息';
			this.dialogFormVisible = true;
			if (!row) {
				this.form.code = '';
			} else {
				this.form.pid = row.code;
				this.form.level = row.level;
			}
		},
		handleAdd() {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					if (this.form.pid == null) {
						this.form.level = 0;
					} else {
						this.form.level++;
					}

					this.$api
						.formPost('/api/basfun/industry/doSave', this.form)
						.then((res) => {
							if (res.retHead.code === '0000000') {
								this.getAll();
								this.cancle();
								this.$message({
									type: 'success',
									message: '保存成功!',
								});
							} else {
								this.cancle();
								this.$message({
									type: 'error',
									message: res.retHead.message,
								});
								this.$refs.addForm.clearValidate();
							}
						});
				} else {
					return false;
				}
			});
		},
		edit(row, index) {
			this.title = '修改下级行业信息';
			this.modform = JSON.parse(JSON.stringify(row));
			this.modFormVisible = true;
			this.id = row.code;
		},
		getAll() {
			this.showData = false;
			this.$api
				.formPost('/api/basfun/industry/doGetList', {
					pid: 0,
					pageSize: 99999,
					pageNum: 1,
				})
				.then((res) => {
					if (res.retHead.code === '0000000') {
						for (const iterator of res.retBody.list) {
							iterator.hasChildren = iterator.subCount > 0;
						}
						this.tableData = res.retBody.list;
						this.$nextTick(() => {
							this.showData = true;
						});
					}
				});
		},
		load(tree, treeNode, resolve) {
			this.$api
				.formPost('/api/basfun/industry/doGetList', {
					pid: tree.code,
					pageSize: 99999,
					pageNum: 1,
				})
				.then((res) => {
					if (res.retHead.code === '0000000') {
						for (const iterator of res.retBody.list) {
							iterator.hasChildren = iterator.subCount > 0;
						}
						resolve(res.retBody.list);
					}
				});
		},
		deleteIndustry(row, index) {
			this.$confirm('此操作将删除数据, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.$api
						.formPost('/api/basfun/industry/doRmById', { id: row.id })
						.then((res) => {
							if (res.retHead.code === '0000000') {
								this.$message({
									type: 'success',
									message: '删除成功!',
								});
								this.getAll();
							}
						});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
				});
		},
		showDialog() {
			this.title = '新增下级行业信息';
			this.dialogFormVisible = true;
		},
		expandAll() {
			if (this.isExpandAll) {
				this.isExpandAll = false;
				this.setCollapse(this.tableData);
			} else {
				this.isExpandAll = true;
				this.setCollapse(this.tableData);
			}
		},
		addCancle() {
			this.$refs.addForm.resetFields();
			this.form = {};
			this.dialogFormVisible = false;
		},
		modCancle() {
			this.$refs.modForm.resetFields();
			this.modform = {};
			this.modFormVisible = false;
		},
	},
};
</script>
<style lang="scss" scoped>
.industry {
	height: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	.content {
		margin: 0 10px;
		flex-grow: 1;
		overflow: auto;
	}
}
</style>
