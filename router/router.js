import Vue from 'vue'


Vue.config.productionTip = false





// 导入路由
import VueRouter from 'vue-router'
// use一下
Vue.use(VueRouter)
// 让axios 发送带 cooki




// 全局首位



// 导入 组件
import login from "../src/components/login.vue"
import index from "../src/components/index.vue"
import user from "../src/components/userlist.vue"



// 准备规则
const routes = [

  {path:"/login",component:login},
  {path:"/index",component:index,children:[
      {path:'/users',component:user}
  ]},
  // 设置一开始就显示 login组件
  {path:"",redirect:'/login'},
  
 

  
]

// 创造路由对象
const router = new VueRouter({
  routes
})

// 路由守卫


router.beforeEach((to, from, next) => {
    if(to.path.indexOf('index')!=-1){
        if(window.localStorage.getItem('token')){
            next()
        }else{
            Vue.prototype.$message.error("请先登录")
            router.push('/login')
        }
    }else{
        next()
    }
})

// 

export default router