<template>
  <div class="fund">
    <h1>{{data.title}}</h1>
    <el-divider></el-divider>
    <div class="content">{{data.content}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    };
  },
  created() {
    this.$SERVER
      .Publiccon({
        type: this.$route.params.type
      })
      .then(res => {
        document.title = res.data[0].title;
        this.data = res.data[0];
      });
  }
};
</script>

<style lang="less" scoped>
.fund {
  h1 {
    text-align: center;
  }
  .content {
    font-size: 16px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 30px;
    text-indent: 2em;
  }
}
</style>