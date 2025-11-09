import { createRouter, createWebHistory } from 'vue-router'

import CoachesList from '@/pages/coaches/CoachesList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
    },
    {
      path: '/coaches',
      name: 'coach-list',
      component: CoachesList,
    },
    {
      path: '/coaches/:id',
      name: 'coach-detail',
      props: true,
      component: () => import('@/pages/coaches/CoachDetail.vue'),
      children: [
        {
          path: 'contact',
          name: 'coach-contact',
          component: () => import('@/pages/requests/ContactCoach.vue'),
        },
      ],
    },
    {
      path: '/register',
      name: 'coach-register',
      component: () => import('@/pages/coaches/CoachRegister.vue'),
    },
    {
      path: '/requests',
      name: 'requests-list',
      component: () => import('@/pages/requests/RequestsList.vue'),
    },
    {
      path: '/auth',
      name: 'user-authentication',
      component: () => import('@/pages/UserAuth.vue'),
    },
    {
      path: '/:notFound(.*)',
      component: () => import('@/pages/NotFound.vue'),
    },
  ],
})

export default router
