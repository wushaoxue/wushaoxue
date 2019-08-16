<template>
  <div class="my-login">
    <div class="form-box" @keydown.enter="submitForm('ruleForm')">
      <h2>用户登录</h2>
      <!-- ui -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item   label="用户名" prop="username">
          <el-input  type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item class="login-button">
          <el-button type="primary" @click="submitForm('ruleForm')" >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "../../api/http";
export default {
  data() {
    return {
      ruleForm: { username: "", password: "" },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
          {
            min: 3,
            max: 5,
            message: "长度在 6 到 16 个字符",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
         login(this.ruleForm)
            .then(res => {
              // console.log(res.data.meta);

              if (res.data.meta.status == 200) {
                this.$message.success({
                
                  message: "登录成功!"
                });
                // 保存唯一的token  因为localStorage 是浏览器的所以用window
               window.localStorage.setItem('token',res.data.data.token)
                this.$router.push("/index");
              }else{
                this.$message.error({
                 
                  message:res.data.meta.msg
                })
              }
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.my-login {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;

  .form-box {
    border-radius: 10px;
    padding: 40px;
    padding-bottom: 0;
    width: 550px;
    height: 400px;
    background-color: #fff;

    h2 {
      margin-bottom: 30px;
    }

    .my-loginbtn {
      width: 100%;
    }
  }
 .el-button--primary{
   width: 100%;
 }
}
</style>