<template>
  <el-container>
      <!-- 头部 -->
       <el-header>

    <Top/>
       </el-header>
    <el-container>
    <!-- 左侧菜单栏 -->
     <LeftAside/>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Top from '@/layout/top.vue'
import  LeftAside from '@/layout/leftaside.vue'
export default {
    components:{
        Top,
        LeftAside
    }
};
</script>

<style>

/* 侧边栏 */
.el-menu-vertical-demo{
    height: 100%;
}
</style>
