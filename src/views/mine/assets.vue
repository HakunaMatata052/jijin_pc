<template>
  <div class="assets">
    <div class="top">
      <dl class="first">
        <dt>
          总资产
          <i
            class="el-icon-view"
            @click="$store.state.moneyShow = !$store.state.moneyShow"
            v-if="$store.state.moneyShow"
          ></i>
          <i
            class="iconfont icon-guanbichakan"
            @click="$store.state.moneyShow = !$store.state.moneyShow"
            v-else
          ></i>
        </dt>
        <dd v-if="$store.state.moneyShow">{{data.zongyue}}</dd>
        <dd v-else>******</dd>
      </dl>
      <dl>
        <dt>{{data.zuorishouyi_time}}收益</dt>
        <dd>{{data.zuorishouyi}}</dd>
      </dl>
      <dl>
        <dt>累计收益</dt>
        <dd>{{data.leijishouyi}}</dd>
      </dl>
    </div>
    <el-divider></el-divider>
    <div class="bottom">
      <div class="box">
        <dl>
          <dt>账户余额</dt>
          <dd v-if="$store.state.moneyShow">{{data.zhanghuyue}}</dd>
          <dd v-else>******</dd>
        </dl>
        <el-button type="danger" class="btn">充值</el-button>
        <el-button type="danger" class="btn" plain>提现</el-button>
        <span @click="$router.push('/mine/balanceDetails')">余额明细</span>
      </div>

      <div class="box">
        <dl>
          <dt>基金</dt>
          <dd>{{data.jijin}}元</dd>
        </dl>
        <dl>
          <dt>日收益</dt>
          <dd>{{data.rishouyi}}元</dd>
        </dl>
        <span>详情</span>
      </div>

      <div class="box">
        <dl>
          <dt>
            现金宝
            <span>万元每日收益{{data.wanyuan_shouyi}}</span>
          </dt>
          <dd>{{data.xianjinbao}}元</dd>
        </dl>
        <el-button type="danger" class="btn">转入</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    };
  },
  created() {
    this.$SERVER.income().then(res => {
      this.data = { ...this.data, ...res.data };
    });
  }
};
</script>

<style lang="less" scoped>
.top {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  dl {
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    width: 200px;
    dt {
      font-size: 20px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    dd {
      font-size: 40px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    &.first {
      dt {
        color: rgba(51, 51, 51, 1);
        i {
          cursor: pointer;
        }
      }
      dd {
        font-size: 70px;
        font-weight: bold;
      }
    }
  }
}
.bottom {
  padding-top: 80px;
  .box {
    display: flex;
    align-items: center;
    border-left: 5px solid rgba(246, 250, 255, 1);
    padding-left: 30px;
    margin-bottom: 65px;
    dl {
      margin-right: 80px;
      line-height: 34px;
      dt {
        font-size: 16px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        span {
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 89, 65, 1);
          margin-left: 15px;
        }
      }
      dd {
        font-size: 18px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
    }
    .btn {
      margin-right: 42px;
      width: 110px;
      height: 40px;
    }
    & > span {
      font-size: 14px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      cursor: pointer;
    }
  }
}
</style>