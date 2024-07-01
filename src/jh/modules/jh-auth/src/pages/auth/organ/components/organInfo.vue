<!--
 * @Author: Junchi Zhao
 * @LastEditors: zjc2684613 1984937455@qq.com
 * @Description: 
-->
<template>
	<BaseDialog
		:title="organInfoDialogConfig.title"
		:visible="organInfoDialogVisible"
		width="1000px"
		top="5vh"
		append-to-body
		@close="close"
	>
		<template slot="body">
			<el-form :model="form" :rules="rules" ref="form" label-width="150px">
				<el-tabs v-model="activeName" :before-leave="beforeLeave">
					<el-tab-pane label="基本信息" name="first">
						<el-row>
							<el-col :span="24">
								<el-form-item
									label="选择机构节点"
									prop="organIds"
									v-if="
										organInfoDialogConfig.isAdd &&
											organInfoDialogConfig.type &&
											organInfoDialogConfig.type === 1
									"
								>
									<el-cascader
										v-model="form.organIds"
										class="pctw100"
										:options="organInfoDialogConfig.options"
										:props="{
											checkStrictly: true,
											value: 'id',
											label: 'organName',
										}"
										clearable
									></el-cascader>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="8">
								<el-form-item label="组织名称" prop="organName">
									<el-input
										placeholder="请输入"
										v-model="form.organName"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8" v-if="!organInfoDialogConfig.isAdd">
								<el-form-item label="组织代码" prop="organCode">
									<el-input
										placeholder="请输入"
										:disabled="
											organInfoDialogConfig.data &&
												organInfoDialogConfig.data.id != ''
										"
										v-model="form.organCode"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="机构简称">
									<el-input
										placeholder="请输入"
										v-model="form.shortName"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="统一社会信用代码" prop="uscCode">
									<el-input
										placeholder="请输入"
										v-model="form.uscCode"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="组织机构代码">
									<el-input
										placeholder="请输入"
										v-model="form.orgCode"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="扩展代码">
									<el-input
										placeholder="请输入"
										v-model="form.extCode"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="其他代码">
									<el-input
										placeholder="请输入"
										v-model="form.othCode"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="上级部门名称">
									<el-input
										placeholder="请输入"
										v-model="form.superName"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="组织类型" prop="organType">
									<el-select v-model="form.organType">
										<el-option
											v-for="{
												typeName,
												typeValue,
											} in organInfoDialogConfig.organTypeOption"
											:key="typeValue"
											:label="typeName"
											:value="typeValue"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="排序号">
									<el-input
										v-model="form.organOrderNum"
										placeholder="请输入"
										style="width:166px;"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item
									label="节点位置"
									v-if="
										organInfoDialogConfig.isAdd &&
											organInfoDialogConfig.type &&
											organInfoDialogConfig.type === 2
									"
								>
									<el-radio-group v-model="form.nodeType">
										<el-radio
											label="1"
											v-if="organInfoDialogConfig.data.id != userInfo.organId"
											>同级机构</el-radio
										>
										<el-radio label="2">下级机构</el-radio>
									</el-radio-group>
								</el-form-item>
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="机构资料" name="second">
						<el-row>
							<el-col :span="8">
								<el-form-item label="邮政编码" prop="postCode">
									<el-input
										placeholder="请输入"
										v-model="form.postCode"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="负责人">
									<el-input
										placeholder="请输入"
										v-model="form.master"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="联系人">
									<el-input
										placeholder="请输入"
										v-model="form.linkMan"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="联系电话" prop="linkPhone">
									<el-input
										placeholder="请输入"
										v-model="form.linkPhone"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="是否独立建账">
									<el-select v-model="form.dependentAccount">
										<el-option label="是" value="1"></el-option>
										<el-option label="否" value="0"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item label="地址">
									<el-input
										placeholder="请输入"
										v-model="form.address"
										autocomplete="off"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item label="备注">
									<el-input
										type="textarea"
										v-model="form.remark"
										placeholder="请输入"
										autocomplete="off"
										:rows="3"
									></el-input> </el-form-item
							></el-col>
						</el-row>
					</el-tab-pane>
				</el-tabs>
			</el-form>
		</template>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="confirm">确 定</el-button>
		</span>
	</BaseDialog>
