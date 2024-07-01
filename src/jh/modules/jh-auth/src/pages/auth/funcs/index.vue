<!--  -->
<template>
	<div class="df fdc container">
		<div class="df aic">
			<el-tabs v-model="activeName" class="pl10 pr10 fg1">
				<el-tab-pane label="受控接口" name="first"></el-tab-pane>
				<el-tab-pane label="开放接口" name="second"></el-tab-pane>
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
		</div>
		<funcs
			class="fg1 content"
			v-if="activeName === 'first'"
			:isSearch="isSearch"
			:searchForm="searchForm"
			ref="funcs"
		></funcs>
		<loginUrl class="fg1 content" v-if="activeName === 'second'"></loginUrl>
	</div>
</template>

<script>
export default {
	name: 'funcsTabs',
	components: {
		funcs: () => import('./components/funcs.vue'),
		loginUrl: () => import('./components/loginUrl/index.vue'),
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

	created() {},

	methods: {
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
				this.$refs.funcs.searchData();
			}
			this.formShow = false;
		},
	},
};
</script>
<style lang="scss" scoped>
.container {
	height: 100%;
}
.content {
	height: calc(100% - 55px);
}
/deep/ .el-tabs__item {
	font-size: var(--title-size) !important;
}
</style>
