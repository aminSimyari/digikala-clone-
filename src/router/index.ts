import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: 'دیجی‌کالا | خرید آنلاین با بهترین قیمت' },
  },
  {
    path: '/search/',
    name: 'search',
    component: () => import('../views/SearchView.vue'),
    meta: { title: 'جستجو - دیجی‌کالا' },
  },
  {
    path: '/product/:slug?',
    name: 'product',
    component: () => import('../views/ProductView.vue'),
    meta: { title: 'محصول - دیجی‌کالا' },
  },
  {
    path: '/cart/',
    name: 'cart',
    component: () => import('../views/CartView.vue'),
    meta: { title: 'سبد خرید - دیجی‌کالا' },
  },
  {
    path: '/categories/',
    name: 'categories',
    component: () => import('../views/CategoriesView.vue'),
    meta: { title: 'دسته‌بندی کالاها - دیجی‌کالا' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  document.title = (to.meta.title as string) || 'دیجی‌کالا | خرید آنلاین با بهترین قیمت'
})

export default router
