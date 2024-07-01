<template>
	<div
		class
		style="display:flex;overflow:auto;border:1px solid #f1f1f1;height: 65vh;"
	>
		<div
			class="left card w14"
			style="margin-right:10px;flex-grow:1;overflow:auto;"
		>
			<el-input
				placeholder="输入关键字进行过滤"
				v-model="filterText"
			></el-input>
			<el-tree
				style="max-height:300px;"
				highlight-current
				@node-click="handleNodeClick"
				:props="props"
				:data="data"
				node-key="id"
				:filter-node-method="filterNode"
				ref="tree"
			></el-tree>
		</div>
		<div class="right card w14" style="flex-grow:3;">
			<div class="form">
				<el-form inline :model="searchForm" label-width="80px">
					<el-form-item label="用户名">
						<el-input
							v-model="searchForm.username"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item label="姓名">
						<el-input
							v-model="searchForm.realName"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<!-- <el-form-item label="用户类型">
              <el-select v-model="searchForm.usertype">
                <el-option label="所有用户" value></el-option>
                <el-option label="中心用户" value="1"></el-option>
                <el-option label="管理部用户" value="2"></el-option>
              </el-select>
          </el-form-item>-->
					<el-form-item>
						<el-button type="primary" @click="init">查询</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="flex" style="height: calc(100% - 50px);">
				<div class="all df fdc pcth100 w14" style="flex:1">
					<h4>查询结果:</h4>
					<div class="ova fg1">
						<el-table
							:data="tableData"
							@selection-change="selectionChange"
							height="100%"
							border
						>
							<el-table-column
								type="selection"
								fixed="left"
								align="center"
							></el-table-column>
							<el-table-column
								prop="username"
								fixed="left"
								align="center"
								label="用户名"
							></el-table-column>
							<el-table-column
								prop="realName"
								fixed="left"
								align="center"
								label="真实姓名"
							></el-table-column>
						</el-table>
					</div>
					<div class="card ova" style="text-align:right; ">
						<el-pagination
							@size-change="sizeChange"
							@current-change="currentChange"
							:current-page="currentPage"
							:page-size="pageSize"
							background
							layout="total, sizes, prev, pager, next"
							:total="total"
						></el-pagination>
					</div>
				</div>
				<div class="btnbox">
					<div class>
						<el-button
							type="primary"
							icon="el-icon-d-arrow-right"
							@click="toright"
						></el-button>
						<br />
						<el-button
							type="primary"
							icon="el-icon-d-arrow-left"
							@click="toleft"
						></el-button>
					</div>
				</div>
				<div class="select df fdc pcth100 w14" style="flex:1">
					<h4>已选择用户:</h4>
					<div class="ova fg1">
						<el-table
							:data="selectedTableData"
							@selection-change="selectedBack"
							border
							height="100%"
						>
							<el-table-column
								type="selection"
								fixed="left"
								align="center"
							></el-table-column>
							<el-table-column
								prop="username"
								fixed="left"
								align="center"
								label="用户名"
							></el-table-column>
							<el-table-column
								prop="realName"
								fixed="left"
								align="center"
								label="真实姓名"
							></el-table-column>
						</el-table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		onlyOne: {
			// 控制是否可以多选
			type: Boolean,
			default: false,
		},
    authorized: {
      type: Boolean,
      default: true
    }
	},
	components: {},
	data() {
		return {
			formLabelWidth: '80px',
			tableData: [],
			selectedTableData: [],
			searchForm: {
				username: '',
				usertype: '',
				realName: '',
			},
			data: [],
			props: {
				label: 'organName',
				children: 'children',
			},
			filterText: '',
			checkedData: [],
			rightCheckedData: [],
			chackedNode: {},
			organCheck: {},
			total: 0,
			pageSize: 20,
			currentPage: 1,
		};
	},
	computed: {},
	async mounted() {
		await this.initOrange();
		this.init();
	},
	watch: {
		filterText(val) {
			this.$refs.tree.filter(val);
		},
	},
	methods: {
		toright() {
			if (this.onlyOne) {
				if (this.checkedData.length > 1 || this.selectedTableData.length > 0) {
					this.$message.warning('只能选择一个用户！');
					return;
				}
			}
			this.checkedData.forEach((item) => {
				if (this.selectedTableData.indexOf(item) < 0) {
					this.selectedTableData.push(item);
				}
			});
			this.tableData = this.tableData.filter((item) => {
				return !this.checkedData.includes(item);
			});
		},
		toleft() {
			this.rightCheckedData.forEach((item) => {
				let index = this.selectedTableData.indexOf(item);
				if (index >= 0) {
					this.selectedTableData.splice(index, 1);
					this.tableData.unshift(item);
				}
			});
		},
		filterNode(value, data) {
			if (!value) return true;
			return data.organName.indexOf(value) !== -1;
		},
		async initOrange() {
			return new Promise((resolve, reject) => {
        if(this.authorized) {
          this.$api
              .formPost('/api/auth/sysorgan/doGetSysOrganObject', {})
              .then((res) => {
                if (res.retHead.code == '0000000') {
                  this.data = this.deleteChildren(res.retBody);
                }
                resolve();
              });
        }else {
          this.$api
              .formPost('/api/auth/sysorgan/doGetAllSysOrganObject', {})
              .then((res) => {
                if (res.retHead.code == '0000000') {
                  this.data = this.deleteChildren(res.retBody);
                }
                resolve();
              });
        }
				this.chackedNode = {};
			});
		},
		handleNodeClick(v) {
			console.log(v);
			this.organCheck = v;
			this.init();
		},
		selectionChange(v) {
			this.checkedData = v;
		},
		selectedBack(v) {
			this.rightCheckedData = v;
		},
		selectedDblclick(v) {
			this.selectedTableData.forEach((item, index) => {
				if (item.id == v.id) {
					this.selectedTableData.splice(index, 1);
				}
			});
		},
		sizeChange(n) {
			this.pageSize = n;
			this.init();
		},
		currentChange(n) {
			this.currentPage = n;
			this.init();
		},

		init(v) {
			let params = {
				pageNum: this.currentPage,
				pageSize: this.pageSize,
				username: this.searchForm.username,
				realName: this.searchForm.realName,
				organId: this.organCheck.id || this.data[0].id,
			};
			if (!this.organCheck.id) {
				this.$refs.tree.setCurrentKey(this.data[0].id);
			}
      if(this.authorized) {
        this.$api
            .formPost('/api/auth/sysuser/doGetListWithOrganId', params)
            .then((res) => {
              if (res.retHead.code == '0000000') {
                this.tableData = res.retBody.list;
                this.total = res.retBody.total;
                this.currentPage = res.retBody.pageNum;
              }
            });
      }else{
        this.$api
            .formPost('/api/auth/sysuser/doGetOrganAllSysUserList', params)
            .then((res) => {
              if (res.retHead.code == '0000000') {
                this.tableData = res.retBody.list;
                this.total = res.retBody.total;
                this.currentPage = res.retBody.pageNum;
              }
            });
      }
		},
	},
	created() {},
};
</script>
<style lang="scss" scoped>
.btns {
	text-align: right;
}
.btnbox {
	display: flex;
	padding: 10px;
	align-items: center;
	button {
		margin-bottom: 10px;
	}
}
</style>
