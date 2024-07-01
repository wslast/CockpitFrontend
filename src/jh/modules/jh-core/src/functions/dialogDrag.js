export default {
    bind(el, binding, vnode, oldVnode) {
  
        //弹框可拉伸最小宽高
        let minWidth = 50;
        let minHeight = 50;
  
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        dialogHeaderEl.onselectstart = new Function("return false");
        const dragDom = el.querySelector('.el-dialog');
        dialogHeaderEl.style.cursor = 'move';
  
        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
  
        dialogHeaderEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft;
            const disY = e.clientY - dialogHeaderEl.offsetTop;
  
            // 获取到的值带px 正则匹配替换
            let styL, styT;
  
            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if(sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
            }else {
                styL = +sty.left.replace(/\px/g, '');
                styT = +sty.top.replace(/\px/g, '');
            };
            console.log(styL);
            console.log(styT);
            document.onmousemove = function (e) {
                // 通过事件委托，计算移动的距离
                const l = e.clientX - disX;
                const t = e.clientY - disY;
                console.log('l>>>', l);
                console.log('t>>>', t);
                // 移动当前元素
                dragDom.style.left = `${l + styL}px`;
                dragDom.style.top = `${t + styT}px`;
  
                //将此时的位置传出去
                //binding.value({x:e.pageX,y:e.pageY})
            };
  
            document.onmouseup = function (e) {
                // dragDom.style.left = `${styL}px`;
                // dragDom.style.top = `${styT}px`;
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
        let resizeEl=document.createElement("div");
        let imgDialog = el.querySelector('.imgDialog');
        dragDom.appendChild(resizeEl);
        //在弹窗右下角加上一个10-10px的控制块
        resizeEl.style.cursor = 'se-resize';
        resizeEl.style.position = 'absolute';
        resizeEl.style.height = '10px';
        resizeEl.style.width = '10px';
        resizeEl.style.right = '20px';
        resizeEl.style.bottom = '20px';
        // resizeEl.style.backgroundColor = 'red';
        //鼠标拉伸弹窗
        resizeEl.onmousedown = (e) => {
  
            // 记录初始x位置
            const clientX = e.clientX;
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - resizeEl.offsetLeft;
            const disY = e.clientY - resizeEl.offsetTop;
  
            document.onmousemove = function (e) {
                e.preventDefault(); // 移动时禁用默认事件
  
                // 通过事件委托，计算移动的距离
                const x = e.clientX - disX + (e.clientX - clientX);//这里 由于elementUI的dialog控制居中的，所以水平拉伸效果是双倍
                const y = e.clientY - disY;
                //比较是否小于最小宽高
                // imgDialog.style.width = `${x}px`;
                // imgDialog.style.height = `${y}px`;
                imgDialog.style.width = x > minWidth ? `${x}px` : minWidth + 'px';
                imgDialog.style.height = y > minHeight ? `${y}px` : minHeight + 'px';
            };
            //拉伸结束
            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    }
}