</template>

<script>
export default {
	name: 'organInfoDialog',
	props: {
		organInfoDialogVisible: {
			type: Boolean,
			default: false,
		},
		organInfoDialogConfig: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
			activeName: 'first',
			form: {
				id: '',
				organCode: '',
				organName: '',
				shortName: '',
				organOrderNum: '',
				remark: '',
				organType: '2',
				nodeType: '2',
				address: '',
				master: '',
				linkMan: '',
				linkPhone: '',
				postCode: '',
				dependentAccount: '',
				superName: '',
				uscCode: '',
				orgCode: '',
				extCode: '',
				othCode: '',
				organIds: [],
			},
			rules: {
				organIds: [
					{ required: true, message: '机构节点不能为空！', trigger: 'blur' },
				],
				organName: [
					{ required: true, message: '组织名称不能为空！', trigger: 'blur' },
				],
				organCode: [
					{ required: true, message: '组织代码不能为空！', trigger: 'blur' },
				],
				linkPhone: [{ validator: this.$validOption.isPhone, trigger: 'blur' }],
				uscCode: [{ validator: this.$validOption.isUCcode, trigger: 'blur' }],
				postCode: [
					{ validator: this.$validOption.isPostCode, trigger: 'blur' },
				],
			},
			userInfo: null,
			isAdd: false,
		};
	},

	created() {
		if (!this.userInfo && sessionStorage.getItem('user')) {
			this.userInfo = JSON.parse(sessionStorage.getItem('user'));
			if (this.userInfo.userType != '1') {
				this.form.nodeType = '2';
			}
		}
		if (!this.organInfoDialogConfig.isAdd) {
			for (const key in this.organInfoDialogConfig.data) {
				if (Object.hasOwnProperty.call(this.form, key)) {
					this.form[key] = this.organInfoDialogConfig.data[key];
				}
			}
			for (const key in this.organInfoDialogConfig.data.sysOrganExt) {
				if (Object.hasOwnProperty.call(this.form, key)) {
					this.form[key] = this.organInfoDialogConfig.data.sysOrganExt[key];
				}
			}
		}
	},
	methods: {
		async confirm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					if (this.organInfoDialogConfig.isAdd) {
						if (this.form.nodeType == 1) {
							this.form.parentId = this.organInfoDialogConfig.data.parentId;
						} else {
							this.form.parentId = this.organInfoDialogConfig.data.id;
						}
						if (!this.form.parentId && this.form.organIds.length === 0) {
							this.form.parentId = '0';
						} else if (!this.form.parentId && this.form.organIds.length > 0) {
							this.form.parentId = this.form.organIds.pop();
						}
						delete this.form.organIds;
						this.$api
							.formPost('/api/auth/sysorgan/doSaveSysOrgan', this.form)
							.then((res) => {
								this.$message.success('操作成功！');
								this.$emit('onSuccess');
								this.close();
							});
					} else {
						delete this.form.createTime;
						delete this.form.updateTime;
						this.$api
							.formPost('/api/auth/sysorgan/doModSysOrgan', this.form)
							.then((res) => {
								this.$message.success('操作成功！');
								this.$emit('onSuccess');
								this.close();
							});
					}
				}
			});
		},
		close() {
			this.$emit('update:organInfoDialogVisible', false);
		},
		beforeLeave() {
			return new Promise((resolve, reject) => {
				this.$refs.form.validate((valid) => {
					if (valid) {
						resolve();
					} else {
						reject();
					}
				});
			});
		},
	},
};
</script>
<style lang="scss" scoped>
.iframe {
	height: calc(100vh - 60px);
	width: 100%;
}
/deep/ .el-row {
	display: flex;
	flex-wrap: wrap;
}
</style>
