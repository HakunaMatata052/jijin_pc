<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.setVux();
  },
  methods: {
    setVux() {
      if (this.$METHOD.getStore("token")) {
        this.$store.state.token = this.$METHOD.getStore("token");
        this.$SERVER.getUserinfo().then(res=>{
          this.$store.state.userInfo = res.data
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>
