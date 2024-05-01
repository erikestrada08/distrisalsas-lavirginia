import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path:'/',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue')
  },
  {
    path: '/proveedor',
    name: 'proveedor',
    component: () => import('../views/ProveedorView.vue')
  },
  {
    path: '/producto',
    name: 'producto',
    component: () => import('../views/ProductoView.vue')
  },
  {
    path: '/categoria',
    name: 'categoria',
    component: () => import('../views/CategoriaView.vue')
  },
  {
    path: '/facturas',
    name: 'facturas',
    component: () => import('../views/FacturasView.vue')
  },
  {
    path: '/orden-compra',
    name: 'orden-compra',
    component: () => import('../views/OrdenCompraView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
