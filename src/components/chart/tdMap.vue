<template>
  <div>
    <el-dialog title="地图查看" width="80%" top="20px" :visible.sync="dialogStatus" :close-on-click-modal="false" append-to-body :before-close="handleQx">
      <div style="width:100%;height:500px">

        <div id="map">

        </div>
        <div class="zsjbj">
          <el-select v-model="value" size="mini" placeholder="行政区域" @change="getMapXzgh">
            <el-option v-for="item in qhData" :key="item.xzqhmc" :label="item.xzqhmc" :value="item.x+','+item.y">
            </el-option>
          </el-select>
          <!-- <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="行政区域" name="1">
              <el-table :data="qhData" style="width: 100%">
                <el-table-column prop="xzqhmc" label="行政区划">
                  <template slot-scope="scope">
                    <a @click="gotoMapXzqh(scope.row)" style="color:blue;cursor:pointer">{{scope.row.xzqhmc}}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="xzqh" label="区划代码">
                </el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse> -->
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "testJwdsMap",
  data() {
    return {
      value: "",
      dialogStatus: false,
      activeName: "",
      map: {},
      qhData: [], //区划数据,
      showContent: false,
      zoom: 10,
      center: [118.778, 32.043]
    };
  },
  mounted() {},
  methods: {
    //取消按钮
    handleQx() {
      this.value="";
      document.getElementById("map").innerHTML = "";
      this.dialogStatus = false;
    },
    getQxData() {
      let params = {
        scriptId: "tdt_01"
      };
      this.$api
        .formPost("/api/financing/fd/scriptRule/query", params)
        .then(res => {
          if (res.retHead.code == "0000000") {
            this.qhData = res.retBody.retList;
            this.init();
          }
        });
    },
    //点击跳转行政区划
    gotoMapXzqh(row) {
      var start = [parseFloat(row.x), parseFloat(row.y)];
      this.map.flyTo({
        center: start,
        zoom: 13, //飞行到目的坐标时地图的缩放级别
        bearing: 0,
        speed: 2, //飞行速度
        curve: 1, //改变缩小的速度
        easing: function(t) {
          return t;
        }
      });
    },
    getMapXzgh() {
      var arr = this.value.split(",");
      var start = [parseFloat(arr[0]), parseFloat(arr[1])];
      this.map.flyTo({
        center: start,
        zoom: 13, //飞行到目的坐标时地图的缩放级别
        bearing: 0,
        speed: 2, //飞行速度
        curve: 1, //改变缩小的速度
        easing: function(t) {
          return t;
        }
      });
    },
    init() {
      this.map = {};
      const _this = this;
      GeoGlobe.customToken = window.config.mapToken;
      _this.map = new GeoGlobe.Map({
        container: "map", //绑定容器
        mapCRS: "4490", //定义坐标系
        zoom: _this.zoom, //当前缩放级别
        center: _this.center, //定位中心点
        maxZoom: 20, //最大缩放级别
        minZoom: 8 //最小缩放级别
      });
      var geoJSONUtil = new GeoGlobe.Format.GeoJSONUtil();
      _this.map.on("load", function() {
        // 南京电子地图底图
        var njdt_layer = new GeoGlobe.NJLayer("geo_tile_dt");
        // 南京电子地图注记
        var njzj_layer = new GeoGlobe.NJLayer("geo_tile_zj");

        // 添加图层
        _this.map.addLayer(njdt_layer);
        _this.map.addLayer(njzj_layer);

        getData();

        // 事件绑定
        _this.map.on("dragstart", showInfoDragstart);
        _this.map.on("dragging", showInfoDragging);
        _this.map.on("dragend", showInfoDragend);
        /*********添加zoom改变监听事件********/
        _this.map.on("zoomend", function(e) {
          //点位装换 xy 点位转地图坐标
          console.log("缩放改变事件");
          // console.log(_this.map.transform.pointLocation({ x: 0, y: 0 }));
          // console.log(_this.map.transform.pointLocation({ x: 1000, y: 545 }));
          let zoom = _this.map.getZoom();
          console.log(zoom);
          remove("spanPosition");
          remove("spanPositionZoom2");
          remove("spanPositionZoom3");
          if (zoom < 13) {
            getData();
          }
          if (13 <= zoom && zoom < 15) {
            getDataZoom2(
              _this.map.transform.pointLocation({ x: 0, y: 0 }),
              _this.map.transform.pointLocation({
                x: document.querySelector("#map").clientWidth,
                y: document.querySelector("#map").clientHeight
              })
            );
          }
          if (zoom >= 15) {
            getDataZoom3(
              _this.map.transform.pointLocation({ x: 0, y: 0 }),
              _this.map.transform.pointLocation({
                x: document.querySelector("#map").clientWidth,
                y: document.querySelector("#map").clientHeight
              })
            );
          }
        });
      });

      /*********点击获取坐标经纬度**********/
      _this.map.on("click", function(e) {
        console.log(e);
      });
      /*********添加拖动改变事件********/
      function showInfoDragstart(e) {
        var text = "开始拖拽地图！";
        remove("spanPosition");
        remove("spanPositionZoom2");
        remove("spanPositionZoom3");
        console.log(text);
      }
      function showInfoDragging(e) {
        var text = "正在拖拽地图！";
        console.log(text);
      }
      function showInfoDragend() {
        var text = "拖拽地图结束！";
        let zoom = _this.map.getZoom();
        console.log(zoom);
        if (zoom < 13) {
          getData();
        }
        if (13 <= zoom && zoom < 15) {
          getDataZoom2(
            _this.map.transform.pointLocation({ x: 0, y: 0 }),
            _this.map.transform.pointLocation({
              x: document.querySelector("#map").clientWidth,
              y: document.querySelector("#map").clientHeight
            })
          );
        }
        if (zoom >= 15) {
          getDataZoom3(
            _this.map.transform.pointLocation({ x: 0, y: 0 }),
            _this.map.transform.pointLocation({
              x: document.querySelector("#map").clientWidth,
              y: document.querySelector("#map").clientHeight
            })
          );
        }
        console.log(text);
      }

      function remove(tcId) {
        let needRemove = document.getElementsByClassName(tcId);
        if (needRemove) {
          for (const item of needRemove) {
            setTimeout(() => {
              item.remove();
            }, 0);
          }
        }
      }
      //获取区划数据
      function getData() {
        for (const obj of _this.qhData) {
          var lngLat = {};
          var arr = {};
          lngLat.lat = obj.y;
          lngLat.lng = obj.x;
          let divDom = document.createElement("span");
          let content = document.createElement("span");
          divDom.className = "spanPosition";
          let needRemove = document.querySelector("#map span");
          var point = _this.map.transform.locationPoint(lngLat);
          content.innerHTML = obj.xzqhmc + "<br>" + obj.xzqh;
          divDom.style.position = "absolute";
          divDom.style.top = point.y - 42 + "px";
          divDom.style.left = point.x - 42 + "px";
          divDom.style.zindex = 110002;
          divDom.append(content);
          divDom.onclick = function() {
            var start = [];
            start = [parseFloat(obj.x), parseFloat(obj.y)];
            _this.map.flyTo({
              center: start,
              zoom: 13, //飞行到目的坐标时地图的缩放级别
              bearing: 0,
              speed: 2, //飞行速度
              curve: 1, //改变缩小的速度
              easing: function(t) {
                return t;
              }
            });
          };
          document.querySelector("#map").append(divDom);
        }
      }
      function getDataZoom3(minZb, maxZb) {
        var minX = minZb.lng;
        var minY = maxZb.lat;
        var maxX = maxZb.lng;
        var maxY = minZb.lat;
        let params1 = {
          scriptId: "tdt_03",
          minX: minX,
          minY: minY,
          maxX: maxX,
          maxY: maxY
        };
        _this.$api
          .formPost("/api/financing/fd/scriptRule/query", params1)
          .then(res => {
            if (res.retHead.code == "0000000") {
              for (const obj of res.retBody.retList) {
                var lngLat = {};
                var arr = {};
                lngLat.lat = obj.y;
                lngLat.lng = obj.x;
                let divDom = document.createElement("span");
                divDom.className = "spanPositionZoom3";
                let needRemove = document.querySelector("#map span");
                var point = _this.map.transform.locationPoint(lngLat);
                divDom.innerHTML =
                  "<span>" +
                  obj.xq +
                  obj.xzqhdm +
                  "</span>" +
                  "<span class='spanCount'>" +
                  "1.2W套" +
                  "</span>";
                divDom.style.position = "absolute";
                divDom.style.top = point.y - 15 + "px";
                divDom.style.left = point.x - 15 + "px";
                divDom.style.zindex = 110002;
                document.querySelector("#map").append(divDom);
              }
            }
          });
      }
      function getDataZoom2(minZb, maxZb) {
        var minX = minZb.lng;
        var minY = maxZb.lat;
        var maxX = maxZb.lng;
        var maxY = minZb.lat;
        let params1 = {
          scriptId: "tdt_02",
          minX: minX,
          minY: minY,
          maxX: maxX,
          maxY: maxY
        };
        _this.$api
          .formPost("/api/financing/fd/scriptRule/query", params1)
          .then(res => {
            if (res.retHead.code == "0000000") {
              for (const obj of res.retBody.retList) {
                var lngLat = {};
                var arr = {};
                lngLat.lat = obj.y;
                lngLat.lng = obj.x;
                let divDom = document.createElement("span");
                let content = document.createElement("span");
                divDom.className = "spanPositionZoom2";
                let needRemove = document.querySelector("#map span");
                var point = _this.map.transform.locationPoint(lngLat);
                divDom.innerHTML =
                  "<span>" +
                  obj.bkmc.substring(0, 3) +
                  "</br>" +
                  obj.xzqh +
                  "</br>" +
                  obj.id +
                  "</span>";
                divDom.style.position = "absolute";
                divDom.style.top = point.y - 30 + "px";
                divDom.style.left = point.x - 30 + "px";
                divDom.style.zindex = 110002;
                divDom.append(content);
                divDom.onclick = function() {
                  var start = [];
                  start = [parseFloat(obj.x), parseFloat(obj.y)];
                  _this.map.flyTo({
                    center: start,
                    zoom: 15, //飞行到目的坐标时地图的缩放级别
                    bearing: 0,
                    speed: 2, //飞行速度
                    curve: 1, //改变缩小的速度
                    easing: function(t) {
                      return t;
                    }
                  });
                };
                document.querySelector("#map").append(divDom);
              }
            }
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/demoCenter";

.zsjbj {
  width: 200px;
  top: -500px;
  background-color: #fff;
  background-clip: border-box;
  border-width: 0;
  border-radius: 1px;
  position: relative;
}
</style>
