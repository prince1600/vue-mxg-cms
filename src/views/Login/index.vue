<template>
  <div class="form-container">
    <el-form class="login-form" ref="form" :rules="rules" :model="form" label-width="80px">
      <h2 class="login-title">梦学谷会员管理系统</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login, getUserInfo } from "@/api/login";

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login(this.form.username, this.form.password).then(res => {
            if (res.data.flag) {
              const token = res.data.data.token;
              getUserInfo(token).then(res => {       
                localStorage.setItem(
                  "user-data",
                  JSON.stringify(res.data.data)
                );
                localStorage.setItem("user-token", token)
                this.$router.push("/")
                this.$message.success(res.data.message);
              });
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-title {
  text-align: center;
  padding-bottom: 20px;
}
.form-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../../assets/login.jpg);
}
.login-form {
  width: 350px;
  margin: 160px auto;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 20px;
}
</style>