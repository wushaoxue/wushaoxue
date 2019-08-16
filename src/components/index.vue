<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="/static/logo.png" alt />
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <div class="title">电商后台管理系统</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <a href="#" @click.prevent="logout" class="logout-btn">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-row class="tac">
        <el-col :span="12">
          <el-menu class="el-menu-vertical-demo" unique-opened router>

            <el-submenu :index=" '' +index"  v-for="(item, index) in menuList" :key="index">
              <template slot="title">
                <i class="el-icon-location" ></i>
                <span>{{ item.authName }}</span>
              </template>
              
             
                <el-menu-item :index="subItem.path" v-for="subItem in item.children">
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{ subItem.authName }}</span>
                </el-menu-item>
             
            </el-submenu>


          </el-menu>
        </el-col>
      </el-row>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { menus } from "../../api/http";
export default {
  name: "index",
  data() {
    return {
      menuList: []
    };
  },

  methods: {
    logout() {
      this.$confirm("是否要退出系统？", "退出提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      }).then(() => {
        this.$message({
          type: "success",
          message: "退出成功!"
        });
        // 删掉token
        window.localStorage.removeItem("token");
        this.$router.push("/login");
      });
    }
  },

  created() {
    menus().then(res => {
      // console.log(res);

      this.menuList = res.data.data;
    });
  }
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  padding: 0;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-header .title {
  color: #fff;
  font-size: 24px;
  height: 100%;
  line-height: 60px;
}

.logout-btn {
  position: absolute;
  right: 10px;
  color: orange;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  padding-top: 0;
}
.el-container {
  height: 100%;
}

/* 侧边导航 */
.el-menu {
  width: 200px;
  height: 100%;
}
</style>
