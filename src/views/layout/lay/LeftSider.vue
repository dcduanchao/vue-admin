<template>
  <div class="left-sider">
    <!-- <el-radio-group v-model="isCollapse" @click.native="onshow" style="margin-bottom: 20px;">
      <el-radio-button :label="isOpen">{{openName}}</el-radio-button>

    </el-radio-group> -->
    <!-- <el-button type="primary" v-model="isCollapse" @click="onshow" size="small">{{openName}}</el-button> -->
    <!-- <el-menu router default-active="this.$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :background-color="col" :text-color="textc" mode="vertical">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu> -->

    <el-menu :default-active="this.$route.path" router mode="horizontal" class="el-menu-vertical-demo" background-color="#04294B" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        <template slot="title">
          <i class="el-icon-s-platform"></i>
          <span> {{ item.navItem }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'LeftSider',
  data() {
    return {
      isCollapse: false,
      openName: '收起',
      col: '#04294B',
      textc: '#FFFFFF',
      navList: [
        { name: '/home', navItem: '服务大厅' },
        { name: '/about', navItem: '权限管理' },
        { name: '/components/User', navItem: '用户管理' },
        { name: '/components/Personnel', navItem: '人员数据' },
        { name: '/components/Alarm', navItem: '报警中心' }
      ]
    };
  },
  methods: {
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    onshow() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.openName = '展开';
      } else {
        this.openName = '收起';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
}
.el-submenu .el-menu-item {
  min-width: 150px;
}
</style>