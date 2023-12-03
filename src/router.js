// router.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeScreenComponent from './components/HomeScreenComponent.vue';
import SearchScreen from './components/SearchScreenComponent.vue'

const routes = [
    {
        name: 'home',
        path: '/',
        component: HomeScreenComponent,
    },
    {
        name: 'search',
        path: '/search',
        component: SearchScreen,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export { router };
