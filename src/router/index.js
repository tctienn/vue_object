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

import { createRouter, createWebHistory } from "vue-router";
import App from '../App.vue'
import AxiosDemo from '../components/Header.vue'
const routes = [{ /// sử dụng router hạn chế dùng thẻ a mà nên dùng router-link  vì thẻ a sẽ khiến trang bị load lại
        patch: '/home',
        component: App
    },
    {
        patch: '/axios',
        component: AxiosDemo
    }
    // { patch: '/:pathMatch(.*)*', component: Error }

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router