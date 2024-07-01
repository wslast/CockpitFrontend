<template>
	<div class="area">
		<div class="content p10">
			<el-table
				border
				height="100%"
				style="width: 100%"
				ref="tableTreeRef"
				@select-all="selectAll"
				:data="tableData"
				row-key="id"
				lazy
				v-if="showData"
				:load="load"
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
			>
				<!-- <el-table-column
        type="selection"
        width="55">
      </el-table-column> -->
				<el-table-column prop="areaName" label="区域名称" align="left">
				</el-table-column>
				<el-table-column prop="areaCode" label="区域编码"> </el-table-column>
				<el-table-column prop="areaTypeName" label="区域类型">
				</el-table-column>
				<el-table-column prop="remark" label="备注"> </el-table-column>
				<el-table-column label="操作" align="center" width="240">
					<template slot-scope="scope">
						<el-button type="text" @click="edit(scope.row, scope.$index)"
							>修改</el-button
						><el-button type="text" @click="deleteArea(scope.row, scope.$index)"
							>删除</el-button
						><el-button
							type="text"
							@click="addChildren(scope.row, scope.$index)"
							>添加下级区域</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<el-dialog
			:title="title"
			:visible.sync="dialogFormVisible"
			:before-close="cancle"
			width="600px"
		>
			<el-form :model="form" ref="addForm" :rules="rules" label-width="auto">
				<el-form-item label="上级区域">
					<el-select v-model="form.parentId" disabled class="pctw100">
						<el-option
							v-for="item in list"
							:key="item.id"
							:label="item.areaName"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="区域名称" prop="areaName">
					<el-input v-model="form.areaName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="区域编码" prop="areaCode">
					<el-input v-model="form.areaCode" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="区域类型" prop="areaType">
					<el-select
						v-model="form.areaType"
						placeholder="请选择"
						class="pctw100"
					>
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备注">
					<el-input v-model="form.remark" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancle">取 消</el-button>
				<el-button type="primary" @click="handleAdd()">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog
			:title="title"
			:visible.sync="modFormVisible"
			:before-close="cancle"
			width="600px"
		>
			<el-form :model="modform" ref="modForm" :rules="rules" label-width="auto">
				<el-form-item label="上级区域">
					<el-select v-model="modform.parentId" disabled class="pctw100">
						<el-option
							v-for="item in list"
							:key="item.id"
							:label="item.areaName"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="区域名称" prop="areaName">
					<el-input v-model="modform.areaName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="区域编码" prop="areaCode">
					<el-input v-model="modform.areaCode" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="区域类型" prop="areaType">
					<el-select
						v-model="modform.areaType"
						placeholder="请选择"
						class="pctw100"
					>
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备注">
					<el-input v-model="modform.remark" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancle">取 消</el-button>
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
			title: '新增区域',
			form: {},
			modform: {},
			dialogFormVisible: false,
			modFormVisible: false,
			options: [
				{
					value: '1',
					label: '国家',
				},
				{
					value: '2',
					label: '省份、直辖市',
				},
				{
					value: '3',
					label: '地市',
				},
				{
					value: '4',
					label: '区县',
				},
			],
			isExpandAll: false,
			showItemList: [],
			allItemList: [],
			tableData: [],
			list: [],
			rules: {
				areaName: [
					{ required: true, message: '请输入区域名称', trigger: 'change' },
				],
				areaCode: [
					{ required: true, message: '请输入区域编码', trigger: 'change' },
				],
				areaType: [
					{ required: true, message: '请输入区域类型', trigger: 'change' },
				],
			},
			showData: false,
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

		handleAdd() {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					this.$api
						.formPost('/api/basfun/area/doSave', this.form)
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
				} else {
					return false;
				}
			});
		},
		handleMod() {
			delete this.modform.children;
			this.$api
				.formPost('/api/basfun/area/doModById', this.modform)
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
		},
		edit(row, index) {
			this.title = '修改区域信息';

			this.modform = JSON.parse(JSON.stringify(row));
			this.list = [];
			this.list.push(row);
			delete this.form.children;
			this.modFormVisible = true;
		},
		//新增下级区域
		addChildren(row, index) {
			this.title = '新增区域信息';
			this.dialogFormVisible = true;
			this.form.parentId = row.id;
			this.list = [];
			this.list.push(row);
		},
		load(tree, treeNode, resolve) {
			this.$api
				.formPost('/api/basfun/area/doGetList', { parentId: tree.id })
				.then((res) => {
					if (res.retHead.code === '0000000') {
						for (const iterator of res.retBody.list) {
							iterator.hasChildren = iterator.subCount > 0;
						}
						resolve(res.retBody.list);
					}
				});
		},
		getAll() {
			this.showData = false;
			this.$api
				.formPost('/api/basfun/area/doGetList', { parentId: '0' })
				.then((res) => {
					if (res.retHead.code === '0000000') {
						this.tableData = [];
						for (const iterator of res.retBody.list) {
							iterator.hasChildren = iterator.subCount > 0;
						}
						this.tableData = res.retBody.list;
						this.$nextTick(() => {
							this.showData = true;
							this.$forceUpdate();
						});
					}
				});
		},
		deleteArea(row, index) {
			this.$api
				.formPost('/api/basfun/area/doRmById', { id: row.id })
				.then((res) => {
					if (res.retHead.code === '0000000') {
						this.$message({
							type: 'success',
							message: '删除成功!',
						});
						this.getAll();
					}
				});
		},
		showDialog() {
			this.title = '新增区域信息';
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
	},
};
</script>
<style lang="scss" scoped>
.area {
	height: 100%;
	display: flex;
	flex-direction: column;
	.content {
		flex-grow: 1;
		overflow: auto;
	}
}
</style>
