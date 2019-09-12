<template>
  <div class="fund">
    <v-header />
    <div class="main">
      <div class="container">
        <h1 class="title">
          {{data.fund_name}}
          <small>{{$route.params.id}}</small>
        </h1>
        <div class="fund-top box-shadow">
          <div class="fund-charts">
            <canvas id="myChart"></canvas>
          </div>
          <div class="fund-info">
            <div class="tips">{{data.explain}}</div>
            <h3>
              {{data.fund_name}}
              <small>{{$route.params.id}}</small>
            </h3>
            <div class="tags">
              <span :class="data.boom?'gao':''">{{data.fund_risk_level}}</span>
              <span>{{data.min_value}}元起购</span>
              <span>{{data.type2_id_desc}}</span>
            </div>
            <div class="data">
              <dl>
                <dt>近三月收益</dt>
                <dd :class="data.rise? 'zhang':'die'">{{data.quarter_incratio}}</dd>
              </dl>
              <dl>
                <dt>单位净值（{{data.time}}）</dt>
                <dd>{{data.netvalue}}</dd>
              </dl>
              <dl>
                <dt>累计净值</dt>
                <dd>{{data.ljjz}}</dd>
              </dl>
            </div>
            <div class="form">
              <p>投资金额：</p>
              <div class="field">
                <span>元</span>
                <input
                  type="number"
                  v-model.number="money"
                  class="input"
                  pattern="[0-9]*"
                  :placeholder="`最低${info.stock.minmoney}元起购`"
                  :disabled="!data.can_buy"
                />
                <el-button type="danger" class="btn" :disabled="!data.can_buy" @click="submit">立即申购</el-button>
                <div class="star" @click="likeFn(data.like)">
                  <i :class="data.like?'iconfont icon-shoucang':'iconfont icon-shoucang1'"></i>
                  <span v-if="data.like">已收藏</span>
                  <span v-else>收藏</span>
                </div>
              </div>
            </div>
            <div class="bottom">
              费率
              <span>{{data.rate}}</span>，费申购成功即扣除
            </div>
          </div>
        </div>
        <el-row :gutter="20">
          <el-col :span="17">
            <div class="fund-left box-shadow">
              <el-tabs v-model="activeType" class="fundDetail-tabs">
                <el-tab-pane label="历史净值" name="0">
                  <div class="con" id="lsjz">
                    <el-table :data="lsjzData" stripe style="width: 100%">
                      <el-table-column prop="fbrq" label="日期"></el-table-column>
                      <el-table-column prop="jjjz" label="单位净值" width="180"></el-table-column>
                      <el-table-column prop="ljjz" label="累计净值" width="180"></el-table-column>
                      <el-table-column prop="networth" label="日涨跌" width="180"></el-table-column>
                    </el-table>

                    <div class="pagination">
                      <el-pagination
                        background
                        layout="prev, pager, next"
                        :page-size="pageSize"
                        :total="total"
                        @current-change="pageFn"
                      ></el-pagination>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="基金档案" name="1" lazy>
                  <div class="con"></div>
                </el-tab-pane>
                <el-tab-pane label="交易须知" name="2" lazy>
                  <div class="con">
                    <tradingknow />
                  </div>
                </el-tab-pane>
                <el-tab-pane label="交易费率" name="3" lazy>
                  <div class="con">
                    <interchangefees :id="$route.params.id" />
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="sidebar box-shadow">
              <h3>热搜基金推荐</h3>
              <hot-search />
            </div>
          </el-col>
        </el-row>
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
import tradingknow from "@/components/tradingknow.vue";
import interchangefees from "@/components/interchangefees.vue";
import hotSearch from "@/components/hotSearch.vue";

