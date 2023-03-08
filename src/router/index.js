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
    }
    // {
    //     patch: '/axios',
    //     component: AxiosDemo
    // }
    // { patch: '/:pathMatch(.*)*', component: Error }

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router