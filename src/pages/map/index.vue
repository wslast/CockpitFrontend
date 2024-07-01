<template>
    <div class="map bm">
        <baidu-map
            class="bm-view"
            :zoom="zoom"
            :center="{lng:113.02622883717297 , lat: 28.125094162088367}"
            :scroll-wheel-zoom="true"
            @ready="handler"
            @click="handleMapClick"
            @zoomend="handleZoomEnd">
            <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
            <!--<bm-polygon :path="polygonPath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2" :editing="true" @lineupdate="updatePolygonPath" />-->
        </baidu-map>
        <div class="bm-title">湖南省直单位住房公积金网格化管理分区总图</div>
        <div class="bm-label">
            <div class="bm-label-op">
                <!--网格-start-->
                <div class="bm-label-op-btn">
                    <div class="bm-label-op-btns"
                         :class="`p-${index}`"
                         @click="setActivePolygon(index)"
                         @mouseenter="hoverPolygon(index)"
                         @mouseleave="hoverEndPolygon(index)"
                         :key="index"
                         v-for="(polygon,index) in polygonsConfigs">
                        {{polygon.name}}，{{polygon.bankName}}（{{polygon.bunkNum}}个）
                    </div>
                </div>
                <div class="bm-label-op-btns" @click="toFillArea">
                    全部网格
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import polygons from './polygon/index.json'
export default {
    name: "map",
    data(){
        return {
            BMap: null,
            map: null,
            center: {
                lng: 112.97631,
                lat: 28.20115
            },
            zoom: 10,
            polygonsConfigs: polygons,
            // 第四区
            polygonPath: [],
            tab: {
                active: 0,
                tabs: [
                    {
                        name: '网格'
                    },
                    {
                        name: '银行'
                    },
                    // {
                    //     name: '分管'
                    // }
                ]
            }
        }
    },
    created() {
        this.crateCssByPolygon()
    },
    methods: {
        handleMapClick(e){
            console.log(e.point)
        },
        handler({BMap, map}) {
            this.map = map;
            this.BMap = BMap;
            // this.center.lng = 116.404;
            // this.center.lat = 39.915;
            // this.map.setMapStyleV2({
            //     styleId: '7ff23a631e140fb40da4840e6d9f37d5'
            // });
            // this.map.setMapStyle({
            //     style: 'dark'
            // });

            // 设置地图的最大缩放级别
            this.map.setMinZoom(14);

            this.addAllPlugin()
        },
        /**
         * 处理地图Zoom变化
         */
        handleZoomEnd(){
            if(this.map && this.map.getZoom){
                this.zoom = this.map.getZoom()

                // 调整展示内容
                this.setShowInfo()
            }
        },
        /**
         * 调整展示内容
         */
        setShowInfo(){
            this.polygonsConfigs.map((polygonsConfig) => {
                if(polygonsConfig.bankNameOverlay){
                    if(this.zoom < polygonsConfig.bankShowZoom && !polygonsConfig.active){
                        polygonsConfig.bankNameOverlay._div.style.display = "none";
                    }else {
                        polygonsConfig.bankNameOverlay._div.style.display = "flex";
                    }
                }
            })
        },
        updatePolygonPath(e) {
            this.polygonPath = e.target.getPath()
            console.log(e.target.getPath())
        },
        /**
         * 添加区域（多边形））
         * @param polygonPath
         * @param color
         * @param polygonIndex
         * @returns {{polygon: *, polygonPoints: *}}
         */
        addPlugin({polygonPath, color}, polygonIndex) {
            const polygonPoints = polygonPath.map(({lng, lat}) => new this.BMap.Point(lng, lat))
            // 创建多边形
            const polygon = new this.BMap.Polygon(polygonPoints, {
                strokeColor: color,
                strokeWeight: 2,
                strokeOpacity: 0.3,
                fillColor: color,
                fillOpacity: 0.15
            });

            // 添加鼠标移入事件
            polygon.addEventListener("mouseover", () => this.hoverPolygon(polygonIndex));
            // 添加鼠标移出事件
            polygon.addEventListener("mouseout", () => this.hoverEndPolygon(polygonIndex));
            // 添加鼠标点击事件
            polygon.addEventListener("click", () => this.setActivePolygon(polygonIndex));

            // 设置多边形的层级
            // polygon.setZIndex(1);
            this.map.addOverlay(polygon);
            return {
                polygon,
                polygonPoints
            }
        },
        /**
         * 高亮选取
         * @param polygonIndex
         */
        hoverPolygon(polygonIndex){
            if (!this.polygonsConfigs[polygonIndex].active) {
                this.polygonsConfigs[polygonIndex].polygon.setFillOpacity(0.3)
            }
        },/**
         * 高亮选取-分管模式
         * @param branch
         */
        hoverPolygonWithBranch(branch){
            let polygonsConfigsIndex = []

            this.polygonsConfigs.map((polygonsConfig,index) => {
                if(polygonsConfig.branch === branch){
                    polygonsConfigsIndex.push(index)
                }
            })

            polygonsConfigsIndex.map(polygonIndex => {
                if (!this.polygonsConfigs[polygonIndex].active) {
                    this.polygonsConfigs[polygonIndex].polygon.setFillOpacity(0.3)
                }
            })
        },
        /**
         * 高亮选取关闭
         * @param polygonIndex
         */
        hoverEndPolygon(polygonIndex){
            if (!this.polygonsConfigs[polygonIndex].active) {
                this.polygonsConfigs[polygonIndex].polygon.setFillOpacity(0.15)
            }
        },
        /**
         * 高亮选取关闭-分管模式
         * @param branch
         */
        hoverEndPolygonWithBranch(branch){
            let polygonsConfigsIndex = []

            this.polygonsConfigs.map((polygonsConfig,index) => {
                if(polygonsConfig.branch === branch){
                    polygonsConfigsIndex.push(index)
                }
            })

            polygonsConfigsIndex.map(polygonIndex => {
                if (!this.polygonsConfigs[polygonIndex].active) {
                    this.polygonsConfigs[polygonIndex].polygon.setFillOpacity(0.15)
                }
            })
        },
        /**
         * 添加选取
         */
        addAllPlugin() {
            this.polygonsConfigs = this.polygonsConfigs.map(((polygonConfig, index) => {
                return {
                    ...polygonConfig,
                    active: false,
                    ...this.addPlugin(polygonConfig, index)
                }
            }))

            // 统揽全局
            setTimeout(() => {
                this.toFillArea();
            }, 1)
            // 添加全部分区的名称
            setTimeout(() => {
                this.addAllOver();
            }, 1000)
            // 添加全部分区的名称
            setTimeout(() => {
                this.addAllBackNameOver();
            }, 1000)
            // 添加全部分区的名称
            setTimeout(() => {
                this.setShowInfo()
            }, 1000)
        },
        /**
         * 清空选中
         */
        clearActive() {
            this.polygonsConfigs.map(polygonConfigs => {
                polygonConfigs.active = false;
                polygonConfigs.polygon.setFillOpacity(0.15)
            })
        },
        /**
         * 清空选中
         */
        setActive(polygonIndex) {
            this.polygonsConfigs[polygonIndex].polygon.setFillOpacity(0.3)
            this.polygonsConfigs[polygonIndex].active = true
        },
        /**
         * 设置某区为中心
         * @param polygon
         */
        setCenterPolygon(polygon) {
            // 计算多边形的中心点
            const bounds = polygon.getBounds();
            const centerPoint = bounds.getCenter();

            setTimeout(() => {
                // 设置地图中心点和缩放级别以确保多边形居中显示
                this.map.centerAndZoom(centerPoint, 15);
            }, 1)

            // 启用滚轮缩放
            this.map.enableScrollWheelZoom(true);
        },
        /**
         * 添加分区名称
         * @param polygonConfig
         * @param index
         * @returns {{customOverlay: CustomOverlay}}
         */
        addOver(polygonConfig, index) {

            const {cenLng, cenLat} = this.getCountLngLat(polygonConfig.polygonPath)

            let point = new this.BMap.Point(cenLng, cenLat);

            // 判断是否有自己的坐标点位
            if(polygonConfig.namePrint) {
                point = new this.BMap.Point(polygonConfig.namePrint.lng, polygonConfig.namePrint.lat);
            }

            // 创建自定义覆盖物
            function CustomOverlay(point, text, logoUrl) {
                this._point = point;
                this._text = text;
            }

            // 继承自BMap.Overlay
            CustomOverlay.prototype = new this.BMap.Overlay();

            // 实现initialize方法
            CustomOverlay.prototype.initialize = function (map) {
                this._map = map;
                let div = this._div = document.createElement("div");
                div.style.position = "absolute";
                div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
                div.style.textAlign = "center";
                div.style.whiteSpace = "nowrap";

                // 文字
                let textDiv = document.createElement("div");
                textDiv.style.backgroundColor = polygonConfig.color;
                // textDiv.style.border = "1px solid #333";
                textDiv.style.borderRadius = "5px";
                textDiv.style.fontWeight = 600;
                textDiv.style.padding = "5px";
                textDiv.appendChild(document.createTextNode(this._text));
                div.appendChild(textDiv);

                map.getPanes().labelPane.appendChild(div);
                this._div = div;
                return div;
            }

            // 实现draw方法
            CustomOverlay.prototype.draw = function () {
                let position = this._map.pointToOverlayPixel(this._point);
                this._div.style.left = position.x - 40 + "px"; // 调整位置使覆盖物居中
                this._div.style.top = position.y - 0 + "px";  // 调整位置使覆盖物居中
            }

            // 创建自定义覆盖物实例
            let customOverlay = new CustomOverlay(point, polygonConfig.name);


            // 添加鼠标移出事件
            // customOverlay.addEventListener("click", () => this.setActivePolygon(polygonConfig.polygonPath, index));

            // 绑定点击事件
            CustomOverlay.prototype.addEventListener("click", () => {
                alert("自定义覆盖物被点击了！" + index);
            });

            this.map.addOverlay(customOverlay);

            return {
                customOverlay
            }
        },
        /**
         * 添加银行点位
         * @param polygonConfig
         * @param index
         * @returns {{customOverlay: CustomOverlay}}
         */
        addBackNameOver(polygonConfig, index) {
            if(!polygonConfig.bankLL){
                return {}
            }
            const {lng, lat} = polygonConfig.bankLL
            let point = new this.BMap.Point(lng, lat);

            // 创建自定义覆盖物
            function CustomOverlay(point, text, _subtext,polygonConfig) {
                this._point = point;
                this._text = text;
                this._subtext = _subtext;
                this.polygonConfig = polygonConfig;
            }

            // 继承自BMap.Overlay
            CustomOverlay.prototype = new this.BMap.Overlay();

            // 实现initialize方法
            CustomOverlay.prototype.initialize = function (map) {
                this._map = map;
                let div = this._div = document.createElement("div");
                div.style.position = "absolute";
                div.style.display = "flex";
                div.style.flexDirection = "column";
                div.style.zIndex = 3;
                div.className = "backName-" + this.polygonConfig.nameLoType + " backName"


                // 银行的图标
                let blokDiv = document.createElement("div");
                blokDiv.style.backgroundColor = "#0053ff";
                blokDiv.style.width = "20px";
                blokDiv.style.height = "20px";


                // 银行名称
                let textDiv = document.createElement("div");
                textDiv.style.color = "#0053ff";
                textDiv.style.fontWeight = 600;
                textDiv.style.whiteSpace = "nowrap";
                textDiv.appendChild(document.createTextNode(this._text));

                // 支行名称
                let subText = document.createElement("div");
                subText.style.color = "#0053ff";
                subText.style.whiteSpace = "nowrap";
                subText.appendChild(document.createTextNode(this._subtext));

                switch (this.polygonConfig.nameLoType) {
                    case "top":
                        // 支行名称
                        div.appendChild(subText);
                        // 银行名称
                        div.appendChild(textDiv);
                        // 银行的图标
                        div.appendChild(blokDiv);
                        break;
                    case "topLeft":
                        // 支行名称
                        div.appendChild(subText);
                        // 银行名称
                        div.appendChild(textDiv);
                        // 银行的图标
                        div.appendChild(blokDiv);
                        break;
                    default:
                        // 银行的图标
                        div.appendChild(blokDiv);
                        // 银行名称
                        div.appendChild(textDiv);
                        // 支行名称
                        div.appendChild(subText);
                        break;
                }

                map.getPanes().labelPane.appendChild(div);
                this._div = div;
                return div;
            }

            // 实现draw方法
            CustomOverlay.prototype.draw = function () {
                let position = this._map.pointToOverlayPixel(this._point);
                // 重新应用 Flex 布局样式
                this._div.style.left = position.x - 0 + "px";
                this._div.style.top = position.y - 0 + "px";
                switch (this.polygonConfig.nameLoType) {
                    case "top":
                        this._div.style.left = position.x - 0 + "px"; // 调整位置使覆盖物居中
                        this._div.style.top = position.y - 68 + "px";  // 调整位置使覆盖物居中
                        break;
                    default:
                        break;
                }
            }

            // 创建自定义覆盖物实例
            let bankNameOverlay = new CustomOverlay(point, polygonConfig.bankName, polygonConfig.subBranch,polygonConfig);

            this.map.addOverlay(bankNameOverlay);

            return {
                bankNameOverlay
            }
        },
        /**
         * 添加全部分区的名称
         */
        addAllOver(){
            this.polygonsConfigs = this.polygonsConfigs.map(((polygonConfig, index) => {
                return {
                    ...polygonConfig,
                    ...this.addOver(polygonConfig, index)
                }
            }))
        },
        /**
         * 添加全部分行的名称
         */
        addAllBackNameOver(){
            this.polygonsConfigs = this.polygonsConfigs.map(((polygonConfig, index) => {
                return {
                    ...polygonConfig,
                    ...this.addBackNameOver(polygonConfig, index)
                }
            }))
        },
        /**
         * 选中网格
         */
        setActivePolygon( polygonIndex ) {
            this.setZoom( this.polygonsConfigs[polygonIndex].polygonPath,polygonIndex)
            this.clearActive()
            this.setActive(polygonIndex)
            this.polygonsConfigs[polygonIndex].bankNameOverlay._div.style.display = "flex";
        },
        /**
         * 选中营业部分管网格
         */
        setActivePolygonWithBranch(branch) {
            let polygonPath = []
            let polygonsConfigsIndex = []

            this.polygonsConfigs.map((polygonsConfig,index) => {
                if(polygonsConfig.branch === branch){
                    polygonPath = [...polygonPath,...polygonsConfig.polygonPath]
                    polygonsConfigsIndex.push(index)
                }
            })

            this.setZoom(polygonPath)
            this.clearActive()
            polygonsConfigsIndex.map(polygonIndex => {
                this.setActive(polygonIndex)
            })

        },
        /**
         * 根据原始数据计算中心坐标和缩放级别，并为地图设置中心坐标和缩放级别。
         * @param points
         * @param polygonIndex
         */
        setZoom(points,polygonIndex) {
            if (points.length > 0) {
                const {maxLng, minLng, maxLat, minLat,cenLng, cenLat} = this.getCountLngLat(points)
                let zoom = this.getZoom(maxLng, minLng, maxLat, minLat);
                // this.map.centerAndZoom(new this.BMap.Point(cenLng, cenLat), zoom);

                if(typeof polygonIndex === "number" && this.polygonsConfigs[polygonIndex].zoom){
                    zoom = this.polygonsConfigs[polygonIndex].zoom
                }

                this.map.setZoom(zoom, {
                    enableAnimation: true // 启用动画效果
                });

                let center = new this.BMap.Point(cenLng, cenLat);
                if(typeof polygonIndex === "number"){
                    if(this.polygonsConfigs[polygonIndex].zoomCenter){
                        const {lng,lat} = this.polygonsConfigs[polygonIndex].zoomCenter;
                        center = new this.BMap.Point(lng,lat);
                    }else if(this.polygonsConfigs[polygonIndex].namePrint){
                        const {lng,lat} = this.polygonsConfigs[polygonIndex].namePrint;
                        center = new this.BMap.Point(lng,lat);
                    }
                }

                // // 添加偏移值
                // const pixel = this.map.pointToPixel(center);
                // pixel.x += 300;
                // pixel.y += 0;
                //
                // const newCenter = this.map.pixelToPoint(pixel);

                // 使用 panTo 设置新的中心点并添加动画效果
                this.map.panTo(center, {
                    noAnimation: false // 启用动画效果
                });
            } else {
                //没有坐标，显示全长沙
                this.map.centerAndZoom(new this.BMap.Point(116.404, 39.915), 13);
            }
        },
        /**
         * 获取计算坐标
         * @param points
         * @returns {{maxLat: *, minLat: *, minLng: *, maxLng: *}}
         */
        getCountLngLat(points){
            let maxLng = points[0].lng;
            let minLng = points[0].lng;
            let maxLat = points[0].lat;
            let minLat = points[0].lat;
            let res;
            for (let i = points.length - 1; i >= 0; i--) {
                res = points[i];
                if (res.lng > maxLng) maxLng = res.lng;
                if (res.lng < minLng) minLng = res.lng;
                if (res.lat > maxLat) maxLat = res.lat;
                if (res.lat < minLat) minLat = res.lat;
            }
            let cenLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2;
            let cenLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2;
            return {
                maxLng, minLng, maxLat, minLat,cenLng,cenLat
            }
        },
        /**
         * 根据经纬极值计算绽放级别
         */
        getZoom(maxLng, minLng, maxLat, minLat) {
            let zoom = ["50", "100", "200", "500", "1000", "2000", "5000", "10000", "20000", "25000", "50000", "100000", "200000", "500000", "1000000", "2000000"]
            //级别18到3。
            let pointA = new this.BMap.Point(maxLng, maxLat);
            // 创建点坐标A
            let pointB = new this.BMap.Point(minLng, minLat);
            // 创建点坐标B
            let distance = this.map.getDistance(pointA, pointB).toFixed(1);
            //获取两点距离,保留小数点后两位
            for (let i = 0, zoomLen = zoom.length; i < zoomLen; i++) {
                if (zoom[i] - distance > 0) {
                    return 18 - i + 4;
                    //之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。
                }
            }
        },
        /**
         * 总揽全局
         */
        toFillArea() {
            let allPoints = []
            this.polygonsConfigs.map(({polygonPath}) => {
                allPoints = [...allPoints, ...polygonPath]
            })
            this.clearActive()
            this.setZoom(allPoints)
        },
        /**
         * 放置区域名称
         */
        addCustomOverlay(polygonConfig) {
            // 创建自定义覆盖物
            function CustomOverlay(point, options) {
                this._point = point;
                this._options = options;
            }

            CustomOverlay.prototype = new this.BMap.Overlay();
            CustomOverlay.prototype.initialize = function (map) {
                this._map = map;
                const div = document.createElement("div");
                div.style.position = "absolute";
                div.style.width = "40px";
                // div.style.padding = "10px";
                div.style.backgroundColor = "white";
                div.style.border = "1px solid #ccc";
                div.style.boxShadow = "2px 2px 4px rgba(0, 0, 0, 0.2)";

                const position = map.pointToOverlayPixel(this._point); // 将地图坐标点转换为屏幕坐标点
                div.style.left = position.x - 10 + "px";
                div.style.top = position.y - 0 + "px";

                div.onclick = () => {
                    // 点击事件处理
                    alert("自定义覆盖物被点击了！");
                };

                map.getPanes().labelPane.appendChild(div);
            };

            CustomOverlay.prototype.draw = function () {
                // 这里可以添加绘制逻辑，不过在这个示例中没有具体的绘制操作
            };

            const {cenLng, cenLat} = this.getCountLngLat(polygonConfig.polygonPath)
            console.log(polygonConfig.name + ':' + cenLng + "," +cenLat)
            const customOverlay = new CustomOverlay(new this.BMap.Point(cenLng, cenLat), {
                bankName: polygonConfig.name,
                branchName: polygonConfig.name,
                depositorsCount: polygonConfig.name,
            });

            // 设置覆盖物的层级
            customOverlay.setZIndex(2);

            // 添加覆盖物到地图
            this.map.addOverlay(customOverlay);

            return {customOverlay}
        },
        addAllCustomOverlay(){
            this.polygonsConfigs = this.polygonsConfigs.map(((polygonConfig, index) => {
                return {
                    ...polygonConfig,
                    ...this.addCustomOverlay(polygonConfig, index)
                }
            }))
        },
        /**
         * 按钮移入
         * @param index
         */
        btnMouseEnter(index){

        },
        btnMouseLeave(){

        },
        getAllBranch(){
            return [...new Set(this.polygonsConfigs.map(({branch}) => branch))]
        },
        /**
         * 通过配置生成css
         */
        crateCssByPolygon(){

            // 获取一个 DOM 元素，用于插入生成的样式
            const styleElement = document.createElement('style');
            document.head.appendChild(styleElement);
            const styleSheet = styleElement.sheet;

            // 循环数组并生成 CSS 类名和样式
            this.polygonsConfigs.map((data, index) => {
                const className = `.bm-label-op-btns.p-${index}`;

                // 生成样式规则，将颜色应用于不同类
                const styleRule = `${className} { background-color: ${data.color}66;border-color: ${data.color}99; }`;
                const styleRuleHover = `${className}:hover { background-color: ${data.color}99; }`;
                const styleRuleActive = `${className}.active { background-color: ${data.color}99; }`;

                // 在样式表中插入生成的样式规则
                styleSheet.insertRule(styleRule, styleSheet.cssRules.length);
                // 在样式表中插入生成的样式规则
                styleSheet.insertRule(styleRuleHover, styleSheet.cssRules.length);
                // 在样式表中插入生成的样式规则
                styleSheet.insertRule(styleRuleActive, styleSheet.cssRules.length);
            });
        }
    }
}
</script>

