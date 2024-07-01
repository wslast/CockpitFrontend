<!--
 * @Author: Junchi Zhao
 * @LastEditors: zjc2684613 1984937455@qq.com
 * @Description: 编辑列表条目
-->
<!--
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 参数设置
-->
<template>
	<BaseDialog
		:title="paramDialogConfig.title"
		:visible="paramDialogVisible"
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
					<el-form-item label="序号">
						<el-input v-model="form.ordinal" placeholder="请输入"></el-input>
					</el-form-item>
					<el-form-item label="是否启用">
						<el-select
							v-model="form.enabledState"
							placeholder="请选择"
							style="width: 100%;"
						>
							<el-option label="启用" value="1"></el-option>
							<el-option label="禁用" value="0"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="innerVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveData">保存</el-button>
				</div>
			</el-dialog>
			<div class="df jce mb10">
				<el-button type="primary" icon="el-icon-plus" @click="addData()"
					>添加</el-button
				>
			</div>
			<div style="height:60vh;" class="df">
				<jh-table
					:data="tableData"
					row-key="id"
					border
					class="ova fg1"
					height="100%"
					@deleteData="deleteData"
					:columnList="columnList"
					:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
				>
				</jh-table>
			</div>
		</template>
		<div slot="footer">
			<el-button @click="close">关 闭</el-button>
		</div>
	</BaseDialog>
</template>

<script>
export default {
	name: 'paramDialog',
	props: {
		paramDialogConfig: {
			type: Object,
			default: () => {},
		},
		paramDialogVisible: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			tableData: [],
			innerVisible: false,
			form: {
				codeName: '',
				codeValue: '',
				sysCodeId: '',
				ordinal: '',
				enabledState: '1',
			},
			formDefault: {
				codeName: '',
				codeValue: '',
				sysCodeId: '',
				ordinal: '',
				enabledState: '1',
			},
			rules: {
				codeName: [
					{ required: true, message: '请输入编码名称', trigger: 'blur' },
				],
				codeValue: [
					{ required: true, message: '请输入编码值', trigger: 'blur' },
				],
			},
			columnList: [
				{
					type: 'index',
					align: 'center',
				},
				{
					prop: 'codeName',
					label: '条目名称',
					align: 'center',
					showOverflowTooltip: true,
				},
				{
					prop: 'codeValue',
					label: '条目代码',
					align: 'center',
					showOverflowTooltip: true,
				},
				{
					prop: 'ordinal',
					label: '序号',
					align: 'center',
					showOverflowTooltip: true,
				},
				{
					prop: 'enabledState',
					label: '状态',
					align: 'center',
					formatter: (row) => {
						if (row.enabledState == '1') {
							return '启用';
						} else if (row.enabledState == '0') {
							return '禁用';
						} else {
							return '';
						}
					},
				},
				{
					prop: '',
					fixed: 'right',
					label: '操作',
					align: 'center',
					width: '150px',
					render: (h, scope) => {
						let that = this;
						return h('div', {}, [
							h(
								'el-button',
								{
									on: {
										click: that.editData.bind(that, scope.row),
									},
									props: {
										type: 'text',
									},
								},
								[
									h('span', {
										domProps: {
											innerHTML: '修改',
										},
									}),
								]
							),
							h(
								'el-button',
								{
									on: {
										click: that.deleteData.bind(that, scope.row),
									},
									props: {
										type: 'text',
									},
								},
								[
									h('span', {
										domProps: {
											innerHTML: '删除',
										},
									}),
								]
							),
						]);
					},
				},
			],
		};
	},
	watch: {
		innerVisible: function(val) {
			if (!val) {
				for (const key in this.form) {
					this.form[key] = '';
				}
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
				pageNum: 1,
				pageSize: 99999,
				sysCodeId: this.paramDialogConfig.data.id,
			};
			this.$api
				.formPost('/api/basfun/syscode/item/doGetList', params)
				.then((res) => {
					this.tableData = res.retBody.list;
				});
		},
		addData(row) {
			this.form = JSON.parse(JSON.stringify(this.formDefault));
			this.form.sysCodeId = this.paramDialogConfig.data.id;
			this.innerVisible = true;
		},
		editData(row) {
			this.form = JSON.parse(JSON.stringify(row));
			this.innerVisible = true;
		},
		saveData() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					let params = {
						codeName: this.form.codeName,
						codeValue: this.form.codeValue,
						sysCodeId: this.form.sysCodeId,
						enabledState: this.form.enabledState,
						ordinal: this.form.ordinal,
					};
					if (this.form.id) {
						params.id = this.form.id;
						this.$api
							.formPost('/api/basfun/syscode/item/doModById', params)
							.then((res) => {
								this.$message.success('操作成功');
								this.innerVisible = false;
								this.getData();
							});
					} else {
						this.$api
							.formPost('/api/basfun/syscode/item/doSave', params)
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
				.formPost('/api/basfun/syscode/item/doRmById', { id: row.id })
				.then((res) => {
					this.$message.success('操作成功');
					this.getData();
				});
		},
		close() {
			this.$emit('update:paramDialogVisible', false);
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
