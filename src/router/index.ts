import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    children: []
    // children: [] -> 根据userMenus来决定 -> children
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})
console.log('wwwwwwwwwwwwwwwwwwww----------------router-------11111111111111---->routes:', routes);

// 导航守卫
router.beforeEach((to) => {
  console.log('wwwwwwwwwwwwwwwwwwww----------------router------222222222222222----->to:', to);
  console.log('wwwwwwwwwwwwwwwwwwww----------------router------222222222222222----->router:', router);
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }

  // console.log(router.getRoutes())
  // console.log(to) // route对象

  if (to.path === '/main') {
    console.log(firstMenu)
    return firstMenu.url
  }
})

export default router
