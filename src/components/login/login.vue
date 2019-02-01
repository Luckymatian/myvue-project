<template>
  <div class="bg">
    <div class="dialog">
        <h2>用户登录</h2>
      <el-form ref="myform" :model="loginObj" label-width="80px" label-position="top">
        <el-form-item label="用户名">
          <el-input v-model="loginObj.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginObj.password"></el-input>
        </el-form-item>
        <el-form-item>
           <el-button class="mybtn" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
   data(){
       return{
           loginObj:{
               usename:'',
               password:''
           }

       }

   }
}
</script>

<style>
.bg {
  background: rgb(126, 124, 124);
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.dialog {
  position: absolute;
  width: 500px;
  height: 340px;
  background-color: #fff;
  top: 20%;
  left: 50%;
  transform: translateX(-250px);
  border-radius: 3%;
  padding: 0 20px 20px 20px;
}
.mybtn{
    width: 100%;
}
</style>
