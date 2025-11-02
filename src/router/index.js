import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
    },
    {
      path: '/coaches',
      name: 'coaches-list',
      component: null,
    },
    {
      path: '/coaches/:id',
      name: 'coach-detail',
      component: null,
      children: [
        {
          path: 'contact',
          name: 'coach-contact',
          component: null,
        },
      ],
    },
    {
      path: '/register',
      name: 'coach-register',
      component: null,
    },
    {
      path: '/requests',
      name: 'requests-list',
      component: null,
    },
    {
      path: '/:notFound(.*)',
      component: null,
    },
  ],
})

export default router
