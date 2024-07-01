<template>
    <div>
         <div class="card tr mb2">
      <!-- <el-popover placement="bottom" width="200" trigger="click">
        <el-checkbox-group v-model="showItemList">
          <el-checkbox v-for="(item,key) in allItemList" :key="key" :label="item"></el-checkbox>
        </el-checkbox-group>
        <el-button slot="reference" icon="el-icon-menu"  type="primary" circle></el-button>
      </el-popover> -->

      <el-button
        icon="el-icon-search"
        @click="formShow= !formShow"
        
        type="primary"
        circle
      ></el-button>
      <el-button   type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
      <el-button   type="danger" icon="el-icon-remove" @click="deleteBatch">删除</el-button>
    </div>
         <div class="card" v-show="formShow">
            <el-form :model="searchForm" label-width="120px"  inline ref="searchForm">  
                <el-form-item label="参数类型关键字" prop="code">
                    <el-input v-model="searchForm.code"  placeholder="请输入参数类型关键字"></el-input>
                </el-form-item>
                <el-form-item label="参数类型名称" prop="codeName">
                    <el-input v-model="searchForm.codeName"   placeholder="请输入参数类型名称"></el-input>
                </el-form-item>
                <el-form-item label="类别" label-width="120px" prop="codeType">
                   <el-select v-model="searchForm.codeType" >
                        <el-option
                        v-for="item in codeType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"   @click="getList">查询</el-button>
                    <el-button  @click="resetForm('searchForm')">重置</el-button>
                </el-form-item>    
            </el-form>
        <!-- </el-card> -->
             </div>
        <el-card class="ep-card" style="height: calc(100vh - 220px);">
                <el-table
                    :data="tableData"
                    border
                      @selection-change="handleSelectionChange"
                    style="width: 100%" >
                    <el-table-column
                        type="selection"
                        width="50"
                       >
                    </el-table-column>

                    <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="50">
                    </el-table-column>

                    <el-table-column
                        prop="code"
                        align="center"
                        label="参数类型关键字">
                    </el-table-column>
                    <el-table-column
                        prop="codeName"
                        align="center"
                        show-overflow-tooltip
                        label="参数类型名称">
                    </el-table-column>
                    
                    <el-table-column
                        prop="codeEnabledState"
                        align="center"
                        width="80"
                        label="是否可用">
                        <template slot-scope="scope">
                            
                           <span v-if="'0'==scope.row.codeEnabledState">
                               否
                            </span>
                             <span v-if="'1'==scope.row.codeEnabledState">
                               是
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="codeType"
                        align="center"
                        width="120"
                        label="类别">
                        <template slot-scope="scope">
                            <div  v-for="item in codeType"
                        :key="item.value">
                            <span v-if="scope.row.codeType==item.value">{{item.label}}</span>
                            </div>
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
                        label="备注">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        align="center"
                        label="操作"
                        width="180">
                        <template slot-scope="scope">
                            <el-button type="primary"  @click="edit(scope.row)"  icon="el-icon-edit">修改</el-button>
                            <el-button type="primary"  @click="show(scope.row)"  icon="el-icon-s-tools">参数设置</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    style="text-align:right"
                    v-show="tableData.length > 0"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pager.page"
                    background
                    :page-size="pager.size"
                    layout="total, sizes, prev, pager, next"
                    :total="pager.total">
                </el-pagination>
        </el-card>
        <el-dialog  :title="dialogTitle" :visible.sync="dialogFormVisible" :before-close="handleFormClose">

            <el-form  :model="sysCode" ref="sysCode" :rules="rules">

              <el-form-item label="参数类型关键字" label-width="120px" prop="code">
                <el-input v-model="sysCode.code"  placeholder="请输入参数类型关键字"></el-input>
              </el-form-item>

              <el-form-item label="参数类型名称" label-width="120px" prop="codeName">
                <el-input v-model="sysCode.codeName"  placeholder="请输入参数类型名称"></el-input>
              </el-form-item>

                <el-form-item label="是否可用" label-width="120px" prop="codeEnabledState">
                   <el-radio v-model="sysCode.codeEnabledState" label="1">是</el-radio>
                   <el-radio v-model="sysCode.codeEnabledState" label="0">否</el-radio>
                </el-form-item>
                <el-form-item label="类别" label-width="120px">
                   <el-select v-model="sysCode.codeType" >
                        <el-option
                        v-for="item in codeType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="备注" label-width="120px" >
                    <el-input v-model="sysCode.remark" type="textarea" :autosize="{minRows: 2,maxRows: 2}"   ></el-input>
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
        <el-dialog  title="参数设置" :visible.sync="adddialogFormVisible" :before-close="addhandleFormClose" width="60%">

            <el-form :model="sysCode" ref="sysCode"  :rules="rules">

              <el-form-item label="参数类型关键字" label-width="120px" prop="code">
                <el-input v-model="sysCode.code"  placeholder="请输入参数类型关键字" disabled></el-input>
              </el-form-item>

              <el-form-item label="参数类型名称" label-width="120px" prop="codeName">
                <el-input v-model="sysCode.codeName"  placeholder="请输入参数类型名称" disabled></el-input>
              </el-form-item>

                <el-form-item label="是否可用" label-width="120px" prop="codeEnabledState">
                   <el-radio v-model="sysCode.codeEnabledState" label="1" disabled>是</el-radio>
                   <el-radio v-model="sysCode.codeEnabledState" label="0" disabled>否</el-radio>
                </el-form-item>
                 <el-form-item label="备注" label-width="120px" >
                    <el-input v-model="sysCode.remark" type="textarea" :autosize="{minRows: 2,maxRows: 2}"  disabled ></el-input>
                </el-form-item>
            </el-form>
            <el-table :data="parSetList" ref="dragTable" row-key="id" style="width: 100%"  border >
                <el-table-column  width="50" >
                    <template slot="header">
                    <el-button class="el-icon-circle-plus"  type="text" @click.prevent="parSetAddRow()" ></el-button>
                    </template>
                    <template slot-scope="scope">
                        <el-button type="text"  class="el-icon-remove" @click="parSetDelete(scope.$index, scope.row)" ></el-button>
                    </template>
                </el-table-column>
                <el-table-column type="index" width="50" label="序号" fixed="left" align="center">
                </el-table-column>
                <el-table-column
                    align="center"
                    show-overflow-tooltip
                    label="参数名称(用于页面显示)" min-width="120">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.codeName" v-if="scope.row.edit"  ></el-input>
                        <span v-else>{{ scope.row.codeName }}</span>
                    </template> 
                </el-table-column>
                <el-table-column
                    align="center"
                    show-overflow-tooltip
                    label="参数值(取值保存)" min-width="120" >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.codeValue" v-if="scope.row.edit"  ></el-input>
                        <span v-else>{{ scope.row.codeValue }}</span>
                    </template> 
                </el-table-column>
                <el-table-column
                        prop="enabledState"
                        align="center"
                        width="80"
                        label="是否可用">
                   
                        <template slot-scope="scope">
                            <div v-if="scope.row.edit">
                                <el-select v-model="scope.row.enabledState" >
                                    <el-option label="是" value="1">
                                    </el-option>
                                    <el-option  label="否" value="0">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else>
                                <span v-if="'0'==scope.row.enabledState">
                                    否
                                    </span>
                                    <span v-if="'1'==scope.row.enabledState">
                                    是
                                    </span>
                            </div> 
                        </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="200px">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.edit && !scope.row.add"
                            type="primary"
                            
                            icon="el-icon-close"
                            @click="cancal(scope.row)"
                        >
                            取消
                        </el-button>
                        <el-button
                            v-if="scope.row.edit"
                            type="success"
                            
                            icon="el-icon-check"
                            @click="parSetSave(scope.row,scope.$index)"
                        >
                            保存
                        </el-button>
                        <el-button
                            v-else
                            type="primary"
                            
                            icon="el-icon-edit"
                            @click="scope.row.edit=!scope.row.edit"
                        >
                            修改
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer" >
                <el-button type="primary"  @click="saveAll">顺序变更</el-button>
                 <el-button type="close" @click="close">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script src="./systemParSetType.js"></script> 
<style>
</style>
   