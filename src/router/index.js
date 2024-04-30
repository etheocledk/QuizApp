import { createRouter, createWebHistory } from 'vue-router';
import QuizMain from '@/components/QuizMain.vue';
import QuizHome from '@/components/QuizHome.vue';

const routes = [
    {
        path: '/',
        component: QuizHome,
    },
    {
        path: '/quiz',
        component: QuizMain,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
