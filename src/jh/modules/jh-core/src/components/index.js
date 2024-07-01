/*
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 全局注册组件
 */
import cascader from './formComponents/cascader/index.vue';
import enuSelect from './formComponents/enuSelect/index.vue';
import jhTable from './formComponents/table/index.vue';
import jhNumber from './formComponents/number/index.vue';
import baseDialog from './baseDialog/index.vue';
import pager from './formComponents/pager/index.vue';
// import previewFile from './previewFile/index.vue'
import jhColumn from './formComponents/table/column/index.vue';
import jigsaw from './jigsaw/index.vue';
import uploader from './uploader/index.vue';
import jhFileUpload from './uploader/fileUpload.vue';
import jhBigFileUpload from './uploader/bigFile.vue';
function registerCpt(Vue) {
	if (registerCpt.installed) {
		return;
	}
	Vue.component('jh-tool-cascader', cascader);
	Vue.component('cascader', cascader);
	Vue.component('enuSelect', enuSelect);
	Vue.component('jh-table', jhTable);
	Vue.component('jh-number', jhNumber);
	Vue.component('BaseDialog', baseDialog);
	Vue.component('pager', pager);
	Vue.component('jh-cascader', cascader);
	Vue.component('jh-enu-select', enuSelect);
	Vue.component('jh-table', jhTable);
	Vue.component('jh-number', jhNumber);
	Vue.component('jh-base-dialog', baseDialog);
	Vue.component('jh-pager', pager);
	// Vue.component('previewFile',previewFile);
	Vue.component('jh-column', jhColumn);
	Vue.component('jh-uploader', uploader);
	Vue.component('jh-file-upload', jhFileUpload);
	Vue.component('jh-big-file-upload', jhBigFileUpload);
	Vue.component('jigsaw', jigsaw);
}
export default registerCpt;
