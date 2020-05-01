<template>
  <div class="header">
    <a href="/#/">
      <img class="logo" src="@/assets/logo.png" alt="梦学谷会员管理系统" width="30px" />
      <span>梦学谷会员管理系统</span>
    </a>
    <el-dropdown class="user" @command="handleCommand">
      <span class="el-dropdown-link">
        hi {{username}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="alter_psd">修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-s-fold" command="logout" divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- dialog -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="33%">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        style="width:350px"
      >
        <el-form-item label="旧密码" prop="old">
          <el-input type="password" v-model="ruleForm.old" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="$refs['ruleForm'].resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { logout } from "@/api/login";
import passApi from '@/api/pass'

export default {
  data() {
    var validateOld = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"))
      } else {
        const id = JSON.parse(localStorage.getItem('user-data')).id;
        passApi.checkPass(value, id)
          .then(res => {
            if (res.data.flag) {
              callback()
            } else {
              callback(new Error("密码错误"))
            }
          })
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      username: JSON.parse(localStorage.getItem("user-data")).name,
      dialogFormVisible: false,
      ruleForm: {
        pass: "",
        checkPass: "",
        old: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        old: [{ validator: validateOld, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "alter_psd":
          this.dialogFormVisible = true;
          break;
        case "logout":
          this.logoutCurrent()
          this.$message("退出登录");
          break;
        default:
          this.$message("请稍后再试");
          break;
      }
    },
    logoutCurrent(){
      const token = localStorage.getItem("user-token");
          logout(token).then(res => {
            const res_data = res.data;
            if (res_data.flag) {
              //清除本地数据
              localStorage.removeItem("user-token");
              localStorage.removeItem("user-data");
              //路由跳转
              this.$router.push("/login");
            }
          });
          
    },
    submitForm() {
      const id = JSON.parse(localStorage.getItem('user-data')).id;
      passApi.updatePass(this.ruleForm.pass, id).then(res => {
        if (res.data.flag) {
          this.$message.success(res.data.message)
          this.logoutCurrent()
        } else {
          this.$message.error(res.data.message)
        }
      })
    }
  }
};
</script>
<style scoped>
.logo {
  margin: 0 10px 0 20px;
  vertical-align: middle;
}
.header a {
  color: #fff;
}
.user {
  float: right;
  cursor: pointer;
  margin-right: 30px;
}
.el-dropdown-link {
  color: #fff;
}
</style>