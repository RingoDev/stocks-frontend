import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';
import {store} from '@/store'


import NotFound from '@/views/NotFoundPage.vue';
import Logout from '@/views/Pages/Logout.vue';


const routes = [
    {
        path: '/',
        name:'home',
        redirect: 'dashboard',
        component: DashboardLayout,

        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                beforeEnter(to, from, next) {
                    if (!store.getters.loggedIn) next({name: 'auth'})
                    // allow all other routes
                    else next()
                },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue')
            },
            {
                path: '/logout',
                name: 'logout',
                beforeEnter(to, from, next) {
                    if (!store.getters.loggedIn) next({name: 'auth'})
                    // allow all other routes
                    else next()
                },
                component: Logout,
            },
            {
                path: '/icons',
                name: 'icons',
                beforeEnter(to, from, next) {
                    if (!store.getters.loggedIn) next({name: 'auth'})
                    // allow all other routes
                    else next()
                },
                component: () => import(/* webpackChunkName: "demo" */ '../views/Icons.vue')
            },
            {
                path: '/profile',
                name: 'profile',
                beforeEnter(to, from, next) {
                    if (!store.getters.loggedIn) next({name: 'auth'})
                    // allow all other routes
                    else next()
                },
                component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/UserProfile.vue')
            },
            {
                path: '/maps',
                name: 'maps',
                beforeEnter(to, from, next) {
                    if (!store.getters.loggedIn) next({name: 'auth'})
                    // allow all other routes
                    else next()
                },
                component: () => import(/* webpackChunkName: "demo" */ '../views/GoogleMaps.vue')
            },
            {
                path: '/tables',
                name: 'tables',
                beforeEnter(to, from, next) {
                    if (!store.getters.loggedIn) next({name: 'auth'})
                    // allow all other routes
                    else next()
                },
                component: () => import(/* webpackChunkName: "demo" */ '../views/RegularTables.vue')
            }
        ]
    },
    {
        path: '/auth',
        name: 'auth',
        redirect: 'login',
        component: AuthLayout,
        beforeEnter(to, from, next) {
            if (store.getters.loggedIn) next({path: '/dashboard'})
            // allow all other routes
            else next()

        },
        children: [
            {
                path: '/login',
                name: 'login',
                component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Login.vue')
            },
            {
                path: '/register',
                name: 'register',
                component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Register.vue')
            },
        ]
    },
    {path: '*', component: NotFound}
];

export default routes;
