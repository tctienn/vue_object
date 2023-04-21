// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')



import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';


const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App);
app.use(createPinia())
    .use(vuetify)
    .use(router).component('EasyDataTable', Vue3EasyDataTable)
    .mount('#app')