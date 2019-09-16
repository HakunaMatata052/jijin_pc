<template>
  <div class="balanceDetails">
    <el-table :data="list" v-infinite-scroll="getCapitalFlow" stripe border style="width: 100%">
      <el-table-column prop="mon" label="日期" width="220"></el-table-column>
      <el-table-column prop="time" label="时间" width="220"></el-table-column>
      <el-table-column prop="fee" label="金额"></el-table-column>
      <el-table-column prop="cost_type" label="操作" width="250"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      
      loading: false,
      finished: false,
      page: 1
    };
  },
  created(){
    //  this.getCapitalFlow()
  },
  methods: {
    getCapitalFlow() {
      this.$SERVER
        .my_money({
          page: this.page
        })
        .then(res => {
          this.page++;
          this.loading = false;
          this.account = res.data.account;
          this.list = [...this.list, ...res.data.stock_log];
        })
        .catch(err => {
          this.account = err.data.account;
          this.loading = false;
          this.finished = true;
        });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
