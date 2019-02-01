<template>
    
       <el-row>
          <el-col :span="4">
            <div>
              <img src="@/assets/images/logo.png">
            </div>
          </el-col>
          <el-col :span="16">
            <div>
              <h2>电商后台管理系统</h2>
            </div>
          </el-col>
          <el-col :span="4">
            <div>
              <a href="#" @click.prevent="logout()">退出</a>
            </div>
          </el-col>
        </el-row>

</template>

<script>
export default {
    methods:{
        logout(){
            // 清除用户登录信息，跳回登录页面   
        this.$confirm('即将退出系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          window.localStorage.removeItem('token')
            this.$router.push('/login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
        }
    }

}
</script>

<style>
.home {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  color: #fff;
  font-weight: 500;
  padding: 0;
  background-color: #b3c0d1;
  line-height: 60px;
  text-align: center;
}
.el-header a {
  text-decoration: none;
  color: #fff;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}
</style>
