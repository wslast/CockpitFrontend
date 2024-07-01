<!-- 银行下拉框 -->
<template>
	<el-cascader
		ref="cascader"
		v-bind="$attrs"
		v-on="$listeners"
		@change="handleChange"
		v-model="val"
		:props="props"
		:options="options"
		placeholder="请选择"
		style="width:100%;"
		filterable
	></el-cascader>
</template>

<script>
import config from '../../../config';
export default {
	name: 'cascader',
	components: {},

	props: {
		value: {
			type: Object,
			default: () => {},
		},
		// endName 是末尾code  labelName是银行中文名
		attr: {
			type: Object,
			default: () => {},
		},
		labelWidth: {
			type: String,
			default: '',
		},
	},

	data() {
		return {
			form: { value: [], formValue: '' },
			options: [],
			props: {
				label: 'name',
				value: 'code',
				expandTrigger: 'hover',
				checkStrictly: true,
			},
			label: '银行:',
			labelName: '',
			val: [],
		};
	},
	watch: {
		value: {
			handler: function(newV, oldV) {
				if (
					newV &&
					newV[this.attr.name] &&
					this.isString(newV[this.attr.name])
				) {
					this.val = newV[this.attr.name].split(',');
				}
			},
			deep: true,
		},
		changeValue: {
			handler: function(newV, oldV) {
				if (this.isArray(newV)) {
					this.value[this.attr.name] = newV.join(',');
					if (newV.length > 0 && this.attr.endName) {
						this.value[this.attr.endName] = newV[newV.length - 1];
					}
					if (newV.length > 0 && this.attr.labelName) {
						if (this.attr.type === 'area') {
							this.value[this.attr.labelName] = this.getAreaName(
								this.options,
								newV[newV.length - 1]
							);
						} else {
							this.value[this.attr.labelName] = this.getName(
								this.options,
								newV[newV.length - 1]
							);
						}
					}
				}
			},
			deep: true,
		},
	},
	computed: {
		changeValue: {
			get() {
				let arr = [];
				if (
					this.value &&
					this.value[this.attr.name] &&
					this.isString(this.value[this.attr.name])
				) {
					arr = this.value[this.attr.name].split(',');
					return arr;
				}
			},
			set(val) {
				if (val && this.isArray(val)) {
					if (this.value[this.attr.name] == val.join(',')) {
						return;
					}
					this.value[this.attr.name] = val.join(',');
					this.val = val;
					if (val.length > 0 && this.attr.endName) {
						this.value[this.attr.endName] = val[val.length - 1];
					}
					if (val.length > 0 && this.attr.labelName) {
						if (this.attr.type === 'area') {
							this.value[this.attr.labelName] = this.getAreaName(
								this.options,
								val[val.length - 1]
							);
						} else {
							this.value[this.attr.labelName] = this.getName(
								this.options,
								val[val.length - 1]
							);
						}
					}
				} else {
					this.$set(this.value, this.attr.name, val);
					// this.value[this.attr.name[0]] = val;
				}
			},
		},
	},
	created() {
		this.init();
	},

	methods: {
		init() {
			let url = '';
			if (config.baseURL) {
				url = config.baseURL;
			} else {
				url = JSON.parse(JSON.stringify(this.attr.url));
			}
			if (this.attr.type === 'bank') {
				url += '/api/major/bank/bank/doGetLayerBankObject';
			} else if (this.attr.type === 'area') {
				url += '/api/basfun/area/doGetJson';
				this.props.label = 'areaName';
				this.props.value = 'areaCode';
			} else if (this.attr.type === 'industry') {
				url += '/api/basfun/industry/doGetJson';
			} else if (this.attr.type === 'businessType') {
				url += '/api/major/servicetype/servicetype/doGetAll';
			}
			this.$api.formPost(url, {}).then((res) => {
				this.options = res.retBody;
			});
			if (this.changeValue) {
				this.val = this.changeValue;
			}
		},
		handleChange(value) {
			this.value[this.attr.name] = value.join(',');
		},
		getAreaName(list, id) {
			for (const iterator of list) {
				if (iterator.areaCode == id) {
					this.labelName = iterator.areaName;
				} else {
					if (iterator.children && iterator.children.length > 0) {
						this.getAreaName(iterator.children, id);
					}
				}
			}
			return this.labelName;
		},
		getName(list, id) {
			for (const iterator of list) {
				if (iterator.id == id) {
					this.labelName = iterator.name;
				} else {
					if (iterator.children && iterator.children.length > 0) {
						this.getName(iterator.children, id);
					}
				}
			}
			return this.labelName;
		},
		getCheckedNodes(val = false) {
			if (this.$refs.cascader) {
				return this.$refs.cascader.getCheckedNodes(val);
			} else {
				return null;
			}
		},
	},
};
</script>
