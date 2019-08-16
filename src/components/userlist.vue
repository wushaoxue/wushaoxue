<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="my-heard">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>

    </el-breadcrumb>
    <!--输入框 -->
   
      <el-row>
        <el-col :span="6">
           <el-input placeholder="请输入内容" class="input-with-select" v-model.trim="postparameter.query" @input="getuser"  > 
          <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
   <!-- 第一个格子结束 -->
    
   
        <el-col :span="18">
          <el-button type="success" plain @click=" dialogFormVisible = true">添加用户</el-button>
          </el-input>
        </el-col>
      </el-row>  <!-- 格子结束 -->
          <!-- 列表开始 -->
    <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="username" label="姓名" width="180"></el-table-column>
    <el-table-column prop="email"label="邮箱"width="180"></el-table-column>
    <el-table-column prop="mobile" label="电话"></el-table-column>
    <el-table-column label="用户状态" >
       <template slot-scope="scope"><!-- 自定义列 -->
      <!-- scope.row是这一行绑定的的数据 -->
      <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
    </el-table-column>
    <el-table-column label="操作" >
       <template slot-scope="scope"><!-- 自定义列 -->
    <el-button type="primary" icon="el-icon-edit" plain size="mini" ></el-button>
    <el-button type="danger"  icon="el-icon-delete" plain size="mini" ></el-button>
     <el-button type="warning" icon="el-icon-check" plain size="mini" ></el-button>
        </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="tableData.pagenum"
      :page-sizes="[5, 15, 20, 25]"
      :page-size="tableData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 对话框 -->

    <el-dialog title="增加用户" :visible.sync="dialogFormVisible">
  <el-form :model="form"  :rules="rules"  ref="ruleForm">

    <el-form-item label="用户名" label-width="120px"  prop="username">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="密码" label-width="120px"  prop="password"> 
      <el-input v-model="form.password" autocomplete="off"  show-password></el-input>
    </el-form-item>
     <el-form-item label="邮箱" label-width="120px">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="电话" label-width="120px">
      <el-input v-model="form.mobil" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary"@click="submitForm('ruleForm')">确 定</el-button>
  </div>
</el-dialog>

  </div>
</template>

<script>

// 导入 http
import {users, adduser} from '../../api/http'

export default {
  //  给标识
 name: "users",

  data() {
    
    return {
      dialogFormVisible: false,
       tableData: [{
         
          }],

        // 请求的参数
        postparameter:{
            query:"",
            pagenum:1,
            pagesize:5,
 
      },
      form: {
        username: "",
        password:'',
        email: "",
        mobile: ""
      },
      // 数据总条数
      total:0,
      rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ],
         
        }
    }
    
  },

  methods: {
      //  验证表单后提交
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          //  成功了发请求
            adduser(this.form).then(res=>{
              // console.log(res);
              // 隐藏模板
               this.dialogFormVisible = false;
              //  重新获取user
               this.getuser()
              
            })

          } else {
           
           
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    

     
    // 封装获取 user 事件
    getuser(){
       users(this.postparameter).then(res=>{
      console.log(res);
      // 把用户列表存起来
      this.tableData = res.data.data.users
      // 把数据总条数存起来
      this.total = res.data.data.total
      
    })
    },

    // 容器改变事件
    handleSizeChange(size){
      // 改变页容量
      this.postparameter.pagesize = size
      // 改变了之后 页数从第一页开始
      this.postparameter.pagenum = 1
      // 发请求 (需要封装)
      this.getuser()
    },
    handleCurrentChange(page){
         // 把当前页数修改为你点击的页码
      this.postparameter.pagenum = page
      // 发请求
       this.getuser()
    }
    
  },
  // 一进来就调用
  created(){
     this.getuser()
  }
};
</script>

<style>
.my-heard {
  background-color: #d3dce6;
  height: 45px;
  line-height: 45px;
  padding-left: 15px;
}
</style>