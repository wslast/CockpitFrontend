<template>
	<div class="routerContent">
		<div class="card df p12">
			<el-button type="primary" @click="showDialog">添加</el-button>
			<div class="fg1"></div>
			<searchDialog
				v-model="ruleForm.title"
				placeholder="请输入消息标题"
				@resetForm="resetForm('ruleForm')"
				@searchData="submitForm('ruleForm')"
				:showForm.sync="formShow"
			>
				<el-form
					:style="style"
					:model="ruleForm"
					ref="ruleForm"
					label-position="top"
					label-width="70px"
					class="demo-ruleForm"
				>
					<el-form-item label="消息标题" prop="title">
						<el-input show-word-limit v-model="ruleForm.title"></el-input>
					</el-form-item>
					<el-form-item label="消息等级" prop="level">
						<el-select v-model="ruleForm.level" style="width: 100%;">
							<el-option label="高" value="3"></el-option>
							<el-option label="中" value="2"></el-option>
							<el-option label="低" value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="消息类型" prop="type">
						<el-select v-model="ruleForm.type" style="width: 100%;">
							<el-option label="风险提醒" value="3000"></el-option>
							<el-option label="业务提醒" value="3001"></el-option>
							<el-option label="业务消息" value="3002"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<div class="df jce" slot="footer">
					<el-button @click="resetForm('ruleForm')">重置</el-button>
					<el-button type="primary" @click="submitForm('ruleForm')"
						>查询</el-button
					>
				</div>
			</searchDialog>
		</div>

		<div class="fg1 ova ml10 mr10">
			<el-table
				height="100%"
				ref="elTable"
				:data="tableData"
				border
				style="width: 100%"
			>
				<el-table-column
					type="index"
					width="60px"
					align="center"
					fixed="left"
					label="序号"
				></el-table-column>
				<el-table-column
					v-for="(item, index) in showItemList"
					align="center"
					:width="item.width || ''"
					:key="index"
					:label="item.name"
				>
					<template slot-scope="scope">
						<template v-if="!item.formatter">{{
							scope.row[item.key]
						}}</template>
						<template v-else>
							<span v-text="item.formatter(scope.row, item)"></span>
						</template>
					</template>
				</el-table-column>
				<el-table-column
					label="操作"
					width="120px"
					fixed="right"
					align="center"
				>
					<template slot-scope="scope">
						<el-button
							type="text"
							@click="showEditDialog(scope.$index, scope.row)"
							>编辑</el-button
						>
						<el-button
							type="text"
							@click="handleDelete(scope.$index, scope.row)"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div style="text-align:center;" class="pt10 pb10">
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
		<!-- --------------------------------------------------------添加弹出框 -->
		<el-dialog
			title="新增消息模型"
			:visible.sync="dialogFormVisible"
			:close-on-click-modal="false"
			width="600px"
		>
			<el-form
				:style="style"
				:model="addForm"
				ref="addForm"
				:rules="rules"
				label-width="auto"
				class="demo-ruleForm"
			>
				<el-form-item label="消息标题" prop="title">
					<el-input
						show-word-limit
						v-model="addForm.title"
						maxlength="100"
					></el-input>
				</el-form-item>
				<el-form-item label="消息等级" prop="level">
					<el-select v-model="addForm.level" class="pctw100">
						<el-option label="高" value="3"></el-option>
						<el-option label="中" value="2"></el-option>
						<el-option label="低" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="消息类型" prop="type">
					<el-select v-model="addForm.type" class="pctw100">
						<el-option label="风险提醒" value="3000"></el-option>
						<el-option label="业务提醒" value="3001"></el-option>
						<el-option label="业务消息" value="3002"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="消息参数" prop="params">
					<el-input
						type="textarea"
						:rows="10"
						:maxlength="2000"
						show-word-limit
						v-model="addForm.params"
					></el-input>
				</el-form-item>
				<el-form-item label="渠道" prop="channel">
					<el-checkbox-group v-model="checkList" class="pctw100">
						<el-checkbox label="PM" @change="checkedPMFun">站内</el-checkbox>
						<el-checkbox label="WX" @change="checkedWXFun">微信</el-checkbox>
						<el-checkbox label="SMS" @change="checkedSMSFun"
							>手机短信</el-checkbox
						>
						<el-checkbox label="APP" @change="checkedAPPFun">APP</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item
					label="站内消息模板"
					v-show="addForm.pmtempl"
					prop="pmtemplname"
				>
					<el-input
						placeholder="请选择站内消息模板"
						v-model="addForm.pmtemplname"
						class="input-with-select"
						:readonly="true"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="handleSelectPMOpen()"
						></el-button>
					</el-input>
				</el-form-item>
				<el-form-item
					label="站内消息策略"
					v-show="addForm.pmtempl"
					prop="pmrulecode"
				>
					<el-input
						placeholder="请选择站内消息策略"
						v-model="addForm.pmrulecode"
						class="input-with-select"
						:readonly="true"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="handleSelectRuleOpen('PM')"
						></el-button>
					</el-input>
				</el-form-item>
				<el-form-item
					label="微信消息模板"
					v-show="addForm.wxtempl"
					prop="wxtemplname"
				>
					<el-input
						placeholder="请选择微信消息模板"
						v-model="addForm.wxtemplname"
						class="input-with-select"
						:readonly="true"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="handleSelectWXOpen()"
						></el-button>
					</el-input>
				</el-form-item>
				<el-form-item
					label="微信消息策略"
					v-show="addForm.wxtempl"
					prop="wxrulecode"
				>
					<el-input
						placeholder="请选择微信消息策略"
						v-model="addForm.wxrulecode"
						class="input-with-select"
						:readonly="true"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="handleSelectRuleOpen('WX')"
						></el-button>
					</el-input>
				</el-form-item>
				<el-form-item
					label="手机短信模板"
					v-show="addForm.smstempl"
					prop="smstemplname"
				>
					<el-input
						placeholder="请选择手机短信消息模板"
						v-model="addForm.smstemplname"
						class="input-with-select"
						:readonly="true"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="handleSelectSMSOpen()"
						></el-button>
					</el-input>
				</el-form-item>
				<el-form-item
					label="手机短信消息策略"
					v-show="addForm.smstempl"
					prop="smsrulecode"
				>
					<el-input
						placeholder="请选择手机短信消息策略"
						v-model="addForm.smsrulecode"
						class="input-with-select"
						:readonly="true"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="handleSelectRuleOpen('SMS')"
						></el-button>
					</el-input>
				</el-form-item>
				<el-form-item
					label="APP消息模板"
					v-show="addForm.apptempl"
					prop="apptemplname"
				>
					<el-input
						placeholder="请选择APP消息模板"
						v-model="addForm.apptemplname"
						class="input-with-select"
						:readonly="true"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="handleSelectAPPOpen()"
						></el-button>
					</el-input>
				</el-form-item>
				<el-form-item
					label="APP消息策略"
					v-show="addForm.apptempl"
					prop="apprulecode"
				>
					<el-input
						placeholder="请选择APP消息策略"
						v-model="addForm.apprulecode"
						class="input-with-select"
						:readonly="true"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="handleSelectRuleOpen('APP')"
						></el-button>
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleAdd()">确 定</el-button>
			</div>
		</el-dialog>
		<!-- --------------------------------------------------------编辑弹出框 -->
		<el-dialog
			title="编辑消息模型"
			:visible.sync="dialogEditVisible"
			:close-on-click-modal="false"
			width="600px"
		>
			<el-form
				:style="style"
				:model="editForm"
				ref="editForm"
				:rules="rules"
				label-width="auto"
				class="demo-ruleForm"
			>
				<el-form-item label="模型ID" prop="id">
					<el-input v-model="editForm.id" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="消息标题" prop="title">
					<el-input
						show-word-limit
						v-model="editForm.title"
						maxlength="100"
					></el-input>
				</el-form-item>
				<el-form-item label="消息等级" prop="level">
					<el-select v-model="editForm.level" class="pctw100">
						<el-option label="高" value="3"></el-option>
						<el-option label="中" value="2"></el-option>
						<el-option label="低" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="消息类型" prop="type">
					<el-select v-model="editForm.type" class="pctw100">
						<el-option label="风险提醒" value="3000"></el-option>
						<el-option label="业务提醒" value="3001"></el-option>
						<el-option label="业务消息" value="3002"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="消息参数" prop="params">
					<el-input
						type="textarea"
						:rows="10"
						:maxlength="2000"
						show-word-limit
						v-model="editForm.params"
					></el-input>
				</el-form-item>
				<el-form-item label="渠道" prop="channel">
					<el-checkbox-group v-model="checkList" class="pctw100">
						<el-checkbox label="PM" @change="checkedPMFun">站内</el-checkbox>
						<el-checkbox label="WX" @change="checkedWXFun">微信</el-checkbox>
						<el-checkbox label="SMS" @change="checkedSMSFun"
							>手机短信</el-checkbox
						>
						<el-checkbox label="APP" @change="checkedAPPFun">APP</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item
					label="站内消息模板"
					v-show="editForm.pmtempl"
					prop="pmtemplname"
				>
					<el-input
						placeholder="请选择站内消息模板"
						v-model="editForm.pmtemplname"
						class="input-with-select"
						:readonly="true"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="handleSelectPMOpen()"
						></el-button>
					</el-input>
				</el-form-item>
				<el-form-item
					label="站内消息策略"
					v-show="editForm.pmtempl"
					prop="pmrulecode"
				>
					<el-input
						placeholder="请选择站内消息策略"
						v-model="editForm.pmrulecode"
						class="input-with-select"
						:readonly="true"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="handleSelectRuleOpen('PM')"
						></el-button>
					</el-input>
				</el-form-item>
				<el-form-item
					label="微信消息模板"
					v-show="editForm.wxtempl"
					prop="wxtemplname"
				>
					<el-input
						placeholder="请选择微信消息模板"
						v-model="editForm.wxtemplname"
						class="input-with-select"
						:readonly="true"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="handleSelectWXOpen()"
						></el-button>
					</el-input>
				</el-form-item>
				<el-form-item
					label="微信消息策略"
					v-show="editForm.wxtempl"
					prop="wxrulecode"
				>
					<el-input
						placeholder="请选择微信消息策略"
						v-model="editForm.wxrulecode"
						class="input-with-select"
						:readonly="true"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="handleSelectRuleOpen('WX')"
						></el-button>
					</el-input>
				</el-form-item>
				<el-form-item
					label="手机短信模板"
					v-show="editForm.smstempl"
					prop="smstemplname"
				>
					<el-input
						placeholder="请选择手机短信消息模板"
						v-model="editForm.smstemplname"
						class="input-with-select"
						:readonly="true"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="handleSelectSMSOpen()"
						></el-button>
					</el-input>
				</el-form-item>
				<el-form-item
					label="手机短信消息策略"
					v-show="editForm.smstempl"
					prop="smsrulecode"
				>
					<el-input
						placeholder="请选择手机短信消息策略"
						v-model="editForm.smsrulecode"
						class="input-with-select"
						:readonly="true"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="handleSelectRuleOpen('SMS')"
						></el-button>
					</el-input>
				</el-form-item>
				<el-form-item
					label="APP消息模板"
					v-show="editForm.apptempl"
					prop="apptemplname"
				>
					<el-input
						placeholder="请选择APP消息模板"
						v-model="editForm.apptemplname"
						class="input-with-select"
						:readonly="true"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="handleSelectAPPOpen()"
						></el-button>
					</el-input>
				</el-form-item>
				<el-form-item
					label="APP消息策略"
					v-show="editForm.apptempl"
					prop="apprulecode"
				>
					<el-input
						placeholder="请选择APP消息策略"
						v-model="editForm.apprulecode"
						class="input-with-select"
						:readonly="true"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="handleSelectRuleOpen('APP')"
						></el-button>
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleEdit()">确 定</el-button>
			</div>
		</el-dialog>

		<!------------------------------------------------------------------------->
		<el-dialog
			title="站内消息模板选择页"
			:visible.sync="dialogPMVisible"
			append-to-body
			:close-on-click-modal="false"
		>
			<el-table
				ref="pmSingleTable"
				:data="selectTableData"
				border
				style="width: 100%"
				@selection-change="handleSelectionPMChange"
			>
				<el-table-column
					type="selection"
					width="55"
					align="center"
				></el-table-column>
				<el-table-column
					type="index"
					width="60px"
					align="center"
					fixed="left"
					label="序号"
				></el-table-column>
				<el-table-column
					prop="name"
					label="模板名称"
					:show-overflow-tooltip="true"
					width="150px"
				></el-table-column>
				<el-table-column
					prop="content"
					label="消息内容"
					:show-overflow-tooltip="true"
				></el-table-column>
			</el-table>
			<div class="tc mt10 mb10">
				<el-pagination
					@size-change="selectsizeChange"
					@current-change="selectcurrentChange"
					:current-page="selectcurrentPage"
					:page-size="selectpageSize"
					background
					layout="total, sizes, prev, pager, next"
					:page-sizes="[10, 20]"
					:total="selecttotal"
				></el-pagination>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogPMVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleSelectPM()">确 定</el-button>
			</div>
		</el-dialog>
		<!------------------------------------------------------------------------->
		<el-dialog
			title="微信消息模板选择页"
			:visible.sync="dialogWXVisible"
			append-to-body
			:close-on-click-modal="false"
		>
			<el-table
				ref="wxSingleTable"
				:data="selectTableData"
				border
				style="width: 100%"
				@selection-change="handleSelectionWXChange"
			>
				<el-table-column
					type="selection"
					width="55"
					align="center"
				></el-table-column>
				<el-table-column
					type="index"
					width="60px"
					align="center"
					fixed="left"
					label="序号"
				></el-table-column>
				<el-table-column
					prop="name"
					label="模板名字"
					width="150px"
				></el-table-column>
				<el-table-column
					prop="primaryIndustry"
					label="帐号设置的主营行业"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					prop="deputyIndustry"
					label="帐号设置主营行业的副营行业"
					:show-overflow-tooltip="true"
				></el-table-column>
			</el-table>
			<div class="tc mt10 mb10">
				<el-pagination
					@size-change="selectsizeChange"
					@current-change="selectcurrentChange"
					:current-page="selectcurrentPage"
					:page-size="selectpageSize"
					background
					layout="total, sizes, prev, pager, next"
					:page-sizes="[10, 20]"
					:total="selecttotal"
				></el-pagination>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogWXVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleSelectWX()">确 定</el-button>
			</div>
		</el-dialog>
		<!------------------------------------------------------------------------->
		<el-dialog
			title="手机短信消息模板选择页"
			:visible.sync="dialogSMSVisible"
			append-to-body
			:close-on-click-modal="false"
		>
			<el-table
				ref="smsSingleTable"
				:data="selectTableData"
				border
				style="width: 100%"
				@selection-change="handleSelectionSMSChange"
			>
				<el-table-column
					type="selection"
					width="55"
					align="center"
				></el-table-column>
				<el-table-column
					type="index"
					width="60px"
					align="center"
					fixed="left"
					label="序号"
				></el-table-column>
				<el-table-column
					prop="name"
					label="模板名称"
					:show-overflow-tooltip="true"
					width="150px"
				></el-table-column>
				<el-table-column
					prop="content"
					label="消息内容"
					:show-overflow-tooltip="true"
				></el-table-column>
			</el-table>
			<div class="tc mt10 mb10">
				<el-pagination
					@size-change="selectsizeChange"
					@current-change="selectcurrentChange"
					:current-page="selectcurrentPage"
					:page-size="selectpageSize"
					background
					layout="total, sizes, prev, pager, next"
					:page-sizes="[10, 20]"
					:total="selecttotal"
				></el-pagination>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogSMSVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleSelectSMS()">确 定</el-button>
			</div>
		</el-dialog>
		<!------------------------------------------------------------------------->
		<el-dialog
			title="APP消息模板选择页"
			:visible.sync="dialogAPPVisible"
			append-to-body
			:close-on-click-modal="false"
		>
			<el-table
				ref="appSingleTable"
				:data="selectTableData"
				border
				style="width: 100%"
				@selection-change="handleSelectionAPPChange"
			>
				<el-table-column
					type="selection"
					width="55"
					align="center"
				></el-table-column>
				<el-table-column
					type="index"
					width="60px"
					align="center"
					fixed="left"
					label="序号"
				></el-table-column>
				<el-table-column
					prop="name"
					label="模板名称"
					:show-overflow-tooltip="true"
					width="150px"
				></el-table-column>
				<el-table-column
					prop="content"
					label="消息内容"
					:show-overflow-tooltip="true"
				></el-table-column>
			</el-table>
			<div class="tc mt10 mb10">
				<el-pagination
					@size-change="selectsizeChange"
					@current-change="selectcurrentChange"
					:current-page="selectcurrentPage"
					:page-size="selectpageSize"
					background
					layout="total, sizes, prev, pager, next"
					:page-sizes="[10, 20]"
					:total="selecttotal"
				></el-pagination>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogAPPVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleSelectAPP()">确 定</el-button>
			</div>
		</el-dialog>
		<!------------------------------------------------------------------------->
		<el-dialog
			title="消息策略选择页"
			:visible.sync="dialogRuleVisible"
			append-to-body
			:close-on-click-modal="false"
		>
			<el-table
				ref="ruleSingleTable"
				:data="selectTableData"
				border
				style="width: 100%"
				@selection-change="handleSelectionRuleChange"
			>
				<el-table-column
					type="selection"
					width="55"
					align="center"
				></el-table-column>
				<el-table-column
					type="index"
					width="60px"
					align="center"
					fixed="left"
					label="序号"
				></el-table-column>
				<el-table-column
					prop="name"
					label="规则名称"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					prop="avoidHolidayString"
					label="是否避开节假日"
					width="80px"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					prop="retryLimit"
					label="重试最大次数"
					width="80px"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					prop="retryTypeString"
					label="重试类型"
					width="80px"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					prop="retryInterval"
					label="间隔时长"
					width="80px"
					:show-overflow-tooltip="true"
				></el-table-column>
			</el-table>
			<div class="tc mt10 mb10">
				<el-pagination
					@size-change="selectsizeChange"
					@current-change="selectcurrentChange"
					:current-page="selectcurrentPage"
					:page-size="selectpageSize"
					background
					layout="total, sizes, prev, pager, next"
					:page-sizes="[10, 20]"
					:total="selecttotal"
				></el-pagination>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogRuleVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleSelectRule()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
