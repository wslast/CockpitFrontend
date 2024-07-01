/*
 * @Author: Junchi Zhao
 * @LastEditors: 王硕
 * @Description:
 */
const Mock = require("mockjs");
const areaList = [
    "襄都区",
    "信都区",
    "任泽区",
    "南和区",
    "临城县",
    "内丘县",
    "柏乡县",
    "隆尧县",
    "宁晋县",
    "巨鹿县",
    "新河县",
    "广宗县",
    "平乡县",
    "威县",
    "清河县",
    "临西县",
    "南宫市",
    "沙河市"
];

const fk_ztydfb = Mock.mock({
    "list|54": [
        {
            "id|+1": 0,
            qx: function () {
                return areaList[this.id % 18];
            },
            sl: "@integer(300, 5000)",
            lx: function () {
                if (this.id < 18) {
                    return "整改";
                } else if (this.id < 36) {
                    return "存量";
                } else {
                    return "白名单";
                }
            }
        }
    ]
});
const fk_xzydqk = Mock.mock({
    "list|5": [
        {
            "lx|+1": ["缴存", "提取", "贷款", "资金", "财务"],
            sl: "@integer(300, 5000)"
        }
    ]
});
const fk_clydfbqk = Mock.mock({
    "list|90": [
        {
            "id|+1": 0,
            qx: function () {
                return areaList[this.id % 18];
            },
            sl: "@integer(300, 5000)",
            lx: function () {
                if (this.id < 18) {
                    return "缴存";
                } else if (this.id < 36) {
                    return "提取";
                } else if (this.id < 54) {
                    return "贷款";
                } else if (this.id < 72) {
                    return "资金";
                } else {
                    return "财务";
                }
            }
        }
    ]
});

