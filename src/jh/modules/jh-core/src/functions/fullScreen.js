export default {
    bind(el, binding, vnode, oldVnode) {
        let isFullScreen = false;
        //当前宽高
        let nowWidth = 0;
        let nowHight = 0;
        //当前顶部高度
        let nowMarginTop = 0;
  
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        dialogHeaderEl.onselectstart = new Function("return false");
        const dragDom = el.querySelector('.el-dialog');
        dialogHeaderEl.style.cursor = 'pointer';
        //设置弹窗body默认高度

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
        //双击头部效果全屏
        dialogHeaderEl.ondblclick = (e) => {
          if (isFullScreen == false) {
            nowHight = dragDom.clientHeight;
            nowWidth = dragDom.clientWidth;
            nowMarginTop = dragDom.style.marginTop;
            dragDom.style.left = 0;
            dragDom.style.top = 0;
            dragDom.style.height = "100VH";
            dragDom.style.width = "100VW";
            dragDom.style.marginTop = 0;
            isFullScreen = true;
            dialogHeaderEl.style.cursor = 'initial';
          } else {
            dragDom.style.height = "auto";
            dragDom.style.width = nowWidth + 'px';
            dragDom.style.marginTop = nowMarginTop;
            isFullScreen = false;
            dialogHeaderEl.style.cursor = 'initial';
          }
        }
    }
}