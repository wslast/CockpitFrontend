<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 表格列
-->
<template>
	<el-table-column
		class="cell"
		v-bind="$attrs"
		v-on="$listeners"
		:prop="column.prop"
		:label="column.label"
		:type="column.type"
		:index="column.index"
		:column-key="column.columnKey"
		:width="column.width"
		:min-width="column.minWidth"
		:fixed="column.fixed"
		:render-header="column.renderHeader"
		:sortable="column.sortable || false"
		:sort-method="column.sortMethod"
		:sort-by="column.sortBy"
		:sort-orders="column.sortOrders"
		:resizable="column.resizable || true"
		:formatter="column.formatter"
		:show-overflow-tooltip="column.showOverflowTooltip"
		:align="column.align || align || 'left'"
		:header-align="
			column.headerAlign || headerAlign || column.align || align || 'left'
		"
		:class-name="column.className"
		:label-class-name="column.labelClassName"
		:selectable="column.selectable"
		:reserve-selection="column.reserveSelection || false"
		:filters="column.filters"
		:filter-placement="column.filterPlacement"
		:filter-multiple="column.filterMultiple"
		:filter-method="column.filterMethod"
		:filtered-value="column.filteredValue"
	>
		<template slot="header" slot-scope="scope">
			<jh-render
				v-if="column.renderHeader"
				:scope="scope"
				:render="column.renderHeader"
			>
			</jh-render>
			<span v-else>{{ scope.column.label }}</span>
		</template>

		<template slot-scope="scope">
			<jh-render :scope="scope" :render="column.render"> </jh-render>
		</template>

		<template v-if="column.children">
			<jh-column
				v-for="(col, index) in column.children"
				:key="index"
				:column="col"
			>
			</jh-column>
		</template>
	</el-table-column>
</template>

<script>
//常规渲染
import forced from './forced.js';
export default {
	name: 'JHColumn',
	props: {
		column: Object,
		headerAlign: String,
		align: String,
	},
	components: {
		'jh-render': (resolve) => resolve(require('./jh-render')),
	},
	methods: {
		setColumn() {
			//列类型
			if (this.column.type) {
				this.column.renderHeader = forced[this.column.type].renderHeader;
				this.column.render =
					this.column.render || forced[this.column.type].renderCell;
			}
			//数据格式化
			if (this.column.formatter) {
				this.column.render = (h, scope) => {
					return h(
						'span',
						{
							domProps: {
								innerHTML: scope.column.formatter(
									scope.row,
									scope.column,
									scope.store,
									scope.$index
								),
							},
						},
						[]
					);
				};
			}
			//自定义元素内容
			if (!this.column.render) {
				this.column.render = (h, scope) => {
					return h(
						'span',
						{
							domProps: {
								innerHTML: scope.row[scope.column.property],
							},
						},
						[]
					);
				};
			}
		},
	},
	watch: {
		column: {
			handler() {
				this.setColumn();
			},
			immediate: true,
		},
	},
};
</script>
