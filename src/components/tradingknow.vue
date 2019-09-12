<template>
  <div class="tradingknow">
    <div class="tradingknowtop">
      <div class="tradingknowtopM">
        <el-row>
          <el-col :span="5">份额确认</el-col>
          <el-col :span="19">
            15:00前购买，下1个交易日确认
            <br />15:00后购买，下2个交易日确认
          </el-col>
        </el-row>
      </div>
      <div class="tradingknowtopM tradingknowtopMC">
        <el-row>
          <el-col :span="5">撤销购买</el-col>
          <el-col :span="19">认购期与申购期购买后当日15:00前可撤销</el-col>
        </el-row>
      </div>
      <div class="tradingknowtopM">
        <el-row>
          <el-col :span="5">赎回规则</el-col>
          <el-col :span="19">可部分赎回，最低赎回份额不低于10.00份。赎回到账时间请以基金公司赎回清算时间为准</el-col>
        </el-row>
      </div>
    </div>
    <div class="tradingknowCenter">
      <h1>交易时间确认表</h1>
      <el-table :data="tableList" border style="width: 650px">
        <el-table-column prop="time" label="交易申请时间"></el-table-column>
        <el-table-column prop="purchase" label="申购确认" width="200"></el-table-column>
        <el-table-column prop="redemption" label="赎回到账" width="200"></el-table-column>
      </el-table>
    </div>
    <!-- <div class="service" @click="$router.push('/chat/10000')">
      <van-icon class-prefix="icon" name="kefu" class="kefu" />联系客服
    </div> -->
  </div>
</template>

<script>
export default {
  name: "tradingknow",
  data() {
    return {
      tableList: [
        {
          time: "上周五15:00~周一15:00",
          purchase: "周二",
          redemption: "下周一"
        },
        {
          time: "周一15:00~周二15:00",
          purchase: "周三",
          redemption: "下周二"
        },
        {
          time: "周二15:00~周三15:00",
          purchase: "周四",
          redemption: "下周三"
        },
        {
          time: "周三15:00~周四15:00",
          purchase: "周五",
          redemption: "下周四"
        },
        {
          time: "周四15:00~周五15:00 ",
          purchase: "下周一",
          redemption: "下周五"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.tradingknow {
  .tradingknowtop {
    margin-top: 16px;
    background: #fff;
    width: 100%;
    height: 150px;
    padding: 22px 0 24px;
    .tradingknowtopM {
      height: 50px;
      padding: 0 15px;
      font-size: 13px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      line-height: 23px;
    }
    .tradingknowtopMC {
      line-height: 50px;
    }
  }
  .tradingknowCenter {
    background: #fff;
    padding: 18px 15px 30px 15px;
    margin-top: 15px;
    h1 {
      font-size: 15px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 18px;
      padding: 0 0 18px 6px;
    }
    .thead {
      flex-basis: 50% !important;
      div {
        background: rgba(0, 0, 0, 0) !important;
      }
    }
    .thead1 {
      flex-basis: 25% !important;
      div {
        background: rgba(0, 0, 0, 0) !important;
      }
    }
  }
  .service {
    height: 44px;
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    font-size: 15px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(81, 150, 255, 1);
    line-height: 45px;
    text-align: center;
    margin: 35px 15px 100px 15px;
    position: relative;
    padding-left: 23px;
    .kefu {
      font-size: 18px;
      position: absolute;
      left: 50%;
      margin-left: -50px;
      top: 4%;
    }
  }
}
</style>

