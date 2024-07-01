/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 
 */
export default {
  inserted(el, binding, vnode) {
      let timer;
      el.addEventListener("click",function(e){
        if (timer) {
          clearTimeout(timer)
         }
         timer = setTimeout(() => {
          binding.value();
         }, 1000)
      })
  },
  unbind(el, binding, vnode) {
    let timer;
    el.removeEventListener("click",function(e){
      if (timer) {
        clearTimeout(timer)
       }
       timer = setTimeout(() => {
        binding.value();
       }, 1000)
    })
  }
}
