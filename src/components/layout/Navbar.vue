<template>
  <div class="">
    <el-menu :default-active="activeIndex" class="navbar-tag" mode="horizontal" @select="handleSelect"
    background-color="gray" text-color="white" active-text-color="orange">
      <el-menu-item index="1">豆瓣</el-menu-item>
      <el-menu-item index="2">读书</el-menu-item>
      <el-menu-item index="3">电影</el-menu-item>
      <el-menu-item index="4">音乐</el-menu-item>   
      <el-menu-item index="5">同城</el-menu-item>
      <el-menu-item index="6">小组</el-menu-item>
      <el-menu-item index="7">阅读</el-menu-item>
      <el-menu-item index="8" style="padding-top:7px ">FM</el-menu-item>
      <el-menu-item index="9">时间</el-menu-item>
      <el-menu-item index="10">市集</el-menu-item>
      <el-menu-item index="11">更多</el-menu-item>
      <el-menu-item index="12">订单管理</el-menu-item>
      <div class="rightfloat">
        <el-menu-item index="13">下载豆瓣客户端</el-menu-item>
        <el-menu-item index="14">登录</el-menu-item>
        <el-menu-item index="15">注册</el-menu-item>
      </div>
    </el-menu>
    <el-row style="background:#f2f2f2;height:100px" class="navbar-search" :gutter="20">
      <div class="center">
      <el-button type="text" style="font-size:32px;float:left;width:127px">我的主页</el-button>
      <div class="span-search"> 
        <el-input placeholder="请输入内容" v-model="input1">   
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      </div>
    </el-row>
    <div  class="center">
    <el-menu :default-active="activeIndex" class="navbar-title" mode="horizontal" @select="handleSelect"
     text-color="gray" active-text-color="orange">
      <router-link to="/i18n"><el-menu-item index="1">国际化</el-menu-item></router-link> 
      <router-link to="/editor"><el-menu-item index="2">富文本</el-menu-item></router-link> 
      <router-link to="/vuex"><el-menu-item index="3">vuex</el-menu-item></router-link>
      <el-menu-item index="4">专题</el-menu-item>   
      <el-menu-item index="5">排行榜</el-menu-item>
      <el-menu-item index="6">分类浏览</el-menu-item>
      <el-menu-item index="7">乐评</el-menu-item>
      <el-menu-item index="8">豆瓣FM</el-menu-item>
      <el-menu-item index="9">歌单</el-menu-item>
      <el-menu-item index="10">阿比鹿音乐奖</el-menu-item>     
    </el-menu>
    </div>
  </div>
</template>

<script>
export default {
    name:"navbar",
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        input1:''
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
.navbar-tag .el-menu-item {
    float: left;
    list-style: none;
    cursor: pointer;
    padding: 4px 15px;
    line-height: 30px;
    height: 35px;
}
.rightfloat {
    float: right;
}
.center{
   margin: auto;
  width: 1040px;
}


.span-search{
  width: 460px;
}

.navbar-title .el-menu-item {
    float: left;
    list-style: none;
    cursor: pointer;
    padding: 4px 15px;
    line-height: 30px;
    height: 35px;
}
</style>
