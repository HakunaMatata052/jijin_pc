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
      this.$store.state.token = this.$METHOD.getStore("token");
      if (this.$METHOD.getStore("userInfo")) {
        this.$store.state.userInfo = JSON.parse(
          this.$METHOD.getStore("userInfo")
        );
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>
