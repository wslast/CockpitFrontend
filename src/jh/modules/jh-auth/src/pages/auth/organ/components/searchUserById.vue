<template>
    <div class>
        <el-form  :model="editForm" ref="form" label-width="80px" :disabled="justshow">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="真实姓名" >
                        <el-input v-model="editForm.realName" autocomplete="off" class="pcth100"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="登陆账号" prop="username">
                        <el-input v-model="editForm.username" autocomplete="off" class="pcth100"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="部门名称" >
                        <el-input v-model="editForm.organName" disabled autocomplete="off" class="pcth100"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="启用状态" >
                        <el-radio-group v-model="editForm.userStatus">
                            <el-radio label="1">启用</el-radio>
                            <el-radio label="2">禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="性别" >
                        <el-radio-group v-model="editForm.sex" >
                            <el-radio label="1">男</el-radio>
                            <el-radio label="2">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="职员编码" >
                        <el-input v-model="editForm.userCode" autocomplete="off" class="pcth100"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="证件类型" >
                        <el-input v-model="editForm.identificationType" autocomplete="off" class="pcth100">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="证件号码" >
                        <el-input v-model="editForm.identificationNumber" autocomplete="off" class="pcth100">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="出生日期" >
                        <el-date-picker v-model="editForm.birthday" type="date" value-format="“yyyy-MM-dd”"
                            placeholder="选择日期" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="家庭住址" >
                        <el-input v-model="editForm.adress" autocomplete="off" class="pcth100"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="邮政编码" >
                        <el-input v-model="editForm.postcode" autocomplete="off" class="pcth100"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="职务" >
                        <el-input v-model="editForm.userPost" autocomplete="off" class="pcth100"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="职称" >
                        <el-input v-model="editForm.title" autocomplete="off" class="pcth100"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="职员类别" >
                        <el-input v-model="editForm.categoryStaff" autocomplete="off" class="pcth100"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="学校" >
                        <el-input v-model="editForm.school" autocomplete="off" class="pcth100"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="最高学历" >
                        <el-input v-model="editForm.highEducation" autocomplete="off" class="pcth100"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="职员属性" >
                        <el-input v-model="editForm.staffAttribute" autocomplete="off" class="pcth100"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="固定电话" >
                        <el-input v-model="editForm.telephone" autocomplete="off" class="pcth100"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="移动电话" >
                        <el-input v-model="editForm.mobile" autocomplete="off" class="pcth100"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="电子邮箱" >
                        <el-input v-model="editForm.email" autocomplete="off" class="pcth100"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="QQ号码" >
                        <el-input v-model="editForm.qqNumber" autocomplete="off" class="pcth100"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="建档人" >
                        <el-input v-model="editForm.createUserName" autocomplete="off" class="pcth100"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="建档日期" >
                        <el-date-picker v-model="editForm.createTime" type="date" value-format="yyyy-MM-dd"
                            placeholder="选择日期" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="微信号" prop="wechatNumber" >
                        <el-input v-model="editForm.wechatNumber" autocomplete="off" class="pcth100"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注">
                        <el-input v-model="editForm.remark" type="textarea" style="width:100%" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                editForm: {
                    realName: '',
                },
                justshow: true,
            }

        },
        mounted() { },
        methods: {
            init(userId) {
                let params = {
                    id: userId
                };
                this.$api.formPost("/api/auth/sysuser/doGetUser", params).then(res => {
                    if (res.retHead.code == "0000000") {
                        // console.log(res.retBody);
                        this.editForm = res.retBody;
                    } else {
                        this.$message.error("发生错误");
                    }
                })
            }
        },
    }
</script>
</script>
<style lang='scss' scoped>

</style>