<template>
  <div class="role_list">
    <el-container>
      <el-header style="height:80px; border: 3px solid #EEEEEE;">
        <div>
          <el-input v-model="roleName" placeholder="角色名称"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="selectByName">搜索</el-button>
        </div>
      </el-header>
      <el-main>
        <el-button type="primary" icon="el-icon-plus" class="el-main-new" @click="addRole">新增</el-button>
        <el-table :data="roleList" style="width: 60%" border>
          <el-table-column type="index" width="180" label="序号">
          </el-table-column>
          <!-- <el-table-column prop="id" label="id" width="180">
          </el-table-column> -->
          <el-table-column prop="name" label="名称" width="180">
          </el-table-column>
          <el-table-column prop="code" label="code">
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 新增 -->
        <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
          <el-form ref="form" :model="roleFrom" :rules="roleFromRules">
            <el-form-item prop="name" label="角色名称" :label-width="formLabelWidth">
              <el-input v-model="roleFrom.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="code" label="角色code" :label-width="formLabelWidth">
              <el-input v-model="roleFrom.code" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveRole">确 定</el-button>
          </div>
        </el-dialog>

      </el-main>

    </el-container>
  </div>
</template>

<script>
import { getRoleList, saveRole, deleteRoleById } from 'network/roleMenu';
import { Message, MessageBox } from 'element-ui';

export default {
  name: 'Index',
  data() {
    return {
      roleName: '',
      roleList: [],
      dialogFormVisible: false,
      formLabelWidth: '150px',

      roleFrom: {
        id: undefined,
        name: '',
        code: ''
      },

      roleFromRules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        code: [{ required: true, message: '角色code不能为空', trigger: 'blur' }]
      }
    };
  },

  created() {
    this.getRoleList(this.roleName);
  },
  methods: {
    selectByName() {
      // if (!this.roleName) return;
      this.getRoleList(this.roleName);
    },
    getRoleList(roleName) {
      getRoleList(roleName).then(res => {
        let data = res.data;
        this.roleList = data;
      });
    },
    addRole() {
      this.dialogFormVisible = true;
      this.roleFrom.name = '';
      this.roleFrom.code = '';
      this.roleFrom.id = undefined;
    },

    saveRole() {
      this.$refs.form.validate(valid => {
        if (!valid) return;
        saveRole(this.roleFrom).then(res => {
          let code = res.code;
          if (code == 200) {
            this.getRoleList();
            Message.success({
              message: '保存成功！'
            });
            this.dialogFormVisible = false;
          }
        });
      });
    },

    handleEdit(index, data) {
      this.dialogFormVisible = true;
      this.roleFrom.name = data.name;
      this.roleFrom.code = data.code;
      this.roleFrom.id = data.id;
    },

    handleDelete(index, data) {
      MessageBox.confirm('你确定删除吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let id = data.id;
        deleteRoleById(id).then(res => {
          let code = res.code;
          if (code == 200) {
            Message.success({
              message: '删除成功'
            });
            this.getRoleList(this.roleName);
          } else {
            Message.success({
              message: '删除失败'
            });
          }
        });
      });
    }
  }
};
</script>
<style  lang="scss" >
.role_list {
  .el-table td,
  .el-table th {
    text-align: center;
  }
}
.el-main-new {
  margin-bottom: 10px;
}
</style>

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