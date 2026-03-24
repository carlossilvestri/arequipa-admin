import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory('/turegionentusmanos/'),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'OnePage',
      component: () => import('../views/OnePage.vue'),
      meta: { title: 'Indicadores' },
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: {
        title: 'Dashboard',
        requiresAuth: true,
      },
    },
    {
      path: '/admin/profile',
      name: 'Profile',
      component: () => import('../views/Others/UserProfile.vue'),
      meta: {
        title: 'Profile',
      },
    },
    {
      path: '/blank',
      name: 'Blank',
      component: () => import('../views/Pages/BlankPage.vue'),
      meta: {
        title: 'Blank',
      },
    },

    {
      path: '/error-404',
      name: '404 Error',
      component: () => import('../views/Errors/FourZeroFour.vue'),
      meta: {
        title: '404 Error',
      },
    },

    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/Auth/Signin.vue'),
      meta: {
        title: 'Signin',
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Auth/Signup.vue'),
      meta: {
        title: 'Signup',
      },
    },
    /* New custom modules */
    {
      path: '/admin/indicators',
      name: 'Indicadores',
      component: () => import('../views/Pages/Indicators/Index.vue'),
      meta: {
        title: 'Indicadores',
        requiresAuth: true,
      },
    },
    {
      path: '/admin/indicators/new',
      name: 'IndicatorNew',
      component: () => import('../views/Pages/Indicators/:id/Index.vue'),
      meta: {
        title: `Nuevo Indicador`,
        requiresAuth: true,
      },
    },
    {
      path: '/admin/indicators/:id',
      name: 'IndicatorEdit',
      component: () => import('../views/Pages/Indicators/:id/Index.vue'),
      meta: {
        title: `Editar Indicador`,
        requiresAuth: true,
      },
    },
    {
      path: '/admin/territories/new',
      name: 'TerritoryNew',
      component: () => import('../views/Pages/Territory/:id/Index.vue'),
      meta: {
        title: `Nuevo Territorio`,
        requiresAuth: true,
      },
    },
    {
      path: '/admin/territories/:id',
      name: 'TerritoryEdit',
      component: () => import('../views/Pages/Territory/:id/Index.vue'),
      meta: {
        title: `Editar Territorio`,
        requiresAuth: true,
      },
    },
    {
      path: '/admin/territories',
      name: 'Territorios',
      component: () => import('../views/Pages/Territory/Index.vue'),
      meta: {
        title: 'Territorios',
        requiresAuth: true,
      },
    },
    {
      path: '/admin/periods',
      name: 'Períodos',
      component: () => import('../views/Pages/Periods/Index.vue'),
      meta: {
        title: 'Períodos',
        requiresAuth: true,
      },
    },
    {
      path: '/admin/periods/new',
      name: 'PeriodNew',
      component: () => import('../views/Pages/Periods/:id/Index.vue'),
      meta: {
        title: `Nuevo Período`,
        requiresAuth: true,
      },
    },
    {
      path: '/admin/periods/:id',
      name: 'PeriodEdit',
      component: () => import('../views/Pages/Periods/:id/Index.vue'),
      meta: {
        title: `Editar Período`,
        requiresAuth: true,
      },
    },
    {
      path: '/admin/territory-types',
      name: 'Tipos de territorio',
      component: () => import('../views/Pages/TerritoryTypes/Index.vue'),
      meta: {
        title: 'Tipos de territorio',
        requiresAuth: true,
      },
    },
    {
      path: '/admin/territory-types/new',
      name: 'TerritoryTypeNew',
      component: () => import('../views/Pages/TerritoryTypes/:id/Index.vue'),
      meta: {
        title: `Nuevo Tipo de Territorio`,
        requiresAuth: true,
      },
    },
    {
      path: '/admin/territory-types/:id',
      name: 'TerritoryTypeEdit',
      component: () => import('../views/Pages/TerritoryTypes/:id/Index.vue'),
      meta: {
        title: `Editar Tipo de Territorio`,
        requiresAuth: true,
      },
    },
    {
      path: '/admin/period-types',
      name: 'Tipos de período',
      component: () => import('../views/Pages/PeriodTypes/Index.vue'),
      meta: {
        title: 'Tipos de período',
        requiresAuth: true,
      },
    },
    {
      path: '/admin/period-types/new',
      name: 'PeriodTypeNew',
      component: () => import('../views/Pages/PeriodTypes/:id/Index.vue'),
      meta: {
        title: `Nuevo Tipo de Período`,
        requiresAuth: true,
      },
    },
    {
      path: '/admin/period-types/:id',
      name: 'PeriodTypeEdit',
      component: () => import('../views/Pages/PeriodTypes/:id/Index.vue'),
      meta: {
        title: `Editar Tipo de Período`,
        requiresAuth: true,
      },
    },
    {
      path: '/admin/subgroups',
      name: 'Subsectores',
      component: () => import('../views/Pages/Subgroups/Index.vue'),
      meta: {
        title: 'Subsectores',
        requiresAuth: true,
      },
    },
    {
      path: '/admin/subgroups/new',
      name: 'SubgroupNew',
      component: () => import('../views/Pages/Subgroups/:id/Index.vue'),
      meta: {
        title: 'Nuevo Subsector',
        requiresAuth: true,
      },
    },
    {
      path: '/admin/subgroups/:id',
      name: 'SubgroupEdit',
      component: () => import('../views/Pages/Subgroups/:id/Index.vue'),
      meta: {
        title: 'Editar Subsector',
        requiresAuth: true,
      },
    },
    {
      path: '/admin/groups',
      name: 'Sectores',
      component: () => import('../views/Pages/Groups/Index.vue'),
      meta: {
        title: 'Sectores',
        requiresAuth: true,
      },
    },
    {
      path: '/admin/groups/new',
      name: 'GroupNew',
      component: () => import('../views/Pages/Groups/:id/Index.vue'),
      meta: {
        title: 'Nuevo Sector',
        requiresAuth: true,
      },
    },
    {
      path: '/admin/groups/:id',
      name: 'GroupEdit',
      component: () => import('../views/Pages/Groups/:id/Index.vue'),
      meta: {
        title: 'Editar Sector',
        requiresAuth: true,
      },
    },
    {
      path: '/admin/units-of-measure',
      name: 'Unidades de Medida',
      component: () => import('../views/Pages/UnitOfMeasure/Table.vue'),
      meta: {
        title: 'Unidades de Medida',
        requiresAuth: true,
      },
    },
    {
      path: '/admin/units-of-measure/new',
      name: 'UnitOfMeasureNew',
      component: () => import('../views/Pages/UnitOfMeasure/:id/Index.vue'),
      meta: {
        title: 'Nueva Unidad de Medida',
        requiresAuth: true,
      },
    },
    {
      path: '/admin/units-of-measure/:id',
      name: 'UnitOfMeasureEdit',
      component: () => import('../views/Pages/UnitOfMeasure/:id/Index.vue'),
      meta: {
        title: 'Unidades de Medida',
        requiresAuth: true,
      },
    },
    {
      path: '/admin/users',
      name: 'Usuarios',
      component: () => import('../views/Pages/Users/Index.vue'),
      meta: {
        title: 'Usuarios',
        requiresAuth: true,
      },
    },

    {
      path: '/admin/users/new',
      name: 'UserNew',
      component: () => import('../views/Pages/Users/:id/Index.vue'),
      meta: {
        title: 'Nuevo Usuario',
        requiresAuth: true,
      },
    },
    {
      path: '/admin/users/:id',
      name: 'UserEdit',
      component: () => import('../views/Pages/Users/:id/Index.vue'),
      meta: {
        title: 'Editar Usuario',
        requiresAuth: true,
      },
    },
  ],
})

export default router

router.beforeEach((to, from, next) => {
  // Set document title
  document.title = `${to.meta.title || ''}`

  const userStore = useUserStore()
  const isAuthenticated = !!userStore.loggedUser
  const requiresAuth = !!to.meta.requiresAuth

  // If route requires auth and user is not authenticated, redirect to signin
  if (requiresAuth && !isAuthenticated) {
    if (to.path !== '/signin') {
      return next({ path: '/signin' })
    }
  }

  // Prevent authenticated users from visiting signin/signup
  if ((to.path === '/signin' || to.path === '/signup') && isAuthenticated) {
    const redirect = (to.query.redirect as string) || '/'
    return next(redirect)
  }

  next()
})
