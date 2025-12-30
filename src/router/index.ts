import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/one-page',
      name: 'OnePage',
      component: () => import('../views/OnePage.vue'),
      meta: { title: 'One Page' },
    },
    {
      path: '/',
      name: 'Ecommerce',
      component: () => import('../views/Ecommerce.vue'),
      meta: {
        title: 'eCommerce Dashboard',
      },
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: () => import('../views/Others/Calendar.vue'),
      meta: {
        title: 'Calendar',
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Others/UserProfile.vue'),
      meta: {
        title: 'Profile',
      },
    },
    {
      path: '/form-elements',
      name: 'Form Elements',
      component: () => import('../views/Forms/FormElements.vue'),
      meta: {
        title: 'Form Elements',
      },
    },
    {
      path: '/basic-tables',
      name: 'Basic Tables',
      component: () => import('../views/Tables/BasicTables.vue'),
      meta: {
        title: 'Basic Tables',
      },
    },
    {
      path: '/line-chart',
      name: 'Line Chart',
      component: () => import('../views/Chart/LineChart/LineChart.vue'),
    },
    {
      path: '/bar-chart',
      name: 'Bar Chart',
      component: () => import('../views/Chart/BarChart/BarChart.vue'),
    },
    {
      path: '/alerts',
      name: 'Alerts',
      component: () => import('../views/UiElements/Alerts.vue'),
      meta: {
        title: 'Alerts',
      },
    },
    {
      path: '/avatars',
      name: 'Avatars',
      component: () => import('../views/UiElements/Avatars.vue'),
      meta: {
        title: 'Avatars',
      },
    },
    {
      path: '/badge',
      name: 'Badge',
      component: () => import('../views/UiElements/Badges.vue'),
      meta: {
        title: 'Badge',
      },
    },

    {
      path: '/buttons',
      name: 'Buttons',
      component: () => import('../views/UiElements/Buttons.vue'),
      meta: {
        title: 'Buttons',
      },
    },

    {
      path: '/images',
      name: 'Images',
      component: () => import('../views/UiElements/Images.vue'),
      meta: {
        title: 'Images',
      },
    },
    {
      path: '/videos',
      name: 'Videos',
      component: () => import('../views/UiElements/Videos.vue'),
      meta: {
        title: 'Videos',
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
      path: '/periods',
      name: 'Períodos',
      component: () => import('../views/Pages/Periods/Index.vue'),
      meta: {
        title: 'Períodos',
      },
    },
    {
      path: '/periods/new',
      name: 'PeriodNew',
      component: () => import('../views/Pages/Periods/:id/Index.vue'),
      meta: {
        title: `Nuevo Período`,
      },
    },
    {
      path: '/periods/:id',
      name: 'PeriodEdit',
      component: () => import('../views/Pages/Periods/:id/Index.vue'),
      meta: {
        title: `Editar Período`,
      },
    },
    {
      path: '/territory-types',
      name: 'Tipos de territorio',
      component: () => import('../views/Pages/TerritoryTypes/Index.vue'),
      meta: {
        title: 'Tipos de territorio',
      },
    },
    {
      path: '/territory-types/new',
      name: 'TerritoryTypeNew',
      component: () => import('../views/Pages/TerritoryTypes/:id/Index.vue'),
      meta: {
        title: `Nuevo Tipo de Territorio`,
      },
    },
    {
      path: '/territory-types/:id',
      name: 'TerritoryTypeEdit',
      component: () => import('../views/Pages/TerritoryTypes/:id/Index.vue'),
      meta: {
        title: `Editar Tipo de Territorio`,
      },
    },
    {
      path: '/period-types',
      name: 'Tipos de período',
      component: () => import('../views/Pages/PeriodTypes/Index.vue'),
      meta: {
        title: 'Tipos de período',
      },
    },
    {
      path: '/period-types/new',
      name: 'PeriodTypeNew',
      component: () => import('../views/Pages/PeriodTypes/:id/Index.vue'),
      meta: {
        title: `Nuevo Tipo de Período`,
      },
    },
    {
      path: '/period-types/:id',
      name: 'PeriodTypeEdit',
      component: () => import('../views/Pages/PeriodTypes/:id/Index.vue'),
      meta: {
        title: `Editar Tipo de Período`,
      },
    },
    {
      path: '/subgroups',
      name: 'Subgrupos',
      component: () => import('../views/Pages/Subgroups/Index.vue'),
      meta: {
        title: 'Subgrupos',
      },
    },
    {
      path: '/subgroups/new',
      name: 'SubgroupNew',
      component: () => import('../views/Pages/Subgroups/:id/Index.vue'),
      meta: {
        title: 'Nuevo Subgrupo',
      },
    },
    {
      path: '/subgroups/:id',
      name: 'SubgroupEdit',
      component: () => import('../views/Pages/Subgroups/:id/Index.vue'),
      meta: {
        title: 'Editar Subgrupo',
      },
    },
    {
      path: '/groups',
      name: 'Grupos',
      component: () => import('../views/Pages/Groups/Index.vue'),
      meta: {
        title: 'Grupos',
      },
    },
    {
      path: '/groups/new',
      name: 'GroupNew',
      component: () => import('../views/Pages/Groups/:id/Index.vue'),
      meta: {
        title: 'Nuevo Grupo',
      },
    },
    {
      path: '/groups/:id',
      name: 'GroupEdit',
      component: () => import('../views/Pages/Groups/:id/Index.vue'),
      meta: {
        title: 'Editar Grupo',
      },
    },
    {
      path: '/units-of-measure',
      name: 'Unidades de Medida',
      component: () => import('../views/Pages/UnitOfMeasure/Table.vue'),
      meta: {
        title: 'Unidades de Medida',
      },
    },
    {
      path: '/units-of-measure/new',
      name: 'UnitOfMeasureNew',
      component: () => import('../views/Pages/UnitOfMeasure/:id/Index.vue'),
      meta: {
        title: 'Nueva Unidad de Medida',
      },
    },
    {
      path: '/units-of-measure/:id',
      name: 'UnitOfMeasureEdit',
      component: () => import('../views/Pages/UnitOfMeasure/:id/Index.vue'),
      meta: {
        title: 'Unidades de Medida',
      },
    },
    {
      path: '/users',
      name: 'Usuarios',
      component: () => import('../views/Pages/Users/Index.vue'),
      meta: {
        title: 'Usuarios',
      },
    },

    {
      path: '/users/new',
      name: 'UserNew',
      component: () => import('../views/Pages/Users/:id/Index.vue'),
      meta: {
        title: 'Nuevo Usuario',
      },
    },
    {
      path: '/users/:id',
      name: 'UserEdit',
      component: () => import('../views/Pages/Users/:id/Index.vue'),
      meta: {
        title: 'Editar Usuario',
      },
    },
  ],
})

export default router

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`
  next()
})
