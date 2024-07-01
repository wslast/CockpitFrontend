<!--
 * @Author: Junchi Zhao
 * @LastEditors: zjc2684613 1984937455@qq.com
 * @Description: 
-->
<template>
	<el-input
		:class="[contentPosition ? 'position-' + contentPosition : '']"
		v-bind="$attrs"
		v-model.trim="formVal"
		clearable
		v-on="$listeners"
		@focus="focus"
		@blur="formatValBlur"
		@input="input"
		@change="formatVal"
	>
		<template slot="prefix">
			<slot name="prefix"></slot>
		</template>
		<template slot="suffix">
			<slot name="suffix"></slot>
		</template>
		<template slot="prepend">
			<slot name="prepend"></slot>
		</template>
		<template slot="append">
			<slot name="append"></slot>
		</template>
	</el-input>
</template>

<script>
export default {
	name: 'number',
	props: {
		value: {
			type: String | Number,
			default: () => {},
		},
		isMoney: {
			type: Boolean,
			default: () => true,
		},
		//设置保留几位
		decimalNumber: {
			type: Number,
			default: () => 2,
		},
		min: {
			type: Number,
			default: () => null,
		},
		max: {
			type: Number,
			default: () => null,
		},
		contentPosition: {
			type: String,
			default: () => 'right',
		},
	},
	data() {
		return {
			formVal: '',
		};
	},
	watch: {
		value: {
			handler: function(val) {
				if (!this.isZero(val)) {
					return;
				}
				if (parseFloat(val) === 0) {
					this.resetToZero(val);
					return;
				}
				//console.log(val);
				//console.log(this.formVal);
				//外部强制改变v-model值时判断 优先外部传入值 将formVal重置为val的值
				if (
					val &&
					this.formVal &&
					parseFloat(val) != parseFloat(this.formVal)
				) {
					if (this.isMoney) {
						this.formVal = val.toString().replace(/\d+/, function(s) {
							return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
						});
					} else {
						this.formVal = val.toString();
					}
				} else if (val && !this.formVal) {
					//初始化时formVal为空 v-model有值时将val格式化后赋值给formVal
					if (this.isMoney) {
						this.formVal = val.toString().replace(/\d+/, function(s) {
							return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
						});
					} else {
						this.formVal = val.toString();
					}
				}
			},
			immediate: true,
		},
	},
	methods: {
		isZero(val) {
			if (val === '' || val === undefined || val === null) {
				this.formVal = '';
				return false;
			} else {
				return true;
			}
		},
		resetToZero(val) {
			if (!val) {
				let defaultVal = 0;
				this.formVal = defaultVal.toFixed(this.decimalNumber);
			}
		},
		input(val) {
			if (!this.isZero(this.formVal)) {
				return;
			}
			if (val.length > 18) {
				val = val.slice(0, 18);
			}
			val = val.replace(/[^\d.-]/g, ''); //清除"数字"和"."以外的字符
			val = val.replace(/^\./g, '');
			let first = '';
			if (val[0] === '-') {
				first = '-';
			}
			if (val.indexOf('-') > -1 && val.lastIndexOf('-') != 0) {
				val = val.replaceAll('-', '');
			}
			val = first + val;

			val = val.replace(/^\./g, ''); //验证第一个字符是数字
			val = val.replace(/\.{2,}/g, '.'); //只保留第一个, 清除多余的
			val = val.replace(/\-{2,}/g, '-'); //只保留第一个, 清除多余的
			val = val
				.replace('.', '$#$')
				.replace(/\./g, '')
				.replace('$#$', '.');
			if (this.max != null && parseFloat(val) > this.max) {
				val = this.max.toString();
			}
			if (this.decimalNumber - 0 > 0) {
				let reg = new RegExp(
					`^(\\-)*(\\d+)\\.(\\d{1,${this.decimalNumber + ''}}).*$`
				);
				val = val.replace(reg, '$1$2.$3');
			}
			this.$nextTick(() => {
				this.formVal = val;
			});
		},
		focus() {
			try {
				if (!this.isZero(this.formVal)) {
					return;
				}
				if (!parseFloat(this.formVal)) {
					this.formVal = '0';
				}
				this.formVal = this.formVal.replace(/,/g, '');
				if (this.formVal) {
					this.formVal = parseFloat(this.formVal).toFixed(this.decimalNumber);
				} else {
					this.formVal = '0';
				}
			} catch (error) {
				//console.error(error);
			}
		},
		formatValBlur() {
			if (!this.isZero(this.formVal)) {
				return;
			}
			if (this.min != null && this.min > parseFloat(this.formVal)) {
				this.formVal = this.min.toString();
				this.$emit('input', this.min);
			}
			if (this.formVal) {
				let val = parseFloat(this.formVal).toFixed(this.decimalNumber);
				if (this.isMoney) {
					val = val.replace(/\d+/, function(s) {
						return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
					});
				}
				this.formVal = '0';
				this.$nextTick(() => {
					if (parseFloat(this.formVal) === 0 && 0 === parseFloat(val)) {
						this.$emit('input', 0);
					} else {
						this.formVal = val;
					}
				});
			} else {
				this.resetToZero(this.formVal);
			}
		},
		formatVal(event) {
			try {
				if (!this.isZero(event)) {
					this.$emit('input', 0);
					return;
				}
				event = event.replace(/,/g, '');
				if (event) {
					event = parseFloat(event).toFixed(this.decimalNumber);
				} else {
					event = 0;
				}
				this.$nextTick(() => {
					this.$emit('input', event);
				});
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>
<style lang="scss" scoped>
//判断时候有后置插槽
.noSuffix {
	/deep/ .el-input__inner {
		padding-right: 3px;
	}
}
.position-right {
	/deep/ .el-input__inner {
		text-align: right !important;
	}
}
.position-left {
	/deep/ .el-input__inner {
		text-align: left !important;
	}
}
</style>
