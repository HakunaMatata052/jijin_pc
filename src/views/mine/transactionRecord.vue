<template>
  <div class="transactionrecords">
    <el-divider v-if="list.length==0">没有交易记录</el-divider>
    <div
      class="transactionrecordsM box-shadow"
      :ref="'item'+index"
      v-for="(value, key,index) in  list"
      :key="index"
    >
      <div class="data">{{key}}</div>
      <div
        class="transactionrecordsList"
        v-for="(item,i) in value"
        :key="i"
        @click="$router.push('/buy/buyfund/'+item.order_id)"
      >
        <div class="transactionrecordsL">
          <p>{{item.status}}</p>
        </div>
        <div class="transactionrecordsC">
          <p>{{item.stock_name}}</p>
          <p>{{item.createtime}}</p>
        </div>
        <div class="transactionrecordsR">
          <p>{{item.liquidation_amount}}元</p>
          <p>{{item.yuji}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "transactionrecords",
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$SERVER.deallog().then(res=>{
        this.list = res.data
      });
    }
  }
};
</script>

<style lang="less" scoped>
.transactionrecordsM {
  margin-top: 15px;
  background: rgba(255, 255, 255, 1);
  .data {
    background: rgba(255, 255, 255, 1);
    width: 375px;
    height: 50px;
    font-size: 13px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    line-height: 50px;
    padding: 0 16px;
  }
  .transactionrecordsList {
    display: flex;
    align-items: center;
    height: 70px;
    border-top: 1px solid rgba(242, 242, 242, 1);
    border-bottom: 1px solid rgba(242, 242, 242, 1);
    padding: 0 16px;
    .transactionrecordsL {
      flex-shrink: 0;
      margin-right: 6px;
      p {
        width: 30px;
        height: 30px;
        background: rgba(255, 89, 65, 1);
        border-radius: 50%;
        font-size: 10px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 30px;
        text-align: center;
      }
    }
    .transactionrecordsC {
      flex-grow: 1;
      overflow: hidden;
      p:nth-child(1) {
        font-size: 15px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 10px 0 5px;
      }
      p:nth-child(2) {
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 18px;
      }
    }
    .transactionrecordsR {
      flex-shrink: 0;
      p:nth-child(1) {
        font-size: 15px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 18px;
        text-align: right;
        margin: 10px 0 5px;
      }
      p:nth-child(2) {
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(81, 150, 255, 1);
        line-height: 18px;
        text-align: right;
      }
    }
  }
}
</style>