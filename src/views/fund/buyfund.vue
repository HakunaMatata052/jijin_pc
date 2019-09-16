<template>
  <div class="fund">
    <v-header />
    <div class="main">
      <div class="container">
        <h1 class="title">购买基金详情</h1>
        <div class="fund-top box-shadow">
          <div class="fund-charts">
            <el-tabs v-model="activeType" @tab-click="drawLine" class="buyfund-tabs">
              <el-tab-pane label="近一月" name="one_month"></el-tab-pane>
              <el-tab-pane label="近三月" name="three_month"></el-tab-pane>
              <el-tab-pane label="近半年" name="six_month"></el-tab-pane>
              <el-tab-pane label="近一年" name="one_year"></el-tab-pane>
            </el-tabs>
            <canvas id="myChart"></canvas>
          </div>
          <div class="fund-info">
            <h3>
              {{info.stock_name}}
              <small>{{info.fund_code}}</small>
            </h3>
            <el-divider></el-divider>
            <div class="buyfundone">
              <dl>
                <dt>金额(元）</dt>
                <dd>
                  <span>{{info.money}}</span>
                </dd>
              </dl>
              <dl>
                <dt>月涨跌幅</dt>
                <dd>{{info.month_incratio}}</dd>
              </dl>
            </div>
            <el-row class="data-info">
              <el-col :span="8">
                <p>
                  持有份额：
                  <span>0.00元</span>
                </p>
                <p>
                  07-19净值：
                  <span>1.1700</span>
                </p>
              </el-col>
              <el-col :span="8">
                <p>
                  昨日收益：
                  <span class="zhang">
                    更新中
                    <i class="el-icon-arrow-right"></i>
                  </span>
                </p>
                <p>
                  累计收益：
                  <span class="zhang">1,700.00</span>
                </p>
              </el-col>
            </el-row>
            <div class="form">
              <p>
                待确认金额：
                <span>100.00元</span>
              </p>
              <div class="field">
                <span>元</span>
                <input
                  type="number"
                  v-model.number="money"
                  class="input"
                  pattern="[0-9]*"
                  :placeholder="`最低元起购`"
                  :disabled="!data.can_shuhui"
                />
                <el-button
                  type="primary"
                  class="btn"
                  :disabled="!data.can_shuhui"
                  @click="submit"
                >赎回</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-footer />
  </div>
</template>

<script>
import F2 from "@antv/f2/lib/index";
import "@antv/f2/lib/interaction";

import vHeader from "@/components/header.vue";
import vFooter from "@/components/footer.vue";

export default {
  components: {
    vHeader,
    vFooter
  },
  data() {
    return {
      activeType: "one_month",
      data: {},
      info: {
        amount: "0.00",
        bjj_zhangdie: 0,
        can_shuhui: 0,
        dazhifu_money: "0",
        fund_code: "",
        money: "0",
        month_incratio: 0,
        order_id: "",
        stock_name: "",
        yesterday: "更新中",
        yesterday_jing: "0",
        yesterday_time: "2019-08-30",
        zong_yingkui: 0
      },
      money: ""
    };
  },
  created() {
    this.$SERVER
      .stock_buy_detail({
        order_id: this.$route.params.id
      })
      .then(res => {
        this.info = res.data;
      });
    this.drawLine();
  },
  methods: {
    drawLine() {
      this.$SERVER
        .buy_jingzhi({
          order_id: this.$route.params.id,
          month: this.activeType
        })
        .then(res => {
          this.data = res.data.k_xiantu;
          const chart = new F2.Chart({
            id: "myChart",
            pixelRatio: window.devicePixelRatio // 指定分辨率
          });
          chart.legend(false); // 不使用默认图例
          chart.interaction("pan");
          chart.interaction("pinch");

          // Step 2: 载入数据源
          chart.source(this.data, {
            fbrq: {
              type: "timeCat",
              tickCount: 3,
              range: [0, 1]
            },
            jjjz: {
              tickCount: 10
            }
          });
          // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
          chart
            .line()
            .position("fbrq*networth")
            .shape("smooth")
            .color("l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF");
          // Step 4: 渲染图表
          chart.axis("networth", {
            label: (text, index, total) => {
              const cfg = {
                textAlign: "right"
              };
              cfg.text = text + "%"; // cfg.text 支持文本格式化处理
              return cfg;
            }
          });
          chart.render();
        });
    }
  }
};
</script>
<style lang="less">
.buyfund-tabs {
  .el-tabs__nav-wrap::after {
    height: 1px;
    background-color: rgba(242, 242, 242, 1);
  }
  .el-tabs__nav-scroll {
    padding: 0 50px;
  }
  .el-tabs__item {
    font-size: 16px;
    width: 120px;
    height: 74px;
    line-height: 74px;
    text-align: center;
  }
}
</style>
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
.fund-top {
  display: flex;
  background: #fff;
  margin-bottom: 64px;
  .fund-charts {
    width: 660px;
    height: 600px;
    background: rgba(250, 250, 250, 1);
  }
  .fund-info {
    padding: 70px 97px;
    flex-grow: 1;
    .tips {
      font-size: 14px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 30px;
      text-align: right;
      margin-bottom: 30px;
      span {
        color: rgba(18, 23, 31, 0.14);
      }
    }
    h3 {
      font-size: 32px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 30px;
      margin-bottom: 20px;
      small {
        font-size: 18px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 30px;
      }
    }
    .tags {
      margin-bottom: 35px;
      span {
        width: 92px;
        height: 28px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 4px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        display: inline-block;
        line-height: 28px;
        margin-right: 10px;
      }
    }
    .buyfundone {
      display: flex;
      margin-bottom: 45px;

      dl {
        display: flex;
        align-items: flex-end;
        margin-right: 120px;
        dt {
          font-size: 16px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        dd {
          font-size: 30px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          span {
            color: rgba(255, 89, 65, 1);
          }
        }
      }
    }
    .data-info {
      margin-bottom: 45px;
      p {
        height: 56px;
        font-size: 16px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 40px;
        span {
          color: rgba(51, 51, 51, 1);
          &.zhang {
            color: rgba(255, 89, 65, 1);
          }
        }
      }
    }
    .form {
      margin-bottom: 20px;
      p {
        font-size: 20px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        margin-bottom: 30px;
        span {
          color: rgba(255, 89, 65, 1);
        }
      }
      .field {
        display: flex;
        position: relative;
        & > span {
          line-height: 50px;
          position: absolute;
          left: 240px;
          top: 0;
        }
        .input {
          width: 270px;
          height: 50px;
          line-height: 50px;
          border: 0;
          background: rgba(245, 245, 245, 1);
          border-radius: 4px;
          padding: 0 50px 0 20px;
          outline: none;
          -moz-appearance: textfield;

          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
          }
        }
        .btn {
          width: 130px;
          font-size: 18px;
        }
        .star {
          align-self: flex-end;
          margin-left: 50px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          cursor: pointer;
        }
      }
    }
    .bottom {
      font-size: 14px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      span {
        color: rgba(255, 89, 65, 1);
      }
    }
  }
}

#myChart {
  width: 100%;
  height: 100%;
}
</style>