// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')



import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

app.use(createPinia())
app.use(router)
createApp(App).mount('#app')