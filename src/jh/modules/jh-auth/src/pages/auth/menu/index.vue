<template>
	<div class="df fdc" style="height:100%">
		<div class="p10 df fdc" style="height:100%">
			<div class="df aic">
				<el-tabs v-model="activeName" class="fg1">
					<el-tab-pane label="管理菜单" name="first"> </el-tab-pane>
					<el-tab-pane label="功能菜单" name="second"></el-tab-pane>
				</el-tabs>
				<searchDialog
					v-if="activeName === 'first'"
					v-model="searchForm.searchKey"
					placeholder="请输入"
					class="ml20"
					@resetForm="resetSearch"
					@searchData="searchData"
					:showForm.sync="formShow"
				>
					<el-form
						label-position="top"
						:model="searchForm"
						label-width="80px"
						ref="searchForm"
					>
						<el-form-item label="菜单名称" prop="functionName">
							<el-input
								v-model="searchForm.functionName"
								autocomplete="off"
							></el-input>
						</el-form-item>
						<el-form-item label="菜单Url" prop="functionUrl">
							<el-input
								v-model="searchForm.functionUrl"
								autocomplete="off"
							></el-input>
						</el-form-item>
						<el-form-item label="权限类型" prop="functionAttr">
							<el-select v-model="searchForm.functionAttr" style="width: 100%;">
								<el-option label="管理权限" :value="'0'"> </el-option>
								<el-option label="经办权限" :value="'1'"> </el-option>
								<el-option label="审核权限" :value="'2'"> </el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="通配接口" prop="menuPatternUrl">
							<el-input
								v-model="searchForm.menuPatternUrl"
								autocomplete="off"
							></el-input>
						</el-form-item>
						<el-form-item label="备注" prop="functionIntroduce">
							<el-input
								v-model="searchForm.functionIntroduce"
								autocomplete="off"
							></el-input>
						</el-form-item>
					</el-form>
					<div class="df jce" slot="footer">
						<el-button @click="resetSearch">重置</el-button>
						<el-button type="primary" @click="searchData">查询</el-button>
					</div>
				</searchDialog>
				<el-button type="primary" class="ml10" @click="batchDelete"
					>批量删除</el-button
				>
				<el-button type="primary" class="ml10" @click="add">添加</el-button>
				<el-button type="primary" v-if="activeName === 'first'" @click="folding"
					>展开/折叠</el-button
				>
			</div>
			<manageMenu
				class="manageMenu"
				v-if="activeName === 'first'"
				:isSearch="isSearch"
				:searchForm="searchForm"
				ref="manageMenu"
			></manageMenu>
			<functionMenu
				class="functionMenu"
				v-if="activeName === 'second'"
				ref="functionMenu"
			></functionMenu>
		</div>
	</div>
</template>
<script>
export default {
	components: {
		manageMenu: () => import('./manageMenu.vue'),
		functionMenu: () => import('./functionMenu.vue'),
	},
	data() {
		return {
			activeName: 'first',
			isSearch: false,
			formShow: false,
			searchForm: {
				searchKey: '',
				functionName: '',
				functionAttr: '',
				functionUrl: '',
				menuPatternUrl: '',
				functionIntroduce: '',
			},
		};
	},
	watch: {
		formShow: function(val) {
			if (val) {
				this.searchForm.searchKey = '';
			}
		},
	},
	computed: {},
	methods: {
		folding() {
			this.$refs.manageMenu.folding();
		},
		resetSearch() {
			this.searchForm.searchKey = '';
			this.$refs.searchForm.resetFields();
			this.isSearch = false;
			this.formShow = false;
		},
		searchData() {
			this.isSearch = false;
			for (const key in this.searchForm) {
				if (this.searchForm[key] != '') {
					this.isSearch = true;
				}
			}
			if (this.isSearch) {
				this.$refs.manageMenu.searchData();
			}
			this.formShow = false;
		},
		batchDelete() {
			if (this.activeName === 'first') {
				this.$refs.manageMenu.batchDelete();
			} else {
				this.$refs.functionMenu.batchDelete();
			}
		},
		add() {
			if (this.activeName === 'first') {
				this.$refs.manageMenu.isAdd = true;
				this.$refs.manageMenu.addItem(null, 1);
			} else {
				this.$refs.functionMenu.addItem();
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.custom-tree-node {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 14px;
	padding-right: 8px;
}
.manageMenu,
.functionMenu {
	height: calc(100% - 55px);
}
.ml10 {
	margin-left: 10px;
}
</style>
