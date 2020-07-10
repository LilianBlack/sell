<template>
  <!--  -->
  <div class="login">
    <div class="login-form">
      <h3>系统登录</h3>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm" size="small">
        <!-- 账号输入框 -->
        <el-form-item prop="account">
          <el-input
            prefix-icon="iconfont icon-yonghu"
            type="text"
            v-model="loginForm.account"
            autocomplete="off"
            autofocus
          ></el-input>
        </el-form-item>

        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input
            :suffix-icon="isShowPwd ?  'iconfont icon-zhengyan' : 'iconfont icon-biyan' "
            :type="isShowPwd ? 'text' : 'password'"
            @click.native="changeShowPwd"
            prefix-icon="iconfont icon-suo"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        account: "",
        password: ""
      },
      //   内置验证
      rules: {
        account: { required: true, message: "请输入账号", trigger: "blur" },
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ]
      },
      isShowPwd: false
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 发送ajax  成功后跳转
          alert("成功登月！");
          this.$router.push("/");
        } else {
          alert("登月失败");
        }
      });
    },
    changeShowPwd(e) {
      if (e.target.className.includes("yan")) {
        this.isShowPwd = !this.isShowPwd;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background: url("../../assets/imgs/login-bg.jpg") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .login-form {
    // color: cadetblue;
    color: darksalmon;
    width: 300px;
    h3 {
      text-align: center;
    }
    /deep/ .el-input .el-input__inner {
      background: transparent;
    }
    /deep/ .el-button {
      width: 100%;
      background: cornflowerblue;
      outline: none;
      border: none;
    }
  }
}
</style>