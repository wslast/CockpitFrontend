const qxList = [
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
const nyList = [
  "2022年4月",
  "2022年5月",
  "2022年6月",
  "2022年7月",
  "2022年8月",
  "2022年9月",
  "2022年10月",
  "2022年11月",
  "2022年12月",
  "2023年1月",
  "2023年2月",
  "2023年3月"
];
const jseyjcyefb1 = qxList.map((item, index) => {
  let data = [];
  nyList.forEach((item2, index2) => {
    data.push({
      ny: item2,
      qx: item,
      je: "@float(200,500,1,1)",
      id: "@id"
    });
  });
  return data;
});
const jseyjcyefb = jseyjcyefb1.reduce((acc, cur) => {
  return acc.concat(cur);
}, []);

const cllxList = ["活期存款", "定期存款"];
const yhlxList = [
  "交通银行",
  "工商银行",
  "建设银行",
  "农业银行",
  "中国银行",
  "其他银行"
];
const gwtyhckye1 = cllxList.map((item, index) => {
  let data = [];
  yhlxList.forEach((item2, index2) => {
    data.push({
      lx: item,
      yhlx: item2,
      ye: "@float(10,100,1,1)",
      id: "@id"
    });
  });
  return data;
});
const gwtyhckye = gwtyhckye1.reduce((acc, cur) => {
  return acc.concat(cur);
}, []);

const sy_dt = qxList.map((item, index) => {
  return {
    id: "@id",
    qx: item,
    jcrs: "@integer(50000,150000)",
    jcdw: "@integer(100,1000)",
    jcye: "@float(10000,100000,1,0)",
    gjjdkye: "@float(1000,10000,1,0)",
    lgl: "@float(0,100,1,1)"
  };
});
module.exports = { jseyjcyefb: jseyjcyefb, gwtyhckye: gwtyhckye, sy_dt: sy_dt };
