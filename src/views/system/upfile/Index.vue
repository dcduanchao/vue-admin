<template>
  <div>
    <!-- :http-request="upFile" -->
    <el-upload class="upload-demo" :action="url" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture" :http-request="upFile">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import { getImageList, uploadFile } from 'network/file';
export default {
  name: 'Index',
  created() {
    this.getAllImage();
  },
  data() {
    return {
      fileList: [],
      url: ''
      // url: 'http://49.232.1.162:9090/file/upload'
      // url: 'http://127.0.0.1:9090/file/upload'
    };
  },
  methods: {
    getAllImage() {
      getImageList().then(res => {
        let data = res.data;
        this.fileList = data;
      });
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    upFile(params) {
      console.log(1111);
      var file = params.file;
      var fromData = new FormData();
      fromData.append('file', file);
      uploadFile(fromData).then(res => {
        console.log(res.data);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>