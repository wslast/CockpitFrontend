<template>
	<div class="sysParSetType routerContent">
		<div class="card df p12">
			<el-button type="primary" @click="dialogFormVisible = true"
				>新增</el-button
			>
			<el-button type="primary" @click="deleteBatch">批量删除</el-button>
			<div class="fg1"></div>
			<searchDialog 
				v-model="searchForm.likeCode"
				placeholder="请输入代码名称"
				@resetForm="resetForm('searchForm')"
				@searchData="getList"
				:showForm.sync="formShow"
			>
			<el-form
				:model="searchForm"
				label-width="70px"
				label-position="top"
				ref="searchForm"
			>
				<el-form-item label="代码">
					<el-input
						v-model="searchForm.likeCode"
						placeholder="请输入代码"
					></el-input>
				</el-form-item>
				<el-form-item label="编码名称">
					<el-input
						v-model="searchForm.likeCodeName"
						placeholder="请输入编码名称"
					></el-input>
				</el-form-item>
				<el-form-item label="编码类型">
					<el-select
						v-model="searchForm.codeTypeId"
						style="width:100%;"
						placeholder="请输入编码类型"
					>
						<el-option
							v-for="item in options"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div class="df jce" slot="footer">
				<el-button @click="resetForm('searchForm')">重置</el-button>
				<el-button type="primary" @click="getList">查询</el-button>
			</div>
		</searchDialog>
		</div>
		
		<div class="content">
			<el-table
				:data="tableData"
				border
				height="100%"
				@selection-change="handleSelectionChange"
				ref="table"
				row-key="id"
				style="width: 100%;"
			>
				<el-table-column
					type="selection"
					width="50"
					align="center"
					:reserve-selection="true"
				>
				</el-table-column>

				<el-table-column type="index" label="序号" align="center" width="60">
				</el-table-column>

				<el-table-column prop="code" align="center" label="代码">
				</el-table-column>
				<el-table-column
					prop="codeName"
					align="center"
					show-overflow-tooltip
					label="编码名称"
				>
				</el-table-column>

				<el-table-column
					prop="codeEnabledState"
					align="center"
					width="100"
					label="是否启用"
				>
					<template slot-scope="scope">
						<span v-if="'0' == scope.row.codeEnabledState">
							否
						</span>
						<span v-if="'1' == scope.row.codeEnabledState">
							是
						</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="codeTypeName"
					align="center"
					width="120"
					label="编码类型名称"
				>
				</el-table-column>

				<el-table-column
					prop="dataType"
					align="center"
					width="100"
					label="数据类型"
				>
					<template slot-scope="scope">
						<span v-if="'1' == scope.row.dataType">
							树形
						</span>
						<span v-else>
							列表
						</span>
					</template>
				</el-table-column>

				<!-- <el-table-column
                    prop="ordinal"
                    align="center"
                    show-overflow-tooltip
                    label="梯次">
                </el-table-column> -->
				<el-table-column
					prop="remark"
					align="center"
					show-overflow-tooltip
					label="备注"
				>
				</el-table-column>
				<el-table-column prop="name" align="center" label="操作" width="180">
					<template slot-scope="scope">
						<el-button type="text" @click="edit(scope.row)">修改</el-button>
						<el-button type="text" @click="show(scope.row)">条目设置</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="card" style="text-align: center">
			<el-pagination
				v-show="tableData.length > 0"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="pager.page"
				background
				:page-size="pager.size"
				layout="total, sizes, prev, pager, next"
				:total="pager.total"
			>
			</el-pagination>
		</div>
		<el-dialog
			:title="dialogTitle"
			:visible.sync="dialogFormVisible"
			:before-close="handleFormClose"
		>
			<el-form :model="sysCode" ref="sysCode" :rules="rules" label-width="auto">
				<el-form-item label="代码" prop="code">
					<el-input v-model="sysCode.code" placeholder="请输入代码"></el-input>
				</el-form-item>

				<el-form-item label="编码名称" prop="codeName">
					<el-input
						v-model="sysCode.codeName"
						placeholder="请输入编码名称"
					></el-input>
				</el-form-item>
				<el-form-item label="是否可用" prop="codeEnabledState">
					<el-radio v-model="sysCode.codeEnabledState" label="1">是</el-radio>
					<el-radio v-model="sysCode.codeEnabledState" label="0">否</el-radio>
				</el-form-item>
				<el-form-item label="数据类型" prop="dataType">
					<el-select
						v-model="sysCode.dataType"
						placeholder="请选择数据类型"
						class="pctw100"
					>
						<el-option
							v-for="item in dataType"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="编码类型">
					<el-select
						v-model="sysCode.codeTypeId"
						placeholder="请选择编码类型"
						class="pctw100"
					>
						<el-option
							v-for="item in options"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备注">
					<el-input
						v-model="sysCode.remark"
						type="textarea"
						:autosize="{ minRows: 2, maxRows: 2 }"
					></el-input>
				</el-form-item>
				<!-- <el-form-item label="梯次" label-width="120px" >
                    <el-input v-model="sysCode.ordinal" placeholder="请输入梯次" ></el-input>
                </el-form-item> -->
			</el-form>

			<div slot="footer" class="dialog-footer" v-show="!viewHide">
				<el-button @click="handleFormClose">取 消</el-button>
				<el-button type="primary" @click="doSave">保 存</el-button>
			</div>
		</el-dialog>
		<paramsDialog
			:paramsDialogConfig="paramsDialogConfig"
			v-if="paramsDialogVisible"
			:paramsDialogVisible.sync="paramsDialogVisible"
		/>
		<paramDialog
			:paramDialogConfig="paramDialogConfig"
			v-if="paramDialogVisible"
			:paramDialogVisible.sync="paramDialogVisible"
		/>
	</div>
</template>
<script src="./systemParSetType.js"></script>
<style lang="scss" scoped>
.sysParSetType {
	.content {
		margin: 0 10px;
		flex-grow: 1;
		overflow: auto;
	}
}
</style>
