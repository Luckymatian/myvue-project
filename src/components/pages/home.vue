<template>
  <el-container>
      <!-- 头部 -->
    <el-header>
       <el-row>
          <el-col :span="4">
            <div>
              <img src="@/assets/images/logo.png">
            </div>
          </el-col>
          <el-col :span="16">
            <div>
              <h2>电商后台管理系统</h2>
            </div>
          </el-col>
          <el-col :span="4">
            <div>
              <a href="#" @click.prevent="logout()">退出</a>
            </div>
          </el-col>
        </el-row>
    </el-header>
    <el-container>
    <!-- 左侧菜单栏 -->
      <el-aside width="200px">
          <el-menu
        :unique-opened='true'
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item index="1-1">
             <i class="el-icon-star-off"></i>
            <span>用户列表</span> 
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="2-1">
             <i class="el-icon-star-off"></i>
            <span>角色列表</span> 
        </el-menu-item>
        <el-menu-item index="2-2">
             <i class="el-icon-star-off"></i>
            <span>权限列表</span> 
        </el-menu-item>
      </el-submenu>
       <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="3-1">
         <i class="el-icon-star-off"></i>
            <span>商品列表</span> 
        </el-menu-item>
        <el-menu-item index="3-2">
             <i class="el-icon-star-off"></i>
            <span>分类参数</span> 
        </el-menu-item>
        <el-menu-item index="3-3">
            <i class="el-icon-star-off"></i>
            <span>商品分类</span> 
        </el-menu-item>
        
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item index="4-1">
             <i class="el-icon-star-off"></i>
            <span>订单列表</span> 
        </el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item index="5-1">
             <i class="el-icon-star-off"></i>
            <span>数据报表</span> 
        </el-menu-item>
   
        
      </el-submenu>
    
    </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    methods:{
        logout(){}
    }
};
</script>

<style>
.home {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  color: #fff;
  font-weight: 500;
  padding: 0;
  background-color: #b3c0d1;
  line-height: 60px;
  text-align: center;
}
.el-header a {
  text-decoration: none;
  color: #fff;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}
/* 侧边栏 */
.el-menu-vertical-demo{
    height: 100%;
}
</style>
