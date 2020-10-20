<template>
  <div id='login'>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账户" prop="userName">
        <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="primary" @click="regForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { login, regUser } from 'network/login';

import { setToken } from 'network/cookies';
export default {
  name: 'Index',
  data() {
    var checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };

    var checkUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户不能为空'));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        userName: '',
        pwd: ''
      },
      rules: {
        userName: [{ validator: checkUserName, trigger: 'blur' }],
        pwd: [{ validator: checkPass, trigger: 'blur' }]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
          login(this.ruleForm).then(res => {
            setToken(res.data.token);
            // this.$store.commit('setToken', res.data.token);
            this.$router.push('/index');
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    regForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('reg!');
          regUser(this.ruleForm).then(res => {
            console.log(res.data.token);
            this.$store.commit('setToken', res.data.token);
            // this.$router.push('/home');
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style  lang='scss' scoped>
#login {
  display: flex;
  height: 100vh;
  width: 100vh;
  text-align: center;
}
</style>