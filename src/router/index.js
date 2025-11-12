import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

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
      meta: {
        requiresAuth: true,
      },
      component: () => import('@/pages/coaches/CoachRegister.vue'),
    },
    {
      path: '/requests',
      name: 'requests-list',
      meta: {
        requiresAuth: true,
      },
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

// 1 - se a rota de destino for a tela de login e o cara ja tiver logado, manda pra tela inical
// 2 - se a rota destino for protegia e usuario deslogado, mandar para login
// 3 - qualquer condição diferente dessa, aprovar a navegação

router.beforeEach((to, from, next) => {
  const isLogged = store.getters['auth/isAuthenticated']
  if (to.path === '/auth' && isLogged) {
    next({ name: 'coach-list' })
  } else if (to.meta.requiresAuth && !isLogged) {
    next({ name: 'user-authentication' })
  } else {
    next()
  }
})

export default router
