<!--
 * @Author: Junchi Zhao
 * @LastEditors: zjc2684613 1984937455@qq.com
 * @Description: 枚举选择器
-->
<template>
	<el-select
		v-model="selectVal"
		@change="setValName"
		v-bind="$attrs"
		clearable
		:disabled="disabled"
		v-on="$listeners"
	>
		<el-option
			v-for="item in options"
			:key="item.id"
			:label="item.codeName"
			:value="item.codeValue"
		>
		</el-option>
	</el-select>
</template>

<script>
export default {
	name: 'enuSelect',
	components: {},
	props: {
		//接口末尾值
		type: {
			type: String,
			default: () => '',
		},
		//对应绑定事件
		value: {
			type: [String, Array],
			default: () => '',
		},
		list: {
			type: Array,
			default: () => [],
		},
		valName: {
			type: String | Array,
			default: () => '',
		},
		disabled: {
			type: Boolean,
			default: () => false,
		},
	},

	computed: {
		selectVal: {
			get: function() {
				return this.value;
			},
			set: function(val) {
				return val;
			},
		},
	},
	watch: {
		list: {
			handler: function(val) {
				if (!this.type) {
					this.options = JSON.parse(JSON.stringify(val));
				}
			},
			immediate: true,
		},
	},
	data() {
		return {
			options: [],
		};
	},

	created() {
		if (this.type) {
			this.getData();
		}
	},

	methods: {
		getData() {
			this.$api
				.formPost('/api/basfun/syscode/query/doGetItemsByCode', {
					sysCode: this.type,
				})
				.then((res) => {
					if (res.retHead.code == '0000000') {
						this.options = res.retBody;
					}
				});
		},
		setValName(val) {
			if (!val) {
				this.$emit(`update:valName`, '');
			} else if (this.isString(val)) {
				this.$emit(
					`update:valName`,
					this.options.filter((item) => {
						return val === item.codeValue;
					})[0].codeName
				);
			} else if (this.isArray(val)) {
				this.$emit(
					`update:valName`,
					val.map((v) => {
						return this.options.filter((item) => {
							return v === item.codeValue;
						})[0].codeName;
					})
				);
			}
		},
	},
};
</script>
<style lang="scss" scoped></style>