const fk_glbydzgqk = Mock.mock({
    "list|18": [
        {
            "qx|+1": areaList,
            sl: "@integer(100, 2000)"
        }
    ]
});
const fk_ydlpm = Mock.mock({
    "list|2": [
        {
            qspm: "@integer(10, 20)",
            qgpm: "@integer(0, 10)"
        }
    ]
});
const fk_kb = Mock.mock({
    "list|2": [
        {
            ztydgs: "@integer(10, 20)",
            ydl: "@integer(0, 100)",
            dyxz: "@integer(0, 100)",
            xzhb: "@integer(0, 10)"
        }
    ]
});
const fk_gzzbzb = Mock.mock({
    "list|2": [
        {
            zbzb: "@integer(10, 100)"
        }
    ]
});
const fk_ydsydlfbqs = Mock.mock({
    "list|12": [
        {
            ny: "@date('MM月')",
            yds: "@integer(0, 100)",
            ydl: "@integer(0, 100)"
        }
    ]
});
const fk_qsydlpm = Mock.mock({
    "list|11": [
        {
            "sm|+1": areaList,
            ydl: "@integer(0, 100)"
        }
    ]
});
module.exports = [
    {
        id: "fk_ztydfb",
        value: fk_ztydfb
    },
    {
        id: "fk_xzydqk",
        value: fk_xzydqk
    },
    {
        id: "fk_clydfbqk",
        value: fk_clydfbqk
    },
    {
        id: "fk_ydlpm",
        value: fk_ydlpm
    },
    {
        id: "fk_qsydlpm",
        value: fk_qsydlpm
    },
    {
        id: "fk_glbydzgqk",
        value: fk_glbydzgqk
    },
    {
        id: "fk_kb",
        value: fk_kb
    },
    {
        id: "fk_ydsydlfbqs",
        value: fk_ydsydlfbqs
    },
    {
        id: "fk_gzzbzb",
        value: fk_gzzbzb
    },
    {
        id: "fk_sp_kb",
        value: Mock.mock({
            "retList": [
                {
                    "ydl": 4.43,
                    "ztyds": 59631,
                    "xzhb": "-0.30",
                    "dyxz": 1093,
                    "peroid": "202405"
                }
            ]
        })
    },
    {
        id: "fk_sp_ydsydlfbqs",
        value: Mock.mock({
            "retList": [
                {
                    "ydl": 9.64,
                    "yds": 39841,
                    "ny": "202304"
                },
                {
                    "ydl": 9.27,
                    "yds": 41309,
                    "ny": "202305"
                },
                {
                    "ydl": 8.75,
                    "yds": 42440,
                    "ny": "202306"
                },
                {
                    "ydl": 8.07,
                    "yds": 44136,
                    "ny": "202307"
                },
                {
                    "ydl": 8.10,
                    "yds": 45630,
                    "ny": "202308"
                },
                {
                    "ydl": 8.07,
                    "yds": 47078,
                    "ny": "202309"
                },
                {
                    "ydl": 7.40,
                    "yds": 49605,
                    "ny": "202310"
                },
                {
                    "ydl": 7.32,
                    "yds": 50723,
                    "ny": "202311"
                },
                {
                    "ydl": 4.06,
                    "yds": 52085,
                    "ny": "202312"
                },
                {
                    "ydl": 4.25,
                    "yds": 54147,
                    "ny": "202401"
                },
                {
                    "ydl": 4.48,
                    "yds": 55932,
                    "ny": "202402"
                },
                {
                    "ydl": 4.50,
                    "yds": 56980,
                    "ny": "202403"
                }
            ]
        })
    },
    {
        id: "fk_sp_gzzbzb",
        value: Mock.mock({
            "retList": [
                {
                    "zbzb": 89
                }
            ]
        })
    },
    {
        id: "fk_sp_ydlpm",
        value: Mock.mock({
            "retList": [
                {
                    "qgpm": 75,
                    "qspm": 9
                }
            ]
        })
    },
    {
        id: "fk_sp_qsydlpm",
        value: Mock.mock({
            "retList": [
                {
                    "ydl": 0.22,
                    "sm": "定州市",
                    "pm": 1
                },
                {
                    "ydl": 0.31,
                    "sm": "辛集市",
                    "pm": 2
                },
                {
                    "ydl": 0.44,
                    "sm": "唐山市",
                    "pm": 3
                },
                {
                    "ydl": 1.50,
                    "sm": "河北省省直",
                    "pm": 4
                },
                {
                    "ydl": 3.48,
                    "sm": "华北油田",
                    "pm": 5
                },
                {
                    "ydl": 3.85,
                    "sm": "保定市",
                    "pm": 6
                },
                {
                    "ydl": 4.29,
                    "sm": "沧州市",
                    "pm": 7
                },
                {
                    "ydl": 4.34,
                    "sm": "秦皇岛",
                    "pm": 8
                },
                {
                    "ydl": 4.48,
                    "sm": "邢台市",
                    "pm": 9
                },
                {
                    "ydl": 5.21,
                    "sm": "廊坊市",
                    "pm": 10
                },
                {
                    "ydl": 6.14,
                    "sm": "石家庄",
                    "pm": 11
                },
                {
                    "ydl": 6.20,
                    "sm": "承德市",
                    "pm": 12
                },
                {
                    "ydl": 7.11,
                    "sm": "张家口市",
                    "pm": 13
                },
                {
                    "ydl": 7.32,
                    "sm": "衡水市",
                    "pm": 14
                },
                {
                    "ydl": 7.95,
                    "sm": "邯郸市",
                    "pm": 15
                },
                {
                    "ydl": 8.73,
                    "sm": "天然气管道局",
                    "pm": 16
                },
                {
                    "ydl": 8.77,
                    "sm": "雄安新区",
                    "pm": 17
                },
                {
                    "ydl": 13.70,
                    "sm": "开滦分中心",
                    "pm": 18
                },
                {
                    "ydl": 17.04,
                    "sm": "冀中能源邢台矿业",
                    "pm": 19
                }
            ]
        })
    },
    {
        id: "fk_sp_xzydqk",
        value: Mock.mock({
            "retList": [
                {
                    "sl": 391,
                    "lx": "贷款类"
                },
                {
                    "sl": 261,
                    "lx": "资金存储"
                },
                {
                    "sl": 187,
                    "lx": "财务管理"
                },
                {
                    "sl": 89,
                    "lx": "提取类"
                },
                {
                    "sl": 76,
                    "lx": "缴存类"
                },
            ]
        })
    },
    {
        id: "fk_sp_glbydzgqk",
        value: Mock.mock({
            "retList": [
                {
                    "xhs": 1848,
                    "organCode": "00031910",
                    "qx": "市直",
                    "bmd": 4600,
                    "sl": 6448,
                    "zs": 8103
                },
                {
                    "xhs": 279,
                    "organCode": "00031920",
                    "qx": "南宫",
                    "bmd": 679,
                    "sl": 958,
                    "zs": 1230
                },
                {
                    "xhs": 3053,
                    "organCode": "00031921",
                    "qx": "襄都区",
                    "bmd": 4421,
                    "sl": 7474,
                    "zs": 13599
                },
                {
                    "xhs": 225,
                    "organCode": "00031922",
                    "qx": "临城",
                    "bmd": 505,
                    "sl": 730,
                    "zs": 882
                },
                {
                    "xhs": 685,
                    "organCode": "00031923",
                    "qx": "沙河",
                    "bmd": 1463,
                    "sl": 2148,
                    "zs": 2665
                },
                {
                    "xhs": 616,
                    "organCode": "00031924",
                    "qx": "巨鹿",
                    "bmd": 946,
                    "sl": 1562,
                    "zs": 1639
                },
                {
                    "xhs": 1049,
                    "organCode": "00031925",
                    "qx": "宁晋",
                    "bmd": 1649,
                    "sl": 2698,
                    "zs": 4972
                },
                {
                    "xhs": 269,
                    "organCode": "00031926",
                    "qx": "平乡",
                    "bmd": 458,
                    "sl": 727,
                    "zs": 943
                },
                {
                    "xhs": 223,
                    "organCode": "00031927",
                    "qx": "柏乡",
                    "bmd": 297,
                    "sl": 520,
                    "zs": 587
                },
                {
                    "xhs": 241,
                    "organCode": "00031928",
                    "qx": "新河",
                    "bmd": 236,
                    "sl": 477,
                    "zs": 1022
                },
                {
                    "xhs": 243,
                    "organCode": "00031929",
                    "qx": "临西",
                    "bmd": 513,
                    "sl": 756,
                    "zs": 779
                },
                {
                    "xhs": 231,
                    "organCode": "00031930",
                    "qx": "任泽区",
                    "bmd": 472,
                    "sl": 703,
                    "zs": 716
                },
                {
                    "xhs": 213,
                    "organCode": "00031931",
                    "qx": "南和区",
                    "bmd": 258,
                    "sl": 471,
                    "zs": 660
                },
                {
                    "xhs": 356,
                    "organCode": "00031932",
                    "qx": "清河",
                    "bmd": 1058,
                    "sl": 1414,
                    "zs": 1512
                },
                {
                    "xhs": 685,
                    "organCode": "00031933",
                    "qx": "威县",
                    "bmd": 560,
                    "sl": 1245,
                    "zs": 2086
                },
                {
                    "xhs": 358,
                    "organCode": "00031934",
                    "qx": "广宗",
                    "bmd": 485,
                    "sl": 843,
                    "zs": 1294
                },
                {
                    "xhs": 877,
                    "organCode": "00031935",
                    "qx": "隆尧",
                    "bmd": 3993,
                    "sl": 4870,
                    "zs": 5027
                },
                {
                    "xhs": 242,
                    "organCode": "00031936",
                    "qx": "内丘",
                    "bmd": 476,
                    "sl": 718,
                    "zs": 911
                },
                {
                    "xhs": 2431,
                    "organCode": "00031937",
                    "qx": "信都区",
                    "bmd": 3775,
                    "sl": 6206,
                    "zs": 10860
                }
            ]
        })
    },
    {
        id: "fk_sp_ztydfb",
        value: Mock.mock({
            "retList": [
                {
                    "qx": "襄都区",
                    "sl": 6125,
                    "lx": "存量"
                },
                {
                    "qx": "信都区",
                    "sl": 4654,
                    "lx": "存量"
                },
                {
                    "qx": "宁晋",
                    "sl": 2274,
                    "lx": "存量"
                },
                {
                    "qx": "市直",
                    "sl": 1655,
                    "lx": "存量"
                },
                {
                    "qx": "威县",
                    "sl": 841,
                    "lx": "存量"
                },
                {
                    "qx": "新河",
                    "sl": 545,
                    "lx": "存量"
                },
                {
                    "qx": "沙河",
                    "sl": 517,
                    "lx": "存量"
                },
                {
                    "qx": "广宗",
                    "sl": 451,
                    "lx": "存量"
                },
                {
                    "qx": "南宫",
                    "sl": 272,
                    "lx": "存量"
                },
                {
                    "qx": "平乡",
                    "sl": 216,
                    "lx": "存量"
                },
                {
                    "qx": "内丘",
                    "sl": 193,
                    "lx": "存量"
                },
                {
                    "qx": "南和区",
                    "sl": 189,
                    "lx": "存量"
                },
                {
                    "qx": "隆尧",
                    "sl": 157,
                    "lx": "存量"
                },
                {
                    "qx": "临城",
                    "sl": 152,
                    "lx": "存量"
                },
                {
                    "qx": "清河",
                    "sl": 98,
                    "lx": "存量"
                },
                {
                    "qx": "巨鹿",
                    "sl": 77,
                    "lx": "存量"
                },
                {
                    "qx": "柏乡",
                    "sl": 67,
                    "lx": "存量"
                },
                {
                    "qx": "临西",
                    "sl": 23,
                    "lx": "存量"
                },
                {
                    "qx": "任泽区",
                    "sl": 13,
                    "lx": "存量"
                },
                {
                    "qx": "市直",
                    "sl": 4600,
                    "lx": "白名单"
                },
                {
                    "qx": "襄都区",
                    "sl": 4421,
                    "lx": "白名单"
                },
                {
                    "qx": "隆尧",
                    "sl": 3993,
                    "lx": "白名单"
                },
                {
                    "qx": "信都区",
                    "sl": 3775,
                    "lx": "白名单"
                },
                {
                    "qx": "宁晋",
                    "sl": 1649,
                    "lx": "白名单"
                },
                {
                    "qx": "沙河",
                    "sl": 1463,
                    "lx": "白名单"
                },
                {
                    "qx": "清河",
                    "sl": 1058,
                    "lx": "白名单"
                },
                {
                    "qx": "巨鹿",
                    "sl": 946,
                    "lx": "白名单"
                },
                {
                    "qx": "南宫",
                    "sl": 679,
                    "lx": "白名单"
                },
                {
                    "qx": "威县",
                    "sl": 560,
                    "lx": "白名单"
                },
                {
                    "qx": "临西",
                    "sl": 513,
                    "lx": "白名单"
                },
                {
                    "qx": "临城",
                    "sl": 505,
                    "lx": "白名单"
                },
                {
                    "qx": "广宗",
                    "sl": 485,
                    "lx": "白名单"
                },
                {
                    "qx": "内丘",
                    "sl": 476,
                    "lx": "白名单"
                },
                {
                    "qx": "任泽区",
                    "sl": 472,
                    "lx": "白名单"
                },
                {
                    "qx": "平乡",
                    "sl": 458,
                    "lx": "白名单"
                },
                {
                    "qx": "柏乡",
                    "sl": 297,
                    "lx": "白名单"
                },
                {
                    "qx": "南和区",
                    "sl": 258,
                    "lx": "白名单"
                },
                {
                    "qx": "新河",
                    "sl": 236,
                    "lx": "白名单"
                },
                {
                    "qx": "襄都区",
                    "sl": 3053,
                    "lx": "销号"
                },
                {
                    "qx": "信都区",
                    "sl": 2431,
                    "lx": "销号"
                },
                {
                    "qx": "市直",
                    "sl": 1848,
                    "lx": "销号"
                },
                {
                    "qx": "宁晋",
                    "sl": 1049,
                    "lx": "销号"
                },
                {
                    "qx": "隆尧",
                    "sl": 877,
                    "lx": "销号"
                },
                {
                    "qx": "沙河",
                    "sl": 685,
                    "lx": "销号"
                },
                {
                    "qx": "威县",
                    "sl": 685,
                    "lx": "销号"
                },
                {
                    "qx": "巨鹿",
                    "sl": 616,
                    "lx": "销号"
                },
                {
                    "qx": "广宗",
                    "sl": 358,
                    "lx": "销号"
                },
                {
                    "qx": "清河",
                    "sl": 356,
                    "lx": "销号"
                },
                {
                    "qx": "南宫",
                    "sl": 279,
                    "lx": "销号"
                },
                {
                    "qx": "平乡",
                    "sl": 269,
                    "lx": "销号"
                },
                {
                    "qx": "临西",
                    "sl": 243,
                    "lx": "销号"
                },
                {
                    "qx": "内丘",
                    "sl": 242,
                    "lx": "销号"
                },
                {
                    "qx": "新河",
                    "sl": 241,
                    "lx": "销号"
                },
                {
                    "qx": "任泽区",
                    "sl": 231,
                    "lx": "销号"
                },
                {
                    "qx": "临城",
                    "sl": 225,
                    "lx": "销号"
                },
                {
                    "qx": "柏乡",
                    "sl": 223,
                    "lx": "销号"
                },
                {
                    "qx": "南和区",
                    "sl": 213,
                    "lx": "销号"
                }
            ]
        })
    },
    {
        id: "fk_sp_clydfbqk",
        value: Mock.mock({
            "retList": [
                {
                    "sl": 91,
                    "zblx": "资金存储",
                    "peroid": "202405"
                },
                {
                    "sl": 976,
                    "zblx": "提取类",
                    "peroid": "202405"
                },
                {
                    "sl": 10289,
                    "zblx": "贷款类",
                    "peroid": "202405"
                },
                {
                    "sl": 48224,
                    "zblx": "缴存类",
                    "peroid": "202405"
                },
                {
                    "sl": 51,
                    "zblx": "财务管理",
                    "peroid": "202405"
                }
            ]
        })
    },
    {
        id: "fk_sp_clydfbqk_glb",
        value: Mock.mock({
            "retList": [
                {
                    "sl": 6125,
                    "glb": "襄都区",
                    "peroid": "202405"
                },
                {
                    "sl": 1655,
                    "glb": "市直",
                    "peroid": "202405"
                },
                {
                    "sl": 67,
                    "glb": "柏乡",
                    "peroid": "202405"
                },
                {
                    "sl": 4654,
                    "glb": "信都区",
                    "peroid": "202405"
                },
                {
                    "sl": 98,
                    "glb": "清河",
                    "peroid": "202405"
                },
                {
                    "sl": 189,
                    "glb": "南和区",
                    "peroid": "202405"
                },
                {
                    "sl": 451,
                    "glb": "广宗",
                    "peroid": "202405"
                },
                {
                    "sl": 545,
                    "glb": "新河",
                    "peroid": "202405"
                },
                {
                    "sl": 2274,
                    "glb": "宁晋",
                    "peroid": "202405"
                },
                {
                    "sl": 216,
                    "glb": "平乡",
                    "peroid": "202405"
                },
                {
                    "sl": 13,
                    "glb": "任泽区",
                    "peroid": "202405"
                },
                {
                    "sl": 272,
                    "glb": "南宫",
                    "peroid": "202405"
                },
                {
                    "sl": 193,
                    "glb": "内丘",
                    "peroid": "202405"
                },
                {
                    "sl": 517,
                    "glb": "沙河",
                    "peroid": "202405"
                },
                {
                    "sl": 841,
                    "glb": "威县",
                    "peroid": "202405"
                },
                {
                    "sl": 77,
                    "glb": "巨鹿",
                    "peroid": "202405"
                },
                {
                    "sl": 23,
                    "glb": "临西",
                    "peroid": "202405"
                },
                {
                    "sl": 157,
                    "glb": "隆尧",
                    "peroid": "202405"
                },
                {
                    "sl": 152,
                    "glb": "临城",
                    "peroid": "202405"
                }
            ]
        })
    }
];
