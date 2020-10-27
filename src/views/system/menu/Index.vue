<template>
  <div class="menu_list">
    <el-container>
      <el-header style="height:80px; border: 3px solid #EEEEEE;">
        <div>
          <el-input v-model="menuName" placeholder="菜单名称"></el-input>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
      </el-header>
      <el-main>
        <el-button type="primary" icon="el-icon-plus" class="el-main-new" @click="showFrom">新增</el-button>
        <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border :tree-props="{children: 'children'}">
          <el-table-column prop="name" label="菜单名称" width="180">
          </el-table-column>
          <el-table-column prop="icon" label="图标" width="180">
          </el-table-column>
          <el-table-column prop="sort" label="排序">
          </el-table-column>
          <el-table-column prop="path" label="路由">
          </el-table-column>
          <el-table-column prop="component" label="组件路径">
          </el-table-column>
          <el-table-column prop="permission" label="权限表示">
          </el-table-column>

          <el-table-column prop="hidden" label="可见">
            <template slot-scope="scope">
              {{ scope.row.hidden==0?"是":'否' }}
            </template>

          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
          <el-form ref="form" :model="menuFrom" :rules="menuFromRules">
            <el-form-item prop="type" label="菜单类型" :label-width="formLabelWidth">
              <template>
                <el-radio-group v-model="menuFrom.type">
                  <el-radio :label="1">目录</el-radio>
                  <el-radio :label="2">菜单</el-radio>
                  <el-radio :label="3">按钮</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
            <el-form-item prop="name" label="菜单名称" :label-width="formLabelWidth">
              <el-input v-model="menuFrom.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="icon" label="图标" :label-width="formLabelWidth">
              <el-input v-model="menuFrom.icon" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="sort" label="排序" :label-width="formLabelWidth">
              <el-input v-model="menuFrom.sort" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="path" label="路由" :label-width="formLabelWidth">
              <el-input v-model="menuFrom.path" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="component" label="组件路径" :label-width="formLabelWidth">
              <el-input v-model="menuFrom.component" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="permission" label="权限标识" :label-width="formLabelWidth">
              <el-input v-model="menuFrom.permission" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="hidden" label="可见" :label-width="formLabelWidth">
              <el-radio-group v-model="menuFrom.hidden">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item prop="pid" label="父级菜单" :label-width="formLabelWidth">

              <treeselect :options="treedata" v-model="menuFrom.pid" :searchable="false" :normalizer='normalizer' style="width:200px" />
            </el-form-item>

          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addMenu">确 定</el-button>
          </span>
        </el-dialog>

      </el-main>

    </el-container>
  </div>
</template>

<script>
import {
  getHomeList,
  getMenuList,
  saveMenu,
  deleteMenuById
} from 'network/roleMenu';
import { Message, MessageBox } from 'element-ui';

import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
  name: 'Index',
  components: {
    Treeselect
  },
  data() {
    return {
      menuName: '',
      tableData: [],
      dialogVisible: false,
      formLabelWidth: '80px',
      menuFrom: {
        id: undefined,
        type: 1,
        name: '',
        sort: 99,
        icon: '',
        path: '',
        hidden: 0,
        permission: '',
        pid: 0
      },

      treedata: [
        {
          id: 0,
          label: '顶级菜单',
          children: []
        }
      ],
      menuFromRules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }]
      }
    };
  },

  created() {
    this.menuList('');
    this.homeMenuList();
  },
  methods: {
    normalizer(node) {
      //去掉children=null的属性
      if (node.children == null || node.children == 'null') {
        delete node.children;
      }
    },

    showFrom() {
      this.dialogVisible = true;
      this.homeMenuList();
    },

    homeMenuList() {
      getHomeList().then(res => {
        let data = res.data;
        let downList = [];
        data.forEach(e => {
          downList.push({
            id: e.id,
            label: e.name,
            children: this.getChild(e.children)
          });
        });
        this.treedata[0].children = downList;
      });
    },

    getChild(child) {
      if (child == null || child.length < 1) return null;
      let childList = [];
      for (const ite of child) {
        childList.push({
          id: ite.id,
          label: ite.name,
          children: this.getChild(ite.children)
        });
      }
      return childList;
    },

    menuList(menuName) {
      getMenuList(menuName).then(res => {
        this.tableData = res.data;
      });
    },
    handleEdit(index, data) {
      this.dialogVisible = true;
      this.homeMenuList();
      this.menuFrom = data;
    },
    addMenu() {
      this.$refs.form.validate(valid => {
        if (!valid) return;
        saveMenu(this.menuFrom).then(res => {
          let code = res.code;
          if (code == 200) {
            this.menuList();
            Message.success({
              message: '保存成功！'
            });
            this.dialogVisible = false;
            this.$refs.form.resetFields();
          }
        });
      });
    },

    handleDelete(index, data) {
      MessageBox.confirm('你确定删除吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let id = data.id;
        deleteMenuById(id).then(res => {
          let code = res.code;
          if (code == 200) {
            Message.success({
              message: '删除成功'
            });
            this.menuList(this.menuName);
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