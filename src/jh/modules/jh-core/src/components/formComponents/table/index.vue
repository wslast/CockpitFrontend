<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 表格通用组件
-->
<template>
	<div class="jh-table">
		<el-form
			:model="form"
			style="height:100%;"
			ref="jhTableForm"
			label-width="0px"
		>
			<el-table
				ref="formTable"
				:data="form.dataList"
				v-bind="$attrs"
				v-on="$listeners"
			>
				<jh-column
					v-for="(item, index) in columnList"
					v-bind="$attrs"
					:key="index + JSON.stringify(item)"
					:column="item"
				>
				</jh-column>
			</el-table>
			<el-dialog
				append-to-body
				:title="dialogInfo.title"
				v-if="dialogVisible"
				top="5vh"
				:visible.sync="dialogVisible"
				:width="dialogInfo.width ? dialogInfo.width : '1000px'"
			>
				<component
					:is="dialogInfo.cptName"
					ref="cpt"
					:form="row"
					:disabled="readOnlyDialog"
				></component>
				<span slot="footer" class="dialog-footer">
					<el-button
						size="small"
						v-if="readOnlyDialog"
						@click="dialogVisible = false"
						>关 闭</el-button
					>
					<el-button
						size="small"
						v-if="!readOnlyDialog"
						@click="dialogVisible = false"
						>取 消</el-button
					>
					<el-button
						size="small"
						v-if="!readOnlyDialog"
						type="primary"
						@click="confirm()"
						>确 定</el-button
					>
				</span>
			</el-dialog>
		</el-form>
	</div>
</template>

