<!--
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 
-->
<template>
  <div class="p20">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="默认模式" name="default"> </el-tab-pane>
      <el-tab-pane label="自动上传" name="auto"> </el-tab-pane>
      <el-tab-pane label="单文件上传" name="single"> </el-tab-pane>
      <el-tab-pane label="多文件上传" name="mutiple"> </el-tab-pane>
      <el-tab-pane label="开发调试使用" name="dev"> </el-tab-pane>
    </el-tabs>
    <div v-if="activeName === 'default' && config0">
      <jh-uploader
        :key="'default'"
        ref="config0"
        :config="config0"
      ></jh-uploader>
      <div class="markdown-body">
        <h3>组件代码</h3>
        <pre><code>&lt;jh-uploader :key="'default'" ref="config0" :config="config0"&gt;&lt;/jh-uploader&gt;
                </code></pre>
        <h3>获取已上传文件</h3>
        <pre><code>this.$refs.config0.uploader.result
                </code></pre>
        <h3>配置项</h3>
        <pre><code>this.config0 = {
                            url: "http://192.168.70.174:7404",//文件上传路径
                            previewUrl: "http://192.168.70.174:7404",//文件预览路径
                            data: [],//回显数组
                    }
                </code></pre>
      </div>
    </div>
    <div v-if="activeName === 'auto' && config1">
      <jh-uploader :key="'auto'" ref="config1" :config="config1"></jh-uploader>
      <div class="markdown-body">
        <h3>组件代码</h3>
        <pre><code>&lt;jh-uploader :key="'auto'" ref="config1" :config="config1"&gt;&lt;/jh-uploader&gt;
                </code></pre>
        <h3>获取已上传文件</h3>
        <pre><code>this.$refs.config1.uploader.result
                </code></pre>
        <h3>配置项</h3>
        <pre><code>this.config1 = {
                            autoUpload:true,
                            url: "http://192.168.70.174:7404",//文件上传路径
                            previewUrl: "http://192.168.70.174:7404",//文件预览路径
                            data: [],//回显数组
                    }
                </code></pre>
      </div>
    </div>
    <div v-if="activeName === 'single' && config2">
      <jh-uploader
        :key="'single'"
        ref="config2"
        :config="config2"
      ></jh-uploader>
      <div class="markdown-body">
        <h3>组件代码</h3>
        <pre><code>&lt;jh-uploader :key="'single'" ref="config2" :config="config2"&gt;&lt;/jh-uploader&gt;
                </code></pre>
        <h3>获取已上传文件</h3>
        <pre><code>this.$refs.config2.uploader.result
                </code></pre>
        <h3>配置项</h3>
        <pre><code>this.config2 = {
            url: "http://192.168.70.174:7404",//文件上传路径
            previewUrl: "http://192.168.70.174:7404",//文件预览路径
            autoUpload: true, //自动上传 默认手动上传
            singleFile: true, //单文件上传 默认多文件上传
            limit: 3, //文件限制数量 不设置默认为10
            //文件分块上传最小值 不传 默认2MB
            fileSplitSize: 1024 * 1024 *2, 
            params: {
                "Auth-User-Token": "8B7AA4022B6C477C93A2DD388EE58AD7",
            },//上传时携带参数(参数是在头部)
            data: [
                {
                    "aliases":"测量工具.txt",
                    "contentType":"",
                    "fileBak1":"",
                    "fileBak2":"",
                    "fileHash":"4352b37e9a1cb5872832d538c91cd9ec",
                    "fileId":"619dd60ef521602e84ae95c4",
                    "fileName":"测量工具",
                    "filePath":"",
                    "fileSize":"3226",
                    "fileType":"txt",
                    "id":"619dd60ef521602e84ae95c4"
                },
                {
                    "aliases":"微信图片_20210910102858.jpg",
                    "contentType":"",
                    "fileBak1":"",
                    "fileBak2":"",
                    "fileHash":"5c1b9588c7e880b8eee2f2b19875a62a",
                    "fileId":"619c9c4cf521602e84ae9582",
                    "fileName":"微信图片_20210910102858",
                    "filePath":"",
                    "fileSize":"13962",
                    "fileType":"jpg",
                    "id":"619c9c4cf521602e84ae9582"
                }
            ], //回显数组
            on: {
                /**
                 * @description: 文件超过限制
                 * @param {*}
                 * @return {*}
                 */
                limitNotice: () => {
                    this.$message.warning("文件超过限制");
                },
                /**
                 * @description: 上传前钩子 返回true开始上传否则不上传
                 * @param {*}
                 * @return {*}
                 */
                before: () => {
                    console.log("上传前");
                    return true;
                },
                /**
                 * @description: 
                 * @param {*} uploadedFiles 上传成功文件
                 * @return {*}
                 */
                complete: (uploadedFiles) => {
                    console.log(uploadedFiles);
                    console.log("上传结束");
                },
                /**
                 * @description: 
                 * @param {*} currentFile 当前删除文件
                 * @param {*} noUploadFiles 未上传文件
                 * @param {*} uploadedFiles 已上传文件
                 * @return {*}
                 */
                remove: (currentFile,noUploadFiles,uploadedFiles) => {
                    console.log("________");
                    console.log(currentFile);
                    console.log(noUploadFiles);
                    console.log(uploadedFiles);
                    console.log("删除文件");
                },
                /**
                 * @description: 
                 * @param {*} currentFile 上传出问题的文件
                 * @param {*} noUploadFiles 未上传文件
                 * @param {*} uploadedFiles 已上传文件
                 * @return {*}
                 */
                error: (currentFile,noUploadFiles,uploadedFiles) => {
                    console.log(e);
                }
            },
        }
                </code></pre>
      </div>
    </div>
    <div v-if="activeName === 'mutiple' && config3">
      <jh-uploader
        :key="'mutiple'"
        ref="config3"
        :config="config3"
      ></jh-uploader>
      <div class="markdown-body">
        <h3>组件代码</h3>
        <pre><code>&lt;jh-uploader :key="'mutiple'" ref="config3" :config="config3"&gt;&lt;/jh-uploader&gt;
                </code></pre>
        <h3>获取已上传文件</h3>
        <pre><code>this.$refs.config3.uploader.result
                </code></pre>
        <h3>配置项</h3>
        <pre><code>this.config3 = {
            url: "http://192.168.70.174:7404",//文件上传路径
            previewUrl: "http://192.168.70.174:7404",//文件预览路径
            limit: 3, //文件限制数量 不设置默认为10
            //文件分块上传最小值 不传 默认2MB
            fileSplitSize: 1024 * 1024 *2, 
            params: {
                "Auth-User-Token": "8B7AA4022B6C477C93A2DD388EE58AD7",
            },//上传时携带参数(参数是在头部)
            data: [
                {
                    "aliases":"测量工具.txt",
                    "contentType":"",
                    "fileBak1":"",
                    "fileBak2":"",
                    "fileHash":"4352b37e9a1cb5872832d538c91cd9ec",
                    "fileId":"619dd60ef521602e84ae95c4",
                    "fileName":"测量工具",
                    "filePath":"",
                    "fileSize":"3226",
                    "fileType":"txt",
                    "id":"619dd60ef521602e84ae95c4"
                },
                {
                    "aliases":"微信图片_20210910102858.jpg",
                    "contentType":"",
                    "fileBak1":"",
                    "fileBak2":"",
                    "fileHash":"5c1b9588c7e880b8eee2f2b19875a62a",
                    "fileId":"619c9c4cf521602e84ae9582",
                    "fileName":"微信图片_20210910102858",
                    "filePath":"",
                    "fileSize":"13962",
                    "fileType":"jpg",
                    "id":"619c9c4cf521602e84ae9582"
                }
            ], //回显数组
            on: {
                /**
                 * @description: 文件超过限制
                 * @param {*}
                 * @return {*}
                 */
                limitNotice: () => {
                    this.$message.warning("文件超过限制");
                },
                /**
                 * @description: 上传前钩子 返回true开始上传否则不上传
                 * @param {*}
                 * @return {*}
                 */
                before: () => {
                    console.log("上传前");
                    return true;
                },
                /**
                 * @description: 
                 * @param {*} uploadedFiles 上传成功文件
                 * @return {*}
                 */
                complete: (uploadedFiles) => {
                    console.log(uploadedFiles);
                    console.log("上传结束");
                },
                /**
                 * @description: 
                 * @param {*} currentFile 当前删除文件
                 * @param {*} noUploadFiles 未上传文件
                 * @param {*} uploadedFiles 已上传文件
                 * @return {*}
                 */
                remove: (currentFile,noUploadFiles,uploadedFiles) => {
                    console.log("________");
                    console.log(currentFile);
                    console.log(noUploadFiles);
                    console.log(uploadedFiles);
                    console.log("删除文件");
                },
                /**
                 * @description: 
                 * @param {*} currentFile 上传出问题的文件
                 * @param {*} noUploadFiles 未上传文件
                 * @param {*} uploadedFiles 已上传文件
                 * @return {*}
                 */
                error: (currentFile,noUploadFiles,uploadedFiles) => {
                    console.log(e);
                }
            },
        }
            </code></pre>
      </div>
    </div>
    <div v-if="activeName === 'dev'">
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="上传url">
            <el-input v-model="form.uploadUrl"></el-input>
        </el-form-item>
        <el-form-item label="预览url">
            <el-input v-model="form.previewUrl"></el-input>
        </el-form-item>
        <el-form-item label="token">
            <el-input v-model="form.token"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">设置</el-button>
            <div>点击预览的时候控制台会打印文件路径</div>
        </el-form-item>
      </el-form>
      <jh-uploader
        v-if="config4"
        :key="'dev'"
        ref="config4"
        :config="config4"
      ></jh-uploader>
    </div>
  </div>