<style scoped lang="scss">

.bm {
    display: flex;
    position: relative;

    &-title {
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 36px;
        font-weight: bold;
        color: #000;
    }

    &-view {
        flex-grow: 1;
        flex-shrink: 1;
        width: 100%;
        height: 100%;

        .backName {
            &-left {
                align-items: flex-end;
                transform: translateX(-100%);
            }
            &-topLeft {
                align-items: flex-end;
                transform: translateX(-100%) translateY(-100%);
            }
            &-center {
                align-items: center;
                transform: translateX(-50%);
            }
        }
    }

    &-label {
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        background-color: rgba(245, 243, 240, 0.80);
        padding: 6px 6px 0;
        border-radius: 20px 20px 0 0;

        &-tab {
            display: flex;
            flex-direction: column;
            justify-content: center;
            &s {
                width: 80px;
                padding: 3px 2px;
                border-radius: 8px 0 0 8px;
                color: #ffffff;
                font-weight: bold;
                cursor: pointer;

                &.act {
                    background-color: rgba(96, 96, 96, 0.40);
                }
            }
        }

        &-op {
            padding: 6px 0 0 6px;
            background-color: rgba(245, 243, 240, 0.60);
            border-radius: 10px;

            &-back {
                margin-right: 0 !important;
            }

            &-btn {
                display: flex;
                height: 355px;
                flex-direction: column;
                flex-wrap: wrap;
                text-align: left;

                &s {
                    cursor: pointer;
                    padding: 0 2px;
                    margin: 0 6px 6px 0;
                    border-radius: 6px;
                    color: #000000;
                    font-weight: bold;
                    background-color: #ffffff;
                    border: #FFF 2px solid;
                }
            }
        }

    }
}
</style>
