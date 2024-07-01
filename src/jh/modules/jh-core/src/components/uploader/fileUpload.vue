<!--  -->
<template>
  <div class="jh-big-file-upload">
    <el-upload
      ref="upload"
      class="upload"
      v-bind="$attrs"
      :action="UPLOAD_URL"
      :headers="headers"
      :data="fileData"
      :on-change="onChange"
      :on-exceed="onExceed"
      :on-progress="onProgress"
      :on-success="onSuccess"
      :on-error="onError"
      :before-upload="beforeUpload"
      multiple
      :limit="limit"
      :show-file-list="false"
      :file-list="value"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <el-table :data="value" class="mt10">
      <el-table-column
        prop="name"
        :show-overflow-tooltip="false"
        label="文件名称"
        min-width="180"
      >
      </el-table-column>
      <el-table-column v-if="showSize" prop="size" label="文件大小" width="100">
        <template slot-scope="scope">
          <div>
            {{ bytesToSize(scope.row.size) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="false" label="进度" width="300">
        <template slot-scope="scope">
          <el-progress
            :percentage="
              scope.row.percentage ? scope.row.percentage.toFixed(0) * 1 : 0
            "
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
            v-if="scope.row.status === 'success'"
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
import _ from 'lodash'
export default {
  name: 'jh-file-upload',
  props: {
    headers: {
      type: Object,
      default: () => {
        return { 'Auth-User-Token': window.sessionStorage.token }
      },
    },
    limit: {
      type: Number,
      default: 10,
    },
    value: {
      type: Array,
      default: () => [],
    },
    uploadConfig: {
      type: Object,
      default: () => null,
    },
    showSize: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      UPLOAD_URL: '',
      fileTasks: {}, //上传队列
      fileData: {},
    }
  },
  computed: {
    defaultSetting() {
      return this.$store.state.settings.uploadConfig
    },
  },
  created() {
    this.UPLOAD_URL = this.getGlobalConfig().uploadURL + '/api/file/upload'
  },
  watch: {
    value: {
      handler: function (newV, oldV) {
        //回显时如果文件已经有fileId 补全组件内需要的字段
        if (
          newV &&
          newV.length > 0 &&
          !newV[0].id &&
          Object.keys(this.fileTasks).length === 0
        ) {
          let packList = newV.map((item) => {
            if (item.fileId) {
              !item.percentage && (item.percentage = 100)
              !item.id && (item.id = _.uniqueId())
            }
            return item
          })
          this.$emit('input', packList)
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    /**
     * @description: 进度条
     * @param {*} percentage
     * @return {*}
     * @author: Junchi Zhao
     */
    customColorMethod(percentage) {
      if (percentage <= 99) {
        return '#008DFF'
      } else {
        return '#67C23A'
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
      this.$message.warning(`当前限制选择 ${this.limit} 个文件`)
    },
    /**
     * @description: 获取文件
     * @param {*} file
     * @param {*} fileList
     * @return {*}
     * @author: Junchi Zhao
     */
    onChange(file, fileList) {
      if (file.status === 'ready') {
        this.value.push(file)
        if (!this.fileTasks[file.uid]) {
          this.fileTasks[file.uid] = true
        }
      }
    },
    /**
     * @description: 上传成功
     * @param {*} response
     * @param {*} file
     * @param {*} fileList
     * @return {*}
     * @author: Junchi Zhao
     */
    onSuccess(response, file, fileList) {
      file.percentage = 100
      if (response.retHead.code === '0000000') {
        _.assign(file, response.retBody)
      } else {
        file.percentage = 0
        file.status = 'fail'
        this.$message.error(file.name + '上传失败')
      }
      if (this.fileTasks[file.uid]) {
        _.unset(this.fileTasks, file.uid)
      }
      if (Object.keys(this.fileTasks).length === 0) {
        this.$emit('onSuccess', this.value)
      }
    },
    /**
     * @description: 上传失败
     * @param {*} err
     * @param {*} file
     * @param {*} fileList
     * @return {*}
     * @author: Junchi Zhao
     */
    onError(err, file, fileList) {
      this.$message.error(file.name + '上传失败')
      if (this.fileTasks[file.uid]) {
        _.unset(this.fileTasks, file.uid)
      }
    },
    beforeUpload(file) {
      this.fileData.aliases = file.name
      if (this.uploadConfig && Object.keys(this.uploadConfig).length > 0) {
        _.assign(this.fileData, this.uploadConfig)
      }
    },
    /**
     * @description: 校验文件是否上传完毕
     * @param {*}
     * @return {*}
     * @author: Junchi Zhao
     */
    validUpload() {
      if (Object.keys(this.fileTasks).length > 0) {
        return false
      } else {
        return true
      }
    },
    /**
     * @description: 进度
     * @param {*} event
     * @param {*} file
     * @param {*} fileList
     * @return {*}
     * @author: Junchi Zhao
     */
    onProgress(event, file, fileList) {
      if (event.percent > 99) {
        this.$nextTick(() => {
          file.percentage = 99
        })
      }
    },
    /**
     * @description: 文件预览
     * @param {*} file
     * @return {*}
     * @author: Junchi Zhao
     */
    previewFile(file) {
      let compressRate = ''
      let compressType = ''
      //取最低质量或默认
      if (this.defaultSetting) {
        compressRate =
          this.uploadConfig && this.uploadConfig.compressRate
            ? this.uploadConfig.compressRate.split(',')[0]
            : this.defaultSetting.compressRate.split(',')[0]
        compressType =
          this.uploadConfig && this.uploadConfig.compressType
            ? this.uploadConfig.compressType
            : this.defaultSetting.compressType
      }
      let previewFiles = this.value
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
          }
          if (compressRate && this.isPicture(item.name)) {
            file.url += '&qualityType=' + compressRate
          }
          if (compressType && this.isPicture(item.name)) {
            file.url += '&compressType=' + compressType
          }
          return file
        })
      window.sessionStorage.previewFileData = JSON.stringify(previewFiles)
      //左侧配置项 同elementUI tree组件
      window.sessionStorage.defaultProps = JSON.stringify({
        children: 'children',
        label: 'label',
      })
      //当前高亮的文件
      window.sessionStorage.currentFile = file.id
      window.open(
        window.location.origin +
          (window.location.pathname ? window.location.pathname : '') +
          '#/previewFile?timestamp=' +
          new Date().getTime()
      )
    },
    /**
     * @description: 删除文件
     * @param {*} file
     * @param {*} index
     * @return {*}
     * @author: Junchi Zhao
     */
    deleteFile(file, index) {
      if (this.fileTasks[file.uid]) {
        _.unset(this.fileTasks, file.uid)
        this.$refs.upload.abort(file)
      }
      this.value.splice(index, 1)
    },
    /**
     * @description: 判断是否图片
     * @param {*} fileName
     * @return {*}
     * @author: Junchi Zhao
     */
    isPicture(fileName) {
      if (!fileName) {
        return false
      } else {
        return /\.(bmp|jpg|jpeg|png|GIF|BMP|JPG|PNG)$/.test(fileName)
      }
    },
    /**
     * @description: 文件大小转换
     * @param {*} bytes
     * @return {*}
     * @author: Junchi Zhao
     */
    bytesToSize(bytes) {
      if (bytes === 0) return '0 B'
      var k = 1000, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k))

      return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
    },
  },
}
</script>
<style lang="scss" scoped>
.jh-big-file-upload {
  padding: 10px;
}
</style>
