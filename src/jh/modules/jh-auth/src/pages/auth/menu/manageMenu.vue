<template>
	<div class="p10 df fdc">
		<div class="fg1 ova">
			<el-table
				v-if="refreshTable"
				:default-expand-all="isExpandAll"
				:data="data.filter(dataFilter)"
				height="100%"
				row-key="id"
				border
				ref="table"
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
				@select-all="selectALl"
				@select="select"
				@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="55"> </el-table-column>
				<el-table-column
					key="functionName"
					prop="functionName"
					label="菜单名称"
					width="180"
					align="left"
				></el-table-column>
				<el-table-column
					v-if="isSearch"
					key="functionLayerName"
					prop="functionLayerName"
					label="菜单路径"
					align="left"
					min-width="180"
				></el-table-column>
				<el-table-column
					key="functionUrl"
					prop="functionUrl"
					label="菜单Url"
				></el-table-column>
				<el-table-column
					key="menuPatternUrl"
					prop="menuPatternUrl"
					label="通配接口"
					width="180"
				></el-table-column>
				<el-table-column
					key="functionAttr"
					prop="functionAttr"
					label="权限类型"
					width="100"
					:show-overflow-tooltip="false"
				>
					<template slot-scope="scope">
						<div v-if="scope.row.functionAttr === '0'">管理权限</div>
						<div v-if="scope.row.functionAttr === '1'">经办权限</div>
						<div v-if="scope.row.functionAttr === '2'">审核权限</div>
					</template>
				</el-table-column>
				<el-table-column
					key="functionOrderNum"
					v-if="!isSearch"
					prop="functionOrderNum"
					label="菜单序号"
					width="100"
				></el-table-column>
				<el-table-column
					key="menuStyle"
					v-if="!isSearch"
					prop="menuStyle"
					align="center"
					label="菜单样式"
					width="100"
				>
					<template slot-scope="scope">
						<!-- <span>{{scope.row}}</span> -->
						<i :class="scope.row.menuStyle" class="f18"></i>
					</template>
				</el-table-column>
				<!-- <el-table-column
					key="functionList"
					prop="functionList"
					label="功能"
					align="left"
				>
					<template slot-scope="scope">
						<el-tag
							title="请点击操作查看"
							class="mr5 mb5"
							v-for="(item, index) in scope.row.functionList"
							:key="index"
							>{{ item.functionName }}</el-tag
						>
					</template>
				</el-table-column> -->
				<el-table-column
					label="操作"
					width="200px"
					align="center"
					key="operate"
				>
					<template slot="header" slot-scope="scope">
						<el-input v-model="search" placeholder="输入一级菜单" />
					</template>
					<template slot-scope="scope" width="200">
						<el-button type="text" @click="operate(scope.row)">操作</el-button>
						<el-button type="text" @click="editItem(scope.row)">编辑</el-button
						><el-button type="text" @click="addItem(scope.row, 2)"
							>增加</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- </el-card> -->
		<el-dialog
			title="菜单管理"
			width="600px"
			v-if="dialogFormVisible"
			:visible.sync="dialogFormVisible"
		>
			<el-form :model="form" :rules="rules" ref="form" label-width="auto">
				<el-row>
					<el-col :span="24">
						<el-form-item
							label="选择菜单节点"
							prop="menuIds"
							v-if="isAdd && type && type === 1"
						>
							<el-cascader
								v-model="form.menuIds"
								class="pctw100"
								:options="data"
								:props="{
									checkStrictly: true,
									value: 'id',
									label: 'functionName',
								}"
								clearable
							></el-cascader>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="菜单名称" prop="functionName">
					<el-input v-model="form.functionName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="权限类型" prop="functionAttr">
					<el-select
						v-model="form.functionAttr"
						placeholder="请选择"
						class="pctw100"
					>
						<el-option label="管理权限" :value="'0'"> </el-option>
						<el-option label="经办权限" :value="'1'"> </el-option>
						<el-option label="审核权限" :value="'2'"> </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="菜单Url" prop="functionUrl">
					<el-input v-model="form.functionUrl" autocomplete="off"></el-input>
				</el-form-item>
				<el-row>
					<el-col :span="12">
						<el-form-item label="菜单序号">
							<el-input
								v-model="form.functionOrderNum"
								autocomplete="off"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="菜单样式">
							<!-- <el-select v-model="form.menuStyle" placeholder="请选择" :disabled="isAdd||form.functionUrl!='#' "> -->
							<el-select
								v-model="form.menuStyle"
								placeholder="请选择"
								class="pctw100"
							>
								<el-option label="请选择" value=""> </el-option>
								<el-option v-for="item in options" :key="item" :value="item">
									<i :class="item"></i>/{{ item }}
								</el-option>
							</el-select>
							<!-- <el-input v-model="" autocomplete="off"></el-input> -->
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="通配接口">
					<el-input v-model="form.menuPatternUrl" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item
					label="节点位置"
					v-if="isAdd && type === 2"
					prop="nodeType"
				>
					<el-radio-group v-model="form.nodeType">
						<el-radio :label="'1'">兄弟节点</el-radio>
						<el-radio :label="'2'" v-if="chackedNode && chackedNode.id"
							>子节点</el-radio
						>
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
				<el-form-item label="备注">
					<el-input
						type="textarea"
						v-model="form.functionIntroduce"
						autocomplete="off"
					></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancle()">取 消</el-button>
				<el-button type="primary" @click="ok">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog
			width="800px"
			:title="`操作管理-${chackedNode.functionName}`"
			:visible.sync="dialogShow"
		>
			<div class="card btns">
				<el-button type="primary" @click="addFuncItem">增加</el-button>
			</div>
			<el-table
				:data="chackedNode.functionList"
				border
				style="width: 100%"
				height="60vh"
			>
				<el-table-column prop="functionName" label="接口名称"></el-table-column>
				<el-table-column
					prop="functionUrl"
					label="接口路径"
					width="300px"
				></el-table-column>
				<el-table-column
					prop="functionOrderNum"
					label="接口序号"
				></el-table-column>
				<el-table-column
					prop="functionIntroduce"
					label="备注"
				></el-table-column>
				<el-table-column fixed="right" align="center" label="操作" width="160">
					<template slot-scope="scope">
						<el-button type="text" @click="editFuncItem(scope.row)"
							>编辑</el-button
						>
						<el-button type="text" @click="deleteFuncItem(scope.row)"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>
		<el-dialog
			title="操作管理"
			v-if="funcDialogVisible"
			:visible.sync="funcDialogVisible"
			width="600px"
		>
			<el-form ref="gn" :model="funcForm" :rules="funcRules" label-width="auto">
				<el-form-item label="接口名称" prop="functionName">
					<el-input
						v-model="funcForm.functionName"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="接口路径" prop="functionUrl">
					<el-input
						v-model="funcForm.functionUrl"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="接口序号">
					<el-input
						v-model="funcForm.functionOrderNum"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input
						v-model="funcForm.functionIntroduce"
						autocomplete="off"
					></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="funcDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addFunc">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import options from './icons.js';
