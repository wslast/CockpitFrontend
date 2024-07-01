<!-- 权限管理 -->
<template>
	<div class="permisssion">
		<div class="p10 df pctw100">
			<div class="leftContent">
				<el-input
					v-model="roleName"
					@keyup.enter.native="getList"
					placeholder="输入角色名称进行查询"
					style="width:190px"
				>
					<i
						class="el-icon-search"
						style="font-size:18px;"
						slot="suffix"
						@click="getList"
					>
					</i>
				</el-input>
				<div class="roleBox">
					<div class="empty role" v-if="!roleList || roleList.length === 0">
						暂无数据
					</div>
					<div
						@click="selectRole(item)"
						v-for="item in roleList"
						:title="item.roleName"
						:key="item.id"
						:class="{
							role: activeRole != item.id,
							activeRole: activeRole == item.id,
						}"
					>
						{{ item.roleName }}
					</div>
				</div>
			</div>
			<div class="rightContent" v-loading="loading">
				<el-tabs v-model="activeTab">
					<el-tab-pane label="管理菜单" name="first"></el-tab-pane>
					<el-tab-pane label="功能菜单" name="second"></el-tab-pane>
					<el-tab-pane label="用户" name="third"></el-tab-pane>
				</el-tabs>
				<userList
					:roleId="activeRole"
					v-show="activeTab === 'third'"
				></userList>
				<funcMenu
					ref="funcMenu"
					class="content"
					:roleId="activeRole"
					@save="save"
					v-show="activeTab === 'second'"
				/>
				<manageMenu
					class="content"
					ref="manageMenu"
					@save="save"
					:roleId="activeRole"
					v-show="activeTab === 'first'"
				></manageMenu>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'permission',
	components: {
		userList: () => import('./component/userList.vue'),
		manageMenu: () => import('./component/manageMenu.vue'),
		funcMenu: () => import('./component/funcMenu.vue'),
	},

	data() {
		return {
			roleName: '',
			activeRole: '',
			roleList: [],
			defaultRoles: [],
			activeTab: 'first',
			loading: false,
		};
	},

	watch: {
		roleName: function(v) {
			this.getList();
		},
	},

	created() {
		this.getList();
	},

	methods: {
		selectRole(item) {
			this.activeRole = item.id;
		},
		save() {
			this.loading = true;
			let params = {
				roleId: this.activeRole,
				functionIds: [
					...this.$refs.manageMenu.save(),
					...this.$refs.funcMenu.save(),
				],
			};
			console.log(this.$refs.manageMenu.save());
			this.$api
				.formPost('/api/auth/sysrole/doAddRoleFunction', params)
				.then((res) => {
					this.$message.success(res.retHead.message);
					let activeRole = this.activeRole;
					this.activeRole = '';
					this.$nextTick(() => {
						this.activeRole = activeRole;
					});
					this.loading = false;
				});
		},
		getList() {
			if (this.defaultRoles && this.defaultRoles.length > 0) {
				this.roleList = this.defaultRoles.filter(
					(item) => item.roleName.indexOf(this.roleName) > -1
				);
				return;
			}
			let params = {
				roleName: this.roleName,
				pageNum: 1,
				pageSize: 99999,
			};
			this.$api.formPost('/api/auth/sysrole/doGetList', params).then((res) => {
				this.roleList = res.retBody.list;
				this.defaultRoles = res.retBody.list;
				this.activeRole = this.roleList[0].id;
			});
		},
	},
};
</script>
<style lang="scss" scoped>
.permisssion {
	height: 100%;
	overflow: hidden;
	display: flex;
	.leftContent {
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 8px 23px 10px 15px;
		width: 226px;
		flex-shrink: 0;
		flex-grow: 0;
		border-right: 1px solid #efefef;
		.roleBox {
			margin-top: 21px;
			overflow: auto;
			.role {
				font-size: var(--title-size);
				padding: 8px 23px 12px 15px;
				background: #fff;
				color: #3f536e;
				font-weight: 400;
				overflow: hidden;
				cursor: pointer;
			}
			.activeRole {
				font-size: var(--title-size);
				padding: 8px 23px 12px 15px;
				background: rgba(24, 144, 255, 0.1);
				border-radius: 4px;
				color: #3f536e;
				font-weight: 400;
				overflow: hidden;
				cursor: pointer;
			}
		}
	}
	.rightContent {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		padding-left: 16px;
		padding-right: 16px;
		.content {
			height: calc(100% - 200px);
		}
	}
}
/deep/ .el-input__suffix {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
