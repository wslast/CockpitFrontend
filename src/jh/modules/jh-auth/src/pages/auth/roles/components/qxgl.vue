<template>
	<div class>
		<el-dialog
			title="角色权限"
			width="80%"
			top="5vh"
			v-if="qxDialogShow"
			:visible.sync="qxDialogShow"
		>
			<div class style="padding:20px;height:70vh;">
				<el-tabs v-model="activeTab">
					<el-tab-pane label="管理菜单" name="first"></el-tab-pane>
					<el-tab-pane label="功能菜单" name="second"></el-tab-pane>
				</el-tabs>
				<funcMenu
					ref="funcMenu"
					class="content"
					:roleId="roleId"
					@save="save"
					v-show="activeTab === 'second'"
				/>
				<manageMenu
					class="content"
					ref="manageMenu"
					@save="save"
					:roleId="roleId"
					v-show="activeTab === 'first'"
				></manageMenu>
			</div>
			<div slot="footer" class="dialog-footer">
				<!-- <el-button type="primary" @click="getNewChenked">确 定</el-button> -->
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	components: {
		funcMenu: () => import('../../permission/component/funcMenu.vue'),
		manageMenu: () => import('../../permission/component/manageMenu.vue'),
	},
	props: {
		roleId: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			activeTab: 'first',
			qxDialogShow: false, //权限
		};
	},
	mounted() {},
	methods: {
		save() {
			let params = {
				roleId: this.roleId,
				functionIds: [
					...this.$refs.manageMenu.save(),
					...this.$refs.funcMenu.save(),
				],
			};
			this.$api
				.formPost('/api/auth/sysrole/doAddRoleFunction', params)
				.then((res) => {
					this.$message.success(res.retHead.message);
					let activeRole = this.activeRole;
					this.activeRole = '';
					this.$nextTick(() => {
						this.activeRole = activeRole;
					});
					this.qxDialogShow = false;
				});
		},
	},
	created() {},
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
</style>
