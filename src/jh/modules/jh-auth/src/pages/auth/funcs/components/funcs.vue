<template>
	<div class="p10" style="padding-top:0px;">
		<el-table
			v-if="refreshTable"
			:data="data"
			height="100%"
			style="width: 100%;"
			row-key="id"
			border
			default-expand-all
			:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
		>
			<el-table-column
				prop="functionName"
				label="菜单名称"
				width="180"
				align="left"
			></el-table-column>
			<el-table-column
				v-if="isSearch"
				prop="functionLayerName"
				label="菜单路径"
				align="left"
			></el-table-column>
			<el-table-column
				prop="functionUrl"
				label="菜单Url"
				width="280"
			></el-table-column>
			<el-table-column
				key="functionList"
				prop="functionList"
				label="接口列表"
				v-if="!isSearch"
				align="left"
				:show-overflow-tooltip="false"
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
			</el-table-column>
			<el-table-column label="操作" width="80" align="center">
				<template slot-scope="scope">
					<el-button type="text" @click="operate(scope.row)">操作</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog
			width="800px"
			:title="`操作管理-${chackedNode.functionName}`"
			:visible.sync="dialogShow"
		>
			<div class="card btns">
				<el-button type="primary" @click="addItem">增加</el-button>
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
export default {
	components: {},
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
			refreshTable: true,
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
			data: [],
			props: {
				label: 'functionName',
				children: 'children',
			},
			chackedNode: {},
		};
	},
	computed: {},
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
						this.refreshTable = false;
						this.$nextTick(() => {
							this.refreshTable = true;
							this.searchData();
						});
					});
				} else {
					this.$nextTick(() => {
						this.refreshTable = false;
						this.$nextTick(() => {
							this.refreshTable = true;
							this.init();
						});
					});
				}
			},
			deep: true,
			immediate: true,
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		searchData() {
			this.$api
				.formPost('/api/auth/sysfun/doGetFunctionList', {
					...this.searchForm,
					menuFlags: '1,2',
				})
				.then((res) => {
					this.data = res.retBody;
					if (!this.dialogShow) {
						this.chackedNode = {};
					}
				});
		},
		init() {
			this.$api
				.formPost('/api/auth/sysfun/doGetLayerFunctionObject', {})
				.then((res) => {
					if (res.retHead.code == '0000000') {
						this.data = res.retBody;
						if (!this.dialogShow) {
							this.chackedNode = {};
						}
					}
				});
		},
		getCheckedNode(id) {
			this.$api
				.formPost('/api/auth/sysfun/doGetFunctionList', {
					parentId: id,
				})
				.then((res) => {
					if (res.retHead.code == '0000000') {
						this.chackedNode.functionList = res.retBody;
					}
				});
		},
		operate(v) {
			if (v.menuFlag == '1') {
				this.chackedNode = JSON.parse(JSON.stringify(v));
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
		addItem() {
			this.isAddFunc = true;
			this.funcDialogVisible = true;
			this.funcForm = {};
		},
		editFuncItem(v) {
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
	.right {
		text-align: right;
		* {
			margin: 0 10px;
		}
	}
}
/deep/ .el-table tr,
.el-table td {
	height: auto !important;
	vertical-align: top;
}
</style>
