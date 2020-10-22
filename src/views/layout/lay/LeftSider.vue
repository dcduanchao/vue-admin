<template>
  <div class="left-sider">

    <el-menu default-active="this.$router.path" router class="el-menu-vertical-demo" background-color="#04294b" text-color="#fff" active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/system/role">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>角色管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/system/menu">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>菜单管理</span>
          </template>
        </el-menu-item>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
import { getMenuList } from 'network/login';

export default {
  name: 'LeftSider',
  data() {
    return {};
  },
  created() {
    // this.getMenu();
  },
  methods: {
    getMenu() {
      getMenuList().then(res => {
        let menu = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>