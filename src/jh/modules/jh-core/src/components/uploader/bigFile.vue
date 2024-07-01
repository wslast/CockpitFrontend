<!--  -->
<template>
	<div class="jh-big-file-upload">
		<el-upload
			ref="upload"
			class="upload"
			v-bind="$attrs"
			action=""
			:headers="headers"
			:on-change="onChange"
			:on-exceed="onExceed"
			multiple
			:limit="limit"
			:auto-upload="false"
			:show-file-list="false"
			:http-request="() => {}"
			:file-list="fileList"
		>
			<el-button size="small" type="primary">点击上传</el-button>
		</el-upload>
		<el-table :data="fileList" class="mt10">
			<el-table-column
				prop="name"
				:show-overflow-tooltip="false"
				label="文件名称"
				min-width="180"
			>
			</el-table-column>
			<el-table-column prop="size" label="文件大小" width="100">
				<template slot-scope="scope">
					<div>
						{{ bytesToSize(scope.row.size) }}
					</div>
				</template>
			</el-table-column>
			<el-table-column :show-overflow-tooltip="false" label="进度" width="300">
				<template slot-scope="scope">
					<el-tag type="danger" v-if="scope.row.isError">上传失败</el-tag>
					<el-progress
						v-else
						:percentage="scope.row.percentage"
						:color="customColorMethod"
					></el-progress>
				</template>
			</el-table-column>
			<el-table-column
				label="操作"
				:show-overflow-tooltip="false"
				width="120px"
				align="center"
			>
				<template slot-scope="scope">
					<el-button
						type="text"
						v-if="!scope.row.isComplete && scope.row.isError"
						@click="reupload(scope.row)"
						>重新上传</el-button
					>
					<el-button
						type="text"
						v-if="scope.row.isComplete"
						@click="previewFile(scope.row)"
						>预览</el-button
					>
					<el-button type="text" @click="deleteFile(scope.row, scope.$index)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import SparkMD5 from 'spark-md5';
