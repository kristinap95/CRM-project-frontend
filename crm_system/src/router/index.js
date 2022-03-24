import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Clients from '../components/Clients.vue'
import ProjectsPage from '../views/ProjectsPage.vue'
import SingleProjectPage from '../views/SingleProjectPage.vue'
import SingleUserPage from '../views/SingleUserPage.vue'

const routes = [
  {
    path: "/",
    redirect: "/dashboard/",
  },
  {
    path: '/dashboard/',
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
  {
    path: '/dashboard/projects',
    name: 'ProjectsPage',
    component: ProjectsPage,
    meta: {
      requireLogin: true,
    }
  },
  {
    path: '/dashboard/clients',
    name: 'Clients',
    component: Clients,
    meta: {
      requireLogin: true,
      hideForClient: true
    }
  },
  {
    path: '/dashboard/project/:id/',
    name: 'SingleProjectPage',
    component: SingleProjectPage,
    meta: {
      requireLogin: true,
    }
  },
  {
    path: '/dashboard/client/:id/',
    name: 'SingleUserPage',
    component: SingleUserPage,
    meta: {
      requireLogin: true,
      hideForClient: true,
    }
  },
  // { path: '*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('admin')
  if(to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next('/login')
  }
  else if (to.matched.some(record => record.meta.hideForAuth) && store.state.isAuthenticated) {
        next('/');
  }
  else if(to.matched.some(record => record.meta.hideForClient) && role !== 'true') {
    next('/')
  }
  else {
    next();
  }


});

export default router