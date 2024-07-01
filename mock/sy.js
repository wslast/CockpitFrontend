const Mock = require("mockjs");
const variable = require("./variable.js");
const sy_kb = Mock.mock({
  // "list|1": [
  //   {
  //     id: "@id",
  //     dwzs: "@integer(10000,20000)",
  //     dwsjs: "@integer(10000,20000)",
  //     jczgzs: "@float(50,100,1,1)",
  //     sjrs: "@float(0,100,1,1)",
  //     jcye: "@float(1000,10000,1,1)",
  //     zjyjce: "@float(100,1000,1,1)",
  //     tb: "@float(-30,30,1,1)",
  //     hb: "@float(-30,30,1,1)",
  //     lgl: "@float(0,100,1,1)"
  //   }
  // ]
  "retList":[
    {
      "dwsjs":4477,
      "lgl":91.12,
      "jczgzs":426718,
      "dwzs":6229,
      "jcye":1764904.45,
      "hb":-13.00,
      "sjrs":321097,
      "zjyjce":37606.84,
      "tb":-2.00
    }
  ]
});
const sy_dt = Mock.mock({
  // list: variable.sy_dt
  "retList":[
    {
      "lgl":86.21,
      "gjjdkye":0.00,
      "jcye":263409.03,
      "qx":"襄都区",
      "jcrs":69726,
      "glb":"襄都区管理部",
      "jcdw":706
    },
    {
      "lgl":84.73,
      "gjjdkye":0.00,
      "jcye":358159.00,
      "qx":"信都区",
      "jcrs":71509,
      "glb":"信都区管理部",
      "jcdw":849
    },
    {
      "lgl":69.79,
      "gjjdkye":36960.43,
      "jcye":57366.87,
      "qx":"任泽区",
      "jcrs":11667,
      "glb":"任泽区管理部",
      "jcdw":193
    },
    {
      "lgl":84.04,
      "gjjdkye":27379.55,
      "jcye":42958.02,
      "qx":"南和区",
      "jcrs":9519,
      "glb":"南和区管理部",
      "jcdw":210
    },
    {
      "lgl":61.51,
      "gjjdkye":34085.37,
      "jcye":43950.37,
      "qx":"临城县",
      "jcrs":8758,
      "glb":"临城管理部",
      "jcdw":245
    },
    {
      "lgl":78.69,
      "gjjdkye":22149.16,
      "jcye":49847.60,
      "qx":"内丘县",
      "jcrs":9691,
      "glb":"内丘管理部",
      "jcdw":226
    },
    {
      "lgl":93.01,
      "gjjdkye":18012.70,
      "jcye":33197.41,
      "qx":"柏乡县",
      "jcrs":5836,
      "glb":"柏乡管理部",
      "jcdw":146
    },
    {
      "lgl":75.44,
      "gjjdkye":51081.98,
      "jcye":79397.19,
      "qx":"隆尧县",
      "jcrs":36947,
      "glb":"隆尧管理部",
      "jcdw":239
    },
    {
      "lgl":94.38,
      "gjjdkye":103134.15,
      "jcye":111843.65,
      "qx":"宁晋县",
      "jcrs":35010,
      "glb":"宁晋管理部",
      "jcdw":324
    },
    {
      "lgl":85.92,
      "gjjdkye":43048.71,
      "jcye":53502.17,
      "qx":"巨鹿县",
      "jcrs":12325,
      "glb":"巨鹿管理部",
      "jcdw":243
    },
    {
      "lgl":92.18,
      "gjjdkye":14941.92,
      "jcye":30719.60,
      "qx":"新河县",
      "jcrs":6875,
      "glb":"新河管理部",
      "jcdw":195
    },
    {
      "lgl":90.17,
      "gjjdkye":47381.96,
      "jcye":40068.87,
      "qx":"广宗县",
      "jcrs":10759,
      "glb":"广宗管理部",
      "jcdw":288
    },
    {
      "lgl":77.19,
      "gjjdkye":46868.93,
      "jcye":56464.20,
      "qx":"平乡县",
      "jcrs":13245,
      "glb":"平乡管理部",
      "jcdw":261
    },
    {
      "lgl":84.07,
      "gjjdkye":74600.31,
      "jcye":70019.12,
      "qx":"威县",
      "jcrs":17841,
      "glb":"威县管理部",
      "jcdw":289
    },
    {
      "lgl":80.06,
      "gjjdkye":51215.13,
      "jcye":85084.48,
      "qx":"清河县",
      "jcrs":18120,
      "glb":"清河管理部",
      "jcdw":299
    },
    {
      "lgl":75.36,
      "gjjdkye":27023.31,
      "jcye":48975.35,
      "qx":"临西县",
      "jcrs":9572,
      "glb":"临西管理部",
      "jcdw":216
    },
    {
      "lgl":89.55,
      "gjjdkye":48115.65,
      "jcye":62371.66,
      "qx":"南宫市",
      "jcrs":14324,
      "glb":"南宫管理部",
      "jcdw":282
    },
    {
      "lgl":90.14,
      "gjjdkye":69316.19,
      "jcye":93185.60,
      "qx":"沙河市",
      "jcrs":19063,
      "glb":"沙河管理部",
      "jcdw":388
    },
    {
      "lgl":82.95,
      "gjjdkye":586750.26,
      "jcye":184384.28,
      "qx":"信都区",
      "jcrs":45931,
      "glb":"市直管理部",
      "jcdw":630
    }
  ]
});
const sy_dbkb = Mock.mock({
  // "list|1": [
  //   {
  //     id: "@id",
  //     bnfdcjj: "@float(5000,20000,1,0)",
  //     bnzltqje: "@float(500,2000,1,1)",
  //     bnlpqys: "@integer(10,200)"
  //   }
  // ]
  "retList":[
    {
      "bnlpqys":61,
      "bnfdcjj":6209.04,
      "bnzltqje":1834.57
    }
  ]
});
const sy_dkxxgk = Mock.mock({
  // list: [
  //   {
  //     id: "@id",
  //     lx: "累计",
  //     fkbs: "@integer(10000,30000)",
  //     fkje: "@float(20,100,2,0)",
  //     jqbs: "@integer(10000,30000)",
  //     hsbj: "@float(20,100,2,0)"
  //   },
  //   {
  //     id: "@id",
  //     lx: "本年",
  //     fkbs: "@integer(5000,10000)",
  //     fkje: "@float(5,10,2,0)",
  //     jqbs: "@integer(5000,10000)",
  //     hsbj: "@float(5,10,2,0)"
  //   },
  //   {
  //     id: "@id",
  //     lx: "本月",
  //     fkbs: "@integer(300,1000)",
  //     fkje: "@float(500,1000,2,0)",
  //     jqbs: "@integer(300,1000)",
  //     hsbj: "@float(500,1000,2,0)"
  //   }
  // ]
  "retList":[
    {
      "hsbj":6416.58,
      "fkbs":68,
      "jqbs":137,
      "lx":"本月",
      "fkje":2693.50
    },
    {
      "hsbj":73890.77,
      "fkbs":1585,
      "jqbs":1588,
      "lx":"本年",
      "fkje":63283.00
    },
    {
      "hsbj":118.29,
      "fkbs":88518,
      "jqbs":33456,
      "lx":"累计",
      "fkje":248.50
    }
  ]
});
const sy_jsnjcqs = Mock.mock({
  // "list|10": [
  //   {
  //     id: "@id",
  //     "year|+1": [
  //       "2013年",
  //       "2014年",
  //       "2015年",
  //       "2016年",
  //       "2017年",
  //       "2018年",
  //       "2019年",
  //       "2020年",
  //       "2021年",
  //       "2022年"
  //     ],
  //     jcje: "@float(2000,2500,1,0)"
  //   }
  // ]
  "retList":[
    {
      "jcje":143731.42,
      "year":"2014"
    },
    {
      "jcje":181141.84,
      "year":"2015"
    },
    {
      "jcje":223565.67,
      "year":"2016"
    },
    {
      "jcje":255619.55,
      "year":"2017"
    },
    {
      "jcje":273585.26,
      "year":"2018"
    },
    {
      "jcje":300591.67,
      "year":"2019"
    },
    {
      "jcje":334083.56,
      "year":"2020"
    },
    {
      "jcje":345692.04,
      "year":"2021"
    },
    {
      "jcje":405032.81,
      "year":"2022"
    },
    {
      "jcje":450422.03,
      "year":"2023"
    }
  ]
});
const sy_cwgk = Mock.mock({
  // "list|1": [
  //   {
  //     id: "@id",
  //     dqye: "@float(5000,10000,1,0)",
  //     hqye: "@float(5000,10000,1,0)",
  //     zcfzl: "@float(50,100,1,1)",
  //     ljzzsy: "@float(2000,5000,1,0)"
  //   }
  // ]
  "retList":[
    {
      "hqye":71463.69,
      "dqye":441011,
      "zcfzl":73.78,
      "ljzzsy":10711.63
    }
  ]
});
const sy_jsnjctqb = Mock.mock({
  // "list|10": [
  //   {
  //     id: "@id",
  //     "year|+1": [
  //       "2013年",
  //       "2014年",
  //       "2015年",
  //       "2016年",
  //       "2017年",
  //       "2018年",
  //       "2019年",
  //       "2020年",
  //       "2021年",
  //       "2022年"
  //     ],
  //     ck: "@float(5000,10000,1,0)",
  //     tq: "@float(5000,10000,1,0)",
  //     tql: "@float(50,100,1,0)"
  //   }
  // ]
  "retList":[
    {
      "year":"2016",
      "ck":223565.67,
      "tq":126302.40,
      "tql":56.00
    },
    {
      "year":"2017",
      "ck":255619.55,
      "tq":151851.84,
      "tql":59.00
    },
    {
      "year":"2018",
      "ck":273585.26,
      "tq":187584.00,
      "tql":69.00
    },
    {
      "year":"2019",
      "ck":300591.67,
      "tq":190588.93,
      "tql":63.00
    },
    {
      "year":"2020",
      "ck":334083.56,
      "tq":204530.11,
      "tql":61.00
    },
    {
      "year":"2021",
      "ck":345692.04,
      "tq":215715.40,
      "tql":62.00
    },
    {
      "year":"2022",
      "ck":405032.81,
      "tq":238426.69,
      "tql":59.00
    },
    {
      "year":"2023",
      "ck":450422.03,
      "tq":347547.88,
      "tql":77.00
    }
  ]
});
module.exports = [
  {
    id: "sy_kb",
    value: sy_kb
  },
  {
    id: "sy_dt",
    value: sy_dt
  },
  {
    id: "sy_dbkb",
    value: sy_dbkb
  },
  {
    id: "sy_dkxxgk",
    value: sy_dkxxgk
  },
  {
    id: "sy_jsnjcqs",
    value: sy_jsnjcqs
  },
  {
    id: "sy_cwgk",
    value: sy_cwgk
  },
  {
    id: "sy_jsnjctqb",
    value: sy_jsnjctqb
  }
];
