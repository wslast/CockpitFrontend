<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 文件浏览
-->
<template>
	<div class="previewFile">
		<div class="leftSlider" v-if="isArray(previewFileData)">
			<el-card style="height:100%;">
				<el-tree
					ref="tree"
					:data="previewFileData"
					:current-node-key="current"
					node-key="id"
					default-expand-all
					highlight-current
					:props="defaultProps"
					@node-click="handleNodeClick"
				></el-tree>
			</el-card>
		</div>
		<div
			:class="{
				contentArray: isArray(previewFileData),
				contentObject: isObject(previewFileData),
			}"
			v-loading="loading"
		>
			<iframe
				v-if="url"
				:key="new Date().getTime()"
				:src="url"
				frameborder="0"
				height="100%"
				width="100%"
			></iframe>
		</div>
	</div>
</template>

<script>
import { Base64 } from 'js-base64';
import config from '../../config';
export default {
	name: 'previewFile',

	data() {
		return {
			loading: false,
			pictures: [],
			baseUrl: config.previewURL,
			url: '', //预览服务地址
			current: '',
		};
	},
	computed: {
		previewFileData() {
			return JSON.parse(window.sessionStorage.previewFileData);
		},
		defaultProps() {
			if (window.sessionStorage.defaultProps) {
				return JSON.parse(window.sessionStorage.defaultProps);
			} else {
				return { children: 'children', label: 'label' };
			}
		},
		currentFile() {
			return window.sessionStorage.currentFile;
		},
	},
	mounted() {
		this.getPictures();
		this.init();
	},
	methods: {
		init() {
			if (this.isObject(this.previewFileData)) {
				this.current = this.currentFile;
				this.handleNodeClick(this.previewFileData);
			} else if (this.isArray(this.previewFileData)) {
				if (this.currentFile) {
					this.current = this.currentFile;
					this.setDefaultUrl(this.previewFileData, this.current);
				} else {
					this.setDefaultUrl(this.previewFileData);
				}
			}
		},
		//假如没指定 默认查找第一个url显示 传id就去递归找id
		setDefaultUrl(list, id) {
			for (const iterator of list) {
				if (iterator.url) {
					if (id) {
						if (id == iterator.id) {
							this.$refs.tree.setCurrentKey(iterator.id, true);
							this.handleNodeClick(iterator);
						}
					} else {
						this.current = iterator.id;
						this.$refs.tree.setCurrentKey(iterator.id, true);
						this.handleNodeClick(iterator);
					}
				} else if (iterator.children && iterator.children.length > 0) {
					this.setDefaultUrl(iterator.children, id);
				}
			}
		},
		/**
		 * @description: 判断是否图片
		 * @param {*} fileName
		 * @return {*}
		 * @author: Junchi Zhao
		 */
		isPicture(fileName) {
			if (!fileName) {
				return false;
			} else {
				return /\.(bmp|jpg|jpeg|png|GIF|BMP|JPG|PNG)$/.test(fileName);
			}
		},
		handleNodeClick(data) {
			if (data.url) {
				this.loading = true;
				this.url = '';
				this.$nextTick(() => {
					if (this.isPicture(this.getQuery('fullfilename', data.url))) {
						let urls = this.pictures
							.filter((item) => item.id != data.id)
							.map((item) => item.url);
						urls.unshift(data.url);
						this.url =
							config.previewURL +
							'/picturesPreview?urls=' +
							window.encodeURIComponent(Base64.encode(urls.join('|')));
					} else {
						this.url =
							config.previewURL +
							'/onlinePreview?url=' +
							window.encodeURIComponent(Base64.encode(data.url));
					}
					this.loading = false;
				});
			}
		},
		getQuery(name, url) {
			if (!url) {
				return;
			}
			let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
			let r = url.split('?')[1].match(reg);
			if (r != null) return unescape(r[2]);
			return '';
		},
		getPic(data) {
			for (const iterator of data) {
				if (
					iterator.url &&
					this.isPicture(this.getQuery('fullfilename', iterator.url))
				) {
					this.pictures.push(iterator);
				}
				if (
					iterator[this.defaultProps.children] &&
					iterator[this.defaultProps.children].length > 0
				) {
					this.getPic(iterator[this.defaultProps.children]);
				}
			}
		},
		getPictures() {
			if (this.previewFileData && this.isArray(this.previewFileData)) {
				this.getPic(this.previewFileData);
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.previewFile {
	height: 100%;
	display: flex;
	.leftSlider {
		height: 100%;
		width: 200px;
	}
	.contentArray {
		width: calc(100% - 200px);
		padding: 10px;
	}
	.contentObject {
		width: 100%;
		padding: 10px;
	}
}
/deep/ .el-tree-node__label {
	overflow: hidden;
}
</style>
