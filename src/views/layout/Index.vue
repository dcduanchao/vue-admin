<template>
  <div>
    <!-- <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple-dark">
          <left-sider></left-sider>
        </div>
      </el-col>
    
      <el-col :span="22">
        <div class="grid-content bg-purple-light">
            <router-view     class="menu-right"/>
          <right-sider></right-sider>
        </div>
      </el-col>
    </el-row> -->

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
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  height: 100vh;
  border-radius: 4px;
}
.bg-purple-dark {
  background: #04294b;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #fefeff;
}
.grid-content {
  border-radius: 4px;
  min-height: 100vmin;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  // position: absolute;
}

.el-aside {
  background-color: #04294b;
  color: #333;
  text-align: center;
  height: 100vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: 100vh;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>