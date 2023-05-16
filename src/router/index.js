import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'fbx',
    component: () => import('@/pages/fbx/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
