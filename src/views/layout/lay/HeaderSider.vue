<template>
  <div class="harder-sider">

    <div>
      <img src="~assets/images/icon-header.jpg">
      <span>后台管理系统</span>
    </div>
    <el-button type="info" @click="removeToken">退出</el-button>
  </div>
</template>

<script>
import { Notification, MessageBox } from 'element-ui';
import { removeToken } from 'network/cookies';
export default {
  name: 'HeaderSider',
  methods: {
    removeToken() {
      MessageBox.confirm('你确定退出登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeToken();
        this.$router.push('/login');
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.harder-sider {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span{
      margin-left: 15px;
    }
    img{
       height: 50px;
       width: 50px;
       border-radius: 50%;
    }
  }
  
  
}
</style>