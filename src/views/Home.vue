<template>
  <div class="home">
    我是首页
    {{$store.state.token}}

    <br>
    <el-button type="primary" @click="getdata1">注解忽略权限1</el-button>
    <el-button type="primary" @click="getdata2">需要token校验2</el-button>

    <el-button type="primary" @click="getdata3">角色权限</el-button>
    <el-button type="primary" @click="getdata4">主要按钮4</el-button>
    <div v-show="isShow">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
    </div>

    <div>


    </div>

 

  </div>
</template>

<script>
import { getData1, getData2, getData3, getData4 } from 'network/home';

export default {
  name: 'Home',
  data() {
    return {
      isShow: false,
      tableData: []
    };
  },

  methods: {
    getdata1() {
      getData1().then(res => {
        console.log(res);
        let data = res.data;
        if (data) {
          this.tableData = data;
        }
      });
      this.isShow = !this.isShow;
    },
    getdata2() {
      getData2().then(res => {
        console.log(res);
        let data = res.data;
        if (data) {
          this.tableData = data;
        }
      });
      this.isShow = !this.isShow;
    },
    getdata3() {
      getData3().then(res => {
        console.log(res);
        let data = res.data;
        if (data) {
          this.tableData = data;
        }
      });
      this.isShow = !this.isShow;
    },
    getdata4() {
      getData4().then(res => {
        console.log(res);
        let data = res.data;
        if (data) {
          this.tableData = data;
        }
      });
      this.isShow = !this.isShow;
    }
  },
  components: {}
};
</script>
