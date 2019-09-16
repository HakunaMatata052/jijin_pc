<template>
  <div class="fund">
    <v-header />
    <div class="main">
      <div class="container">
        <div class="userinfo">
          <img :src="$store.state.userInfo.user_img || user_img" />
          <h2>英特尔大师</h2>
          <i class="el-icon-edit-outline"></i>
        </div>
        <div class="mine box-shadow">
          <div class="mine-sidebar">
            <el-menu :default-active="item.path" v-for="(item,index) in nav" :key="index" router>
              <el-menu-item :index="item.path">
                <span slot="title">
                  {{item.name}}
                  <i class="el-icon-arrow-right"></i>
                </span>
              </el-menu-item>
            </el-menu>
          </div>
          <div class="mine-con">
            <router-view />
          </div>
        </div>
      </div>
    </div>
    <v-footer />
  </div>
</template>

<script>
import vHeader from "@/components/header.vue";
import vFooter from "@/components/footer.vue";
import user_img from "@/assets/images/default.png";
export default {
  name: "fund",
  components: {
    vHeader,
    vFooter
  },
  data() {
    return {
      user_img: user_img,
      nav: [
        {
          name: "我的资产",
          path: "/mine/assets"
        },
        {
          name: "交易记录",
          path: "/mine/transactionRecord"
        },
        {
          name: "修改支付密码",
          path: "/mine/setPayPassword"
        },
        {
          name: "修改登录密码",
          path: "/"
        },
        {
          name: "绑定银行卡",
          path: "/mine/bankup"
        },
        {
          name: "实名认证",
          path: "/mine/registration"
        },
        {
          name: "修改绑定手机",
          path: "/"
        },
        {
          name: "在线客服",
          path: "/"
        },
        {
          name: "关于我们",
          path: "/mine/aboutus/1"
        }
      ]
    };
  },
  created() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.userinfo {
  display: flex;
  align-items: flex-end;
  padding: 38px 0;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 20px;
    background: #ccc;
  }
  h2 {
    font-size: 28px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    margin-right: 10px;
  }
  i {
    color: rgba(204, 204, 204, 1);
  }
}
.mine {
  background: #fff;
  display: flex;
  .mine-sidebar {
    background: RGBA(246, 250, 255, 1);
    width: 250px;
    padding: 40px 0;
    ul {
      background-color: RGBA(246, 250, 255, 1);
      border-right:0;
      li {
        width: 250px;
        height: 65px;
        line-height: 65px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        position: relative;
        text-align: center;
        cursor: pointer;
        i {
          position: absolute;
          right: 20px;
          font-size: 18px;
          top: 24px;
        }
        &.active {
          background: rgba(84, 152, 255, 0.1);
        }
      }
    }
  }
  .mine-con {
    flex-grow: 1;
    padding: 40px 50px;
  }
}
</style>