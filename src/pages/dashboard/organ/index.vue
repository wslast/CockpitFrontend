<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 
-->
<template>
    <div class="person" v-loading="load">
        <div class="header">
            <div class="title">单位画像</div>
            <div class="fg1"></div>
            <el-input
                class="input"
                placeholder="请输入单位名称"
                size="mini"
                v-model="name"
                clearable
            >
                <el-button
                    class="button"
                    slot="append"
                    icon="el-icon-search"
                    @click="searchData"
                ></el-button>
            </el-input>
            <el-dropdown ref="dropdown" style="height:30px;" @command="command">
                <span class="hideDropdown"></span>
                <el-dropdown-menu slot="dropdown">
                    <div class="searchDropdown">
                        <el-dropdown-item
                            style="min-width:150px"
                            v-for="item in organList"
                            :key="item.dwzh"
                            :command="item.dwzh"
                        >
                            {{ item.dwzh }} - {{ item.dwmc }} - {{ item.dwzt }}
                        </el-dropdown-item>
                    </div>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="df">
            <div class="defaultCard df fdc" style="flex-grow:5;">
                <div class="df aic cardContent" style="margin-bottom:17px">
                    <img
                        class="icon"
                        src="../../../assets/images/portrait/organ/icon_dwhx_zuo1.svg"
                        alt=""
                    />
                    <div class="title">单位基本信息</div>
                </div>
                <div class="df">
                    <div class="df">
                        <div class="head">
                            <img
                                src="../../../assets/images/portrait/organ/logo.png"
                                class="headIcon"
                                alt=""
                            />
                            <div class="name">统一信用代码</div>
                            <div class="value">{{ organInfo.tyshxydm }}</div>
                            <img
                                v-if="
                                    organInfo.dwzt && organInfo.dwzt === '正常'
                                "
                                class="statusIcon"
                                src="../../../assets/images/portrait/organ/icon_zhengchang.png"
                                alt=""
                            />
                            <div
                                v-if="
                                    organInfo.dwzt && organInfo.dwzt != '正常'
                                "
                                class="statusError"
                            >
                                {{ organInfo.dwzt }}
                            </div>
                        </div>
                    </div>
                    <div class="df fdc fg1">
                        <div class="df form">
                            <div class="item">
                                <div class="name">
                                    单位名称: {{ organInfo.dwmc }}
                                </div>
                            </div>
                            <div class="item">
                                <div class="name">
                                    开户时间: {{ organInfo.khsj }}
                                </div>
                            </div>
                            <div class="item">
                                <div class="name">
                                    缴至年月: {{ organInfo.jzny }}
                                </div>
                            </div>
                        </div>
                        <div class="df form">
                            <div class="item">
                                <div class="name">
                                    企业法人: {{ organInfo.qyfr }}
                                </div>
                            </div>
                            <div class="item">
                                <div class="name">
                                    当年新开人数: {{ organInfo.dnxkrs }}
                                </div>
                            </div>
                            <div class="item">
                                <div class="name">
                                    封存人数: {{ organInfo.fcrs }}
                                </div>
                            </div>
                        </div>
                        <div class="df form">
                            <div class="item">
                                <div class="name">
                                    单位联系电话: {{ organInfo.dwlxdh }}
                                </div>
                            </div>
                            <div class="item">
                                <div class="name">
                                    账户余额: {{ organInfo.zhye }}万元
                                </div>
                            </div>
                            <div class="item">
                                <div class="name"></div>
                            </div>
                        </div>
                        <div class="df form">
                            <div class="item">
                                <div class="name">
                                    单位地址: {{ organInfo.dwdz }}
                                </div>
                            </div>
                            <div class="item">
                                <div class="name">
                                    正常缴存人数: {{ organInfo.zcjcrs }}
                                </div>
                            </div>
                            <div class="item"></div>
                        </div>

                        <div class="status">
                            <div
                                class="item"
                                :class="[colors[index % 4]]"
                                v-for="(item, index) in tags"
                                :key="item.bq"
                            >
                                {{ item.bq }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="defaultCard  df fdc" style="flex-grow:2;">
                <div class="df aic cardContent" style="margin-bottom:7px">
                    <img
                        class="icon"
                        src="../../../assets/images/portrait/organ/icon_dwhx_you1.svg"
                        alt=""
                    />
                    <div class="title">重点人员情况</div>
                </div>
                <div class="form df">
                    <div class="item" style="margin-top:0px;margin-bottom:0px;">
                        <div class="name">
                            当年累计提取人数
                            <span class="val">{{ zdryqk.dnljtqrs }}</span>
                            人
                        </div>
                    </div>
                </div>
                <div class="form df">
                    <div class="item">
                        <div class="name" style="margin-top:0px">
                            当年累计贷款人数
                            <span class="val">{{ zdryqk.dnljdkrs }}</span>
                            人
                        </div>
                    </div>
                </div>
                <div class="line"></div>
                <div class="fg1" style="height:120px">
                    <xzydqk ref="xzydqk"></xzydqk>
                </div>
            </div>
        </div>
        <div class="df fg1 h14 row">
            <div class="defaultCard df">
                <div class="df fdc w14" style="flex-grow:2;">
                    <div class="df aic cardContent">
                        <img
                            class="icon"
                            src="../../../assets/images/portrait/organ/icon_dwhx_zuo2.svg"
                            alt=""
                        />
                        <div class="title">
                            人员结构
                        </div>
                    </div>
                    <div class="fg1">
                        <gjjzqfb ref="gjjzqfb"></gjjzqfb>
                    </div>
                </div>
                <div class="df fdc w14" style="flex-grow:3;">
                    <zgnlqk ref="zgnlqk"></zgnlqk>
                </div>
                <div class="df fdc w14" style="flex-grow:2;">
                    <zggfmjfb ref="zggfmjfb"></zggfmjfb>
                </div>
            </div>
        </div>
        <div class="df fg1 h14 row">
            <div class="defaultCard df fdc w14 fg1">
                <gjjjcqk ref="gjjjcqk"></gjjjcqk>
            </div>

            <div class="defaultCard df fdc w14">
                <syqk ref="syqk"></syqk>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'organ',
    components: {
        xzydqk: () => import('./components/xzydqk'),
        gjjzqfb: () => import('./components/gjjzqfb'),
        zgnlqk: () => import('./components/zgnlqk'),
        zggfmjfb: () => import('./components/zggfmjfb'),
        gjjjcqk: () => import('./components/gjjjcqk'),
        syqk: () => import('./components/syqk'),
    },

    data() {
        return {
            name: '',
            type: '',
            load: false,
            colors: ['position', 'months', 'type', 'error'],
            organList: [],
            organInfo: {},
            tags: [], //标签
            zdryqk: {}, //重点人员情况
            zqfb: {},
        };
    },

    computed: {},

    methods: {
        command(com) {
            this.organInfo = this.organList.find((item) => item.dwzh == com);
            this.name = this.organInfo.dwmc;
            this.getOtherData();
        },
        searchData() {
            this.load = true;
            this.$api
                .formPost('/api/dyncscript/scriptRule/query', {
                    scriptId: 'dwhx_jbxx',
                    dwmc: this.name,
                })
                .then((res) => {
                    this.load = false;
                    if (res.retBody.retList.length === 0) {
                        this.$message.warning('暂无数据');
                        return;
                    } else if (res.retBody.retList.length === 1) {
                        this.organInfo = res.retBody.retList[0];
                        this.getOtherData();
                    } else {
                        this.organList = res.retBody.retList;
                        this.$nextTick(() => {
                            this.$refs.dropdown.show();
                        });
                        return;
                    }
                });
        },
        /**
         * @description: 获取其他数据
         * @return {*}
         * @author: Junchi Zhao
         */
        getOtherData() {
            this.getTags();
            this.getZdrnqk();
            this.getZqfb();
            this.getZgnlqk();
            this.getZggfmjfb();
            this.getJcqk();
            this.getSyqk();
        },
        /**
         * @description: 获取单位标签
         * @return {*}
         * @author: Junchi Zhao
         */
        getTags() {
            this.tags = [];
            this.$api
                .formPost('/api/dyncscript/scriptRule/query', {
                    scriptId: 'dwhx_dwbq',
                    dwzh: this.organInfo.dwzh,
                })
                .then((res) => {
                    this.tags = res.retBody.retList;
                });
        },
        /**
         * @description: 获取重点人员情况
         * @return {*}
         * @author: Junchi Zhao
         */
        getZdrnqk() {
            this.zdryqk = {};
            this.$api
                .formPost('/api/dyncscript/scriptRule/query', {
                    scriptId: 'dwhx_zdry',
                    dwzh: this.organInfo.dwzh,
                })
                .then((res) => {
                    this.zdryqk = res.retBody.retList[0];
                    this.$refs.xzydqk.getData(this.zdryqk);
                });
        },
        /**
         * @description: 获取周期分布
         * @return {*}
         * @author: Junchi Zhao
         */
        getZqfb() {
            this.$api
                .formPost('/api/dyncscript/scriptRule/query', {
                    scriptId: 'dwhx_zqfb',
                    dwzh: this.organInfo.dwzh.trim(),
                })
                .then((res) => {
                    this.$refs.gjjzqfb.getData(res.retBody.retList[0]);
                });
        },
        /**
         * @description: 获取职工年龄情况
         * @return {*}
         * @author: Junchi Zhao
         */
        getZgnlqk() {
            this.$api
                .formPost('/api/dyncscript/scriptRule/query', {
                    scriptId: 'dwhx_nlqk',
                    dwzh: this.organInfo.dwzh,
                })
                .then((res) => {
                    this.$refs.zgnlqk.getData(res.retBody.retList);
                });
        },
        /**
         * @description: 获取职工购房面积分布
         * @return {*}
         * @author: Junchi Zhao
         */
        getZggfmjfb() {
            this.$api
                .formPost('/api/dyncscript/scriptRule/query', {
                    scriptId: 'dwhx_gfmj',
                    dwzh: this.organInfo.dwzh,
                })
                .then((res) => {
                    this.$refs.zggfmjfb.getData(res.retBody.retList[0]);
                });
        },
        /**
         * @description: 获取近12月公积金缴存情况
         * @return {*}
         * @author: Junchi Zhao
         */
        getJcqk() {
            this.$api
                .formPost('/api/dyncscript/scriptRule/query', {
                    scriptId: 'dwhx_jcqk',
                    dwzh: this.organInfo.dwzh,
                })
                .then((res) => {
                    this.$refs.gjjjcqk.getData(res.retBody.retList);
                });
        },
        /**
         * @description: 获取近12月使用情况
         * @return {*}
         * @author: Junchi Zhao
         */
        getSyqk() {
            this.$api
                .formPost('/api/dyncscript/scriptRule/query', {
                    scriptId: 'dwhx_syqk',
                    dwzh: this.organInfo.dwzh,
                })
                .then((res) => {
                    this.$refs.syqk.getData(res.retBody.retList);
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
            margin-top: 4px;
            font-size: 12px;
            font-family: MicrosoftYaHei;
            color: #6b6b6b;
        }
        .value {
            margin-top: 4px;
            font-size: 12px;
            font-family: MicrosoftYaHei;
            color: #1d1d1d;
        }
        .statusIcon {
            margin-top: 8px;
            height: 28px;
        }
        .statusError {
            margin-top: 8px;
            background: url('../../../assets/images/portrait/organ/icon_yichang.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            height: 28px;
            width: 75px;
            line-height: 28px;
            text-align: center;
            color: #f83636;
        }
    }
    .form {
        display: flex;
        .item {
            flex-grow: 1;
            width: 14px;
            margin: 6px 5px 8px;
            display: flex;
            align-items: flex-start;
            .name,
            .value {
                font-size: 12px;
                color: #6b6b6b;
            }
            .name {
                .val {
                    color: rgba(64, 158, 255, 1);
                    font-size: 18px;
                    margin: 0px 8px;
                }
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
        margin-top: 10px;
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
        .error {
            border-color: rgba(222, 159, 189, 1);
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
.row {
    min-height: 254px;
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
    margin-top: 0px;
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
.searchDropdown {
    max-height: 70vh;
    overflow: auto;
}
</style>
