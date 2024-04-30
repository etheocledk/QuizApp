/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue';
import App from './App.vue';
import { Icon } from '@iconify/vue';
import router from './router';
import { createPinia } from 'pinia';
import './assets/main.css'; 
import './registerServiceWorker'

const app = createApp(App);
app.use(router);
app.component('Icon', Icon);
app.use(createPinia());
app.mount('#app');

