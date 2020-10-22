<template>
  <div>

    <el-container>
      <el-header>
        <header-sider></header-sider>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <left-sider></left-sider>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
import HeaderSider from './lay/HeaderSider';
import LeftSider from './lay/LeftSider';
import RightSider from './lay/RightSider';
export default {
  name: 'Index',
  components: {
    HeaderSider,
    LeftSider,
    RightSider
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #04294b;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}

// .el-container:nth-child(5) .el-aside,
// .el-container:nth-child(6) .el-aside {
//   line-height: 260px;
// }

// .el-container:nth-child(7) .el-aside {
//   line-height: 320px;
// }
</style>