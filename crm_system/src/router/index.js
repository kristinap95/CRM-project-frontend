import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requireLogin: true
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      hideForAuth: true,
      hideNavbar: true,
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next('/login')
  }
  else if (to.matched.some(record => record.meta.hideForAuth) && store.state.isAuthenticated) {
        next('/');
  } 
  else {
    next();
  }

});

export default router