export default {
  name: "fund",
  components: {
    vHeader,
    vFooter,
    tradingknow,
    interchangefees,
    hotSearch
  },
  data() {
    return {
      activeType: "0",
      lsjzData: [],
      data: {},
      info: {
        stock: {
          fund_name: "",
          fund_code: "",
          minmoney: 0
        },
        feilv: "",
        account: "0"
      },
      page: 1,
      pageSize: 30,
      total: 0,
      money: "",
      timer: 0
    };
  },
  watch: {
    money(val) {
      this.feilvFn(val);
    }
  },
  created() {
    this.$SERVER
      .stockBuy({
        fund_code: this.$route.params.id
      })
      .then(res => {
        this.info = res.data;
      });
    this.$SERVER
      .funddetails({
        fund_code: this.$route.params.id
      })
      .then(res => {
        this.data = res.data;
        this.data.ljjz = res.data.cache.ljjz;
      });
    this.getJingzhi();
  },
  methods: {
    getJingzhi() {
      this.$SERVER
        .stock_jingzhi_list({
          page: 1,
          pagesize: this.pageSize,
          fund_code: this.$route.params.id
        })
        .then(res => {
          this.lsjzData = res.data.list;
          this.total = res.data.page;
          this.drawLine();
        });
    },
    drawLine() {
      const chart = new F2.Chart({
        id: "myChart",
        pixelRatio: window.devicePixelRatio // 指定分辨率
      });
      // Step 2: 载入数据源
      chart.source(this.lsjzData, {
        fbrq: {
          type: "timeCat",
          tickCount: 3,
          range: [0, 1]
        },
        jjjz: {
          tickCount: 10
        }
      });
      chart.legend(false); // 不使用默认图例

      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart
        .line()
        .position("fbrq*networth")
        .shape("smooth")
        .color("l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF");
      chart.interaction("pan");
      chart.interaction("pinch");

      chart.axis("networth", {
        label: (text, index, total) => {
          const cfg = {
            textAlign: "right"
          };
          cfg.text = text + "%"; // cfg.text 支持文本格式化处理
          return cfg;
        }
      });
      // Step 4: 渲染图表
      chart.render();
    },
    pageFn(val) {
      this.page = val;
      this.getJingzhi();
      document.getElementById("lsjz").scrollIntoView();
    },
    likeFn(type) {
      this.data.like = !this.data.like;
      this.$SERVER
        .stock_like_up({
          type: Number(!type),
          pro_code: this.$route.params.id
        })
        .then(res => {
          console.log(1);
        })
        .catch(err => {
          this.data.like = !this.data.like;
        });
    },
    feilvFn(val) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$SERVER
          .liandong({
            fund_code: this.$route.params.id,
            money: val
          })
          .then(res => {
            this.data.rate = res.data;
          });
      }, 500);
    },
    submit() {
      if (this.money.length == 0) {
        this.$message.error("请输入金额");
        return;
      }

      if (this.money < this.info.stock.minmoney) {
        this.$message.error("金额低于最低起购值！");
        return;
      }
      if (this.money > this.info.account) {
        this.$message.error("余额不足！");
        return;
      }
      this.$store.state.buy.money = this.money;
      this.$store.state.buy.fund_code = this.$route.params.id;
      this.$router.push("/buy");
    }
  }
};
</script>
<style lang="less">
.fundDetail-tabs {
  .el-tabs__nav-wrap::after {
    height: 1px;
    background-color: rgba(242, 242, 242, 1);
  }
  .el-tabs__nav-scroll {
    padding: 0 50px;
  }
  .el-tabs__item {
    font-size: 18px;
    font-weight: 400;
    width: 160px;
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
    height: 490px;
    background: rgba(250, 250, 250, 1);
  }
  .fund-info {
    padding: 34px 45px;
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
    .data {
      display: flex;
      margin-bottom: 30px;
      dl {
        width: 190px;
        height: 87px;
        padding-right: 40px;
        margin-right: 40px;
        border-right: 1px solid rgba(240, 240, 240, 1);
        &:last-child {
          border-right: 0;
        }
        dt {
          font-size: 16px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 10px;
        }
        dd {
          font-size: 40px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          &.zhang {
            color: rgba(255, 89, 65, 1);
          }
          &.die {
            color: rgba(81, 150, 255, 1);
          }
        }
      }
    }
    .form {
      margin-bottom: 20px;
      p {
        font-size: 14px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 36px;
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
.fund-left {
  .con {
    padding: 20px 45px;
  }
  .pagination {
    padding: 45px 0;
    display: flex;
    flex-flow: row-reverse;
  }
}
.sidebar {
  background: #fff;
  h3 {
    height: 74px;
    line-height: 74px;
    padding: 0 32px;
    font-size: 20px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    border-bottom: 1px solid rgba(242, 242, 242, 1);
  }
}
#myChart {
  width: 100%;
  height: 100%;
}
</style>