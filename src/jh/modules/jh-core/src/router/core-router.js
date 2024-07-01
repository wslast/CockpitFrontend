/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 
 */
import previewFile from "../components/previewFile/index"
import uploaderDemo from "../pages/uploader/index.vue"
export default [
    {
        path: '/previewFile',
        name: 'previewFile',
        component: previewFile,
    },
    
    {
        path: '/sysfun/uploaderDemo',
        name: '上传模块使用说明',
        component: uploaderDemo,
        meta: {
            title: '上传模块使用说明',
            icon: '',
            noCache: true,
            affix: true,
        },
    },
]