<template>
  <div class="header">
    <div class="top">
      <div class="container">
        <div class="con">
          <span v-if="$METHOD.getStore('token')">你好，{{$store.state.userInfo.user_nickname}}</span>
          <span v-else @click="$router.push('/login')">你好，请登录</span>
          <span>免费注册</span>
          <span>基金收藏</span>
          <span>邀请有礼</span>
          <span>市场研报</span>
          <span>免费注册</span>
          <span>
            <el-dropdown>
              <span class="el-dropdown-link">
                手机基金
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">sd</el-dropdown-menu>
            </el-dropdown>
          </span>

          <span>
            <el-dropdown>
              <span class="el-dropdown-link">
                联系客服
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">sd</el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="bottom">
        <div class="logo"></div>
        <div class="nav">
          <ul>
            <li v-for="(item,index) in nav" :key="index" @click="$router.push(item.path)">{{item.name}}</li>
          </ul>
        </div>
        <div class="search">
          <el-input v-model="value" placeholder="基金名称 / 代码 / 基金经理">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button class="btn">
            <i class="iconfont icon-yonghu"></i>
            <i slot="suffix" class="el-icon-user"></i>我的账户
            <i class="el-icon-arrow-right el-icon--right"></i>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav:[
        {
          name:'首页',
          path:'/'
        },
        {
          name:'基金',
          path:'/fund'
        },
        {
          name:'现金宝',
          path:'/'
        },
        {
          name:'收益',
          path:'/'
        },
        {
          name:'我的',
          path:'/'
        },
      ],
      value:""
    };
  }
};
</script>
<style lang="less">
.header {
  .search {
    .el-input__inner {
      height: 36px;
      border: 0;
      background: rgba(245, 245, 245, 1);
    }
  }
}
</style>
<style lang="less" scoped>
.header {
  .top {
    height: 39px;
    background: rgba(255, 255, 255, 1);
    border-bottom: 1px solid #eee;
    overflow: hidden;
    .con {
      float: right;
      & > span {
        font-size: 14px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 36px;
        margin-right: 18px;
        padding-left: 18px;
        border-left: 1px solid #eee;
        &:first-child {
          border-left: 0;
        }
      }
    }
  }
  .bottom {
    height: 100px;
    display: flex;
    align-items: center;
  }
  .nav {
    flex-grow: 1;
    ul > li {
      float: left;
      margin-right: 50px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 36px;
      cursor: pointer;
      &.active {
        color: rgba(81, 150, 255, 1);
      }
    }
  }
  .search {
    display: flex;
    align-items: center;
    .btn {
      width: 170px;
      height: 36px;
      margin-left: 20px;
      padding: 0 15px;
    }
  }
}
</style>