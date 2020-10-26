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
        <el-button type="primary" icon="el-icon-plus" class="el-main-new" @click="dialogVisible = true">新增</el-button>
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

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
          <span>这是一段信息</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>

      </el-main>

    </el-container>
  </div>
</template>

<script>
import { getMenuList } from 'network/roleMenu';
import { Message, MessageBox } from 'element-ui';

export default {
  name: 'Index',
  data() {
    return {
      menuName: '',
      tableData: [],
      dialogVisible: false
    };
  },

  created() {
    this.menuList();
  },
  methods: {
    menuList() {
      getMenuList(this.menuName).then(res => {
        this.tableData = res.data;
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