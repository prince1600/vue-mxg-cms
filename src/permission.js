/*
* 权限校验
* 使用VueRouter中的前置钩子函数 beforeEach((to, from, next)=>{})
* to: 将要进入的路由对象
* from: 将要离开的路由对象
* next: 一个方法，可以指定一个路由地址，进行跳转
*/
import router from "./router";
import {getUserInfo} from '@/api/login'

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('user-token')
    if (!token) {
        if (to.path=='/login') {
            next()
        } else {
            next({path: '/login'}) //自定义路径跳转，会继续调用钩子函数，一定要做后续处理，否则会死循环
        }
        
    }else {
        if (to.path == '/login') {
            next({path: '/'})
        }else {
            next()
        }
    }
    
    
})