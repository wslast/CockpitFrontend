<!--
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 自定义弹窗模板
-->
<template>
	<el-dialog
		v-bind="$attrs"
		:fullscreen="isFull"
		:close-on-click-modal="
			$attrs['close-on-click-modal'] ? $attrs['close-on-click-modal'] : false
		"
		v-on="$listeners"
	>
		<!-- <slot name="dialog" /> -->
		<template slot="title">
			<div class="title">
				<div class="titleContent">{{ title }}</div>
				<div class="flexBlank"></div>
				<slot name="titleBtns"></slot>
				<i class="el-icon-full-screen" @click="setFullscreen"></i>
			</div>
		</template>
		<slot name="body" />
		<template slot="footer">
			<slot name="footer" />
		</template>
	</el-dialog>
</template>

<script>
export default {
	name: 'baseDialog',
	inheritAttrs: false, //设置不将attr附加到子组件上
	props: {
		title: {
			type: String,
			default: () => '默认',
		},
		fullscreen: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			isFull: false,
			height: 'auto',
		};
	},

	mounted() {
		//初始化title,防止冲突
		this.$el.title = '';
		this.isFull = JSON.parse(JSON.stringify(this.fullscreen));
	},

	methods: {
		escListen(e) {
			document.addEventListener('keydown', (e) => {
				if (e.keyCode === 27) {
				}
			});
		},
		setFullscreen() {
			this.isFull = !this.isFull;
			this.$emit('isFullScreen', this.isFull);
			const dialogBodyContentEl = this.getFirstChild(
				this.$el.querySelector('.el-dialog__body')
			);
			if (dialogBodyContentEl.style.height != 'auto') {
				this.height = dialogBodyContentEl.style.height;
			}
			if (this.isFull) {
				dialogBodyContentEl.style.height = 'auto';
			} else {
				dialogBodyContentEl.style.height = this.height;
			}
		},
		//获取真实的第一个dom节点
		getFirstChild(elem) {
			let elem_child = elem.children;
			let first = null;
			for (let i = 0; i < elem_child.length; i++) {
				if (
					!(
						elem_child[i].nodeName === '#text' &&
						!/\s/.test(elem_child.nodeValue)
					)
				) {
					first = elem_child[i];
					break;
				}
			}
			return first;
		},
	},
};
</script>

<style lang="scss" scoped>
.title {
	display: flex;
	margin-right: 25px;
	font-size: 14px;

	.titleContent {
		line-height: 24px !important;
		font-size: 16px !important;
		color: #303133 !important;
		font-weight: 600 !important;
	}

	.flexBlank {
		flex-grow: 1;
	}
}

.el-icon-full-screen {
	cursor: pointer;
}

.flexFooter {
	display: flex;
	justify-content: flex-end;
}
</style>
