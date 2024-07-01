/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 
 */
export default {
    state:{
        previewFileData: [], //获取文件资源 默认为空数组 可以传单个对象
        defaultProps: { //默认树状结构 键值
            children: 'children',
            label: 'label',
        },
        currentFile: "" //当前应选中文件   单个对象数据不需要
    },
    actions: {
        setTest: ({commit}, val) => {
            commit('setPreviewFileData', val)
        }
    },
    mutations: {
        setPreviewFileData(state, v) {
            state.previewFileData = v;
        },
        setDefaultProps(state, v) {
            state.defaultProps = v;
        },
        resetProps(state, v) {
            state.defaultProps = {
                children: 'children',
                label: 'label',
            }
        },
        setCurrentFile(state, v) {
            state.currentFile = v;
        }
    }
}