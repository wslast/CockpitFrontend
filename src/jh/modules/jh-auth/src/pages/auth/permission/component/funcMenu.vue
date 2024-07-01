<!--  -->
<template>
	<div class="funcMenu">
		<div class="fg1 ova">
			<el-table
				:data="tableData"
				height="100%"
				row-key="id"
				ref="table"
				:border="false"
				default-expand-all
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
				@select-all="selectALl"
				@select="select"
				@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="55"> </el-table-column>
				<el-table-column
					prop="functionName"
					align="left"
					label="操作菜单"
					width="150"
				>
				</el-table-column>
				</el-table-column>
				<el-table-column
					:show-overflow-tooltip="false"
					:align="'left'"
					label="子页面及功能"
				>
					<template slot-scope="scope">
						<div
							v-if="scope.row.functionList && scope.row.functionList.length > 0"
						>
							<el-checkbox
								class="checkbox"
								@change="setParent(scope.row)"
								v-model="item.ownerFlag"
								v-for="item in scope.row.functionList"
								:key="item.id"
							>
								{{ item.functionName }}</el-checkbox
							>
						</div>
					</template>
				</el-table-column>
				<el-table-column :show-overflow-toolt="false" label="全选" width="80">
					<template slot-scope="scope">
						<el-checkbox
							@change="setAll(scope.row)"
							v-if="scope.row.functionList.length > 0"
							v-model="scope.row.isSelect"
						></el-checkbox>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="df jce mt15">
			<el-button type="primary" @click="() => $emit('save')">保存</el-button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'funcMenu',
	props: {
		roleId: {
			type: String,
			default: '',
		},
	},

	data() {
		return {
			tableData: [],
			selectRows: [],
		};
	},
	watch: {
		roleId: {
			handler: function(val) {
				if (val) {
					this.getFuncMenuListByRoleId({
						roleId: val,
						menuFlag: 0,
					});
				}
			},
			immediate: true,
		},
	},

	computed: {},
	methods: {
		selectALl(selection) {
			for (const iterator of this.tableData) {
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
		save(list) {
			let funcs = [];
			funcs = funcs.concat(this.getSelectFunc(this.tableData, []));
			for (const iterator of this.selectRows) {
				funcs.push(iterator.id);
			}
			return funcs;
		},
		getSelectFunc(list, result) {
			for (const iterator of list) {
				if (iterator.functionList && iterator.functionList.length > 0) {
					for (const item of iterator.functionList) {
						if (item.ownerFlag) {
							result.push(item.id);
						}
					}
				}
				if (iterator.children && iterator.children.length > 0) {
					this.getSelectFunc(iterator.children, result);
				}
			}
			return result;
		},
		setAll(item) {
			if (item.isSelect) {
				item.functionList.forEach((item) => {
					item.ownerFlag = true;
				});
			} else {
				item.functionList.forEach((item) => {
					item.ownerFlag = false;
				});
			}
		},
		setParent(item) {
			let isSelect = true;
			for (const iterator of item.functionList) {
				if (!iterator.ownerFlag) {
					isSelect = iterator.ownerFlag;
				}
			}
			item.isSelect = isSelect;
		},
		getFuncMenuListByRoleId(params) {
			this.$api
				.formPost('/api/auth/sysrolefun/doGetAllFunctionJsonByRoleId', params)
				.then((res) => {
					this.tableData = this.setIsSelect(res.retBody);
					this.$nextTick(() => {
						this.setMenuSelet(this.tableData);
					});
				});
		},

		/**
		 * @description: 设置全选状态
		 * @param {*} list
		 * @return {*}
		 * @author: Junchi Zhao
		 */
		setMenuSelet(list) {
			if (list.length > 0) {
				for (const iterator of list) {
					if (iterator.ownerFlag) {
						this.$refs.table.toggleRowSelection(iterator, true);
					}
					if (iterator.children && iterator.children.length > 0) {
						this.setMenuSelet(iterator.children);
					}
				}
			}
		},
		/**
		 * @description: 设置全选状态
		 * @param {*} list
		 * @return {*}
		 * @author: Junchi Zhao
		 */
		setIsSelect(list) {
			if (list.length > 0) {
				for (const iterator of list) {
					if (iterator.functionList && iterator.functionList.length > 0) {
						let isSelect = true;
						for (const item of iterator.functionList) {
							if (!item.ownerFlag) {
								isSelect = false;
							}
						}
						iterator.isSelect = isSelect;
					}
					if (iterator.children && iterator.children.length > 0) {
						this.setIsSelect(iterator.children);
					}
				}
			}
			return list;
		},
	},
};
</script>
<style lang="scss" scoped>
.funcMenu {
	flex-grow: 1;
	height: 100%;
	display: flex;
	flex-direction: column;
	.checkbox {
		margin: 0px 30px 0px 0px;
	}
}
/deep/ .el-table tr,
.el-table td {
	height: auto !important;
	vertical-align: top;
}
/deep/ .el-table .el-table__body .cell {
	height: 100%;
	min-height: 37px !important;
	white-space: pre-wrap !important;
	line-height: 37px;
}
/deep/ .el-table .el-table__body td {
	vertical-align: top !important;
}
</style>
