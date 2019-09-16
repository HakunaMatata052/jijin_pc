import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [{
      path: "/",
      name: "index",
      component: () => import("@/views/index.vue"),
      meta: {
        title: "首页",
        isMember: false,
        isLogin: false
      }
    }, {
      path: "/fund",
      name: "fund",
      component: () => import("@/views/fund/fund.vue"),
      meta: {
        title: "基金",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/fund/fundDetail/:id",
      name: "fundDetail",
      component: () => import("@/views/fund/fundDetail.vue"),
      meta: {
        title: "基金详情",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/login/:name?",
      name: "login",
      component: () => import("@/views/login/login.vue"),
      meta: {
        title: "登录",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/buy",
      name: "buy",
      component: () => import("@/views/fund/buy.vue"),
      meta: {
        title: "购买基金",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/buy/buyfund/:id",
      name: "buyfund",
      component: () => import("@/views/fund/buyfund.vue"),
      meta: {
        title: "购买基金详情",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/buysuccess",
      name: "buysuccess",
      component: () => import("@/views/fund/buysuccess.vue"),
      meta: {
        title: "购买成功",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/mine",
      name: "mine",      
      redirect: '/mine/assets',
      component: () => import("@/views/mine/index.vue"),
      meta: {
        title: "个人中心",
        isMember: false,
        isLogin: true
      },
      children:[{
          path: "/mine/assets",
          name: "assets",
          component: () => import("@/views/mine/assets.vue"),
          meta: {
            title: "我的资产",
            isMember: false,
            isLogin: true
          }
        },{
          path: "/mine/transactionRecord",
          name: "transactionRecord",
          component: () => import("@/views/mine/transactionRecord.vue"),
          meta: {
            title: "交易记录",
            isMember: false,
            isLogin: true
          }
        },
        {
          path: "/mine/balanceDetails",
          name: "balanceDetails",
          component: () => import("@/views/mine/balanceDetails.vue"),
          meta: {
            title: "余额明细",
            isMember: false,
            isLogin: true
          }
        },
        {
          path: "/mine/setPayPassword",
          name: "setPayPassword",
          component: () => import("@/views/mine/setPayPassword.vue"),
          meta: {
            title: "设置支付密码",
            isMember: false,
            isLogin: true
          }
        },
        {
          path: "/mine/bankup",
          name: "bankup",
          component: () => import("@/views/mine/bankup.vue"),
          meta: {
            title: "绑定银行卡",
            isMember: false,
            isLogin: true
          }
        },
        {
          path: "/mine/registration",
          name: "registration",
          component: () => import("@/views/mine/registration.vue"),
          meta: {
            title: "实名认证",
            isMember: false,
            isLogin: true
          }
        },
        {
          path: "/mine/aboutus/:type?",
          name: "aboutus",
          component: () => import("@/views/mine/aboutus.vue"),
          meta: {
            title: "关于我们",
            isMember: false,
            isLogin: true
          }
        },
      ]
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.isLogin) {
    if (!window.localStorage.getItem('token')) {
      if (from.name == "login") {
        router.push('/')
      } else {
        router.push('/login/' + from.name)
      }
    } else {
      next()
    }
  } else {
    next()
  }
  if (to.meta.isMember) {
    if (!JSON.parse(window.localStorage.getItem('userInfo')).auth) {
      Toast.fail('请先实名认证后操作！')
      router.push('/registration')
    } else {
      next()
    }
  }
})

export default router;