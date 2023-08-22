import { createRouter,createWebHashHistory } from "vue-router";
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        meta:{
            title: '登录'
        },
        component: () => import('../view/Login.vue')
    },
]
const router = createRouter({
    history:createWebHashHistory(),
    routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    //修改页面 title
    if (to.meta.title) {
        document.title = '知否课堂后台管理系统 - ' + to.meta.title
    }
    // 登录界面
    if (to.path === '/login') {
        return next()
    }
    // 获取token
    const token = sessionStorage.getItem('token')
    if(!token){
        return next('/login')
    } else{
        next()
    }
    return next()
})

// 导出路由
export default router