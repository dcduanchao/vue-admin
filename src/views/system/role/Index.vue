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

        <el-row :gutter="100" style="margin-left: 0; margin-right: 0;">
          <el-col :span="15" style="padding-right: 0px; padding-left: 0;">

            <div>
              <el-button type="primary" icon="el-icon-plus" class="el-main-new" @click="addRole">新增</el-button>
              <el-table ref="elTable" :data="roleList" style="width: 100%" border highlight-current-row @current-change="handleCurrentChange">
                <el-table-column type="index" width="180" label="序号">
                </el-table-column>
                <el-table-column prop="name" label="名称">
                </el-table-column>
                <el-table-column prop="code" label="code">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>

            </div>
          </el-col>
          <el-col :span="9" style="padding-left: 20px; padding-right: 0px; ">

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>菜单权限</span>
                <el-button type="primary" :disabled="!showButton" @click="saveMenu"> 保存</el-button>
              </div>
              <el-tree ref="menu" :data="treedata" :default-checked-keys="menuIds" :props="defaultProps" check-strictly accordion show-checkbox node-key="id" />
            </el-card>
          </el-col>
        </el-row>

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
import {
  getRoleList,
  saveRole,
  deleteRoleById,
  getMenuList,
  getRoleAllMenu,
  saveRoleMenu,
  roleMenuList
} from 'network/roleMenu';
import { Message, MessageBox } from 'element-ui';

import { getTreeList } from '@/utils/treeUtils.js';

import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
  name: 'Index',
  components: {
    Treeselect
  },
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
      },
      menuIds: [],
      treedata: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      roleMenuMap: {},
      currentCol: undefined,
      showButton: false
    };
  },

  created() {
    this.getRoleList(this.roleName);
    this.menuList();
    this.roleAllMenu();
  },
  methods: {
    normalizer(node) {
      if (node.children == null || node.children == 'null') {
        delete node.children;
      }
    },

    roleAllMenu() {
      getRoleAllMenu().then(res => {
        this.roleMenuMap = res.data;
      });
    },

    menuList() {
      getMenuList().then(res => {
        this.treedata = [];
        this.treedata = getTreeList(res.data);
      });
    },

    selectByName() {
      this.showButton = false;
      this.getRoleList(this.roleName);
      this.$refs.menu.setCheckedKeys([]);
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
            this.$refs.menu.setCheckedKeys([]);
          } else {
            Message.success({
              message: '删除失败'
            });
          }
        });
      });
    },
    handleCurrentChange(curr) {
      if (curr) {
        this.showButton = true;
        this.currentCol = curr.id;
        this.$refs.menu.setCheckedKeys([]);
        this.menuIds = [];
        let menuId = this.roleMenuMap[this.currentCol];
        if (menuId == undefined || menuId.length < 1) {
          this.menuIds = [];
        } else {
          this.menuIds = menuId;
          this.$refs.menu.setCheckedKeys(this.menuIds);
        }
      }
    },
    saveMenu() {
      let menuIds = this.$refs.menu.getCheckedKeys();
      let roleId = this.currentCol;
      let data = { roleId: roleId, menuIds: menuIds };
      saveRoleMenu(data).then(res => {
        let code = res.code;
        if (code == 200) {
          Message.success({
            message: '保存成功！'
          });
          roleMenuList(roleId).then(res => {
            let list = res.data;
            console.log(list);
            this.roleMenuMap[roleId] = list;
          });
        }
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
  margin: 0px 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

<style lang="scss" scoped>
.el-row-role {
  margin-left: 0px;
  margin-right: 0px;
}
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
.el-row {
  height: 100%;
}
.el-col {
  height: 100%;
  border: 2px solid #e6ebf5;
  border-radius: 4px;
}

.el-card {
  height: 100%;
}
.clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
}
</style>