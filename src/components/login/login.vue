<template>
  <div class="bg">
    <div class="dialog">
      <h2>用户登录</h2>
      <el-form
        ref="formRule"
        status-icon
        :rules="rules"
        :model="loginObj"
        label-width="80px"
        label-position="top"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="loginObj.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginObj.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="mybtn" type="primary" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginObj: {
        username: "",
        password: ""
      },

      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.formRule.validate(valid => {
        if (valid) {
          this.$http.post("/login", this.loginObj)
          .then(res => {
            const { meta, data } = res.data;
            if (meta.status == 200) {
              this.$message({
                message: meta.msg,
                type: "success"
              });
            } else {
              this.$message.error(meta.msg);
            }
          });
        }else{
            alert('参数不合法')
        }
      });
    }
  }
};
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
.mybtn {
  width: 100%;
}
</style>
