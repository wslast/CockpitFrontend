<template>
	<div class="p10 df fdc">
		<div class="fg1 ova">
			<el-table
				:data="data.filter(dataFilter)"
				style="width: 100%"
				height="100%"
				row-key="id"
				border
				ref="table"
				default-expand-all
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
				@select-all="selectALl"
				@select="select"
				@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="55"> </el-table-column>
				<el-table-column
					prop="functionName"
					label="菜单名称"
					width="180"
					align="left"
				></el-table-column>
				<el-table-column prop="functionUrl" label="接口路径"></el-table-column>
				<el-table-column label="操作" width="160px" align="center">
					<template slot-scope="scope" width="200">
						<el-button type="text" @click="editItem(scope.row)">编辑</el-button
						><el-button type="text" @click="addItem(scope.row)">增加</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- </el-card> -->
		<el-dialog title="功能管理" width="600px" :visible.sync="dialogFormVisible">
			<el-form :model="form" :rules="rules" ref="form" label-width="auto">
				<el-form-item label="菜单名称" prop="functionName">
					<el-input v-model="form.functionName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="接口路径" prop="functionUrl">
					<el-input v-model="form.functionUrl" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="节点位置" v-if="isAdd" prop="nodeType">
					<el-radio-group v-model="form.nodeType">
						<el-radio label="1">兄弟节点</el-radio>
						<el-radio label="2" v-if="chackedNode.id">子节点</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="备用字段1">
					<el-input v-model="form.bak1" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="备用字段2">
					<el-input v-model="form.bak2" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="备用字段3">
					<el-input v-model="form.bak3" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="备用字段4">
					<el-input v-model="form.bak4" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="备用字段5">
					<el-input v-model="form.bak5" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancle()">取 消</el-button>
				<el-button type="primary" @click="ok">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
export default {
	name: 'functionMenu',
	components: {},
	data() {
		return {
			isAdd: false,
			search: '',
			dialogFormVisible: false,
			form: {
				id: '',
				parentId: '',
				functionName: '',
				functionUrl: '',
				menuPatternUrl: '',
				functionIntroduce: '',
				functionOrderNum: '',
				menuStyle: '',
				menuFlag: '0', //固定参数
				bak1: '',
				bak2: '',
				bak3: '',
				bak4: '',
				bak5: '',
			},

			rules: {
				nodeType: [
					{ required: true, message: '节点位置不能为空', trigger: 'submit' },
				],
				functionName: [
					{ required: true, message: '菜单名称不能为空！', trigger: 'blur' },
				],
				functionUrl: [
					{
						required: true,
						message: '菜单url不能为空！',
						trigger: 'blur',
					},
				],
			},
			data: [],
			props: {
				label: 'functionName',
				children: 'children',
			},
			chackedNode: {},
			selectRows: [],
		};
	},
	computed: {},
	mounted() {
		this.init();
	},
	methods: {
		selectALl(selection) {
			for (const iterator of this.data) {
				this.toggleSelection(
					iterator,
					this.$refs.table.store.states.isAllSelected
				);
			}
		},
		select(selection, row) {
			if (selection.indexOf(row) > -1) {
				this.$refs.table.toggleRowSelection(row, true);
				//降低递归事件等级 延后执行 否则会被上面覆盖
				this.$nextTick(() => {
					this.toggleSelection(row, true);
				});
			} else {
				this.$nextTick(() => {
					this.toggleSelection(row, false);
				});
			}
		},
		toggleSelection(row, state) {
			if (row.children && row.children.length > 0) {
				for (const iterator of row.children) {
					this.$refs.table.toggleRowSelection(iterator, state);
					if (iterator.children && row.children.length > 0) {
						this.toggleSelection(iterator, state);
					}
				}
			}
		},
		handleSelectionChange(row) {
			this.selectRows = row;
		},
		batchDelete() {
			if (this.selectRows.length === 0) {
				this.$message.warning('当前未选择数据');
				return;
			}
			this.$confirm('此操作将永久删除这些项, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.$api
						.formPost('/api/auth/sysfun/doDelFunction', {
							id: this.selectRows
								.map((item) => {
									return item.id;
								})
								.join(','),
						})
						.then((res) => {
							this.$message.success('删除成功');
							this.init();
						});
				})
				.catch(() => {});
		},
		dataFilter(item) {
			return (
				!this.search ||
				item.functionName.toLowerCase().includes(this.search.toLowerCase())
			);
		},
		cancle() {
			this.dialogFormVisible = false;
			this.resetForm('form');
		},
		init() {
			let load = this.$loading({
				target: this.$refs.table.$el,
			});
			this.$api
				.formPost('/api/auth/sysfun/doGetLayerFunctionObject', {
					menuFlag: 0,
				})
				.then((res) => {
					if (res.retHead.code == '0000000') {
						this.data = res.retBody;
					}
					load.close();
				});
			this.chackedNode = {};
		},
		handleNodeClick(v) {
			console.log(v);
			this.chackedNode = v;
		},
		rule1() {
			if (this.chackedNode.functionName == undefined) {
				this.$message.error('请先选取一个节点！');
				return false;
			} else {
				return true;
			}
		},
		ok() {
			if (this.isAdd) {
				this.handleAdd();
			} else {
				this.handleEdit();
			}
		},
		handleAdd() {
			if (this.form.nodeType == 1) {
				this.form.parentId = this.chackedNode.parentId;
			} else {
				this.form.parentId = this.chackedNode.id;
			}
			if (this.form.parentId == undefined) {
				this.form.parentId = 0;
			}
			this.form.menuFlag = 0;
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.$api
						.formPost('/api/auth/sysfun/doSaveFunction', this.form)
						.then((res) => {
							// this.dialogFormVisible = false;
							if (res.retHead.code == '0000000') {
								this.dialogFormVisible = false;
								this.$message.success('操作成功！');
								this.init();
							} else {
								this.dialogFormVisible = true;
								this.$message.error('添加失败：' + res.retHead.message);
							}
						});
				}
			});
		},
		handleEdit() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.$api
						.formPost('/api/auth/sysfun/doModFunction', this.form)
						.then((res) => {
							this.dialogFormVisible = false;
							if (res.retHead.code == '0000000') {
								this.$message.success('操作成功！');
								this.init();
							} else {
								this.$message.error('操作失败！');
							}
						});
				}
			});
		},
		addItem(row) {
			this.isAdd = true;
			this.dialogFormVisible = true;
			this.chackedNode = row ? JSON.parse(JSON.stringify(row)) : {};
			this.form = {
				id: '',
				parentId: '',
				functionName: '',
				functionUrl: '',
				menuPatternUrl: '',
				functionIntroduce: '',
				functionOrderNum: '',
				menuStyle: '',
				menuFlag: '0', //固定参数
				bak1: '',
				bak2: '',
				bak3: '',
				bak4: '',
				bak5: '',
			};
		},
		editItem(row) {
			this.isAdd = false;
			this.dialogFormVisible = true;
			this.chackedNode = JSON.parse(JSON.stringify(row));
			for (const key in this.form) {
				if (Object.hasOwnProperty.call(row, key)) {
					this.form[key] = row[key];
				}
			}
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
	},
	created() {},
};
</script>
<style lang="scss" scoped>
.custom-tree-node {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 14px;
	padding-right: 8px;
}
</style>
