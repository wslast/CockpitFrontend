import { isWaterMark } from "@/config";
export default (el, binding) => {
  const addWaterMarker = (text, time, el) => {
    if (!isWaterMark) return;
    var canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 300;
    var cans = canvas.getContext("2d");
    cans.rotate((-20 * Math.PI) / 180); //旋转弧度
    cans.font = "16px Microsoft JhengHei"; //字体
    cans.fillStyle = "rgba(0, 0, 0, 0.1)"; //字体填充颜色
    cans.textAlign = "left"; //对齐方式
    cans.textBaseline = "Middle"; //基线
    let waterMarkText = "";
    try {
      if (window.sessionStorage.user) {
        waterMarkText += JSON.parse(window.sessionStorage.user).realName;
        if (JSON.parse(window.sessionStorage.user).mobile) {
          waterMarkText += JSON.parse(
            window.sessionStorage.user
          ).mobile.substring(
            JSON.parse(window.sessionStorage.user).mobile.length - 4,
            JSON.parse(window.sessionStorage.user).mobile.length
          );
        }
      }
      cans.fillText(waterMarkText, canvas.width / 3, canvas.height / 2); //被填充的文本
    } catch (error) {}
    if (document.querySelector(".waterMarkImg")) {
      return;
    }
    var imgBox = document.createElement("div");
    imgBox.className = "waterMarkImg";
    imgBox.style.zIndex = 99999;
    imgBox.style.height = "100%";
    imgBox.style.width = "100%";
    imgBox.style.position = "absolute";
    imgBox.style.top = "0px";
    imgBox.style.pointerEvents = "none";
    imgBox.style.overflow = "hidden";
    //不确定浏览器尺寸 按4*3计算
    for (let i = 0; i < 12; i++) {
      var waterMarkImg = document.createElement("img");
      waterMarkImg.src = canvas.toDataURL("image/png");
      imgBox.appendChild(waterMarkImg);
    }
    el.appendChild(imgBox);
  };
  const { text, time } = binding.value;
  addWaterMarker(text, time, el);
};
