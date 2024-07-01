<template>
	<div class="tree-container containter">
		<div class="tree-box">
			<div class="tree-nav">
				<div class="item">
					<el-checkbox
						v-model="isCheckedAll"
						:indeterminate="isIndeterminate"
						:disabled="treeData.length === 0"
						class="checkbox-style"
						@change="handleCheckAllChange"
					>
					</el-checkbox
					>名称
				</div>
				<div class="item">子页面及功能</div>
			</div>
			<div v-loading="loading" class="tree-content">
				<el-tree
					ref="tree"
					:data="treeData"
					node-key="directoryId"
					:props="props"
					show-checkbox
					default-expand-all
					@check="handleCheckChange"
					@check-change="handleCurChange"
				>
					<span slot-scope="{ node, data }" class="custom-tree-node">
						<template>
							<div v-if="data.directoryType === 1" class="node_div">
								<span class="name-box">
									<el-tooltip effect="dark" placement="left">
										<div slot="content">
											{{ node.label }}
										</div>
										<i class="file-icon icon-folder"></i>
									</el-tooltip>
									{{ node.label }}
								</span>
								<span class="secret-box">
									{{ data.secretType | secretType }}
								</span>
								<span class="download-box">
									{{ data.downloadType | downloadStatus }}
								</span>
								<span class="operate-box">
									<el-button
										type="text"
										size="small"
										@click.stop="() => handleShare(data, 2)"
										>分享</el-button
									>
								</span>
							</div>
							<div v-if="data.directoryType === 2" class="node_div">
								<span class="name-box" :title="node.label">
									<el-tooltip effect="dark" placement="left">
										<div slot="content">
											{{ node.label }}
										</div>
										<i :class="node.label | getIcon"></i>
									</el-tooltip>
									{{ node.label }}
								</span>
								<span class="size-box">
									{{ data.size | renderSize }}
								</span>
								<span class="time-box">
									{{ $DayTime(data.gmtUpdate).format('YYYY-MM-DD HH:mm') }}
								</span>
								<span class="upload-box">
									{{ $DayTime(data.gmtUpload).format('YYYY-MM-DD HH:mm') }}
								</span>
								<span class="secret-box">
									{{ data.secretType | secretType }}
								</span>
								<span class="download-box">
									{{ data.downloadType | downloadStatus }}
								</span>
								<span class="operate-box">
									<el-button
										v-if="data.downloadType === 1"
										type="text"
										size="small"
										@click="() => handleDownload(data, 2)"
										>下载</el-button
									>
									<el-button
										type="text"
										size="small"
										@click="() => handleShare(data, 2)"
										>分享</el-button
									>
								</span>
							</div>
						</template>
					</span>
				</el-tree>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Tree',
	data() {
		return {
			loading: false, // 页面预加载
			isCheckedAll: false, // 是否全选状态
			isIndeterminate: false, // 是否半选状态
			isMultipleDownload: true, // 批量下载按钮是否禁用
			isMultipleShare: true, // 批量分享按钮是否禁用
			newTreeArray: [], // 过滤新数组
			totalNum: 0, // 统计文件数
			selectTotalNum: 0, // 选中文件数
			props: {
				// 配置选项
				children: 'children',
				label: 'name',
				isLeaf: 'leaf',
			},
			treeData: [],
		};
	},
	computed: {},
	mounted() {
		this.getTotalNum(this.treeData);
	},
	methods: {
		// 目录树是否全选
		async handleCheckAllChange(val) {
			console.log('是否全选===', val);
			let tree = this.treeData;
			this.isMultipleShare = !val;
			this.isIndeterminate = false;
			if (val) {
				// 全选
				this.$refs.tree.setCheckedNodes(tree);
			} else {
				// 取消全选
				this.$refs.tree.setCheckedNodes([]);
			}
			await this.selectCheckedAll(tree, val);
			this.selectTotalNum = 0;
			this.newTreeArray = await this.getFilterFile(tree);
			let downloadTypeArr = await this.getDownloadFile(this.newTreeArray);
			this.isMultipleDownload =
				downloadTypeArr.includes(0) > 0 ? true : this.newTreeArray.length === 0;
			setTimeout(() => {
				console.log('旧数组===', tree);
				console.log('downloadTypeArr===', downloadTypeArr);
				console.log('新数组===', this.newTreeArray, this.selectTotalNum);
			});
		},
		// 递归全选反选
		async selectCheckedAll(tree, checked) {
			for (let item of tree) {
				item.isChecked = checked;
				if (item.children) {
					await this.selectCheckedAll(item.children, checked);
				}
			}
		},
		// 当复选框被点击的时候触发
		async handleCheckChange(data, node) {
			// console.log(data, node)
			let tree = this.treeData;
			if (node.checkedNodes.length > 0) {
				await this.selectCheckedAll(node.checkedNodes, true);
				this.isMultipleShare = false;
			} else {
				this.isCheckedAll = false;
				this.isIndeterminate = false;
				this.isMultipleDownload = true;
				this.isMultipleShare = true;
				this.newTreeArray = [];
			}
			this.selectTotalNum = 0;
			this.newTreeArray = await this.getFilterFile(tree);
			this.isCheckedAll = this.newTreeArray.length === tree.length;
			this.isIndeterminate =
				this.newTreeArray.length > 0 && this.newTreeArray.length < tree.length;
			let downloadTypeArr = await this.getDownloadFile(this.newTreeArray);
			this.isMultipleDownload =
				downloadTypeArr.includes(0) > 0 ? true : this.newTreeArray.length === 0;
			setTimeout(() => {
				console.log('treeData===', tree, downloadTypeArr);
				console.log(
					'新数组newTreeArray===',
					this.newTreeArray,
					this.selectTotalNum
				);
			}, 500);
		},
		// 节点选中状态发生变化时的回调
		async handleCurChange(data, checked, indeterminate) {
			console.log(data, checked, indeterminate);
			if (!checked) {
				if (indeterminate) {
					data.isChecked = true;
				} else {
					data.isChecked = false;
					console.log(checked);
					await this.findParent(data, this.treeData, checked);
				}
				// data.isChecked = false;
			} else {
				await this.findParent(data, this.treeData, checked);
			}
		},
		// 递归所有子集设置选中状态isChecked
		async getCheckedChild(data, flag) {
			return data.map(async (item) => {
				if (flag) {
					item.isChecked = true;
				} else {
					item.isChecked = false;
				}
				if (item.children) {
					await this.getCheckedChild(item.children, flag);
				}
			});
		},
		// 选中子节点获取所有父节点
		async findParent(childNode, treeData, checked) {
			if (!treeData) return;
			for (let i = 0; i < treeData.length; i++) {
				// 父节点查询条件
				if (treeData[i].directoryId === childNode.pid) {
					console.log(treeData[i]);
					// 同级子节点是否有一条被选中
					let isBoolean = treeData[i].children.some((item) => {
						return item.isChecked === true;
					});
					treeData[i].isChecked = isBoolean;
					console.log('isBoolean===', isBoolean);
					// 如果找到结果,保存当前节点
					// 用当前节点再去原数据查找当前节点的父节点
					await this.findParent(treeData[i], this.tableData, checked);
					// break;
				} else {
					if (treeData[i].children) {
						// 没找到，遍历该节点的子节点
						await this.findParent(childNode, treeData[i].children, checked);
					}
				}
			}
		},
		// 统计列表总文件数（也可以直接后端返回总文件个数）
		getTotalNum(tree) {
			for (let item of tree) {
				if (item.directoryType === 2) {
					this.totalNum += 1;
				}
				if (item.children) {
					this.getTotalNum(item.children);
				}
			}
		},
		// 递归过滤保留被选中的目录树数组
		getFilterFile(tree) {
			return tree
				.filter((item) => item.isChecked === true)
				.map((item) => {
					item = Object.assign({}, item);
					if (item.children) {
						item.children = this.getFilterFile(item.children);
					}
					return item;
				});
		},
	},
};
</script>
<style scoped lang="less">
.tree-container {
	text-align: left;
	.header {
		display: flex;
	}
	.tree-box {
		position: relative;
		height: 100%;
		.tree-nav {
			width: 100%;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #e6e6e6;
			padding: 12px 0;
			.item {
				font-size: 14px;
				color: #666;
				text-align: center;
				.checkbox-style {
					&.el-checkbox:last-of-type {
						margin-right: 12px;
						margin-left: 8px;
					}
				}
				&:nth-child(1) {
					flex: 1;
					text-align: left;
					padding-left: 16px;
				}
				&:nth-child(2),
				&:nth-child(5),
				&:nth-child(6) {
					flex: 0 0 100px;
				}
				&:nth-child(3),
				&:nth-child(4),
				&:nth-child(7) {
					flex: 0 0 200px;
				}
			}
		}
		.tree-content {
			.custom-tree-node {
				width: 100%;
				font-size: 14px;
				.node_div {
					display: flex;
					align-items: center;
					span {
						text-align: center;
						&.name-box {
							flex: 1;
							text-align: left;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
					.size-box,
					.secret-box,
					.download-box {
						flex: 0 0 100px;
					}
					.time-box,
					.upload-box,
					.operate-box {
						flex: 0 0 200px;
					}
				}
			}
		}
	}
}
</style>
<style lang="less">
.el-tree-node__content {
	padding: 8px 0;
}
.el-button--small {
	font-size: 14px;
}
</style>