<script>
//注册自定义组件
import registerCpt from './registerCpt';
export default {
	name: 'jh-table',
	mixins: [registerCpt],
	components: {
		'jh-column': (resolve) => resolve(require('./column/index')),
	},
	props: {
		//表格数据
		data: {
			type: Array,
			default: () => [],
		},
		columnList: {
			type: Array,
			default: () => [],
		},
		dialogInfo: {
			type: Object,
			default: () => {
				return { cptName: '', title: '新增/修改信息', width: '1000px' };
			},
		},
		isDialog: {
			type: Boolean,
			default: () => false,
		},
		isExternal: {
			type: Boolean,
			default: () => false,
		},
		disabled: {
			type: Boolean,
			default: () => false,
		},
	},

	data() {
		return {
			dialogVisible: false,
			form: {
				dataList: [],
			},
			valid: false,
			readOnlyDialog: false,
			row: null,
		};
	},

	created() {
		this.init();
	},
	watch: {
		columnList: {
			handler: function(val) {
				this.init();
			},
			deep: true,
		},
		data: {
			handler: function(val) {
				this.form.dataList = val;
			},
			deep: true,
		},
	},
	methods: {
		//初始化render
		init() {
			this.form.dataList = this.data;
			this.columnList = this.initRender(this.columnList);
			this.$nextTick(() => {
				this.$refs.formTable.doLayout();
			});
		},
		initRender(list) {
			for (const iterator of list) {
				if (iterator.valueType) {
					iterator.className = 'form';
					switch (iterator.valueType) {
						case 'input':
							iterator.render = (h, scope) => {
								let that = this;
								return h(
									'el-form-item',
									{
										props: {
											size: 'mini',
											label: '',
											prop: iterator.isRequired
												? 'dataList.' + scope.$index + '.' + iterator.prop
												: '',
											rules: [
												{ required: true, message: '请输入', trigger: 'blur' },
											],
										},
									},
									[
										h('el-input', {
											on: {
												input: (value) => {
													scope.row[iterator.prop] = value;
												},
												change: (value) => {
													scope._self.confirm(scope.row, scope.$index);
												},
											},
											props: {
												size: 'mini',
												value: scope.row[iterator.prop],
												type: 'text',
												list: iterator.list,
												maxlength: iterator.maxlength
													? iterator.maxlength
													: '50',
												disabled:
													that.disabled || iterator.disabled ? true : false,
											},
										}),
									]
								);
							};
							break;

						case 'number':
							iterator.render = (h, scope) => {
								let that = this;
								return h(
									'el-form-item',
									{
										props: {
											size: 'mini',
											label: '',
											prop: iterator.isRequired
												? 'dataList.' + scope.$index + '.' + iterator.prop
												: '',
											rules: [
												{ required: true, message: '请输入', trigger: 'blur' },
											],
										},
									},
									[
										h('jh-number', {
											on: {
												input: (value) => {
													scope.row[iterator.prop] = value;
												},
												change: (value) => {
													scope._self.confirm(scope.row, scope.$index);
												},
											},
											props: {
												size: 'mini',
												value: scope.row[iterator.prop],
												type: 'text',
												isMoney: iterator.isMoney ? iterator.isMoney : false,
												decimalNumber: iterator.decimalNumber,
												min: iterator.min,
												max: iterator.max,
												contentPosition: iterator.contentPosition,
												maxlength: iterator.maxlength
													? iterator.maxlength
													: '50',
												disabled:
													that.disabled || iterator.disabled ? true : false,
											},
										}),
									]
								);
							};
							break;
						case 'date':
							iterator.render = (h, scope) => {
								let that = this;
								return h(
									'el-form-item',
									{
										props: {
											size: 'mini',
											label: '',
											prop: iterator.isRequired
												? 'dataList.' + scope.$index + '.' + iterator.prop
												: '',
											rules: [
												{
													required: true,
													message: '请选择',
													trigger: 'change',
												},
											],
										},
										style: {
											width: '100%',
										},
									},
									[
										h('el-date-picker', {
											on: {
												input: (value) => {
													scope.row[iterator.prop] = value;
												},
												change: (event) => {
													scope._self.confirm(scope.row, scope.$index);
												},
											},
											style: {
												width: '100%',
											},
											props: {
												size: 'mini',
												value: scope.row[iterator.prop],
												type: 'date',
												format: iterator.format
													? iterator.format
													: 'yyyy-MM-dd',
												valueFormat: iterator.valueFormat
													? iterator.valueFormat
													: 'yyyy-MM-dd',
												disabled:
													that.disabled || iterator.disabled ? true : false,
											},
										}),
									]
								);
							};
							break;
						case 'month':
							iterator.render = (h, scope) => {
								let that = this;
								return h(
									'el-form-item',
									{
										props: {
											size: 'mini',
											label: '',
											prop: iterator.isRequired
												? 'dataList.' + scope.$index + '.' + iterator.prop
												: '',
											rules: [
												{
													required: true,
													message: '请选择',
													trigger: 'change',
												},
											],
										},
										style: {
											width: '100%',
										},
									},
									[
										h('el-date-picker', {
											on: {
												input: (value) => {
													scope.row[iterator.prop] = value;
												},
												change: (event) => {
													scope._self.confirm(scope.row, scope.$index);
												},
											},
											style: {
												width: '100%',
											},
											props: {
												size: 'mini',
												value: scope.row[iterator.prop],
												type: 'month',
												format: iterator.format ? iterator.format : 'yyyy-MM',
												valueFormat: iterator.valueFormat
													? iterator.valueFormat
													: 'yyyy-MM',
												disabled:
													that.disabled || iterator.disabled ? true : false,
											},
										}),
									]
								);
							};
							break;
						case 'select':
							iterator.render = (h, scope) => {
								let that = this;
								return h(
									'el-form-item',
									{
										props: {
											size: 'mini',
											label: '',
											prop: iterator.isRequired
												? 'dataList.' + scope.$index + '.' + iterator.prop
												: '',
											rules: [
												{
													required: true,
													message: '请选择',
													trigger: 'change',
												},
											],
										},
									},
									[
										h('enuSelect', {
											on: {
												input: (value) => {
													scope.row[iterator.prop] = value;
												},
												change: (value) => {
													scope._self.confirm(scope.row, scope.$index);
												},
											},
											style: {
												width: '100%',
											},
											props: {
												size: 'mini',
												value: scope.row[iterator.prop],
												type: iterator.selectType,
												list: iterator.list,
												disabled:
													that.disabled || iterator.disabled ? true : false,
											},
										}),
									]
								);
							};
							break;
						case 'checkBox':
							iterator.render = (h, scope) => {
								let that = this;
								return h(
									'el-form-item',
									{
										props: {
											size: 'mini',
											label: '',
											prop: iterator.isRequired
												? 'dataList.' + scope.$index + '.' + iterator.prop
												: '',
											rules: [
												{
													required: true,
													message: '请选择',
													trigger: 'change',
												},
											],
										},
									},
									[
										h('el-checkbox', {
											on: {
												input: (value) => {
													scope.row[iterator.prop] = value;
												},
												change: (value) => {
													scope._self.confirm(scope.row, scope.$index);
												},
											},
											props: {
												size: 'mini',
												value: scope.row[iterator.prop],
												disabled:
													that.disabled || iterator.disabled ? true : false,
											},
										}),
									]
								);
							};
							break;
						default:
							break;
					}
				} else {
					iterator.className = 'text';
				}
				if (iterator.children && iterator.children.length > 0) {
					this.initRender(iterator.children);
				}
			}
			return list;
		},
		//弹窗提交事件
		confirm(row, index) {
			if (row) {
				this.$emit('editData', row, index);
			} else {
				if (this.$refs.cpt.submit()) {
					this.$emit('editData', this.$refs.cpt.submit());
					this.closeDialog();
				}
			}
		},
		//校验表单
		submit() {
			this.$refs['jhTableForm'].validate((valid) => {
				this.valid = valid;
			});
			return this.valid;
		},
		//关闭弹窗
		closeDialog() {
			this.dialogVisible = false;
		},
		//添加数据
		addRow() {
			if (this.isDialog) {
				this.row = null;
				this.readOnlyDialog = false;
				this.dialogVisible = true;
			} else if (this.isExternal) {
				this.$emit('addData');
			} else {
				this.row = {};
				for (const iterator of this.columnList) {
					if (iterator.prop) {
						this.row[iterator.prop] = '';
					}
				}
				this.form.dataList.push(JSON.parse(JSON.stringify(this.row)));
			}
		},
		//修改数据
		editRow(row) {
			this.row = JSON.parse(JSON.stringify(row));
			this.readOnlyDialog = false;
			this.dialogVisible = true;
		},
		//浏览数据
		readRow(row) {
			this.row = JSON.parse(JSON.stringify(row));
			this.readOnlyDialog = true;
			this.dialogVisible = true;
		},
		//删除数据
		deleteRow(row) {
			this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.$emit('deleteData', row);
				})
				.catch(() => {});
		},
		doLayout() {
			this.$refs.formTable.doLayout();
		},
		toggleAllSelection() {
			this.$refs.formTable.toggleAllSelection();
		},
		clearSelection() {
			this.$refs.formTable.clearSelection();
		},
		toggleRowSelection(row, selected) {
			this.$refs.formTable.toggleRowSelection(row, selected);
		},
		toggleRowExpansion(row, expanded) {
			this.$refs.formTable.toggleRowExpansion(row, expanded);
		},
		setCurrentRow(row) {
			this.$refs.formTable.setCurrentRow(row);
		},
		clearSort() {
			this.$refs.formTable.clearSort();
		},
		clearFilter(columnKey) {
			this.$refs.formTable.clearFilter(columnKey);
		},
		sort(prop, order) {
			this.$refs.formTable.sort(prop, order);
		},
	},
};
</script>
<style lang="scss" scoped>
/deep/ .editBtn {
	padding: 2px !important;
}
/deep/ .el-date-editor.el-input,
.el-date-editor.el-input__inner {
	width: auto;
}
/deep/ .jh-table .cell {
	.el-form-item--mini.is-error {
		margin-bottom: 0px !important;
	}
}
/deep/ .el-collapse-item__header {
	font-size: 16px;
	font-weight: 800;
}
</style>
