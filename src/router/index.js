// // import Vue from 'vue'
// import VueRouter from 'vue-router'
// // import About from './components/About.vue'
// import Home from './components/Todos.vue'

// // 

// export const router = new VueRouter({
//     routes: [
//         { path: '/', component: Home },
//         // { path: '/about', component: About }
//     ]
// })

// import AppVue from "../App.vue";
import { createRouter, createWebHistory } from "vue-router";
// import Todos from '../components/Todos'
// import App from '../App.vue'
// import AxiosDemo from '../components/'
import Login from '../components/Login.vue'

import Demo_vuetifyVue from "@/components/Demo_vuetify.vue";

import Login2 from "../components/demo/Login.vue"
import BaocaoVue from "@/components/Baocao.vue";
import ProfileVue from "@/components/Profile.vue";

import TinTuc from "@/components/Tintuc.vue"
import demo_computedVue from "@/components/demo/demo_computed.vue";
import QL_CanBoVue from "@/components/QL_CanBo.vue";
import dateVue from "@/components/demo/date.vue";
// import table from "../components/demo/table.vue"
import demo_tabe from "@/components/demo/demo_tabe.vue";
// import Table
// import QL_CanBoVue from "@/components/QL_CanBo.vue";

const routes = [{ /// sử dụng router hạn chế dùng thẻ a mà nên dùng router-link  vì thẻ a sẽ khiến trang bị load lại
        path: '/',
        component: Login
    },
    {
        path: '/ay',
        component: Demo_vuetifyVue
    },
    {
        path: '/login',
        component: Login2
    },
    {
        path: '/baocao',
        component: BaocaoVue
    },
    {
        path: '/profile',
        component: ProfileVue
    },
    {

        path: '/QLTinTuc',
        component: TinTuc
    },
    {

        path: '/demo_computed',
        component: demo_computedVue
    },
    {
        path:'/canbo',
        component:QL_CanBoVue
    },
    {
        path:"/date",
        component:dateVue
    },
    {
        path:"/table",
        component: demo_tabe
    }

    

    // {
    //     patch: '/axios',
    //     component: AxiosDemo
    // }
    // { patch: '/:pathMatch(.*)*', component: Error } // lỗi đườn dẫn

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router