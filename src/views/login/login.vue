<template>
  <div class="login box-shadow">
    <div class="login-left">
      <h1>请登录</h1>
      <el-input v-model="form.user_account" type="text" placeholder="请输入用户名" class="input"></el-input>
      <el-input v-model="form.user_pwd" type="password" placeholder="请输入密码" class="input"></el-input>
      <span>忘记密码？</span>
      <el-button type="primary" class="btn" @click="loginFn" :loading="loginLoading">登录</el-button>
      <p>用户注册</p>
    </div>
    <div class="login-right">
      <img src alt />
      <p>扫描二维码 下载app</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        user_account: "",
        user_pwd: ""
      },
      loginLoading: false
    };
  },
  created() {
    if (this.$METHOD.getStore("token")) {
      this.$router.push("/");
    }
  },
  methods: {
    loginFn() {
      var that = this;
      that.loginLoading = true;
      that.$SERVER
        .login(that.form)
        .then(res => {
          that.$message.success("登录成功");
          that.$METHOD.setStore("token", res.data.userinfo.token);
          that.$METHOD.setStore("userInfo", res.data.userinfo_first);
          that.$store.state.token = res.data.userinfo.token;
          that.$store.state.userInfo = res.data.userinfo_first;
          that.loginLoading = false;
          that.$router.go(-1);
        })
        .catch(res => {
          that.loginLoading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  height: calc(100vh);
  background: url(../../assets/images/login-bg.png) no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-left {
    width: 420px;
    height: 470px;
    background: rgba(255, 255, 255, 1);
    padding: 58px 70px;
    h1 {
      font-size: 40px;
      font-weight: bold;
      color: rgba(84, 152, 255, 1);
      margin-bottom: 38px;
    }
    .input {
      margin-bottom: 22px;
    }
    span {
      display: block;
      width: 100%;
      text-align: right;
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin-bottom: 30px;
    }
    p {
      font-size: 18px;
      font-weight: 500;
      color: rgba(84, 152, 255, 1);
      text-align: center;
    }
    .btn {
      width: 100%;
      font-size: 18px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 28px;
    }
  }
  .login-right {
    width: 420px;
    height: 470px;
    background: rgba(247, 247, 247, 1);
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    img {
      width: 182px;
      height: 182px;
      border: 10px solid #fff;
      margin-bottom: 37px;
    }
    p {
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
}
</style>