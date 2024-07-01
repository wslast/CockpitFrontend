<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 
-->
<template>
    <div class="person" v-loading="load">
        <div class="header">
            <div class="title">个人画像</div>
            <div class="fg1"></div>
            <el-input
                class="input"
                placeholder="请输入证件号码"
                size="mini"
                v-model="zjhm"
            >
                <el-button
                    class="button"
                    slot="append"
                    icon="el-icon-search"
                    @click="getData"
                ></el-button>
            </el-input>
            <el-dropdown ref="dropdown" style="height:30px;" @command="command">
                <span class="hideDropdown"></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        style="min-width:150px"
                        v-for="item in personList"
                        :key="item.grzh"
                        :command="item.grzh"
                    >
                        {{ item.grzh }} - {{ item.xm }} - {{ item.zhzt }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="df">
            <div
                class="defaultCard df"
                style="padding-top:43px;padding-bottom:30px;"
            >
                <div class="df">
                    <div class="head">
                        <img
                            v-if="personInfo.xb == '男'"
                            src="../../../assets/images/portrait/person/nan.jpg"
                            class="headIcon"
                            alt=""
                        />
                        <img
                            v-if="personInfo.xb == '女'"
                            src="../../../assets/images/portrait/person/nv.jpg"
                            class="headIcon"
                            alt=""
                        />
                        <div class="name">{{ personInfo.xm }}</div>
                    </div>
                </div>
                <div class="df fdc fg1">
                    <div class="df form">
                        <div class="item">
                            <div class="name">
                                个人账号:{{ personInfo.grzh }}
                            </div>
                        </div>
                        <div class="item">
                            <div class="name">
                                证件号码:{{ personInfo.zjhm }}
                            </div>
                        </div>
                    </div>
                    <div class="df form">
                        <div class="item">
                            <div class="name">
                                证件类型:{{ personInfo.zjlx }}
                            </div>
                        </div>
                        <div class="item">
                            <div class="name">性别：{{ personInfo.xb }}</div>
                        </div>
                    </div>
                    <div class="df form">
                        <div class="item">
                            <div class="name">年龄：{{ personInfo.nl }}</div>
                        </div>

                        <div class="item">
                            <div class="name">
                                手机号：{{ personInfo.sjhm }}
                            </div>
                        </div>
                    </div>
                    <div class="df form">
                        <div class="item">
                            <div class="name">
                                出生日期：{{ personInfo.csrq }}
                            </div>
                        </div>
                        <div class="item">
                            <div class="name">
                                个人缴存比例：{{ personInfo.grjcbl }}
                            </div>
                        </div>
                    </div>
                    <div class="df form">
                        <div class="item">
                            <div class="name">
                                单位缴存比例：{{ personInfo.dwjcbl }}
                            </div>
                        </div>
                        <div class="item">
                            <div class="name">
                                缴存基数：{{ personInfo.jcjs }}
                            </div>
                        </div>
                    </div>
                    <div class="df form">
                        <div class="item">
                            <div class="name">国籍：{{ personInfo.gj }}</div>
                        </div>
                        <div class="item">
                            <div class="name">
                                账户余额：{{ personInfo.zhye }}
                            </div>
                        </div>
                    </div>
                    <div class="status">
                        <div
                            class="item position"
                            v-for="item in grbqInfo"
                            :key="item.bqmc"
                            :class="[styles[item.styletype]]"
                        >
                            {{ item.bqmc }}
                        </div>
                        <!-- <div class="item months">已缴月数(125)</div>
                        <div class="item type">个贷次数(1)</div>
                        <div class="item type">组合贷</div> -->
                    </div>
                </div>
            </div>
            <div class="defaultCard  df fdc">
                <div class="df aic cardContent" style="margin-bottom:17px">
                    <img
                        class="icon"
                        src="../../../assets/images/portrait/person/icon_grhx_you1.svg"
                        alt=""
                    />
                    <div class="title">缴存情况</div>
                    <div class="type df aic">
                        <img
                            class="icon"
                            src="../../../assets/images/portrait/person/icon_grhx_you1_1.svg"
                            alt=""
                        />
                        <div class="content">
                            {{ personInfo.zhzt }}
                        </div>
                    </div>
                </div>
                <div class="form df">
                    <div class="item">
                        <div class="name">缴存单位： {{ personInfo.jcdw }}</div>
                    </div>
                    <div class="item">
                        <div class="name">单位性质：{{ personInfo.dwxz }}</div>
                    </div>
                    <div class="item">
                        <div class="name">缴至年月： {{ personInfo.jzny }}</div>
                    </div>
                </div>
                <div class="form df">
                    <div class="item">
                        <div class="name">单位账号: {{ personInfo.dwzh }}</div>
                    </div>
                    <div class="item">
                        <div class="name">开户日期：{{ personInfo.khrq }}</div>
                    </div>
                    <div class="item">
                        <div class="name">销户日期:{{ personInfo.xhrq }}</div>
                    </div>
                </div>
                <div class="line" style="margin: 5px 17px;"></div>
                <div class="df fdc table fg1">
                    <div class="title" style="margin: 10px 0px;">
                        公积金贷款情况
                    </div>
                    <div style="height:0px" class="fg1 portTable">
                        <jh-table
                            class="fg1 ova"
                            height="100%"
                            size="small"
                            ref="jhTable"
                            :columnList="columnList"
                            :data="tableDataList"
                        ></jh-table>
                    </div>
                    <!-- <div class="fg1 w14">
                        <div class="df aic" style="margin-bottom:9px">
                            <img
                                class="icon"
                                src="../../../assets/images/portrait/person/icon_grhx_you1_2.svg"
                                alt=""
                            />
                            <div class="subTitle">
                                信用情况
                            </div>
                        </div>
                        <div class="form">
                            <div class="item">
                                <div class="name">
                                    贷款情况：
                                    <span class="type">
                                        {{ xyqkInfo.dkqk }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="form">
                            <div class="item">
                                <div class="name">
                                    贷款已还: {{ xyqkInfo.dkyh }}次
                                </div>
                            </div>
                            <div class="item">
                                <div class="name">
                                    押品评估总价: {{ xyqkInfo.yppgzj }}万
                                </div>
                            </div>
                        </div>
                        <div class="form">
                            <div class="item">
                                <div class="name">
                                    贷款逾期: {{ xyqkInfo.dkyq }}次
                                </div>
                            </div>
                            <div class="item">
                                <div class="name">
                                    押品剩余价值: {{ xyqkInfo.ypsyjz }}万
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fg1 w14">
                        <div class="df aic" style="margin-bottom:9px">
                            <img
                                class="icon"
                                src="../../../assets/images/portrait/person/icon_grhx_you1_2.svg"
                                alt=""
                            />
                            <div class="subTitle">
                                个人获得感
                            </div>
                        </div>
                        <div class="form">
                            <div class="item">
                                <div class="name">
                                    可贷额度:
                                    <span class="type">
                                        {{ grhdgInfo.kded }}万
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="form">
                            <div class="item">
                                <div class="name">
                                    贷款次数:{{ grhdgInfo.dkcs }}次
                                </div>
                            </div>
                            <div class="item">
                                <div class="name">
                                    贷款房屋类型: {{ grhdgInfo.dkfwlx }}
                                </div>
                            </div>
                        </div>
                        <div class="form">
                            <div class="item">
                                <div class="name">
                                    租房提取次数: {{ grhdgInfo.zftqcs }}次
                                </div>
                            </div>
                            <div class="item">
                                <div class="name">
                                    购房提取次数: {{ grhdgInfo.gftqcs }}次
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="df fg1 h14 row">
            <div class="defaultCard df fdc w14 fg1">
                <div class="df aic cardContent">
                    <img
                        class="icon"
                        src="../../../assets/images/portrait/person/icon_grhx_zuo1.svg"
                        alt=""
                    />
                    <div class="title">近6个月缴存情况</div>
                </div>
                <div class="fg1">
                    <jcqk
                        :v-if="personInfo.grzh"
                        :personInfo="personInfo"
                    ></jcqk>
                </div>
            </div>

            <div class="defaultCard df fdc w14">
                <div class="df aic cardContent">
                    <img
                        class="icon"
                        src="../../../assets/images/portrait/person/icon_grhx_zuo1.svg"
                        alt=""
                    />
                    <div class="title">
                        近12期还款情况
                    </div>
                </div>
                <div class="fg1">
                    <hkqk
                        :v-if="personInfo.grzh"
                        :personInfo="personInfo"
                    ></hkqk>
                </div>
            </div>
        </div>
        <div class="df fg1 h14 row">
            <div class="defaultCard df fdc">
                <div class="df aic cardContent">
                    <img
                        class="icon"
                        src="../../../assets/images/portrait/person/icon_grhx_zuo2.svg"
                        alt=""
                    />
                    <div class="title">
                        近12个月使用情况
                    </div>
                </div>
                <!-- <div class="df jce aic">
                    <el-select size="mini" v-model="type"></el-select>
                    <div class="df aic times">
                        提取频次
                        <span class="time">3</span>
                        次
                    </div>
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="Top Left 提示文字"
                        placement="top-start"
                    >
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                </div> -->
                <div class="fg1">
                    <syqk
                        :v-if="personInfo.grzh"
                        :personInfo="personInfo"
                    ></syqk>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { time } from 'echarts';
export default {
    name: 'person',
    components: {
        jcqk: () => import('./components/jcqk.vue'),
        hkqk: () => import('./components/hkqk.vue'),
        syqk: () => import('./components/syqk.vue'),
    },

    data() {
        return {
            zjhm: '',
            type: '',
            load: false,
            personList: [],
            personInfo: {
                grzh: '', //个人账号
                xm: '', //姓名
                zjhm: '', //证件号码
                zjlx: '', //证件类型
                xb: '', //性别
                nl: '', //年龄
                sjhm: '', //手机号码
                csrq: '', //出生日期
                grzh: '', //个人账号
                zhye: '', //账户余额
                gj: '', //国籍
                dwjcbl: '', //单位缴存比例
                grjcbl: '', //个人缴存比例
                jcjs: '', //缴存基数
                jcdw: '', //缴存单位
                dwxz: '', //单位性质
                jzny: '', //缴至年月
                zhzt: '', //账户状态
                dwzh: '', //单位账号
                khrq: '', //开户日期
                xhrq: '', //销户日期
            },
            xyqkInfo: {
                dkqk: '', //贷款情况
                dkyh: '', //贷款已还
                dkyq: '', //贷款逾期
                yppgzj: '', //押品评估总价
                ypsyjz: '', //押品剩余价值
                dkzh: '', //贷款账号
            },
            grhdgInfo: {
                kded: '', //可贷额度
                dkcs: '', //贷款次数
                dkfwlx: '', //贷款房屋类型
                zftqcs: '', //租房提取次数
                gftqcs: '', //购房提取次数
            },
            grbqInfo: [],
            styles: {
                1: 'position',
                2: 'months',
                3: 'type',
            },
            tableDataList: [],
            columnList: [
                {
                    prop: 'xh',
                    label: '序号',
                    width: '50px',
                    align: 'center',
                    fixed: 'left',
                },
                { prop: 'htdm', label: '合同代码', align: 'center' },
                {
                    prop: 'jkhtbh',
                    label: '借款合同编号',
                    width: '100px',
                    align: 'center',
                },
                {
                    prop: 'dqdkzt',
                    label: '当前贷款状态',
                    width: '100px',
                    align: 'center',
                },
                { prop: 'dkje', label: '贷款金额', align: 'center' },
                { prop: 'sqrq', label: '申请日期', align: 'center' },
                { prop: 'fkrq', label: '放款日期', align: 'center' },
                { prop: 'jqrq', label: '结清日期', align: 'center' },
                { prop: 'dkye', label: '贷款余额', align: 'center' },
                {
                    prop: 'cdgx',
                    label: '参贷关系',
                    align: 'center',
                    fixed: 'right',
                },
            ],
        };
    },

    computed: {},
    created() {},
    mounted() {},
    methods: {
        command(com) {
            this.personInfo = this.personList.find((item) => item.grzh == com);
            this.zjhm = this.personInfo.zjhm;
            this.getOtherData();
        },
        getOtherData() {
            this.getData3();
            this.getData4();
            this.getData5();
            this.getTableData();
        },
        async getData() {
            this.load = true;
            this.$api
                .formPost('/api/dyncscript/scriptRule/query', {
                    scriptId: 'grhx_jbxx',
                    zjhm: this.zjhm,
                })
                .then((res) => {
                    this.load = false;
                    if (res.retBody.retList.length === 0) {
                        this.$message.warning('暂无数据');
                        return;
                    } else if (res.retBody.retList.length === 1) {
                        this.personInfo = res.retBody.retList[0];
                        this.getOtherData();
                    } else {
                        this.personList = res.retBody.retList;
                        this.$nextTick(() => {
                            this.$refs.dropdown.show();
                        });
                        return;
                    }
                });
        },
        getData3() {
            this.xyqkInfo = {
                dkqk: '', //贷款情况
                dkyh: '', //贷款已还
                dkyq: '', //贷款逾期
                yppgzj: '', //押品评估总价
                ypsyjz: '', //押品剩余价值
                dkzh: '', //贷款账号
            };
            this.$api
                .formPost('/api/dyncscript/scriptRule/query', {
                    scriptId: 'grhx_xyqk',
                    grzh: this.personInfo.grzh,
                })
                .then((res) => {
                    if (res.retBody.retLis.length > 0) {
                        this.xyqkInfo = res.retBody.retList[0];
                    }
                });
        },
        getData4() {
            this.grhdgInfo = {
                kded: '', //可贷额度
                dkcs: '', //贷款次数
                dkfwlx: '', //贷款房屋类型
                zftqcs: '', //租房提取次数
                gftqcs: '', //购房提取次数
            };
            this.$api
                .formPost('/api/dyncscript/scriptRule/query', {
                    scriptId: 'grhx_grhdg',
                    grzh: this.personInfo.grzh,
                })
                .then((res) => {
                    if (res.retBody.retLis.length > 0) {
                        this.grhdgInfo = res.retBody.retList[0];
                    }
                });
        },
        getData5() {
            this.grbqInfo = [];
            this.$api
                .formPost('/api/dyncscript/scriptRule/query', {
                    scriptId: 'grhx_grbq',
                    grzh: this.personInfo.grzh,
                })
                .then((res) => {
                    this.grbqInfo = res.retBody.retList;
                });
        },
        // 获取表格数据
        async getTableData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'grhx_dkqk',
                        grzh: this.personInfo.grzh,
                    })
                    .then((res) => {
                        this.tableDataList = res.retBody.retList;
                        resolve();
                    });
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.person {
    height: 100%;
    padding-left: 10px;
    background: #f6f7fc;
    display: flex;
    flex-direction: column;
    overflow: auto;
    .header {
        height: 40px;
        display: flex;
        align-items: center;
        padding-right: 10px;
        flex-shrink: 0;
        flex-grow: 0;
        .title {
            font-size: 16px;
            font-weight: bold;
            color: #409eff;
        }
        .input {
            height: 26px;
            width: 276px;
        }
    }
    .head {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 53px;
        margin-right: 43px;
        .headIcon {
            height: 4.792vw;
            width: 4.792vw;
            border-radius: 100px;
        }
        .name {
            margin-top: 8px;
            font-size: 12px;
            font-family: MicrosoftYaHei;
            color: #1d1d1d;
        }
    }
    .form {
        display: flex;
        .item {
            flex-grow: 1;
            width: 14px;
            margin: 6px 0px 8px;
            display: flex;
            align-items: center;
            .name,
            .value {
                font-size: 12px;
                color: #6b6b6b;
            }
            .name {
                .type {
                    padding: 4px 12px;
                    background: #409eff;
                    border-radius: 3px;
                    font-size: 12px;
                    color: #fff;
                    margin-left: 4px;
                }
            }
        }
    }

    .status {
        display: flex;
        margin-top: 34px;
        .item {
            line-height: 24px;
            height: 24px;
            font-size: 12px;
            color: #6b6b6b;
            padding: 0px 20px;
            border-radius: 24px;
            border: 1px solid;
            margin-right: 10px;
            flex-grow: 0;
        }
        .position {
            border-color: rgba(157, 205, 255, 1);
        }
        .months {
            border-color: rgba(159, 222, 195, 1);
        }
        .type {
            border-color: rgba(234, 215, 137, 1);
        }
    }
    .cardContent {
        .title {
            font-size: 14px;
            font-weight: bold;
            color: #1d1d1d;
        }
        .subTitle {
            font-size: 12px;
            color: rgba(29, 29, 29, 1);
        }
        .type {
            padding: 2px 12px;
            background: #409eff;
            border-radius: 3px;
            margin-left: 18px;
            .icon {
                margin-right: 5px;
            }
            .content {
                font-size: 12px;
                color: #ffffff;
            }
        }
    }
    .times {
        margin: 0px 18px 0px 12px;
        color: rgba(153, 153, 153, 1);
        font-size: 12px;
        .time {
            color: rgba(64, 158, 255, 1);
            font-size: 16px;
            padding: 0px 5px;
        }
    }
}
.table {
    .title {
        font-size: 14px;
        font-weight: bold;
    }
}
.row {
    min-height: 270px;
}
.defaultCard {
    flex-grow: 1;
    padding: 12px 17px;
    width: 14px;
    background: #fff;
    margin: 0px 10px 10px 0px;
}
.icon {
    height: 15px;
    margin-right: 10px;
}
.line {
    margin: 17px;
    height: 1px;
    background: #efefef;
}
.w14 {
    width: 14px;
}
/deep/ .el-input-group__append {
    border: 0;
}
/deep/ .input .el-input__inner {
    border-radius: 2.604vw 0px 0px 2.604vw;
    padding-left: 20px;
    border-left: 0px;
    border-bottom: 0px;
    border-top: 0px;
}
/deep/ .button {
    display: flex;
    background: #fff !important;
    height: 28px;
    margin-top: 0px;
    margin-bottom: 0px;
    line-height: 28px;
    border-radius: 0px 2.604vw 2.604vw 0px;
}
/deep/ .button .el-icon-search {
    color: #409eff;
    font-weight: bold;
}
/deep/ .hideDropdown {
    position: absolute;
    right: 1px;
}
</style>
