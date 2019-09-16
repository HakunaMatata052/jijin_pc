<template>
  <div class="fund">
    <el-form ref="form" :model="form" label-width="120px" class="form">
      <el-form-item label="您的姓名">
        <el-input v-model="form.user_real_name"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="form.user_id_card"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.user_account"></el-input>
      </el-form-item>
      <el-form-item label="短信验证码">
        <el-input v-model="form.captcha">
          <el-button slot="append" @click="sendchecknum" :disabled="checkNumDisabled">
            <span v-if="checkNumDisabled">{{countDown}}秒后重试</span>
            <span v-else>发送验证码</span>
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  :loading="loading" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import regexUtil from "regex-util";
export default {
  data() {
    return {
      form: {
        user_real_name: "",
        user_id_card: "",
        user_account: "",
        captcha: ""
      },
      loading: false,
      checkNumDisabled: false,
      countDown: 60,
      timer: null
    };
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    sendchecknum() {
      if (regexUtil.isPhone(this.form.user_account)) {
        const timer_COUNT = 60;
        if (!this.timer) {
          this.countDown = timer_COUNT;
          this.checkNumDisabled = true;
          this.timer = setInterval(() => {
            if (this.countDown > 0 && this.countDown <= timer_COUNT) {
              this.countDown--;
            } else {
              this.checkNumDisabled = false;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        this.$SERVER
          .sendchecknum({
            mobile: this.form.user_account
          })
          .then(res => {
            this.$message.success("验证码发送成功！");
          })
          .catch(res => {
            this.form.captcha = "";
            this.checkNumDisabled = false;
            clearInterval(this.timer);
            this.timer = null;
          });
      } else {
        this.$message.error("请输入正确的手机号码");
      }
    },
    submit() {
      if (!regexUtil.isChinese(this.form.user_real_name)) {
        this.$message.error("请输入正确的姓名");
        return;
      }

      if (!regexUtil.isIDCard(this.form.user_id_card)) {
        this.$message.error("请输入正确的身份证号");
        return;
      }
      if (!regexUtil.isPhone(this.form.user_account)) {
        this.$message.error("请输入正确的手机号码");
        return;
      }

      if (!this.form.captcha || this.form.captcha.length == 0) {
        this.$message.error("请输入验证码");
        return;
      }
      this.loading = true;
      this.$SERVER
        .tradepwdup_auth(this.form)
        .then(res => {
          this.loading = false;
          this.$router.push("/transaction");
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  width: 560px;
}
</style>

