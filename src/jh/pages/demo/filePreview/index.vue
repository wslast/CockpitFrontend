<!-- 文件预览 -->
<template>
  <div class="p10">
    <div class="f24">
      <div>默认上传地址是env.js中的uploadURL</div>
      <div>默认预览地址是env.js中的previewURL</div>
      <el-button @click="test">测试直接上传按钮</el-button>
      <el-button @click="test1">测试大文件分块上传按钮</el-button>
    </div>
    <div class="f24">直接上传</div>
    <jh-file-upload
      v-model="fileList"
      @onSuccess="onSuccess"
      ref="uploadFile"
    ></jh-file-upload>
    <div class="f24">大文件分块上传</div>
    <jh-big-file-upload
      ref="uploadBigFile"
      :splitSize="3 * 1024 * 1024"
      :limit="5"
    ></jh-big-file-upload>
    <div class="f24 mb10 mt10">文件预览</div>
    <el-button @click="previewFile">多文件预览(包含多张图片)</el-button>
    <el-button @click="previewFile1">单文件预览</el-button>
  </div>
</template>

<script>
export default {
  name: "filePreview",
  components: {},
  data() {
    return {
      config: null,
      fileList: [
        //回显数据格式
        {
          name: "1.jpg",
          fileId: 123,
          size: 100
        }
      ],
      srcList: []
    };
  },
  created() {},
  methods: {
    onSuccess(e) {
      console.log(e);
    },
    previewFile1() {
      let arr = [
        {
          aliases: "bg-area-4.png",
          fileHash: "b2b3fb35bd8e1d35afb7190b5fcb8bff",
          fileId: "b2b3fb35bd8e1d35afb7190b5fcb8bff",
          fileName: "bg-area-4",
          fileSize: "3226",
          fileType: "png",
          id: "b2b3fb35bd8e1d35afb7190b5fcb8bff"
        }
      ];
      let previewFiles = arr.map(item => {
        let file = {
          label: item.aliases,
          id: item.id,
          url:
            this.getGlobalConfig().uploadURL +
            "/api/file/downloadFile" +
            "?fullfilename=" +
            item.aliases +
            "&fileHashOrWholeFileId=" +
            item.fileId +
            "&qualityType=70"
        };
        return file;
      });
      window.sessionStorage.previewFileData = JSON.stringify(previewFiles[0]);
      //左侧配置项 同elementUI tree组件
      window.sessionStorage.defaultProps = JSON.stringify({
        children: "children",
        label: "label"
      });
      //当前高亮的文件
      window.sessionStorage.currentFile = "";
      //打开预览窗口
      window.open(window.location.origin + "/#/previewFile", 800, 600);
    },
    previewFile() {
      let arr = [
        {
          aliases: "bg-a?&rea-4.png",
          fileHash: "b2b3fb35bd8e1d35afb7190b5fcb8bff",
          fileId: "b2b3fb35bd8e1d35afb7190b5fcb8bff",
          fileName: "bg-area-4",
          fileSize: "3226",
          fileType: "png",
          id: "b2b3fb35bd8e1d35afb7190b5fcb8bff"
        },
        {
          aliases: "16505102392352?&022.01.13-前端培训.pptx",
          fileHash: "48e7d6216a7f0903849db4531819261b",
          fileId: "6253c33084bd9d712c9a13ce",
          fileName: "16505102392352022.01.13-前端培训",
          fileSize: "3226",
          fileType: "pptx",
          id: "6253c33084bd9d712c9a13ce"
        },
        {
          aliases: "snipaste.rar",
          fileHash: "48e7d6216a7f0903849db4531819261b",
          fileId: "6260fadd107b9d3dae51c0e7",
          fileName: "snipaste",
          fileSize: "3226",
          fileType: "rar",
          id: "6260fadd107b9d3dae51c0e7"
        },
        {
          aliases: "wallevn.jpg",
          fileHash: "b2b3fb35bd8e1d35afb7190b5fcb8bff",
          fileId: "6260f0a6107b9d3dae51c0dc",
          fileName: "wallevn",
          fileSize: "3226",
          fileType: "jpg",
          id: "6260f0a6107b9d3dae51c0dc"
        },
        {
          aliases: "wallevn1.jpg",
          fileHash: "0dc79ff12a728f797e43ccec999c8085",
          fileId: "6260ef7e107b9d3dae51c0d2",
          fileName: "wallevn1",
          fileSize: "1320093",
          fileType: "jpg",
          id: "6260ef7e107b9d3dae51c0d2"
        }
      ];
      let previewFiles = arr.map(item => {
        let file = {
          label: item.fileName,
          id: item.id,
          url:
            this.getGlobalConfig().uploadURL +
            "/api/file/downloadFile" +
            "?fullfilename=" +
            item.aliases +
            "&fileHashOrWholeFileId=" +
            item.fileId
        };
        //判断图片是否需要预览原图 如果预览原图不需要传qualityType以及compressType
        if (
          this.getGlobalConfig().uploadConfig &&
          this.getGlobalConfig().uploadConfig.qualityType
        ) {
          //默认取最低质量 可根据需要调整
          file.url +=
            "&qualityType=" +
            this.getGlobalConfig().uploadConfig.qualityType.split(",")[0];
        }
        if (
          this.getGlobalConfig().uploadConfig &&
          this.getGlobalConfig().uploadConfig.compressType
        ) {
          file.url +=
            "&qualityType=" + this.getGlobalConfig().uploadConfig.compressType;
        }
        return file;
      });
      console.log(previewFiles);
      window.sessionStorage.previewFileData = JSON.stringify(previewFiles);
      //左侧配置项 同elementUI tree组件
      window.sessionStorage.defaultProps = JSON.stringify({
        children: "children",
        label: "label"
      });
      //当前高亮的文件
      window.sessionStorage.currentFile = arr[4].id;
      //打开预览窗口
      window.open(
        window.location.origin +
          "/#/previewFile?timestamp=" +
          new Date().getTime()
      );
    },
    test() {
      console.log("上传文件列表", this.fileList);
      console.log("是否上传完毕", this.$refs.uploadFile.validUpload());
    },
    test1() {
      console.log("上传文件列表", this.$refs.uploadBigFile.fileList);
      console.log("是否上传完毕", this.$refs.uploadBigFile.validUpload());
    }
  }
};
</script>
<style lang="scss" scoped></style>
