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
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="status" label="用户状态" width="60">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="(val)=>{changeStatus(val,scope.row.id)}"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            size="mini"
            @click="editUser(scope.row.id)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
            @click="delUser(scope.row.id)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            plain
            size="mini"
            @click="getUser(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[5,10]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 新增用户的弹框addDialog -->
    <el-dialog title="新增用户" :visible.sync="addDialog">
      <el-form :model="addObj" label-position="right" :rules="rules">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="addObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password">
          <el-input v-model="addObj.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input v-model="addObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="80px" prop="mobile">
          <el-input v-model="addObj.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clearDailog()">取 消</el-button>
        <el-button type="primary" @click="addSure()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户的弹框editDialog-->
    <el-dialog title="编辑用户" :visible.sync="editDialog">
      <el-form :model="editObj" label-position="right">
        <el-form-item label="用户名" label-width="80px">
          <el-input :disabled="true" v-model="editObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px">
          <el-input v-model="editObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="80px">
          <el-input v-model="editObj.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色的弹框roleDialog -->
    <el-dialog title="分配角色" :visible.sync="roleDialog">
      <el-form :model="roleObj" label-position="right">
        <el-form-item label="用户名" label-width="80px">
          <el-input :disabled="true" v-model="roleObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择角色" label-width="80px">
          <!-- {{roleObj.rid}} -->
          <el-select v-model="roleObj.rid" placeholder="请选择">
            <el-option label="请选择角色" :value="-1"></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialog = false">取 消</el-button>
        <el-button type="primary" @click="roleDialog = false,setRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      pagesize: 5,
      pagenum: 1,
      total: 0,
      tableData: [],
      addDialog: false,
      editDialog: false,
      roleDialog: false,
      addObj: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      editObj: {},
      roleObj: {},
      roleList: [],
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        
      }
    };
  },
  methods: {
    async getUsersList() {
      var res = await this.$http.get(
        `/users?pagesize=${this.pagesize}&pagenum=${this.pagenum}`,
        {
          headers: {
            Authorization: window.localStorage.getItem("token")
          }
        }
      );
      console.log(res);
      const { meta, data } = res.data;
      if (meta.status == 200) {
        this.tableData = data.users;
        this.total = data.total;
      } else {
        this.$message.error(meta.msg);
      }
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
      this.getUsersList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getUsersList();
    },
    // 搜索按钮
    async SearchKey() {
      console.log(1);
      var res = await this.$http.get(
        `/users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${
          this.search
        }`,
        {
          headers: {
            Authorization: window.localStorage.getItem("token")
          }
        }
      );
      const { meta, data } = res.data;
      if (meta.status == 200) {
        this.tableData = res.data.data.users;
        this.total = data.total;
      } else {
        this.$message({
          message: meta.msg,
          type: "error"
        });
      }
    },
   clearDailog() {
      this.addDialog = false;
      this.addObj = {};
    },
    // 添加用户弹框的确定按钮
    async addSure() {
      // this.addDialog = false;
      var res = await this.$http.post(`/users`, this.addObj, {
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      const { meta, data } = res.data;
      if (meta.status == 201) {
        this.$message({
          message: meta.msg,
          type: "success"
        });
        this.getUsersList();
        this.addObj = {};
      } else {
        this.$message({
          message: meta.msg,
          type: "error"
        });
      }
    },
    // 改变用户状态
    async changeStatus(val, id) {
      var res = await this.$http.request({
        url: `/users/${id}/state/${val}`,
        method: "put",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      console.log(res);
      const { meta, data } = res.data;
      if (meta.status == 200) {
        this.$message({
          message: meta.msg,
          type: "success"
        });
      } else {
        this.$message({
          message: meta.msg,
          type: "error"
        });
      }
    },
    //编辑用户
    async editUser(id) {
      this.editDialog = true;
      var res = await this.$http.request({
        url: `/users/${id}`,
        type: "get",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });

      const { meta, data } = res.data;
      if (meta.status == 200) {
        this.editObj = data;
      } else {
        this.$message({
          message: meta.msg,
          type: "error"
        });
      }
    },
    // 编辑用户之后提交数据
    async updateUser() {
      var res = await this.$http.request({
        url: `/users/${this.editObj.id}`,
        method: "put",
        data: {
          email: this.editObj.email,
          mobile: this.editObj.mobile
        },
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      const { meta } = res.data;
      if (meta.status == 200) {
        this.$message({
          message: meta.msg,
          type: "success"
        });
        console.log(this.editObj.id);
        this.editObj = {};
        this.getUsersList();
      } else {
        this.$message({
          message: meta.msg,
          type: "error"
        });
      }
      this.editObj = {};
      this.getUsersList();
    },
    // 删除单个用户
    delUser(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          var res = await this.$http.request({
            url: `/users/${id}`,
            method: "delete",
            headers: {
              Authorization: window.localStorage.getItem("token")
            }
          });
          console.log(res);
          const { meta, data } = res.data;
          if (meta.status == 200) {
            this.getAllList();
          }
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 分配角色按钮
    async getRoleList() {
      var res = await this.$http.request({
        url: "/roles",
        method: "get",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      console.log(res);
      const { meta, data } = res.data;
      if (meta.status == 200) {
        this.roleList = data;
        console.log(this.roleList);
        // 下拉菜单option选项的数据是遍历roleList得到的roleName
      } else {
        this.$message({
          message: meta.msg,
          type: "error"
        });
      }
    },
    // 获取角色,获取的数据里有一个rid角色id,下拉框v-model绑定了roleObj.rid
    async getUser(id) {
      this.roleDialog = true;
      var res = await this.$http.request({
        url: `/users/${id}`,
        type: "get",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      const { meta, data } = res.data;
      if (meta.status == 200) {
        this.roleObj = data;
      } else {
        this.$message({
          message: meta.msg,
          type: "error"
        });
      }
      this.getRoleList();
    },
    // 提交设置的角色
    // 提交设置的角色
    async setRole() {
      var res = await this.$http.request({
        url: `users/${this.roleObj.id}/role`,
        method: "put",
        headers: {
          Authorization: window.localStorage.getItem("token")
        },
        data: {
          rid: this.roleObj.rid
        }
      });
      var { meta } = res.data;
      if (meta.status === 200) {
        this.$message({
          message: meta.msg,
          type: "success"
        });
        this.roleDialog = false;
        this.getAllList();
      } else {
        this.$message.error(meta.msg);
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
