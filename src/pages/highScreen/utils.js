/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description:
 */
function calcPct(list, unit = 1) {
    let total = list.reduce((prev, cur) => {
        return prev + cur.value;
    }, 0);
    list.forEach((item, index) => {
        item.pct = ((item.value / total) * 100).toFixed(unit);
    });
    list[list.length - 1].pct = (
        100 -
        list.reduce((prev, cur) => {
            if (list.indexOf(cur) != list.length - 1) {
                return prev + parseFloat(cur.pct);
            } else {
                return prev;
            }
        }, 0)
    ).toFixed(1);
}
const areaList = [
    '襄都区',
    '信都区',
    '任泽区',
    '南和区',
    '临城县',
    '内丘县',
    '柏乡县',
    '隆尧县',
    '宁晋县',
    '巨鹿县',
    '新河县',
    '广宗县',
    '平乡县',
    '威县',
    '清河县',
    '临西县',
    '南宫市',
    '沙河市',
];
export default {
    calcPct,
    areaList,
};
