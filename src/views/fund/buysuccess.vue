<template>
  <div class="fund">
    <v-header />
    <div class="main">
      <div class="container">
        <h1 class="title">支付成功</h1>
        <div class="buysuccess box-shadow">
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :type="activity.type"
              size="large"
              :timestamp="activity.timestamp"
            >{{activity.content}}</el-timeline-item>
          </el-timeline>
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
  name: "buysuccess",
  components: {
    vHeader,
    vFooter
  },
  data() {
    return {
      reverse: false,
      activities: [
        {
          content: `成功买入${this.$store.state.buysuccess.money}元`,
          timestamp: this.$store.state.buysuccess.fund_name,
          type: 'primary',
        },
        {
          content: `份额确认，开始产生收益`,
          timestamp: this.$store.state.buysuccess.yuji_chengjiao
        },
        {
          content: `可查看收益`,
          timestamp: this.$store.state.buysuccess.yuji_shouyi
        }
      ]
    };
  },
  created() {},
  methods: {}
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
.buysuccess {
  padding: 30px 40px;
  background: #fff;
}
</style>