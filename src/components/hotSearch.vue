<template>
  <div class="typeModelData">
    <div class="typeModelDataModel" v-for="(item,index) in hotList" :key="index">
      <div class="typeModelDataModelLeft">
        <div class="typeModelDataModelLeftT">{{item.year_incratio}}</div>
        <div class="typeModelDataModelLeftB">年收益</div>
      </div>
      <div class="typeModelDataModelRight">
        <div class="typeModelDataModelRightT">{{item.fund_name}}</div>
        <div class="typeModelDataModelRightB">控制风险 | 海外资产 | 对冲配置</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "hotSearch",
    data(){
return{
    hotList:[]
}
    },
    created(){
            this.$SERVER.hotsearch().then(res => {
      this.hotList = res.data;
    });
    }
};
</script>

<style lang="less" scoped>
.typeModelData {
  padding: 0 20px;
  background: #fff;
  .typeModelDataModel {
    height: 80px;
    display: flex;
    border-bottom: 1px solid rgba(242, 242, 242, 1);
    .typeModelDataModelLeft {
      flex: 1;
    }
    .typeModelDataModelRight {
      flex: 2;
    }
    .typeModelDataModelLeftT,
    .typeModelDataModelRightT {
      font-size: 21px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(255, 89, 65, 1);
      line-height: 18px;
      padding-top: 23px;
    }

    .typeModelDataModelLeftB,
    .typeModelDataModelRightB {
      font-size: 13px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 18px;
      margin-top: 10px;
    }
    .typeModelDataModelRightT {
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
    }
  }
  .typeModelDataModel:nth-last-child(1) {
    border: none;
  }
}
</style>