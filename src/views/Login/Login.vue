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
// 引入正则表达式
import { REG_ACC, REG_PWD } from "@/utils/reg";

// 引入接口层的 登录 ajax函数   【接口层没有暴露一个对象  这里要加 {} 】
import { checkLogin } from "@/api/account";

// 引入local工具函数
import local from "@/utils/local";

export default {
  data() {
    const checkAcc = (rule, val, callback) => {
      if (!val) {
        callback(new Error("用户名不能为空"));
      } else if (!REG_ACC.test(val)) {
        callback(new Error("请输入长度 4-10的中文，英文字母和数字"));
      } else {
        callback();
      }
    };
    const checkPwd = (rule, val, callback) => {
      if (!val) {
        callback(new Error("密码不能为空"));
      } else if (!REG_PWD.test(val)) {
        callback(new Error("密码只能是字母数字，长度 3-12位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        account: "",
        password: ""
      },
      //   自定义验证
      rules: {
        account: { required: true, validator: checkAcc, trigger: "blur" },
        password: { required: true, validator: checkPwd, trigger: "blur" }
      },
      isShowPwd: false
    };
  },
  methods: {
    //   点击提交  触发表单所有验证
    submitForm() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // 通过前段验证  -- 发送ajax  登陆请求
          //   解构 ajax请求返回的数据
          let { code, msg, role, token } = await checkLogin(this.loginForm);
          if (code === 0) {
            local.set("t_k", token); //把token存入本地
            this.$message({ type: "success", message: msg }); //登录成功提示
            this.$router.push("/");
          } else if (code === 1) {
            this.$message.error(msg);
          }
        } else {
          alert("登月失败");
        }
      });
    },
    // 密码的显示和隐式切换
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