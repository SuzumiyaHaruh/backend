import {createRouter, createWebHistory} from "vue-router"
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'
import Products from '../pages/Products.vue'
import Orders from '../pages/Orders.vue'
import Coupon from '../pages/Coupon.vue'
import {getToken} from "../util/cookie.js";

import {checkLogout} from "../api/login.js";

const routes = [
    {
        path: "/:catchAll(.*)", // 不识别的path自动匹配404
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/admin',
        name: '/admin',
        component: Dashboard,
        children: [
            {
                path: '/admin/products',
                name: '/products',
                component: Products
            },
            {
                path: '/admin/orders',
                name: '/orders',
                component: Orders
            },
            {
                path: '/admin/coupon',
                name: '/coupon',
                component: Coupon
            }
        ]
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    const token = getToken();
    if (to.path === '/login' || to.path === '/') {
        next();
    } else {
        if (token) {
            checkLogout().then(r => {
                if (r.data.success) {
                    next();
                } else {
                    next('/login');
                }
            })
        } else {
            next('/login');
        }
    }
});
export default router
