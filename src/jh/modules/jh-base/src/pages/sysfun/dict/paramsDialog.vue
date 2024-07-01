<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 参数设置
-->
<template>
	<BaseDialog
		:title="paramsDialogConfig.title"
		:visible="paramsDialogVisible"
		top="5vh"
		append-to-body
		width="1000px"
		@close="close"
	>
		<template slot="body">
			<el-dialog
				width="600px"
				title="编辑节点"
				top="5vh"
				:visible.sync="innerVisible"
				append-to-body
			>
				<el-form :model="form" :rules="rules" ref="form" label-width="auto">
					<el-form-item label="条目代码" prop="codeValue">
						<el-input v-model="form.codeValue" placeholder="请输入"></el-input>
					</el-form-item>
					<el-form-item label="条目名称" prop="codeName">
						<el-input v-model="form.codeName" placeholder="请输入"></el-input>
					</el-form-item>
					<el-form-item label="条目层级">
						<el-input v-model="form.layer" placeholder="请输入"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="innerVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveData">保存</el-button>
				</div>
			</el-dialog>
			<div class="df jce mb10">
				<el-button type="primary" icon="el-icon-plus" @click="addData()"
					>添加主节点</el-button
				>
			</div>
			<div style="height:60vh;" class="df">
				<div class="fg1 ova">
					<el-table
						:data="tableData"
						row-key="id"
						border
						height="100%"
						default-expand-all
						:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
					>
						<el-table-column prop="codeName" label="条目名称">
						</el-table-column>
						<el-table-column prop="codeValue" label="条目代码">
						</el-table-column>
						<el-table-column prop="layer" label="条目层级"> </el-table-column>
						<el-table-column prop="address" label="操作" width="240px">
							<template slot-scope="scope">
								<div>
									<el-button type="text" @click="addData(scope.row)"
										>添加子节点</el-button
									>
									<el-button type="text" @click="editData(scope.row)"
										>修改</el-button
									>
									<el-button type="text" @click="deleteData(scope.row)"
										>删除</el-button
									>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</template>
		<div slot="footer">
			<el-button @click="close">关 闭</el-button>
		</div>
	</BaseDialog>
</template>

<script>
export default {
	name: 'paramsDialog',
	props: {
		paramsDialogConfig: {
			type: Object,
			default: () => {},
		},
		paramsDialogVisible: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			tableData: [{ 1: 1 }],
			innerVisible: false,
			form: {
				codeName: '',
				codeValue: '',
				pid: '',
				sysCodeId: '',
				layer: '',
			},
			rules: {
				codeName: [
					{ required: true, message: '请输入编码名称', trigger: 'blur' },
				],
				codeValue: [
					{ required: true, message: '请输入编码值', trigger: 'blur' },
				],
			},
		};
	},
	watch: {
		innerVisible: function(val) {
			if (val) {
				this.$nextTick(() => {
					this.$refs.form.resetFields();
				});
			}
		},
	},
	computed: {},

	created() {
		this.getData();
	},

	methods: {
		getData() {
			let params = {
				sysCodeId: this.paramsDialogConfig.data.id,
				id: 0,
			};
			this.$api
				.formPost('/api/basfun/syscode/treeitem/doGetJson', params)
				.then((res) => {
					this.tableData = res.retBody;
				});
		},
		addData(row) {
			for (const key in this.form) {
				this.form[key] = '';
			}
			if (row) {
				this.form.pid = row.id;
			} else {
				this.form.pid = 0;
			}
			this.form.sysCodeId = this.paramsDialogConfig.data.id;
			this.innerVisible = true;
		},
		editData(row) {
			for (const key in this.form) {
				this.form[key] = '';
			}
			this.form = JSON.parse(JSON.stringify(row));
			this.innerVisible = true;
		},
		saveData() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					let params = {
						codeName: this.form.codeName,
						codeValue: this.form.codeValue,
						pid: this.form.pid,
						sysCodeId: this.form.sysCodeId,
						layer: this.form.layer,
					};
					if (this.form.id) {
						params.id = this.form.id;
						this.$api
							.formPost('/api/basfun/syscode/treeitem/doModById', params)
							.then((res) => {
								this.$message.success('操作成功');
								this.innerVisible = false;
								this.getData();
							});
					} else {
						this.$api
							.formPost('/api/basfun/syscode/treeitem/doSave', params)
							.then((res) => {
								this.$message.success('操作成功');
								this.innerVisible = false;
								this.getData();
							});
					}
				}
			});
		},
		deleteData(row) {
			this.$api
				.formPost('/api/basfun/syscode/treeitem/doRmById', { id: row.id })
				.then((res) => {
					this.$message.success('操作成功');
					this.getData();
				});
		},
		close() {
			this.$emit('update:paramsDialogVisible', false);
		},
	},
};
</script>
<style lang="scss" scoped>
.footer {
	display: flex;
	justify-content: center;
}
/deep/ .el-tree-node__content {
	height: auto;
	padding-top: 5px;
	padding-bottom: 5px;
}
/deep/ .el-card__body {
	max-height: 60vh;
	overflow: auto;
}
</style>
