<template>
    <div>
         <el-card class="ep-card ep-search">
            <el-form :model="searchForm"  label-width="150px">  
                <el-row :gutter="0">
                    <el-col :span="7">
                        <el-form-item label="参数编码">
                           <el-input v-model="searchForm.code"  placeholder="请输入参数编码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="参数名称">
                           <el-input v-model="searchForm.codeName"  placeholder="请输入参数名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="参数类型">
                           <el-select v-model="searchForm.sysCodeId" filterable placeholder="请选择">
                                <el-option
                                v-for="item in sysCodes"
                                :key="item.id"
                                :label="item.codeName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                   </el-row>
                <el-row> 
                  <el-col :span="7" style="float:right">
                    <el-button type="small" icon="el-icon-search" @click="getList">查询</el-button>
                    <el-button type="small" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
                    <!-- <el-button type="small" icon="el-icon-remove" @click="deleteBatch">删除</el-button>  -->
                  </el-col>
                </el-row>
            </el-form>
        </el-card>
        <el-card class="ep-card" style="height: calc(100vh - 280px);">
            <el-row style="margin-top: 10px;">
                <el-table
                    :data="tableData"
                    border
                    :height="height"  @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <!-- <el-table-column
                        type="selection"
                        width="50"
                       >
                    </el-table-column> -->

                    <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="50">
                    </el-table-column>

                    <el-table-column
                        prop="code"
                        align="center"
                        label="参数编码">
                    </el-table-column>
                    <el-table-column
                        prop="codeName"
                        align="center"
                        show-overflow-tooltip
                        label="参数名称">
                    </el-table-column>
                    <el-table-column
                        prop="codeValue"
                        align="center"
                        show-overflow-tooltip
                        label="参数值">
                    </el-table-column>
                    <el-table-column
                        prop="codeEnabledState"
                        align="center"
                        width="80"
                        label="参数类型">
                        <template slot-scope="scope">
                          <div v-for="item in sysCodes" :key="item.id">
                                    <span v-if="item.id==scope.row.sysCodeId">
                                        {{item.codeName}}
                                    </span>
                          </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        align="center"
                        label="操作"
                        width="180">
                        <template slot-scope="scope">
                            <el-button type="text" @click="edit(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    v-show="tableData.length > 0"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pager.page"
                    background
                    :page-size="pager.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pager.total">
                </el-pagination>
            </el-row>
        </el-card>
        <el-dialog  :title="dialogTitle" :visible.sync="dialogFormVisible" :before-close="handleFormClose">
            <el-form :model="sysCodeItem"  ref="sysCodeItem" :rules="rules" >

              <el-form-item label="参数编号" label-width="120px" prop="code">
                <el-input v-model="sysCodeItem.code"  placeholder="请输入参数编码"></el-input>
              </el-form-item>

              <el-form-item label="参数名称" label-width="120px" prop="codeName"> 
                <el-input v-model="sysCodeItem.codeName"  placeholder="请输入参数名称"></el-input>
              </el-form-item>
              <el-form-item label="参数值" label-width="120px" prop="codeValue">
                <el-input v-model="sysCodeItem.codeValue"  placeholder="请输入参数值" ></el-input>
              </el-form-item>
              <el-form-item label="参数类型" label-width="120px" prop="sysCodeId">
                <el-select v-model="sysCodeItem.sysCodeId" filterable placeholder="请选择">
                                <el-option
                                v-for="item in sysCodes"
                                :key="item.id"
                                :label="item.codeName"
                                :value="item.id">
                                </el-option>
                 </el-select>
              </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer" v-show="!viewHide">
                <el-button @click="handleFormClose">取 消</el-button>
                <el-button type="primary" @click="doSave">保 存</el-button>
            </div>
        </el-dialog>
      
    </div>
</template>
<script src="./systemParSet.js"></script>    