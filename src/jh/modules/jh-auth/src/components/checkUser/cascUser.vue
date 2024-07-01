<!-- 选择用户 -->
<template>
	<el-cascader
		filterable
		change-on-select
		:options="options"
		:props="cascProps"
		v-model="cascValue"
		style="width: 100%;"
	></el-cascader>
</template>

<script>
export default {
	name: 'cascUser',
	props: {
		value: {
			type: Array | String,
			default: [],
		},
	},

	data() {
		return {
			options: [],
			cascProps: {
				value: 'id',
				label: 'organName',
				children: 'children',
			},
		};
	},

	computed: {
		cascValue: {
			get() {
				return this.value;
			},
			set(v) {
				this.$emit('input', v);
			},
		},
	},

	created() {
		this.getGlbOptions();
	},

	methods: {
		getGlbOptions() {
			this.$api
				.formPost('/api/auth/sysorgan/doGetSysOrganObject', {})
				.then((res) => {
					if (res.retHead.code == '0000000') {
						this.options = this.deleteChildren(res.retBody);
					}
				});
		},
	},
};
</script>
<style lang="scss" scoped></style>
