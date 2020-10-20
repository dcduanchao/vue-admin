<template>
  <div class="login-container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
      </div>
      <el-form ref="form" :model="form" :rules="loginFromRules" label-width="0px"    class="login_from" >
        <el-form-item prop="userName" autocomplete="off">
          <!-- iconfont  阿里图标库 -->
          <el-input v-model="form.userName" placeholder="账户" prefix-icon="iconfont icon-icon-test"></el-input>
        </el-form-item>
        <el-form-item prop="pwd" autocomplete="off">
          <el-input type="password" v-model="form.pwd" placeholder="密码" prefix-icon="iconfont  icon-mima"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login('form')">登录</el-button>
          <el-button type="info" @click="resetFrom('form')">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import { login, regUser } from 'network/login';

import { setToken } from 'network/cookies';

export default {
  name: 'login',
  data() {
    return {
      form: {
        userName: 'admin',
        pwd: '123456'
      },
      loginFromRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, message: '长度大于5', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '密码长度不能为空', trigger: 'blur' },
          { min: 5, message: '长度6~15位', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    resetFrom(form1) {
      // this.$refs.form.resetFields();
      this.$refs[form1].resetFields();
    },
    login(form) {
  
      this.$refs[form].validate(valid => {
        if (!valid) return;
        login(this.form).then(res => {
          setToken(res.data.token);
          this.$router.push('/index');
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  background-color: #2b4b6b;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  // 圆角
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.login_from {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>