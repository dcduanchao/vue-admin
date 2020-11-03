<template>
  <div>
    <el-container>
      <el-header style="height:80px; border: 3px solid #EEEEEE;">
        <div>
          <el-input v-model="userName" placeholder="用户名"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="selectByName">搜索</el-button>
        </div>
      </el-header>
      <el-main>
        <div>
          <el-button type="primary" icon="el-icon-plus" class="el-main-new" @click="addUser">新增</el-button>
          <el-table ref="elTable" :data="userList" style="width: 100%" border highlight-current-row>
            <el-table-column type="index" width="180px" label="序号">
            </el-table-column>
            <el-table-column prop="userName" label="用户名">
            </el-table-column>
            <el-table-column prop="nickName" label="昵称">
            </el-table-column>
            <el-table-column prop="phone" label="手机号">
            </el-table-column>
            <el-table-column prop="sex" label="性别">
              <template slot-scope="scope">
                {{ scope.row.sex==null?"" :scope.row.sex==0? "女":'男'}}
              </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄">
            </el-table-column>
            <el-table-column prop="userStatus" label="状态">
              <template slot-scope="scope">
                {{scope.row.userStatus==0? "启用":'禁用'}}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="block">
            <!-- @size-change="handleSizeChange" @current-change="handleCurrentChange"  -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[3, 5, 10, 20]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.totalCount">
            </el-pagination>
          </div>

        </div>

        <!-- 新增 -->
        <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
          <el-form ref="form" :model="userFrom" :rules="userFromRules">
            <el-form-item prop="userName" label="用户名" :label-width="formLabelWidth">
              <el-input v-model="userFrom.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="nickName" label="昵称" :label-width="formLabelWidth">
              <el-input v-model="userFrom.nickName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="手机号" :label-width="formLabelWidth">
              <el-input v-model="userFrom.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="sex" label="性别" :label-width="formLabelWidth">
              <el-radio-group v-model="userFrom.sex">
                <el-radio :label="0">女</el-radio>
                <el-radio :label="1">男</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="age" label="年龄" :label-width="formLabelWidth">
              <el-input v-model="userFrom.age" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="userStatus" label="状态" :label-width="formLabelWidth">
              <el-radio-group v-model="userFrom.userStatus">
                <el-radio :label="0">启用</el-radio>
                <el-radio :label="1">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="roleIds" label="角色" :label-width="formLabelWidth">
              <template>
                <el-select v-model="userFrom.roleIds" multiple placeholder="请选择">
                  <el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </template>

            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveUser">确 定</el-button>
          </div>
        </el-dialog>

      </el-main>

    </el-container>
  </div>
</template>

<script>
import { userList, saveUser, deleteUserById } from 'network/user';
import { getRoleList } from 'network/roleMenu';

import { Message, MessageBox } from 'element-ui';

import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
  name: 'Index',
  mounted() {
    this.getUserList('', this.pageInfo);
    this.getRoleList();
  },
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '150px',
      userName: '',
      userList: [],
      userFrom: {
        id: undefined,
        userName: '123',
        nickName: '',
        phone: '',
        sex: 0,
        age: '',
        userStatus: '',
        roleIds: []
      },
      roleList: [],
      pageInfo: {
        pageSize: 5,
        page: 1,
        totalCount: 0
      },
      currentPage: 1,

      userFromRules: {
        userName: [{ required: true, message: '名称不能为空', trigger: 'blur' }]
      }
    };
  },
  methods: {
    getUserList(userName, pageInfo) {
      let select = { userName: userName, pageInfo: pageInfo };
      userList(select).then(res => {
        this.userList = res.data.list;
        this.pageInfo = res.data.pageInfo;
      });
    },

    getRoleList() {
      this.roleList = [];
      getRoleList('').then(res => {
        let data = res.data;
        for (const it of data) {
          this.roleList.push({ label: it.name, value: it.id });
        }
      });
    },
    selectByName() {
      this.getUserList(this.userName, this.pageInfo);
    },
    addUser() {
      this.dialogFormVisible = true;
    },

    handleEdit(index, data) {
      this.dialogFormVisible = true;
      // this.homeMenuList();
      this.userFrom = data;
    },

    saveUser() {
      saveUser(this.userFrom).then(res => {
        let code = res.code;
        if (code == 200) {
          this.getUserList('', this.pageInfo);
          Message.success({
            message: '保存成功！'
          });
          this.dialogFormVisible = false;
          this.$refs.form.resetFields();
        }
      });
    },

    handleDelete(index, data) {
      MessageBox.confirm('你确定删除吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let id = data.id;
        deleteUserById(id).then(res => {
          let code = res.code;
          if (code == 200) {
            Message.success({
              message: '删除成功'
            });
            this.getUserList(this.menuName, this.pageInfo);
          } else {
            Message.success({
              message: '删除失败'
            });
          }
        });
      });
    },

    handleSizeChange(pageSize) {
      let size = this.pageInfo.pageSize;
      if (pageSize == size) return;
      this.pageInfo.pageSize = pageSize;
      this.pageInfo.page = 1;
      this.getUserList(this.userName, this.pageInfo);
    },
    handleCurrentChange(page) {
      this.pageInfo.page = page;
      this.getUserList(this.userName, this.pageInfo);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
  background-color: #fff;
  .el-input {
    width: 200px;
  }
}
.el-header {
  line-height: 80px;
  .el-input {
    width: 200px;
  }
  > div {
    display: flex;
    align-items: center;
  }
  .el-button {
    margin-left: 10px;
    align-items: center;
  }
}
</style>