export default {
	name: 'manageMenu',
	props: {
		isSearch: {
			type: Boolean,
			default: false,
		},
		searchForm: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
			type: 1, //1是顶部按钮添加  2是表格按钮添加
			isAdd: false,
			search: '',
			dialogFormVisible: false,
			options: options.icons,
			form: {
				id: '',
				parentId: '',
				functionName: '',
				functionUrl: '',
				menuPatternUrl: '',
				functionIntroduce: '',
				functionOrderNum: '',
				menuStyle: '',
				functionAttr: '0',
				nodeType: '1',
				menuFlag: '1', //固定参数
				bak1: '',
				bak2: '',
				bak3: '',
				bak4: '',
				bak5: '',
				menuIds: [],
			},

			rules: {
				rules: {
					nodeType: [
						{ required: true, message: '节点位置不能为空', trigger: 'submit' },
					],
				},
				functionName: [
					{ required: true, message: '菜单名称不能为空！', trigger: 'submit' },
				],
				functionUrl: [
					{
						required: true,
						message: '菜单url不能为空！',
						trigger: 'submit',
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

			dialogShow: false,
			isAddFunc: false,
			funcDialogVisible: false,
			funcForm: {
				parentId: '',
				functionName: '',
				functionUrl: '',
				functionIntroduce: '',
				functionOrderNum: '',
				menuFlag: '2', //固定参数
				nodeType: '2', //固定参数
				title: '',
				nodeKey: '',
			},
			funcRules: {
				functionUrl: [
					{ required: true, message: '接口名称不能为空！', trigger: 'blur' },
				],
				functionName: [
					{ required: true, message: '接口路径不能为空！', trigger: 'blur' },
				],
			},
			refreshTable: true,
			isExpandAll: false,
		};
	},
	watch: {
		dialogShow: function(val) {
			if (!val) {
				if (this.isSearch) {
					this.$nextTick(() => {
						this.searchData();
					});
				} else {
					this.$nextTick(() => {
						this.init();
					});
				}
			}
		},
		isSearch: {
			handler: function(val) {
				if (val) {
					this.$nextTick(() => {
						this.searchData();
					});
				} else {
					this.$nextTick(() => {
						this.init();
					});
				}
			},
			deep: true,
			immediate: true,
		},
	},
	methods: {
		folding() {
			this.refreshTable = false;
			this.isExpandAll = !this.isExpandAll;
			this.$nextTick(() => {
				this.refreshTable = true;
			});
		},
		searchData() {
			this.$api
				.formPost('/api/auth/sysfun/doGetFunctionList', {
					menuFlags: '1',
					...this.searchForm,
				})
				.then((res) => {
					this.data = res.retBody;
				});
		},
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
				.formPost('/api/auth/sysfun/doGetLayerFunctionObject', {})
				.then((res) => {
					if (res.retHead.code == '0000000') {
						this.data = this.deleteParentAttr(res.retBody);
					}
					load.close();
				});
			this.chackedNode = {};
		},
		deleteParentAttr(list) {
			for (const iterator of list) {
				if (iterator.children && iterator.children.length > 0) {
					iterator.functionAttr = '';
					this.deleteParentAttr(iterator.children);
				} else if (iterator.children && iterator.children.length === 0) {
					delete iterator.children;
				}
			}
			return list;
		},
		handleNodeClick(v) {
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
			if (this.form.parentId == undefined && this.form.menuIds.length === 0) {
				this.form.parentId = 0;
			} else if (
				this.form.parentId == undefined &&
				this.form.menuIds.length > 0
			) {
				this.form.parentId = this.form.menuIds.pop();
			}
			delete this.form.menuIds;
			this.form.menuFlag = 1;
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
		addItem(row, type) {
			this.isAdd = true;
			this.type = type;
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
				nodeType: '1',
				functionAttr: '0',
				menuFlag: '1', //固定参数
				bak1: '',
				bak2: '',
				bak3: '',
				bak4: '',
				bak5: '',
				menuIds: [],
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

		getCheckedNode(id) {
			this.$api
				.formPost('/api/auth/sysfun/doGetFunctionList', {
					parentId: id,
				})
				.then((res) => {
					if (res.retHead.code == '0000000') {
						if (
							res.retBody &&
							res.retBody[0] &&
							res.retBody[0].menuFlag == '2'
						) {
							this.$set(this.chackedNode, 'functionList', res.retBody);
						}
					}
				});
		},
		operate(v) {
			if (v.menuFlag == '1') {
				this.chackedNode = JSON.parse(JSON.stringify(v));
				this.getCheckedNode(v.id);
				this.dialogShow = true;
			} else if (v.menuFlag == '2') {
				this.isAddFunc = false;
				this.funcDialogVisible = true;
				this.funcForm = JSON.parse(JSON.stringify(v));
			}
			// 如果只用树  下边这一句删除掉
		},
		addFunc() {
			this.$refs.gn.validate((valid) => {
				if (valid) {
					if (this.isAddFunc) {
						this.handleAddFunc();
					} else {
						this.handleEditFunc();
					}
				} else {
					this.$message.error('请完善表单！');
					return false;
				}
			});
		},
		handleAddFunc() {
			this.funcForm.parentId = this.chackedNode.id;
			this.funcForm.menuFlag = '2'; //固定参数
			this.funcForm.nodeType = '2'; //固定参数
			this.$api
				.formPost('/api/auth/sysfun/doSaveFunction', this.funcForm)
				.then((res) => {
					// this.dialogShow = false;
					if (res.retHead.code == '0000000') {
						this.funcDialogVisible = false;
						this.$message.success('操作成功！');
						this.getCheckedNode(this.chackedNode.id);
					} else {
						this.$message.error(res.retHead.message);
					}
				});
		},
		handleEditFunc() {
			this.funcForm.menuFlag = '2'; //固定参数
			this.funcForm.nodeType = '2'; //固定参数
			this.$api
				.formPost('/api/auth/sysfun/doModFunction', this.funcForm)
				.then((res) => {
					this.funcDialogVisible = false;
					if (this.dialogShow) {
						this.getCheckedNode(this.chackedNode.id);
					} else {
						this.searchData();
					}
					if (res.retHead.code == '0000000') {
						this.$message.success('操作成功！');
					} else {
						this.$message.error('操作失败！');
					}
				});
		},
		deleteFuncItem(v) {
			let params = {
				id: v.id,
			};
			this.$api
				.formPost('/api/auth/sysfun/doDelFunction', params)
				.then((res) => {
					if (res.retHead.code == '0000000') {
						this.$message.success('操作成功！');
						this.getCheckedNode(this.chackedNode.id);
					} else {
						this.$message.error('操作失败！');
					}
				});
		},
		addFuncItem() {
			this.isAddFunc = true;
			this.funcDialogVisible = true;
			this.funcForm = {};
		},
		editFuncItem(v) {
			console.log(v);
			this.isAddFunc = false;
			this.funcDialogVisible = true;
			this.funcForm = JSON.parse(JSON.stringify(v));
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