</template>

<script>
export default {
  name: 'uploaderDemo',
  components: {},

  data() {
    return {
      activeName: 'default',
      config0: null,
      config1: null,
      config2: null,
      config3: null,
      config4: null,
      config5: null,
      form: {
        uploadUrl: 'http://192.168.70.174:7404',
        previewUrl: 'http://192.168.70.174:7404',
        token: sessionStorage.getItem('token'),
      },
    }
  },

  created() {
    let that = this
    this.config0 = {
      url: 'http://192.168.70.174:7404', //文件上传路径
      previewUrl: 'http://192.168.70.174:7404', //文件预览路径
      data: [], //回显数组
    }
    this.config1 = {
      autoUpload: true,
      url: 'http://192.168.70.174:7404', //文件上传路径
      previewUrl: 'http://192.168.70.174:7404', //文件预览路径
      data: [], //回显数组
    }
    this.config2 = {
      url: 'http://192.168.70.174:7404', //文件上传路径
      previewUrl: 'http://192.168.70.174:7404', //文件预览路径
      singleFile: true,
      params: {
        'Auth-User-Token': '8B7AA4022B6C477C93A2DD388EE58AD7',
      }, //上传时携带参数(参数是在头部)
      data: [
        {
          aliases: '微信图片_20210910102858.jpg',
          contentType: '',
          fileBak1: '',
          fileBak2: '',
          fileHash: '5c1b9588c7e880b8eee2f2b19875a62a',
          fileId: '619c9c4cf521602e84ae9582',
          fileName: '微信图片_20210910102858',
          filePath: '',
          fileSize: '13962',
          fileType: 'jpg',
          id: '619c9c4cf521602e84ae9582',
        },
        {
          aliases: '画线.txt',
          contentType: '',
          fileBak1: '',
          fileBak2: '',
          fileHash: 'aa2c06bbcaf6e625a4b218934cef545e',
          fileId: '619f2af6f521602e84ae95cc',
          fileName: '画线',
          filePath: '',
          fileSize: '3770',
          fileType: 'txt',
          id: '619f2af6f521602e84ae95cc',
        },
      ], //回显数组
      uploadBtn: 'upload', //元素id
      fileView: 'fileView', //元素id
      on: {
        /**
         * @description: 文件超过限制
         * @param {*}
         * @return {*}
         * @author: Junchi Zhao
         */
        limitNotice: function() {
          that.$message.warning('文件超过限制')
        },
        /**
         * @description: 上传前钩子 返回true开始上传否则不上传
         * @param {*}
         * @return {*}
         * @author: Junchi Zhao
         */
        before: function() {
          console.log('上传前')
          return true
        },
        /**
         * @description:
         * @param {*} uploadedFiles 上传成功文件
         * @return {*}
         * @author: Junchi Zhao
         */
        complete: function(uploadedFiles) {
          console.log(uploadedFiles)
          console.log('上传结束')
        },
        /**
         * @description:
         * @param {*} currentFile 当前删除文件
         * @param {*} noUploadFiles 未上传文件
         * @param {*} uploadedFiles 已上传文件
         * @return {*}
         * @author: Junchi Zhao
         */
        remove: function(currentFile, noUploadFiles, uploadedFiles) {
          console.log('________')
          console.log(currentFile)
          console.log(noUploadFiles)
          console.log(uploadedFiles)
          console.log('删除文件')
        },
        /**
         * @description:
         * @param {*} currentFile 上传出问题的文件
         * @param {*} noUploadFiles 未上传文件
         * @param {*} uploadedFiles 已上传文件
         * @return {*}
         * @author: Junchi Zhao
         */
        error: function(currentFile, noUploadFiles, uploadedFiles) {
          console.log(e)
        },
      },
    }
    this.config3 = {
      url: 'http://192.168.70.174:7404', //文件上传路径
      previewUrl: 'http://192.168.70.174:7404', //文件预览路径
      params: {
        'Auth-User-Token': '8B7AA4022B6C477C93A2DD388EE58AD7',
      }, //上传时携带参数(参数是在头部)
      data: [
        {
          aliases: '测量工具.txt',
          contentType: '',
          fileBak1: '',
          fileBak2: '',
          fileHash: '4352b37e9a1cb5872832d538c91cd9ec',
          fileId: '619dd60ef521602e84ae95c4',
          fileName: '测量工具',
          filePath: '',
          fileSize: '3226',
          fileType: 'txt',
          id: '619dd60ef521602e84ae95c4',
        },
        {
          aliases: '微信图片_20210910102858.jpg',
          contentType: '',
          fileBak1: '',
          fileBak2: '',
          fileHash: '5c1b9588c7e880b8eee2f2b19875a62a',
          fileId: '619c9c4cf521602e84ae9582',
          fileName: '微信图片_20210910102858',
          filePath: '',
          fileSize: '13962',
          fileType: 'jpg',
          id: '619c9c4cf521602e84ae9582',
        },
      ], //回显数组
      uploadBtn: 'upload', //元素id
      fileView: 'fileView', //元素id
      on: {
        /**
         * @description: 文件超过限制
         * @param {*}
         * @return {*}
         * @author: Junchi Zhao
         */
        limitNotice: () => {
          this.$message.warning('文件超过限制')
        },
        /**
         * @description: 上传前钩子 返回true开始上传否则不上传
         * @param {*}
         * @return {*}
         * @author: Junchi Zhao
         */
        before: () => {
          console.log('上传前')
          return true
        },
        /**
         * @description:
         * @param {*} uploadedFiles 上传成功文件
         * @return {*}
         * @author: Junchi Zhao
         */
        complete: (uploadedFiles) => {
          console.log(uploadedFiles)
          console.log('上传结束')
        },
        /**
         * @description:
         * @param {*} currentFile 当前删除文件
         * @param {*} noUploadFiles 未上传文件
         * @param {*} uploadedFiles 已上传文件
         * @return {*}
         * @author: Junchi Zhao
         */
        remove: (currentFile, noUploadFiles, uploadedFiles) => {
          console.log('________')
          console.log(currentFile)
          console.log(noUploadFiles)
          console.log(uploadedFiles)
          console.log('删除文件')
        },
        /**
         * @description:
         * @param {*} currentFile 上传出问题的文件
         * @param {*} noUploadFiles 未上传文件
         * @param {*} uploadedFiles 已上传文件
         * @return {*}
         * @author: Junchi Zhao
         */
        error: (currentFile, noUploadFiles, uploadedFiles) => {
          console.log(e)
        },
      },
    }
    this.config4 = {
      url: this.form.uploadUrl, //文件上传路径
      previewUrl: this.form.previewUrl, //文件预览路径
      params: {
        'Auth-User-Token': this.form.token,
      }, //上传时携带参数(参数是在头部)
      data: [], //回显数组
      on: {
        /**
         * @description: 文件超过限制
         * @param {*}
         * @return {*}
         * @author: Junchi Zhao
         */
        limitNotice: () => {
          this.$message.warning('文件超过限制')
        },
        /**
         * @description: 上传前钩子 返回true开始上传否则不上传
         * @param {*}
         * @return {*}
         * @author: Junchi Zhao
         */
        before: () => {
          console.log('上传前')
          return true
        },
        /**
         * @description:
         * @param {*} uploadedFiles 上传成功文件
         * @return {*}
         * @author: Junchi Zhao
         */
        complete: (uploadedFiles) => {
          console.log(uploadedFiles)
          console.log('上传结束')
        },
        /**
         * @description:
         * @param {*} currentFile 当前删除文件
         * @param {*} noUploadFiles 未上传文件
         * @param {*} uploadedFiles 已上传文件
         * @return {*}
         * @author: Junchi Zhao
         */
        remove: (currentFile, noUploadFiles, uploadedFiles) => {
          console.log('________')
          console.log(currentFile)
          console.log(noUploadFiles)
          console.log(uploadedFiles)
          console.log('删除文件')
        },
        /**
         * @description:
         * @param {*} currentFile 上传出问题的文件
         * @param {*} noUploadFiles 未上传文件
         * @param {*} uploadedFiles 已上传文件
         * @return {*}
         * @author: Junchi Zhao
         */
        error: (currentFile, noUploadFiles, uploadedFiles) => {
          console.log(e)
        },
      },
    }
  },

  methods: {
    onSubmit() {
      this.config4 = null
      setTimeout(() => {
        this.config4 = {
          url: this.form.uploadUrl, //文件上传路径
          previewUrl: this.form.previewUrl, //文件预览路径
          params: {
            'Auth-User-Token': this.form.token,
          }, //上传时携带参数(参数是在头部)
          data: [],
        }
      }, 1000)
    },
  },
}
</script>
<style lang="scss" scoped>
code {
  font-size: 12px;
  padding: 15px 12px;
  margin: 0;
  word-break: normal;
  display: block;
  overflow-x: auto;
  color: #333;
  background: #f8f8f8;
}
.markdown-body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
}
.markdown-body pre {
  overflow: auto;
  position: relative;
  line-height: 1.75;
}
</style>
