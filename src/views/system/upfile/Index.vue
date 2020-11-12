<template>
  <div>

    <el-button type="primary" icon="el-icon-plus" class="el-main-new" @click="uploadFile">上传文件</el-button>
    <template>
      <el-table :data="fileList" border style="width: 100%">
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="fileObjectName" label="文件存储名">
        </el-table-column>
        <el-table-column prop="url" label="链接">
        </el-table-column>
        <el-table-column prop="authType" label="访问权限">
          <template slot-scope="scope">
            {{ scope.row.authType==0?"共有":'私有' }}
          </template>
        </el-table-column>
        <el-table-column prop="bucketName" label="存储桶">
        </el-table-column>

        <el-table-column prop="fileType" label="文件类型">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button size="mini" type="primary" @click="downloadFile(scope.$index, scope.row)">下载</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-dialog title="上传文件" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item prop="name" label="文件名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" width='180px' style="width:180px"></el-input>
        </el-form-item>
        <el-form-item prop="authType" label="文件类型" :label-width="formLabelWidth">
          <el-radio-group v-model="form.authType">
            <el-radio :label="0">公有</el-radio>
            <el-radio :label="1">私有</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传" :label-width="formLabelWidth" prop="file">
          <el-upload class="upload-demo" ref="upload" :data="form" :multiple="false" action="" :auto-upload="false" :http-request="upFile">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFile">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import fileDownload from 'js-file-download';
import { Message, MessageBox } from 'element-ui';
import {
  getMinioFileList,
  uploadMinioFile,
  deleteFile,
  downloadFile,
} from 'network/file';
export default {
  name: 'Index',
  created() {
    this.getAllFile();
  },
  data() {
    return {
      fileList: [],
      dialogFormVisible: false,
      formLabelWidth: '100px',
      form: {
        name: '',
        authType: 0,
      },
    };
  },
  methods: {
    getAllFile() {
      getMinioFileList().then((res) => {
        let data = res.data;
        this.fileList = data;
      });
    },

    uploadFile() {
      this.dialogFormVisible = true;
    },

    addFile() {
      this.$refs.upload.submit();
    },

    upFile(params) {
      var file = params.file;
      var name = params.data.name;
      var type = params.data.authType;
      var fromData = new FormData();
      fromData.append('file', file);
      fromData.append('name', name);
      fromData.append('authType', type);
      uploadMinioFile(fromData).then((res) => {
        let code = res.code;
        if (code == 200) {
          Message.success({
            message: '保存成功！',
          });
        }
        this.dialogFormVisible = false;
        this.$refs.form.resetFields();
        this.$refs.upload.clearFiles();
        this.getAllFile();
      });
    },
    handleDelete(index, data) {
      MessageBox.confirm('你确定删除吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let id = data.id;
        deleteFile(id).then((res) => {
          let code = res.code;
          if (code == 200) {
            Message.success({
              message: '删除成功',
            });
            this.getAllFile();
          } else {
            Message.success({
              message: '删除失败',
            });
          }
        });
      });
    },
    downloadFile(index, data) {
      let id = data.id;
      downloadFile(id).then((res) => {
        // let blob = new Blob([res], { type: 'image/jpeg' }); // res就是接口返回的文件流了
        // let objectUrl = URL.createObjectURL(blob);
        // window.location.href = objectUrl;
        let temp = res.headers['content-disposition']
          .split(';')[1]
          .split('filename=')[1];
        console.log(temp);
        //对文件名乱码转义--【Node.js】使用iconv-lite解决中文乱码
        let iconv = require('iconv-lite');
        iconv.skipDecodeWarning = true; //忽略警告
        let fileName = iconv.decode(temp, 'utf-8');
        fileDownload(res.data, fileName);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>