<template>
  <div class="fund">
    <v-header />
    <div class="main">
      <div class="container">
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
    };
  },
  created() {

  },
  methods: {

  }
};
</script>
<style lang="less" scoped>
</style>