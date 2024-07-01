export default {
	name: 'Index',
	components: {
		//树状数组
		paramsDialog: (resolve) => resolve(require('./paramsDialog.vue')),
		//列表数组
		paramDialog: (resolve) => resolve(require('./paramDialog.vue')),
	},
	data() {
		return {
			rowflag: false,
			flg: false,
			oldList: [],
			newList: [],
			sortable: null,
			allItemList: [],
			showItemList: [],
			formShow: false,
			searchForm: {
				code: '',
				codeName: '',
				codeTypeId: '',
			},
			sysCode: {
				code: '',
				codeName: '',
				codeEnabledState: '1',
				remark: '',
				ordinal: '',
				codeType: '1',
				dataType: '',
			},
			rules: {
				code: [
					{ required: true, message: '请输入代码', trigger: 'blur' },
					{
						pattern: /^[0-9a-zA-Z]*[a-zA-Z_]+[0-9a-zA-Z]*$/,
						message: '输入的内容只能由数字、字母以及下划线组成，不能全为数字',
						trigger: 'blur',
					},
				],
				codeName: [
					{ required: true, message: '请输入编码名称', trigger: 'blur' },
				],
				dataType: [
					{ required: true, message: '请选择数据类型', trigger: 'blur' },
				],
			},
			ids: [],
			tableData: [],
			parSetList: [],
			pager: {
				page: 0,
				size: 20,
				total: 0,
			},
			dialogFormVisible: false,
			viewHide: false,
			editCode: false,
			dialogTitle: '新增编码',
			codeType: [
				{ label: '固有', value: '1' },
				{ label: '自定义', value: '2' },
			],
			dataType: [
				{ label: '列表', value: '0' },
				{ label: '树状', value: '1' },
			],
			editRowData: {},
			editRowIndex: 0,
			options: [],
			paramsDialogVisible: false,
			paramsDialogConfig: {
				title: '参数设置',
			},
			paramDialogVisible: false,
			paramDialogConfig: {
				title: '参数设置',
			},
		};
	},
	computed: {
		height() {
			return `calc(100vh - 300px)`;
		},
	},
	mounted() {
		this.getList();
		this.getOptions();
	},
	methods: {
		getOptions() {
			let params = {
				pageNum: 1,
				pageSize: 1000000,
			};
			this.$api
				.formPost('/api/basfun/syscode/type/doGetList', params)
				.then((res) => {
					this.options = res.retBody.list;
					this.options.unshift({ name: '默认', id: '-1' });
				});
		},
		editRow(item, index) {
			if (this.rowflag || this.flg) {
				this.$message({
					type: 'error',
					message: '有未保存的数据，请先保存！',
				});
				return false;
			}
			this.editRowData = JSON.parse(JSON.stringify(item));
			this.editRowIndex = index;
			this.rowflag = true;
			item.edit = true;
			this.$set(this.parSetList, index, item);
		},
		close() {
			this.addhandleFormClose();
		},
		resetForm(formName) {
			this.searchForm = {};
			this.$refs[formName].resetFields();
			this.getList();
		},
		//取消修改
		cancal() {
			this.rowflag = false;
			this.$set(this.parSetList, this.editRowIndex, this.editRowData);
		},

		//参数增加一行
		parSetAddRow() {
			if (this.rowflag) {
				this.$message({
					type: 'error',
					message: '有未保存的数据，请先保存！',
				});
				return false;
			}
			if (this.flg) {
				this.$message({
					type: 'error',
					message: '有未保存的数据，请先保存！',
				});
				return false;
			}
			var list = {
				id: '',
				sysCodeId: this.sysCode.id,
				enabledState: '1',
				edit: true,
				add: true,
			};
			this.parSetList.unshift(list);
			this.flg = true;
		},
		// 获取参数类型列表
		async getparSetList() {
			let params = {
				pageNum: 1,
				pageSize: 99999,
				sysCodeId: this.sysCode.id,
			};

			this.$api
				.formPost('/api/basfun/syscode/item/doGetList', params)
				.then((res) => {
					if (res.retHead.code === '0000000') {
						this.parSetList = res.retBody.list;
						this.parSetList.map((item) => {
							item.edit = false;
						});
						this.oldList = this.parSetList.map((v) => v.ordinal);
						this.newList = this.oldList.slice();
					}
				});
		},
		//参数删除一行
		parSetDelete(index, row) {
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					if (row.id) {
						let params = { id: row.id };
						this.$api
							.formPost('/api/basfun/syscode/item/doRmById', params)
							.then((res) => {
								if (res.retHead.code == '0000000') {
									this.$message({
										type: 'success',
										message: '删除成功',
									});
									this.parSetList.splice(index, 1);
								} else {
									this.$message({
										type: 'error',
										message: res.retHead.message,
									});
								}
							});
					} else {
						this.parSetList.splice(index, 1);
						this.flg = false;
					}
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
				});
		},
		//保存参数
		parSetSave(row, index) {
			if (!row.codeName) {
				this.$message({
					type: 'error',
					message: '参数名称不能为空!',
				});
				return false;
			}
			if (!row.codeValue) {
				this.$message({
					type: 'error',
					message: '参数值不能为空!',
				});
				return false;
			}
			if (row.id) {
				delete row.codeItems;
				this.$api
					.formPost('/api/basfun/syscode/item/doModById', row)
					.then((res) => {
						if (res.retHead.code == '0000000') {
							this.getparSetList();
							this.flg = false;
							this.rowflag = false;
							this.$message({
								type: 'success',
								message: '保存成功!',
							});
						} else {
							// this.$message({
							//     type: 'error',
							//     message: res.retHead.message
							// });
						}
					});
			} else {
				this.$api
					.formPost('/api/basfun/syscode/item/doSave', row)
					.then((res) => {
						if (res.retHead.code == '0000000') {
							this.getparSetList();
							this.flg = false;
							this.$message({
								type: 'success',
								message: '保存成功!',
							});
						} else {
							// this.$message({
							//     type: 'error',
							//     message: res.retHead.message
							// });
						}
					});
			}
		},
		//参数设置
		show: function(item) {
			if (item.dataType == '1') {
				this.paramsDialogConfig.data = JSON.parse(JSON.stringify(item));
				this.paramsDialogVisible = true;
			} else {
				this.paramDialogConfig.data = JSON.parse(JSON.stringify(item));
				this.paramDialogVisible = true;
			}
		},
		// 关闭弹窗
		handleFormClose: function() {
			this.searchForm = {
				startTime: '',
				endTime: '',
			};
			this.sysCode = {
				code: '',
				codeName: '',
				codeEnabledState: '1',
				remark: '',
			};
			this.$refs.sysCode.resetFields();
			this.viewHide = false;
			this.editCode = false;
			this.dialogTitle = '新增编码';
			this.dialogFormVisible = false;
		},

		// 修改
		edit: function(item) {
			this.dialogTitle = '修改编码';
			this.dialogFormVisible = true;
			this.editCode = false;
			this.sysCode = JSON.parse(JSON.stringify(item));
		},

		// 删除
		deleteBatch: function() {
			if (this.ids.length > 0) {
				this.delete();
			} else {
				this.$message({
					type: 'warning',
					message: '请先选择数据!',
				});
			}
		},
		delete: function() {
			let str = '';
			for (let i = 0; i < this.ids.length; i++) {
				str = str + this.ids[i].id + ',';
			}
			let params = {
				ids: str,
			};
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.$api
						.formPost('/api/basfun/syscode/code/doRmById', params)
						.then((res) => {
							if (res.retHead.code == '0000000') {
								this.$message({
									type: 'success',
									message: '删除成功!',
								});
								this.getList();
							} else {
								this.$message({
									type: 'error',
									message: res.retHead.message,
								});
							}
						});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
				});
		},
		// 保存
		doSave: function() {
			this.$refs.sysCode.validate((valid) => {
				if (valid) {
					if (this.sysCode.id) {
						if (this.sysCode.itemList) {
							delete this.sysCode.itemList;
						}
						delete this.sysCode.codeItems;
						this.$api
							.formPost('/api/basfun/syscode/code/doModById', this.sysCode)
							.then((res) => {
								if (res.retHead.code == '0000000') {
									this.handleFormClose();
									this.$message({
										type: 'success',
										message: '保存成功!',
									});
									this.getList();
								} else {
									// this.handleFormClose();
									// this.$message({
									//     type: 'error',
									//     message: res.retHead.message
									// });
								}
							});
					} else {
						//查找对应codeName
						let arr = this.options.filter((item) => {
							return item.code === this.sysCode.code;
						});
						if (arr.length > 0) {
							this.sysCode.codeName = arr[0].name;
						}
						this.$api
							.formPost('/api/basfun/syscode/code/doSave', this.sysCode)
							.then((res) => {
								if (res.retHead.code == '0000000') {
									this.handleFormClose();
									this.$message({
										type: 'success',
										message: '保存成功!',
									});
									this.getList();
								} else {
									// this.handleFormClose();
									// this.$message({
									//     type: 'error',
									//     message: res.retHead.message
									// });
								}
							});
					}
				} else {
					return false;
				}
			});
		},
		// 获取参数类型列表
		getList: function() {
			let params = {
				pageNum: this.pager.page === 0 ? this.pager.page : this.pager.page,
				pageSize: this.pager.size,
				...this.searchForm,
			};
			if (this.searchForm.likeCode) {
				params.likeCode = this.searchForm.likeCode;
			}
			if (this.searchForm.likeCodeName) {
				params.likeCodeName = this.searchForm.likeCodeName;
			}
			if (this.searchForm.codeTypeId) {
				params.codeTypeId = this.searchForm.codeTypeId;
			}
			let load = this.$loading({
				target: this.$refs.table.$el,
			});
			this.formShow = false;
			this.$api
				.formPost('/api/basfun/syscode/code/doGetList', params)
				.then((res) => {
					if (res.retHead.code === '0000000') {
						load.close();
						this.tableData = res.retBody.list;
						this.pager.total = res.retBody.total;
					}
				});
		},
		handleSelectionChange: function(val) {
			this.ids = val;
		},

		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.pager.size = val;
			this.getList();
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.pager.page = val;
			this.getList();
		},
		saveAll() {
			if (this.flg) {
				this.$message({
					type: 'error',
					message: '有未保存的数据，请先保存！',
				});
				return false;
			}
			for (var i = 0; i < this.parSetList.length; i++) {
				for (var j = 0; j < this.newList.length; j++) {
					if (this.parSetList[i].ordinal == this.newList[j]) {
						this.parSetList[i].ordinal = this.oldList[j];
						break;
					}
				}
			}
			this.$api
				.post('/api/basfun/syscode/item/doModBatchById', {
					codeItems: this.parSetList,
				})
				.then((res) => {
					if (res.retHead.code == '0000000') {
						this.handleFormClose();
						this.$message({
							type: 'success',
							message: '保存成功!',
						});
						this.getList();
					} else {
						this.handleFormClose();
						this.$message({
							type: 'error',
							message: res.retHead.message,
						});
					}
				});
		},
		initData() {
			this.pager.page = 1;
			this.getList();
		},
	},
};
