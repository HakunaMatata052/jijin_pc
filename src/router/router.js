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
      path: "/buysuccess",
      name: "buysuccess",
      component: () => import("@/views/fund/buysuccess.vue"),
      meta: {
        title: "购买成功",
        isMember: false,
        isLogin: false
      }
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