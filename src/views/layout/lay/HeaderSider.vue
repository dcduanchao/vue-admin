<template>
  <div>
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
      removeToken();
      console.log('1111');
      this.$router.push('/login');
      // this.$router.push('/login');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>