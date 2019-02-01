<template>
  <el-card>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="search">
      <el-col :span="8">
        <el-input placeholder="请输入内容" class="input-with-select" v-model="search">
          <el-button slot="append" icon="el-icon-search" @click="SearchKey()"></el-button>
        </el-input>
      </el-col>
      <el-col :span="16">&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="success" plain class="mybtns" @click="addDialog = true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话" ></el-table-column>
      <el-table-column prop="status" label="用户状态" width="60">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isTrue" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
          <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini" ></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
            <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
          </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5,10]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      pagesize:5,
      pagenum:1,
      total:0,
      tableData:[],
    
    };
  },
  methods: {
    async getUsersList() {
      var res = await this.$http.get(`/users?pagesize=${this.pagesize}&pagenum=${this.pagenum}`,{
          headers:{
              Authorization:window.localStorage.getItem('token')
          }
      });
      console.log(res);
      const{meta,data}=res.data
      if(meta.status==200){
          this.$message({
              message:meta.msg,
              type:'success'
          })
          this.tableData=data.users
      }else{
          this.$message.error(meta.msg)
      }
    }
  },
  mounted() {
    this.getUsersList();
  }
};
</script>

<style>
.search {
  margin: 6px 0;
}
</style>
