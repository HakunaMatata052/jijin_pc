<template>
  <div class="fund">
    <v-header />
    <div class="main">
      <div class="container">
        <h1 class="title">支付订单</h1>
        <el-row class="box-shadow" type="flex" v-loading="loading">
          <el-col :span="12">
            <div class="info">
              <el-alert class="alert" :title="`交易提示：完成支付后预计在${info.yujitime}确认`" type="error"></el-alert>
              <div class="order-info">
                <img :src="indexchart" />
                <div class="tit">
                  <h3>{{info.stock.fund_name}}（{{info.stock.fund_code}}）</h3>
                  <p>
                    费率：
                    <span>{{info.feilv}}</span>
                  </p>
                </div>
              </div>
              <div class="money">
                需支付：
                <span>{{$store.state.buy.money}}元</span>
              </div>
              <div class="input">
                <el-input
                  v-model="password"
                  type="password"
                  style="width:400px"
                  placeholder="请输入内容"
                ></el-input>
                <span>忘记密码？</span>
              </div>
              <el-button type="danger" class="btn" :loading="btnloading" @click="submit">立即付款</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="right">
              <img src alt />
              <p>
                扫描二维码 下载app
                <br />随时随地购买基金
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <v-footer />
  </div>
</template>

<script>
import indexchart from "@/assets/images/indexchart.png";
import vHeader from "@/components/header.vue";
import vFooter from "@/components/footer.vue";
export default {
  name: "fund",
  components: {
    vHeader,
    vFooter
  },
  data() {
    return {
      indexchart: indexchart,
      loading: true,
      info: {
        stock: {
          fund_name: "",
          fund_code: "",
          minmoney: 0
        },
        feilv: "",
        account: "0"
      },
      password: "",
      btnloading: false
    };
  },
  created() {
    this.$SERVER
      .stockBuy({
        fund_code: this.$store.state.buy.fund_code
      })
      .then(res => {
        this.info = res.data;
      })
      .catch(err => {
        this.$router.go(-1);
      });
    this.$SERVER
      .liandong({
        fund_code: this.$store.state.buy.fund_code,
        money: this.$store.state.buy.money
      })
      .then(res => {
        this.info.feilv = res.data;
        this.loading = false;
      });
  },
  methods: {
    submit() {
      this.btnloading = true;
      this.$SERVER
        .ajaxBuyState({
          fund_code: this.$store.state.buy.fund_code,
          money: this.$store.state.buy.money,
          pay_pwd: this.password,
          type: 1
        })
        .then(res => {
          this.btnloading = false;
          this.$store.state.buysuccess = res.data;
          this.$router.push("/buysuccess");
        })
        .catch(err => {
          this.btnloading = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.title {
  font-size: 38px;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  line-height: 36px;
  padding: 90px 0 38px;
  small {
    font-size: 24px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 36px;
  }
}
.info {
  padding: 41px 31px;
  background: #fff;
  .alert {
    margin-bottom: 34px;
  }
  .order-info {
    display: flex;
    margin-bottom: 35px;
    .tit {
      margin-left: 10px;
      padding-top: 10px;
      h3 {
        font-size: 30px;
        line-height: 40px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      p {
        font-size: 16px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        span {
          color: rgba(255, 89, 65, 1);
        }
      }
    }
  }
  .money {
    font-size: 16px;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    margin-bottom: 50px;
    span {
      font-size: 30px;
      font-weight: 500;
      color: rgba(255, 89, 65, 1);
    }
  }
  .input {
    margin-bottom: 30px;
    span {
      font-size: 16px;
      font-weight: 400;
      color: rgba(84, 152, 255, 1);
      margin-left: 25px;
      cursor: pointer;
    }
  }
  .btn {
    width: 150px;
    height: 60px;
    font-size: 20px;
    font-weight: 400;
  }
}
.right {
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  img {
    width: 210px;
    height: 210px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(235, 235, 235, 0.6);
    padding: 13px;
    margin-bottom: 30px;
  }
  p {
    height: 41px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 26px;
  }
}
</style>