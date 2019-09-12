<template>
  <div class="fund">
    <v-header />
    <div class="main">
      <div class="container list" id="container">
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
        </div>
        <el-table
          :data="tableData"
          class="table box-shadow"
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
              <span
                :class="scope.row.quarter_incratio>=0?'zhang':'die'"
              >{{scope.row.quarter_incratio}}%</span>
            </template>
          </el-table-column>
          <el-table-column prop="half_year_incratio" label="近6月" width="180" sortable="custom">
            <template slot-scope="scope">
              <span
                :class="scope.row.half_year_incratio>=0?'zhang':'die'"
              >{{scope.row.half_year_incratio}}%</span>
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
              <div class="op star" v-else  @click.stop="likeFn(scope.row.fund_code,!scope.row.like,scope.$index)">收藏</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="15"
            :total="total"
            @current-change="pageFn"
          ></el-pagination>
        </div>
      </div>
    </div>
    <v-footer />
  </div>
</template>

<script>
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
      activeType: "",
      tabList: [],
      tableData: [],
      page: 1,
      orderby: "",
      total: 0
    };
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
      this.orderby = obj.prop + " " + obj.order.replace("ending", "");
      this.getList();
    },
    getList() {
      this.$SERVER
        .stock_list({
          page: this.page,
          orderby: this.orderby,
          fund_type: this.activeType
        })
        .then(res => {
          this.tableData = res.data.list;
          this.total = res.data.count;
        });
    },
    pageFn(val) {
      this.page = val;
      this.getList();
      document.getElementById("container").scrollIntoView();
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
    },
    fundFn(id){
      this.$router.push('/fund/fundDetail/'+id)
    }
  }
};
</script>
<style lang="less">
.fund {
  .type {
    .tabs {
      padding: 42px;
      .el-tabs__active-bar,
      .el-tabs__nav-wrap::after {
        display: none;
      }
      .el-tabs__item {
        font-size: 16px;
        line-height: 36px;
        color: #fff;
      }
      .el-tabs__item.is-active {
        font-size: 40px;
        color: rgba(255, 255, 255, 1);
        line-height: 36px;
      }
    }
  }
}
</style>
<style lang="less" scoped>
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
</style>