import { Base64 } from 'js-base64';
export default {
	name: 'jh-big-file-upload',
	props: {
		headers: {
			type: Object,
			default: () => {
				return { 'Auth-User-Token': window.sessionStorage.token };
			},
		},
		limit: {
			type: Number,
			default: 10,
		},
		splitSize: {
			type: Number,
			default: 3 * 1024 * 1024,
		},
		uploadConfig: {
			type: Object,
			default: () => null,
		},
	},

	data() {
		return {
			UPLOAD_URL: '',
			fileList: [],
			sparkBuffer: null,
			fileTasks: {},
			threadList: [],
		};
	},

	computed: {
		defaultSetting() {
			return this.$store.state.settings.uploadConfig;
		},
	},
	created() {
		this.UPLOAD_URL = this.getGlobalConfig().uploadURL;
	},

	methods: {
		/**
		 * @description: 进度条
		 * @param {*} percentage
		 * @return {*}
		 * @author: Junchi Zhao
		 */
		customColorMethod(percentage) {
			if (percentage < 99) {
				return '#008DFF';
			} else {
				return '#67C23A';
			}
		},
		/**
		 * @description: 文件提醒
		 * @param {*} files
		 * @param {*} fileList
		 * @return {*}
		 * @author: Junchi Zhao
		 */
		onExceed(files, fileList) {
			this.$message.warning(`当前限制选择 ${this.limit} 个文件`);
		},
		/**
		 * @description: 获取文件
		 * @param {*} file
		 * @param {*} fileList
		 * @return {*}
		 * @author: Junchi Zhao
		 */
		onChange(file, fileList) {
			if (this.limit < this.fileList.length + 1) {
				this.onExceed(file, this.fileList);
				return;
			}
			if (file.status === 'fail') {
				return;
			}
			if (
				fileList.map((item) => item.name).indexOf(file.name) > -1 &&
				fileList.map((item) => item.name).indexOf(file.name) !==
					fileList.map((item) => item.name).lastIndexOf(file.name)
			) {
				this.$message.warning(`${file.name}` + '已存在');
				return;
			}
			//正则去掉url关键符号
			const pattern = /[`=&?？\s]/g;
			file.name = file.name.replace(pattern, '');
			file.isComplete = false;
			file.id = new Date().getTime() + file.name;
			file.fileStatus = '';
			this.fileTasks[file.id] = [];
			if (
				file.size > this.splitSize &&
				!/\.(jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)
			) {
				this.calcChunkFile(file);
			} else {
				this.fileTasks[file.id].push(this.singleFile(file));
				this.beginUploadFile(file.id);
			}
			this.fileList.push(file);
		},
		/**
		 * @description: 获取分块文件完整id wholeId
		 * @param {*} file
		 * @return {*}
		 * @author: Junchi Zhao
		 */
		async getwholeFileId(file) {
			return new Promise((resolve, reject) => {
				let blobSlice =
						File.prototype.slice ||
						File.prototype.mozSlice ||
						File.prototype.webkitSlice,
					chunks = Math.ceil(file.size / this.splitSize),
					sparkBuffer = new SparkMD5.ArrayBuffer(),
					fileReader = new FileReader();
				fileReader.onload = (e) => {
					sparkBuffer.append(e.target.result); // Append array buffer
					let params = {
						fileName: file.name,
						fileType: file.type
							? file.type
							: file.name.split('.')[file.name.split('.').length - 1],
						fileHash: sparkBuffer.end(),
						fileSize: file.size,
						chunkSize: this.splitSize,
					};
					this.$api
						.formPost(this.UPLOAD_URL + '/api/file/crewfid', params)
						.then((res) => {
							file.chunks = chunks;
							resolve(res);
						});
				};
				fileReader.onerror = function() {
					console.warn('oops, something went wrong.');
				};
				fileReader.readAsArrayBuffer(blobSlice.call(file.raw, 0, file.size));
			});
		},
		/**
		 * @description: 单文件上传
		 * @param {*} file
		 * @return {*}
		 * @author: Junchi Zhao
		 */
		singleFile(file) {
			let formData = new FormData();
			formData.append('file', file.raw);
			formData.append('aliases', file.name);
			if (this.uploadConfig) {
				formData.append('compressType', this.uploadConfig.compressType);
				formData.append('compressRate', this.uploadConfig.compressRate);
				formData.append('compressMinSize', this.uploadConfig.compressMinSize);
				formData.append('compressMaxSize', this.uploadConfig.compressMaxSize);
			}
			return new Promise((resolve, reject) => {
				this.$api
					.formDataPost(this.UPLOAD_URL + '/api/file/upload', formData)
					.then((res) => {
						file = { ...res.retBody, ...file };
						file.fileId = file.fileHash;
						this.completeFile(file);
					});
			});
		},
		/**
		 * @description: 校验文件是否上传完毕
		 * @param {*}
		 * @return {*}
		 * @author: Junchi Zhao
		 */
		validUpload() {
			if (Object.keys(this.fileTasks).length > 0) {
				return false;
			} else {
				return true;
			}
		},
		/**
		 * @description: 文件上传完毕
		 * @param {*} file
		 * @return {*}
		 * @author: Junchi Zhao
		 */
		completeFile(file) {
			file.percentage = 100;
			file.fileStatus = 'success';
			file.status = 'success';
			file.isComplete = true;
			this.$set(
				this.fileList,
				this.fileList.findIndex((item) => item.id === file.id),
				file
			);
			if (this.fileTasks[file.id]) {
				delete this.fileTasks[file.id];
			}
			if (Object.keys(this.fileTasks).length === 0) {
				// this.$refs.upload.clearFiles();
			}
			this.$nextTick(() => {
				this.removeElUploadFile(file.id);
			});
		},
		/**
		 * @description: 多文件分块
		 * @param {*} chuckFile 分块文件
		 * @param {*} file 整个文件
		 * @return {*}
		 * @author: Junchi Zhao
		 */
		multipleFile(chuckFile, file) {
			let formData = new FormData();
			formData.append('aliases', file.name);
			formData.append('wholeFileId', file.wholeFileId);
			formData.append('file', chuckFile);
			formData.append('chunkNum', file.chunkNum);
			if (!file.isUploadChunk) {
				file.isUploadChunk = 0;
			}
			return new Promise((resolve, reject) => {
				this.$api
					.formDataPost(this.UPLOAD_URL + '/api/file/upload', formData)
					.then((res) => {
						file.isUploadChunk++;
						file.percentage = parseInt(
							(file.isUploadChunk / Math.ceil(file.size / this.splitSize)) * 100
						);
						resolve(res);
					});
			});
		},
		/**
		 * @description: 校验文件是否需要上传
		 * @param {*} chunkFile
		 * @param {*} file
		 * @return {*}
		 * @author: Junchi Zhao
		 */
		async checkFile(chunkFile, file) {
			return new Promise((resolve, reject) => {
				let blobSlice =
						File.prototype.slice ||
						File.prototype.mozSlice ||
						File.prototype.webkitSlice,
					sparkBuffer = new SparkMD5.ArrayBuffer(),
					fileReader = new FileReader();
				fileReader.onload = (e) => {
					sparkBuffer.append(e.target.result); // Append array buffer
					let params = {
						wholeFileId: file.wholeFileId,
						fileHash: sparkBuffer.end(),
						chunkNum: file.chunkNum,
					};
					this.$api
						.formPost(this.UPLOAD_URL + '/api/file/check', params)
						.then((res) => {
							resolve(res.retBody);
						});
				};
				fileReader.onerror = function() {
					console.warn('oops, something went wrong.');
				};
				fileReader.readAsArrayBuffer(
					blobSlice.call(chunkFile, 0, chunkFile.size)
				);
			});
		},
		/**
		 * @description: 开始上传
		 * @param {*} id 文件id
		 * @return {*}
		 * @author: Junchi Zhao
		 */
		beginUploadFile(id) {
			if (this.fileTasks[id] && this.fileTasks[id].length === 0) {
				this.completeFile(this.fileList.filter((item) => item.id === id)[0]);
				return;
			}
			Promise.all(this.fileTasks[id])
				.then((responses) => {
					this.completeFile(this.fileList.filter((item) => item.id === id)[0]);
				})
				.catch((error) => {
					for (const iterator of this.fileList) {
						if (iterator.id === id) {
							iterator.isError = true;
						}
					}
				});
		},

		/**
		 * @description: 计算需要文件分块数量
		 * @param {*} file
		 * @return {*}
		 * @author: Junchi Zhao
		 */
		async calcChunkFile(file) {
			if (!file.wholeFileId) {
				let response = await this.getwholeFileId(file);
				file.wholeFileId = response.retBody.wholeFileId;
				file.fileId = response.retBody.wholeFileId;
			}
			file.start = file.start ? file.start : 0;
			file.chunkNum = Math.ceil(file.start / this.splitSize); //获取分块个数
			let chuckFile = new File(
				[file.raw.slice(file.start, file.start + this.splitSize)],
				file.chunkNum + '.part'
			);
			let isExist = await this.checkFile(chuckFile, file);
			if (!isExist) {
				if (file.start >= file.size) {
					this.beginUploadFile(file.id);
					return;
				} else {
					this.fileTasks[file.id].push(this.multipleFile(chuckFile, file));
					file.start += this.splitSize;
					this.calcChunkFile(file);
				}
			} else {
				if (file.start >= file.size) {
					this.beginUploadFile(file.id);
					return;
				} else {
					file.start += this.splitSize;
					if (!file.isUploadChunk) {
						file.isUploadChunk = 0;
					}
					file.isUploadChunk++;
					file.percentage = parseInt(
						(file.isUploadChunk / Math.ceil(file.size / this.splitSize)) * 100
					);
					this.calcChunkFile(file);
				}
			}
		},
		/**
		 * @description: 重传文件
		 * @param {*} file
		 * @return {*}
		 * @author: Junchi Zhao
		 */
		reupload(file) {
			if (file.isError) {
				file.isError = false;
			}
			delete this.fileTasks[file.id];
			this.fileTasks[file.id] = [];
			this.calcChunkFile(file);
		},
		/**
		 * @description: 文件预览
		 * @param {*} file
		 * @return {*}
		 * @author: Junchi Zhao
		 */
		previewFile(file) {
			let compressRate = '';
			let compressType = '';
			//取最低质量或默认
			if (this.defaultSetting) {
				compressRate =
					this.uploadConfig && this.uploadConfig.compressRate
						? this.uploadConfig.compressRate.split(',')[0]
						: this.defaultSetting.compressRate.split(',')[0];
				compressType =
					this.uploadConfig && this.uploadConfig.compressType
						? this.uploadConfig.compressType
						: this.defaultSetting.compressType;
			}
			let previewFiles = this.fileList
				.filter((item) => item.fileId)
				.map((item) => {
					let file = {
						label: item.name,
						id: item.id,
						url:
							this.getGlobalConfig().uploadURL +
							'/api/file/downloadFile' +
							'?fullfilename=' +
							item.name +
							'&fileHashOrWholeFileId=' +
							item.fileId,
					};
					if (compressRate && this.isPicture(item.name)) {
						file.url += '&qualityType=' + compressRate;
					}
					if (compressType && this.isPicture(item.name)) {
						file.url += '&compressType=' + compressType;
					}
					return file;
				});
			window.sessionStorage.previewFileData = JSON.stringify(previewFiles);
			//左侧配置项 同elementUI tree组件
			window.sessionStorage.defaultProps = JSON.stringify({
				children: 'children',
				label: 'label',
			});
			//当前高亮的文件
			window.sessionStorage.currentFile = file.id;
			window.open(
				window.location.origin +
					(window.location.pathname ? window.location.pathname : '') +
					'/#/previewFile?timestamp=' +
					new Date().getTime()
			);
		},
		/**
		 * @description: 删除组件中的文件
		 * @param {*} id
		 * @return {*}
		 * @author: Junchi Zhao
		 */
		removeElUploadFile(id) {
			this.$refs.upload.uploadFiles.map((item, index) => {
				this.$refs.upload.uploadFiles.splice(index, 1);
			});
			this.$refs.upload.uploadFiles = [];
		},
		/**
		 * @description: 删除文件
		 * @param {*} file
		 * @param {*} index
		 * @return {*}
		 * @author: Junchi Zhao
		 */
		deleteFile(file, index) {
			this.fileList.splice(index, 1);
		},
		/**
		 * @description: 判断是否图片
		 * @param {*} fileName
		 * @return {*}
		 * @author: Junchi Zhao
		 */
		isPicture(fileName) {
			if (!fileName) {
				return false;
			} else {
				return /\.(bmp|jpg|jpeg|png|GIF|BMP|JPG|PNG)$/.test(fileName);
			}
		},
		/**
		 * @description: 文件大小转换
		 * @param {*} bytes
		 * @return {*}
		 * @author: Junchi Zhao
		 */
		bytesToSize(bytes) {
			if (bytes === 0) return '0 B';
			var k = 1000, // or 1024
				sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
				i = Math.floor(Math.log(bytes) / Math.log(k));

			return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
		},
	},
};
</script>
<style lang="scss" scoped>
.jh-big-file-upload {
	padding: 10px;
}
</style>
