export const routes = {
  one_page: {
    path: '/',
  },
  admin: {
    path: '/admin',
    profile: {
      path: '/admin/profile',
    },
    indicators: {
      path: '/admin/indicators',
      new: {
        path: '/admin/indicators/new',
      },
      edit: {
        path: '/admin/indicators/:id',
      },
    },
    periods: {
      path: '/admin/periods',
      new: {
        path: '/admin/periods/new',
      },
      edit: {
        path: '/admin/periods/:id',
      },
    },
    territories: {
      path: '/admin/territories',
      new: {
        path: '/admin/territories/new',
      },
      edit: {
        path: '/admin/territories/:id',
      },
    },
    territoryTypes: {
      path: '/admin/territory-types',
      new: {
        path: '/admin/territory-types/new',
      },
      edit: {
        path: '/admin/territory-types/:id',
      },
    },
    periodTypes: {
      path: '/admin/period-types',
      new: {
        path: '/admin/period-types/new',
      },
      edit: {
        path: '/admin/period-types/:id',
      },
    },
    subgroups: {
      path: '/admin/subgroups',
      new: {
        path: '/admin/subgroups/new',
      },
      edit: {
        path: '/admin/subgroups/:id',
      },
    },
    groups: {
      path: '/admin/groups',
      new: {
        path: '/admin/groups/new',
      },
      edit: {
        path: '/admin/groups/:id',
      },
    },
    unitsOfMeasure: {
      path: '/admin/units-of-measure',
      new: {
        path: '/admin/units-of-measure/new',
      },
      edit: {
        path: '/admin/units-of-measure/:id',
      },
    },
    users: {
      path: '/admin/users',
      new: {
        path: '/admin/users/new',
      },
      edit: {
        path: '/admin/users/:id',
      },
    },
  },
} as const
