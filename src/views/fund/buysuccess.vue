<template>
  <div class="fund">
    <v-header />
    <div class="main">
      <div class="container">
        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp"
          >{{activity.content}}</el-timeline-item>
        </el-timeline>
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
      reverse: true,
      activities: [
        {
          content: `成功买入${this.$store.state.buysuccess.money}元`,
          timestamp: this.$store.state.buysuccess.fund_name
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
</style>