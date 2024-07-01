<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 分页
-->
<template>
	<div class="pager">
		<el-pagination
			v-if="pager && Object.keys(pager).length > 0"
			@size-change="sizeChange"
			@current-change="pageChange"
			:current-page="pager.page"
			:page-size="pager.size"
			layout="total, sizes, prev, pager, next, jumper"
			:total="pager.total"
		>
		</el-pagination>
	</div>
</template>

<script>
export default {
	name: 'pager',
	components: {},
	props: {
		pager: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {};
	},

	computed: {},

	created() {},

	methods: {
		sizeChange(val) {
			let page = JSON.parse(JSON.stringify(this.pager));
			page.page = 1;
			page.size = val;
			this.$emit('update:pager', page);
			this.$emit('getData');
		},
		pageChange(val) {
			let page = JSON.parse(JSON.stringify(this.pager));
			page.page = val;
			this.$emit('update:pager', page);
			this.$emit('getData');
		},
	},
};
</script>
<style lang="scss" scoped></style>
