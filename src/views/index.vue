<template>
  <div class="home">
    <v-header />
    <el-carousel height="390px">
      <el-carousel-item v-for="item in banner" :key="item">
        <el-image style="width: 100%; height: 100%" :src="item" fit="cover"></el-image>
      </el-carousel-item>
    </el-carousel>
    <div class="container">
      <el-row :gutter="31">
        <el-col :span="8">
          <div class="grid-content grid1">
            <p>135****1233 申购黄金基金 200.000.00元</p>
            <h3>黄金基金：净值1.21</h3>
            <h2>月收益 +100%</h2>
            <div class="tags">
              <span>高风险</span>
              <span>10元起购</span>
            </div>
            <el-button type="primary" class="btn">马上申购</el-button>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content grid2">
            <p>135****1233 申购黄金基金 200.000.00元</p>
            <h3>黄金基金：净值1.21</h3>
            <h2>月收益 +100%</h2>
            <div class="tags">
              <span>高风险</span>
              <span>10元起购</span>
            </div>
            <el-button type="primary" class="btn">马上申购</el-button>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content grid3">
            <p>135****1233 申购黄金基金 200.000.00元</p>
            <h3>黄金基金：净值1.21</h3>
            <h2>月收益 +100%</h2>
            <div class="tags">
              <span>高风险</span>
              <span>10元起购</span>
            </div>
            <el-button type="primary" class="btn">马上申购</el-button>
          </div>
        </el-col>
      </el-row>
      <img :src="sbanner" class="sbanner" />
    </div>
    <div class="jingxuan">
      <div class="container">
        <div class="title">
          <h3>精选产品</h3>
          <span @click="$router.push('/fund')">
            更多精选产品
            <i class="el-icon-arrow-right el-icon--right"></i>
          </span>
          <div class="empty"></div>
          <p>
            没有喜欢的？试试我们的个性化选基
            <i class="el-icon-arrow-right el-icon--right"></i>
          </p>
        </div>
        <div class="top box-shadow">
          <el-image class="img" :src="jingxuanimg" fit="fit"></el-image>
          <div class="right">
            <el-carousel trigger="click" height="400px" arrow="never">
              <el-carousel-item v-for="item in 4" :key="item">
                <div class="con">
                  <div class="tips">
                    肯特瑞基金销售公司
                    <span>提供</span>
                  </div>
                  <h3>
                    天弘聚利灵活配置混合
                    <small>001647</small>
                  </h3>
                  <div class="tags">
                    <span>高风险</span>
                    <span>10元起购</span>
                  </div>
                  <p>
                    费率 1.50% 0.15% ，申购成功即扣除
                    <br />投资风险： 中
                  </p>
                  <div class="bottom">
                    <h2>10.57%</h2>
                    <span>近三个月收益</span>
                    <el-button type="danger" class="btn">立即抢购</el-button>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
    </div>
    <div class="jjlist box-shadow container" id="jjlist">
      <div class="type">
        <el-tabs v-model="activeType" class="tabs" @tab-click="getList">
          <el-tab-pane label="全部" name></el-tab-pane>
          <el-tab-pane
            :label="item.type2_id_desc"
            :name="item.type2_id_desc"
            v-for="(item,index) in  tabList"
            :key="index"
          ></el-tab-pane>
        </el-tabs>
        <el-input placeholder="基金名称 / 代码 / 基金经理" v-model="search" class="search">
          <el-button slot="append" class="btn" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table
        :data="tableData"
        class="table"
        @sort-change="sortFn"
        header-row-class-name="table-head"
      >
        <el-table-column label="基金简称" width="300">
          <template slot-scope="scope">
            <h4 @click="fundFn(scope.row.fund_code)" style="cursor: pointer;">{{scope.row.fund_name}}</h4>
            <span>{{scope.row.fund_code}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="netvalue" label="单位净值" width="180" sortable="custom">
          <template slot-scope="scope">
            <h4>{{scope.row.netvalue}}</h4>
            <span>{{scope.row.update_time}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="month_incratio" label="近1月" width="180" sortable="custom">
          <template slot-scope="scope">
            <span :class="scope.row.month_incratio>=0?'zhang':'die'">{{scope.row.month_incratio}}%</span>
          </template>
        </el-table-column>
        <el-table-column prop="quarter_incratio" label="近3月" width="180" sortable="custom">
          <template slot-scope="scope">
            <span :class="scope.row.quarter_incratio>=0?'zhang':'die'">{{scope.row.quarter_incratio}}%</span>
          </template>
        </el-table-column>
        <el-table-column prop="half_year_incratio" label="近6月" width="180" sortable="custom">
          <template slot-scope="scope">
            <span :class="scope.row.half_year_incratio>=0?'zhang':'die'">{{scope.row.half_year_incratio}}%</span>
          </template>
        </el-table-column>
        <el-table-column prop="year_incratio" label="近1年" width="180" sortable="custom">
          <template slot-scope="scope">
            <span :class="scope.row.year_incratio>=0?'zhang':'die'">{{scope.row.year_incratio}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="op buy" v-if="scope.row.can_buy" @click="fundFn(scope.row.fund_code)">购买</div>
            <div class="op nobuy" v-else>暂不能购买</div>
            <div class="shu">|</div>
            <div class="op star" v-if="scope.row.like" @click.stop="likeFn(scope.row.fund_code,!scope.row.like,scope.$index)">已收藏</div>
            <div class="op star" v-else @click.stop="likeFn(scope.row.fund_code,!scope.row.like,scope.$index)">收藏</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" :page-size="15" :total="total" @current-change="pageFn"></el-pagination>
      </div>
    </div>
    <v-footer />
  </div>
</template>

<script>
import sbanner from "@/assets/images/8.png";
import jingxuanimg from "@/assets/images/2.png";
import vHeader from "@/components/header.vue";
import vFooter from "@/components/footer.vue";
export default {
  name: "index",
  data() {
    return {
      banner: [
        "https://picsum.photos/1920/390",
        "https://picsum.photos/1920/390"
      ],
      sbanner: sbanner,
      jingxuanimg: jingxuanimg,
      activeType: "",
      search: "",
      tabList: [],
      tableData: [],
      page: 1,
      orderby: "",
      total:0
    };
  },
  components: {
    vHeader,
    vFooter
  },
  created() {
    this.$SERVER.stock_type_list().then(res => {
      this.tabList = res.data;
    });
    this.getList();
  },
  methods: {
    sortFn(obj) {
      console.log(obj);
      this.orderby = obj.prop+' '+obj.order.replace('ending','')
      this.getList()
    },
    getList() {
      this.$SERVER
        .stock_list({
          page: this.page,
          orderby: this.orderby,
          fund_type: this.activeType,
        })
        .then(res => {
          this.tableData = res.data.list;
          this.total = res.data.count
        });
    },
    pageFn(val){
      this.page = val
      this.getList()
      document.getElementById('jjlist').scrollIntoView();
    },
    fundFn(id){
      this.$router.push('/fund/fundDetail/'+id)
    },    
    likeFn(id, type, index) {
      this.tableData[index].like = !this.tableData[index].like;
      this.$SERVER
        .stock_like_up({
          type: Number(type),
          pro_code: id
        })
        .catch(err => {
          this.tableData[index].like = !this.tableData[index].like;
        });
    }
  }
};
</script>
<style lang="less">
.jingxuan {
  .el-carousel__indicators--horizontal {
    left: auto;
    right: 0;
  }
  .el-carousel__button {
    opacity: 1;
    width: 12px;
    height: 12px;
    background: rgba(230, 230, 230, 1);
    border-radius: 50%;
  }
  .el-carousel__indicator.is-active button {
    background: rgba(84, 152, 255, 1);
  }
}

.jjlist {
  .type {
    .tabs {
      .el-tabs__active-bar,
      .el-tabs__nav-wrap::after {
        display: none;
      }
      .el-tabs__item {
        font-size: 30px;
        font-weight: 800;
        line-height: 36px;
      }
    }
    .search {
      .el-input-group__append {
        background: rgba(255, 89, 65, 1);
        color: #fff;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.grid-content {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 460px;
  height: 340px;
  margin-top: 63px;
  &.grid1 {
    background: url(../assets/images/3.png) no-repeat center center;
    background-size: cover;
  }

  &.grid2 {
    background: url(../assets/images/4.png) no-repeat center center;
    background-size: cover;
  }

  &.grid3 {
    background: url(../assets/images/5.png) no-repeat center center;
    background-size: cover;
  }
  p {
    font-size: 18px;
    font-weight: 400;
    color: rgba(158, 158, 158, 1);
    line-height: 36px;
    margin: 20px;
  }
  h3 {
    font-size: 20px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 36px;
    margin-bottom: 24px;
  }
  h2 {
    font-size: 30px;
    font-weight: bold;
    color: rgba(255, 89, 65, 1);
    line-height: 36px;
    margin-bottom: 29px;
  }
  .tags {
    margin-bottom: 23px;
    span {
      border: 1px solid rgba(224, 224, 224, 1);
      border-radius: 2px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      display: inline-block;
      width: 100px;
      height: 28px;
      line-height: 28px;
      margin: 0 10px;
      text-align: center;
    }
  }
  .btn {
    width: 200px;
    height: 46px;
    background: rgba(81, 150, 255, 1);
    border-radius: 4px;
  }
}
.sbanner {
  display: block;
  margin: 18px auto 42px;
}
.jingxuan {
  background: url(../assets/images/1.png) no-repeat top center;
  padding: 20px 0 40px;
  .title {
    display: flex;
    align-items: baseline;
    margin-bottom: 40px;
    h3 {
      font-size: 34px;
      font-weight: 800;
      color: rgba(255, 255, 255, 1);
      line-height: 36px;
      margin-right: 43px;
    }
    span {
      font-size: 14px;
      font-family: PingFang;
      font-weight: 400;
      color: rgba(84, 152, 255, 1);
      line-height: 36px;
      cursor: pointer;
    }
    p {
      font-size: 18px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 36px;
      cursor: pointer;
    }
    .empty {
      flex-grow: 1;
    }
  }
  .top {
    display: flex;
    height: 400px;
    .img {
      width: 570px;
      height: 400px;
    }
    .right {
      background: #fff;
      flex-grow: 1;
      height: 100%;
    }
    .con {
      padding: 35px 55px;
      .tips {
        font-size: 16px;
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
      p {
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 26px;
        margin-bottom: 56px;
      }
      .bottom {
        display: flex;
        align-items: baseline;
        h2 {
          font-size: 40px;
          font-weight: bold;
          color: rgba(255, 89, 65, 1);
          line-height: 36px;
          margin-right: 10px;
        }
        span {
          font-size: 16px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 36px;
          margin-right: 20px;
        }
        .btn {
          align-self: end;
        }
      }
    }
  }
}
.jjlist {
  margin-top: 34px;
  .type {
    display: flex;
    padding: 42px 32px;
    .tabs {
      flex-grow: 1;
    }
    .search {
      width: 300px;
    }
  }
  .table {
    h4 {      
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    span {
      font-size: 12px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .zhang {
      font-size: 14px;
      font-weight: 400;
      color: rgba(255, 89, 65, 1);
    }
    .die {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 204, 0, 1);
    }
    .shu {
      display: inline-block;
      color: rgba(230, 230, 230, 1);
    }
    .op {
      display: inline-block;
      min-width: 66px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border-radius: 4px;
      cursor: pointer;
      margin: 0 12px;
      &.nobuy {
        color: rgba(153, 153, 153, 1);
        cursor: not-allowed;
      }
      &.buy {
        color: rgba(255, 89, 65, 1);
      }
      &.buy:hover {
        color: #fff;
        background: rgba(255, 89, 65, 1);
      }
      &.star {
        color: rgba(84, 152, 255, 1);
      }
    }
  }
  .pagination {
    padding: 45px 0;
    display: flex;
    flex-flow: row-reverse;
  }
}
</style>