<template>
  <div class="left-sider">
    <div class="toggle-button" @click="toggleCollapse"> |||</div>
    <el-menu default-active="this.$router.path" router class="el-menu-vertical-demo" background-color="#04294b" text-color="#fff" active-text-color="#ffd04b" unique-opened :collapse="isCollapse" :collapse-transition="false">
      <!-- <el-submenu index="1">
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
      </el-submenu> -->
      <el-submenu v-for="item in menuList" :key="item.id" :index="item.id+''">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item v-for="sub in item.children" :key="sub.id" :index="sub.path+''">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{sub.name}}</span>
          </template>
        </el-menu-item>

      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
import { getHomeList } from 'network/roleMenu';

export default {
  name: 'LeftSider',
  data() {
    return {
      menuList: [],
      isCollapse: false
    };
  },
  created() {
    this.getMenu();
  },
  methods: {
    getMenu() {
      getHomeList().then(res => {
        this.menuList = res.data;
      });
    },

    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$emit('openWidthSize', this.isCollapse);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: 0px;
}

.toggle-button {
  background-color: #04294b;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
}
</style>