const defaultFormThead = [
	{ key: 'id', name: '模型ID', width: '150px' },
	{ key: 'title', name: '消息标题', width: '150px' },
	{ key: 'levelString', name: '消息等级', width: '100px' },
	{ key: 'typeString', name: '消息类型', width: '100px' },
	{ key: 'params', name: '消息参数' },
	{ key: 'channel', name: '发送渠道', width: '200px' },
];
export default {
	data() {
		return {
			selected: {},
			channel: '',
			selectTableData: [],
			selecttotal: 0,
			selectpageSize: 20,
			selectcurrentPage: 1,
			dialogPMVisible: false,
			dialogSMSVisible: false,
			dialogWXVisible: false,
			dialogAPPVisible: false,
			dialogRuleVisible: false,

			checkList: ['PM'],

			checkAll: true,
			isIndeterminate: false,
			allItemList: defaultFormThead,
			showItemList: defaultFormThead,
			formShow: false,
			dialogFormVisible: false,
			dialogEditVisible: false,
			offForm: true, //是否折叠
			folding: false, //表单是否超过一行
			formLabelWidth: '120px',
			tableData: [],
			total: 0,
			pageSize: 20,
			currentPage: 1,
			ruleForm: {
				type: '',
				level: '',
				title: '',
			},
			style: {},
			rules: {
				title: [
					{ required: true, message: '请输入消息标题', trigger: 'change' },
				],
			},
			addForm: {
				id: '',
				title: '',
				params: '',
				level: '',
				type: '',
				pmtemplid: '',
				apptemplid: '',
				smstemplid: '',
				wxtemplid: '',
				pmtemplname: '',
				apptemplname: '',
				smstemplname: '',
				wxtemplname: '',

				pmrulecode: '',
				wxrulecode: '',
				apprulecode: '',
				smsrulecode: '',
				pmruleid: '',
				wxruleid: '',
				appruleid: '',
				smsruleid: '',

				pmtempl: false,
				apptempl: false,
				smstempl: false,
				wxtempl: false,
			},
			editForm: {
				id: '',
				title: '',
				params: '',
				level: '',
				type: '',
				pmtemplid: '',
				apptemplid: '',
				smstemplid: '',
				wxtemplid: '',
				pmtemplname: '',
				apptemplname: '',
				smstemplname: '',
				wxtemplname: '',

				pmrulecode: '',
				wxrulecode: '',
				apprulecode: '',
				smsrulecode: '',
				pmruleid: '',
				wxruleid: '',
				appruleid: '',
				smsruleid: '',

				pmtempl: false,
				apptempl: false,
				smstempl: false,
				wxtempl: false,
			},
		};
	},

	mounted() {
		this.init();
		let formHeight = this.$refs.ruleForm.$el.clientHeight;
		if (formHeight > 62) {
			this.folding = true;
			this.style = {
				height: '62px',
				overflow: 'hidden',
			};
		} else {
			this.folding = false;
			this.style = {
				height: 'auto',
				overflow: 'hidden',
			};
		}
	},
	computed: {},
	watch: {
		offForm: function(v) {
			if (v) {
				this.style = {
					height: '62px',
					overflow: 'hidden',
				};
			} else {
				this.style = {
					height: 'auto',
					overflow: 'hidden',
				};
			}
		},
	},
	methods: {
		handleDownload() {},
		formatJson(filterVal, jsonData) {
			return jsonData.map((v) =>
				filterVal.map((j) => {
					if (j === 'timestamp') {
						return parseTime(v[j]);
					} else {
						return v[j];
					}
				})
			);
		},
		handleCheckedChange(value) {
			let checkedCount = value.length;
			this.checkAll = checkedCount === defaultFormThead.length;
			this.isIndeterminate =
				checkedCount > 0 && checkedCount < defaultFormThead.length;
		},
		handleCheckAllChange(val) {
			this.showItemList = val ? defaultFormThead : [];
			this.isIndeterminate = false;
		},
		sizeChange(n) {
			this.pageSize = n;
			this.init();
		},
		currentChange(n) {
			this.currentPage = n;
			this.init();
		},
		init() {
			//let searchForm = {};
			let load = null;
			this.$nextTick(() => {
				load = this.$loading({
					target: this.$refs.elTable.$el,
				});
			});
			this.formShow = false;
			let params = {
				pageNum: this.currentPage,
				pageSize: this.pageSize,
				...this.ruleForm,
			};
			this.$api.formPost('/api/mess/mould/doGetList', params).then((res) => {
				if (res.retHead.code == '0000000') {
					load.close();
					this.tableData = res.retBody.list;
					this.total = res.retBody.total;
					this.currentPage = res.retBody.pageNum;
				}
			});
		},
		showDialog() {
			this.dialogFormVisible = true;
			this.$nextTick(() => {
				this.resetForm('addForm');
			});
			this.checkList = ['PM'];
			this.addForm.pmtempl = true;
		},
		showEditDialog(index, row) {
			if (row.id) {
				this.editForm.id = row.id;
			} else {
				this.editForm.id = '';
			}
			if (row.title) {
				this.editForm.title = row.title;
			} else {
				this.editForm.title = '';
			}
			if (row.params) {
				this.editForm.params = row.params;
			} else {
				this.editForm.params = '';
			}
			if (row.level) {
				this.editForm.level = row.level;
			} else {
				this.editForm.level = '';
			}
			if (row.type) {
				this.editForm.type = row.type;
			} else {
				this.editForm.type = '';
			}
			this.editForm.pmtemplid = '';
			this.editForm.pmtemplname = '';
			this.editForm.pmruleid = '';
			this.editForm.pmrulecode = '';
			this.editForm.pmtempl = false;
			this.editForm.wxtemplid = '';
			this.editForm.wxtemplname = '';
			this.editForm.wxruleid = '';
			this.editForm.wxrulecode = '';
			this.editForm.wxtempl = false;
			this.editForm.apptemplid = '';
			this.editForm.apptemplname = '';
			this.editForm.appruleid = '';
			this.editForm.apprulecode = '';
			this.editForm.apptempl = false;
			this.editForm.smstemplid = '';
			this.editForm.smstemplname = '';
			this.editForm.smsruleid = '';
			this.editForm.smsrulecode = '';
			this.editForm.smstempl = false;
			this.checkList = [];
			this.$api
				.formPost('/api/mess/mould/tmpl/doGetByMouldId', { mouldId: row.id })
				.then((res) => {
					if (res.retHead.code == '0000000' && res.retBody) {
						res.retBody.forEach((it) => {
							if (it.channelType == 'PM') {
								this.editForm.pmtemplid = it.tmplId;
								this.editForm.pmtemplname = it.tmplName;
								this.editForm.pmtempl = true;
								this.checkList.push('PM');
							} else if (it.channelType == 'WX') {
								this.editForm.wxtemplid = it.tmplId;
								this.editForm.wxtemplname = it.tmplName;
								this.editForm.wxtempl = true;
								this.checkList.push('WX');
							} else if (it.channelType == 'SMS') {
								this.editForm.smstemplid = it.tmplId;
								this.editForm.smstemplname = it.tmplName;
								this.editForm.smstempl = true;
								this.checkList.push('SMS');
							} else if (it.channelType == 'APP') {
								this.editForm.apptemplid = it.tmplId;
								this.editForm.apptemplname = it.tmplName;
								this.editForm.apptempl = true;
								this.checkList.push('APP');
							}
						});
					}
				});
			let params = {
				pageNum: 1,
				pageSize: 30,
				...{ mouldId: row.id },
			};
			this.$api
				.formPost('/api/mess/rule/tmpl/doGetList', params)
				.then((res) => {
					if (res.retHead.code == '0000000' && res.retBody.list) {
						res.retBody.list.forEach((it) => {
							if (it.channel == 'PM') {
								this.editForm.pmruleid = it.ruleId;
								this.editForm.pmrulecode = it.ruleName;
							} else if (it.channel == 'WX') {
								this.editForm.wxruleid = it.ruleId;
								this.editForm.wxrulecode = it.ruleName;
							} else if (it.channel == 'SMS') {
								this.editForm.smsruleid = it.ruleId;
								this.editForm.smsrulecode = it.ruleName;
							} else if (it.channel == 'APP') {
								this.editForm.appruleid = it.ruleId;
								this.editForm.apprulecode = it.ruleName;
							}
						});
					}
				});

			this.dialogEditVisible = true;
		},
		handleAdd() {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					let addFormParams = {};
					addFormParams.id = this.addForm.id;
					addFormParams.title = this.addForm.title;
					addFormParams.params = this.addForm.params;
					addFormParams.level = this.addForm.level;
					addFormParams.type = this.addForm.type;
					if (this.addForm.pmtempl == false) {
						this.addForm.pmtemplid = '';
						this.addForm.pmruleid = '';
					}
					if (this.addForm.wxtempl == false) {
						this.addForm.wxtemplid = '';
						this.addForm.wxruleid = '';
					}
					if (this.addForm.smstempl == false) {
						this.addForm.smstemplid = '';
						this.addForm.smsruleid = '';
					}
					if (this.addForm.apptempl == false) {
						this.addForm.apptemplid = '';
						this.addForm.appruleid = '';
					}
					addFormParams.pmtemplid = this.addForm.pmtemplid;
					addFormParams.wxtemplid = this.addForm.wxtemplid;
					addFormParams.smstemplid = this.addForm.smstemplid;
					addFormParams.apptemplid = this.addForm.apptemplid;
					addFormParams.pmruleid = this.addForm.pmruleid;
					addFormParams.wxruleid = this.addForm.wxruleid;
					addFormParams.smsruleid = this.addForm.smsruleid;
					addFormParams.appruleid = this.addForm.appruleid;
					addFormParams.pmrulecode = this.addForm.pmrulecode;
					addFormParams.wxrulecode = this.addForm.wxrulecode;
					addFormParams.smsrulecode = this.addForm.smsrulecode;
					addFormParams.apprulecode = this.addForm.apprulecode;

					if (
						this.addForm.pmtempl == false &&
						this.addForm.wxtempl == false &&
						this.addForm.smstempl == false &&
						this.addForm.apptempl == false
					) {
						this.$message({
							message: '渠道必须选择一个！',
							type: 'error',
						});
						return;
					}
					if (this.addForm.pmtempl == true && addFormParams.pmtemplid == '') {
						this.$message({
							message: '站内渠道必须选择一个消息模板！',
							type: 'error',
						});
						return;
					}
					if (this.addForm.pmtempl == true && addFormParams.pmruleid == '') {
						this.$message({
							message: '站内渠道必须选择一个消息策略！',
							type: 'error',
						});
						return;
					}
					if (this.addForm.wxtempl == true && addFormParams.wxtemplid == '') {
						this.$message({
							message: '微信渠道必须选择一个消息模板！',
							type: 'error',
						});
						return;
					}
					if (this.addForm.wxtempl == true && addFormParams.wxruleid == '') {
						this.$message({
							message: '微信渠道必须选择一个消息策略！',
							type: 'error',
						});
						return;
					}
					if (this.addForm.smstempl == true && addFormParams.smstemplid == '') {
						this.$message({
							message: '手机短信渠道必须选择一个消息模板！',
							type: 'error',
						});
						return;
					}
					if (this.addForm.smstempl == true && addFormParams.smsruleid == '') {
						this.$message({
							message: '手机短信渠道必须选择一个消息策略！',
							type: 'error',
						});
						return;
					}
					if (this.addForm.apptempl == true && addFormParams.apptemplid == '') {
						this.$message({
							message: 'APP渠道必须选择一个消息模板！',
							type: 'error',
						});
						return;
					}
					if (this.addForm.apptempl == true && addFormParams.appruleid == '') {
						this.$message({
							message: 'APP渠道必须选择一个消息策略！',
							type: 'error',
						});
						return;
					}
					if (addFormParams.params != '') {
						try {
							JSON.parse(addFormParams.params);
							if (
								addFormParams.params.indexOf('{') < 0 ||
								addFormParams.params.indexOf('}') < 0
							) {
								this.$message({
									message: '消息参数JSON格式异常！',
									type: 'error',
								});
								return;
							}
						} catch (e) {
							this.$message({
								message: '消息参数JSON格式异常！',
								type: 'error',
							});
							return;
						}
					}
					this.$api
						.formPost('/api/mess/mould/doSave', addFormParams)
						.then((res) => {
							if (res.retHead.code == '0000000') {
								this.$message({
									message: '添加成功！',
									type: 'success',
								});
								this.dialogFormVisible = false;
								this.init();
							} else {
								this.$message({
									message: res.retHead.message,
									type: 'error',
								});
							}
						});
				}
			});
		},
		handleEdit() {
			this.$refs.editForm.validate((valid) => {
				if (valid) {
					let addFormParams = {};
					addFormParams.id = this.editForm.id;
					addFormParams.title = this.editForm.title;
					addFormParams.params = this.editForm.params;
					addFormParams.level = this.editForm.level;
					addFormParams.type = this.editForm.type;
					if (this.editForm.pmtempl == false) {
						this.editForm.pmtemplid = '';
						this.editForm.pmruleid = '';
					}
					if (this.editForm.wxtempl == false) {
						this.editForm.wxtemplid = '';
						this.editForm.wxruleid = '';
					}
					if (this.editForm.smstempl == false) {
						this.editForm.smstemplid = '';
						this.editForm.smsruleid = '';
					}
					if (this.editForm.apptempl == false) {
						this.editForm.apptemplid = '';
						this.editForm.appruleid = '';
					}
					addFormParams.pmtemplid = this.editForm.pmtemplid;
					addFormParams.wxtemplid = this.editForm.wxtemplid;
					addFormParams.smstemplid = this.editForm.smstemplid;
					addFormParams.apptemplid = this.editForm.apptemplid;
					addFormParams.pmruleid = this.editForm.pmruleid;
					addFormParams.wxruleid = this.editForm.wxruleid;
					addFormParams.smsruleid = this.editForm.smsruleid;
					addFormParams.appruleid = this.editForm.appruleid;
					addFormParams.pmrulecode = this.editForm.pmrulecode;
					addFormParams.wxrulecode = this.editForm.wxrulecode;
					addFormParams.smsrulecode = this.editForm.smsrulecode;
					addFormParams.apprulecode = this.editForm.apprulecode;
					if (
						this.editForm.pmtempl == false &&
						this.editForm.wxtempl == false &&
						this.editForm.smstempl == false &&
						this.editForm.apptempl == false
					) {
						this.$message({
							message: '渠道必须选择一个！',
							type: 'error',
						});
						return;
					}
					if (this.editForm.pmtempl == true && addFormParams.pmtemplid == '') {
						this.$message({
							message: '站内渠道必须选择一个消息模板！',
							type: 'error',
						});
						return;
					}
					if (this.editForm.pmtempl == true && addFormParams.pmruleid == '') {
						this.$message({
							message: '站内渠道必须选择一个消息策略！',
							type: 'error',
						});
						return;
					}
					if (this.editForm.wxtempl == true && addFormParams.wxtemplid == '') {
						this.$message({
							message: '微信渠道必须选择一个消息模板！',
							type: 'error',
						});
						return;
					}
					if (this.editForm.wxtempl == true && addFormParams.wxruleid == '') {
						this.$message({
							message: '微信渠道必须选择一个消息策略！',
							type: 'error',
						});
						return;
					}
					if (
						this.editForm.smstempl == true &&
						addFormParams.smstemplid == ''
					) {
						this.$message({
							message: '手机短信渠道必须选择一个消息模板！',
							type: 'error',
						});
						return;
					}
					if (this.editForm.smstempl == true && addFormParams.smsruleid == '') {
						this.$message({
							message: '手机短信渠道必须选择一个消息策略！',
							type: 'error',
						});
						return;
					}
					if (
						this.editForm.apptempl == true &&
						addFormParams.apptemplid == ''
					) {
						this.$message({
							message: 'APP渠道必须选择一个消息模板！',
							type: 'error',
						});
						return;
					}
					if (this.editForm.apptempl == true && addFormParams.appruleid == '') {
						this.$message({
							message: 'APP渠道必须选择一个消息策略！',
							type: 'error',
						});
						return;
					}
					if (this.editForm.params != '') {
						try {
							JSON.parse(this.editForm.params);
							if (
								this.editForm.params.indexOf('{') < 0 ||
								this.editForm.params.indexOf('}') < 0
							) {
								this.$message({
									message: '消息参数JSON格式异常！',
									type: 'error',
								});
								return;
							}
						} catch (e) {
							this.$message({
								message: '消息参数JSON格式异常！',
								type: 'error',
							});
							return;
						}
					}
					this.$api
						.formPost('/api/mess/mould/doModById', addFormParams)
						.then((res) => {
							if (res.retHead.code == '0000000') {
								this.$message.success('保存成功！');
								this.init();
								this.dialogEditVisible = false;
							} else {
								this.$message.error(res.retHead.message);
							}
						});
				}
			});
		},

		handleDelete(index, row) {
			this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.$api
						.formPost('/api/mess/mould/doRmById', {
							id: row.id,
						})
						.then((res) => {
							if (res.retHead.code == '0000000') {
								this.$message({
									message: '删除成功！',
									type: 'success',
								});
								this.init();
							} else {
								this.$message({
									message: res.retHead.message,
									type: 'error',
								});
							}
						});
				})
				.catch(() => {});
		},
		submitForm(formName) {
			this.init();
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.submitForm('ruleForm');
		},
		checkedPMFun: function(e, checkedAll) {
			if (this.dialogFormVisible) this.addForm.pmtempl = e;
			else this.editForm.pmtempl = e;
		},
		checkedSMSFun: function(e, checkedAll) {
			if (this.dialogFormVisible) this.addForm.smstempl = e;
			else this.editForm.smstempl = e;
		},
		checkedAPPFun: function(e, checkedAll) {
			if (this.dialogFormVisible) this.addForm.apptempl = e;
			else this.editForm.apptempl = e;
		},
		checkedWXFun: function(e, checkedAll) {
			if (this.dialogFormVisible) this.addForm.wxtempl = e;
			else this.editForm.wxtempl = e;
		},
		selectsizeChange(n) {
			this.selectpageSize = n;
			if (this.dialogPMVisible) {
				this.handleSelectPMOpen();
			} else if (this.dialogWXVisible) {
				this.handleSelectWXOpen();
			} else if (this.dialogAPPVisible) {
				this.handleSelectAPPOpen();
			} else if (this.dialogSMSVisible) {
				this.handleSelectSMSOpen();
			}
		},
		selectcurrentChange(n) {
			this.selectcurrentPage = n;
			if (this.dialogPMVisible) {
				this.handleSelectPMOpen();
			} else if (this.dialogWXVisible) {
				this.handleSelectWXOpen();
			} else if (this.dialogAPPVisible) {
				this.handleSelectAPPOpen();
			} else if (this.dialogSMSVisible) {
				this.handleSelectSMSOpen();
			}
		},

		//-------PM----------------
		handleSelectionPMChange(selection) {
			this.selected = {};
			if (selection && selection.length > 0) {
				this.selected = selection[0];
				if (selection.length > 1) {
					this.$refs.pmSingleTable.clearSelection();
					this.$refs.pmSingleTable.toggleRowSelection(selection.pop());
				}
			}
		},
		handleSelectPMOpen() {
			this.selectTableData = [];
			this.selected = {};
			let param = {};
			let params = {
				pageNum: this.selectcurrentPage,
				pageSize: this.selectpageSize,
				...param,
			};
			this.$api
				.formPost('/api/mess/tmpl/pmTemplate/doGetList', params)
				.then((res) => {
					if (res.retHead.code == '0000000') {
						this.selectTableData = res.retBody.list;
						this.selecttotal = res.retBody.total;
						this.selectcurrentPage = res.retBody.pageNum;
					}
				});
			this.dialogPMVisible = true;
		},
		handleSelectPM() {
			if (this.selected != {}) {
				if (this.dialogFormVisible) {
					this.addForm.pmtemplid = this.selected.id;
					this.addForm.pmtemplname = this.selected.name;
				} else {
					this.editForm.pmtemplid = this.selected.id;
					this.editForm.pmtemplname = this.selected.name;
				}
			}
			this.dialogPMVisible = false;
			this.selectcurrentPage = 1;
			this.selectpageSize = 20;
			this.selecttotal = 0;
		},
		//-------WX----------------
		handleSelectionWXChange(selection) {
			this.selected = {};
			if (selection && selection.length > 0) {
				this.selected = selection[0];
				if (selection.length > 1) {
					this.$refs.wxSingleTable.clearSelection();
					this.$refs.wxSingleTable.toggleRowSelection(selection.pop());
				}
			}
		},
		handleSelectWXOpen() {
			this.selectTableData = [];
			this.selected = {};
			let param = {};
			let params = {
				pageNum: this.selectcurrentPage,
				pageSize: this.selectpageSize,
				...param,
			};
			this.$api
				.formPost('/api/mess/tmpl/wxTemplate/doGetList', params)
				.then((res) => {
					if (res.retHead.code == '0000000') {
						this.selectTableData = res.retBody.list;
						this.selecttotal = res.retBody.total;
						this.selectcurrentPage = res.retBody.pageNum;
					}
				});
			this.dialogWXVisible = true;
		},
		handleSelectWX() {
			if (this.selected != {}) {
				if (this.dialogFormVisible) {
					this.addForm.wxtemplid = this.selected.id;
					this.addForm.wxtemplname = this.selected.name;
				} else {
					this.editForm.wxtemplid = this.selected.id;
					this.editForm.wxtemplname = this.selected.name;
				}
			}
			this.dialogWXVisible = false;
			this.selectcurrentPage = 1;
			this.selectpageSize = 10;
			this.selecttotal = 0;
		},
		//-------SMS----------------
		handleSelectionSMSChange(selection) {
			this.selected = {};
			if (selection && selection.length > 0) {
				this.selected = selection[0];
				if (selection.length > 1) {
					this.$refs.smsSingleTable.clearSelection();
					this.$refs.smsSingleTable.toggleRowSelection(selection.pop());
				}
			}
		},
		handleSelectSMSOpen() {
			this.selectTableData = [];
			this.selected = {};
			let param = {};
			let params = {
				pageNum: this.selectcurrentPage,
				pageSize: this.selectpageSize,
				...param,
			};
			this.$api
				.formPost('/api/mess/tmpl/smsTemplate/doGetList', params)
				.then((res) => {
					if (res.retHead.code == '0000000') {
						this.selectTableData = res.retBody.list;
						this.selecttotal = res.retBody.total;
						this.selectcurrentPage = res.retBody.pageNum;
					}
				});
			this.dialogSMSVisible = true;
		},
		handleSelectSMS() {
			if (this.selected != {}) {
				if (this.dialogFormVisible) {
					this.addForm.smstemplid = this.selected.id;
					this.addForm.smstemplname = this.selected.name;
				} else {
					this.editForm.smstemplid = this.selected.id;
					this.editForm.smstemplname = this.selected.name;
				}
			}
			this.dialogSMSVisible = false;
			this.selectcurrentPage = 1;
			this.selectpageSize = 10;
			this.selecttotal = 0;
		},
		//-------APP----------------
		handleSelectionAPPChange(selection) {
			this.selected = {};
			if (selection && selection.length > 0) {
				this.selected = selection[0];
				if (selection.length > 1) {
					this.$refs.appSingleTable.clearSelection();
					this.$refs.appSingleTable.toggleRowSelection(selection.pop());
				}
			}
		},
		handleSelectAPPOpen() {
			this.selectTableData = [];
			this.selected = {};
			let param = {};
			let params = {
				pageNum: this.selectcurrentPage,
				pageSize: this.selectpageSize,
				...param,
			};
			this.$api
				.formPost('/api/mess/tmpl/appTemplate/doGetList', params)
				.then((res) => {
					if (res.retHead.code == '0000000') {
						this.selectTableData = res.retBody.list;
						this.selecttotal = res.retBody.total;
						this.selectcurrentPage = res.retBody.pageNum;
					}
				});
			this.dialogAPPVisible = true;
		},
		handleSelectAPP() {
			if (this.selected != {}) {
				if (this.dialogFormVisible) {
					this.addForm.apptemplid = this.selected.id;
					this.addForm.apptemplname = this.selected.name;
				} else {
					this.editForm.apptemplid = this.selected.id;
					this.editForm.apptemplname = this.selected.name;
				}
			}
			this.dialogAPPVisible = false;
			this.selectcurrentPage = 1;
			this.selectpageSize = 20;
			this.selecttotal = 0;
		},

		//-----------------------------
		handleSelectionRuleChange(selection) {
			this.selected = {};
			if (selection && selection.length > 0) {
				this.selected = selection[0];
				if (selection.length > 1) {
					this.$refs.ruleSingleTable.clearSelection();
					this.$refs.ruleSingleTable.toggleRowSelection(selection.pop());
				}
			}
		},
		handleSelectRuleOpen(channel) {
			this.channel = channel;
			this.selectTableData = [];
			this.selected = {};
			let param = {
				status: 1,
			};
			let params = {
				pageNum: this.selectcurrentPage,
				pageSize: this.selectpageSize,
				...param,
			};
			this.$api
				.formPost('/api/mess/rule/rules/doGetList', params)
				.then((res) => {
					if (res.retHead.code == '0000000') {
						this.selectTableData = res.retBody.list;
						this.selecttotal = res.retBody.total;
						this.selectcurrentPage = res.retBody.pageNum;
					}
				});
			this.dialogRuleVisible = true;
		},
		handleSelectRule() {
			if (this.selected != {}) {
				if (this.dialogFormVisible) {
					if (this.channel == 'PM') {
						this.addForm.pmruleid = this.selected.id;
						this.addForm.pmrulecode = this.selected.name;
					} else if (this.channel == 'WX') {
						this.addForm.wxruleid = this.selected.id;
						this.addForm.wxrulecode = this.selected.name;
					} else if (this.channel == 'SMS') {
						this.addForm.smsruleid = this.selected.id;
						this.addForm.smsrulecode = this.selected.name;
					} else if (this.channel == 'APP') {
						this.addForm.appruleid = this.selected.id;
						this.addForm.apprulecode = this.selected.name;
					}
				} else {
					if (this.channel == 'PM') {
						this.editForm.pmruleid = this.selected.id;
						this.editForm.pmrulecode = this.selected.name;
					} else if (this.channel == 'WX') {
						this.editForm.wxruleid = this.selected.id;
						this.editForm.wxrulecode = this.selected.name;
					} else if (this.channel == 'SMS') {
						this.editForm.smsruleid = this.selected.id;
						this.editForm.smsrulecode = this.selected.name;
					} else if (this.channel == 'APP') {
						this.editForm.appruleid = this.selected.id;
						this.editForm.apprulecode = this.selected.name;
					}
				}
			}

			this.dialogRuleVisible = false;
			this.selectcurrentPage = 1;
			this.selectpageSize = 20;
			this.selecttotal = 0;
		},
	},
	created() {},
};
</script>
<style lang="scss" scoped>
.btns {
	text-align: right;
}

.icon-arrow {
	position: absolute;
	bottom: 5px;
	left: 0;
	width: 100%;
	height: 1px;
	background-color: #f1f1f1;

	i {
		background-color: #fff;
		position: absolute;
		color: #999;
		bottom: -7px;
		margin-left: 50%;
		transform: translateX(-50%);
		cursor: pointer;
	}
}
</style>
