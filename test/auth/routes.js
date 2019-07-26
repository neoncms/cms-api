const routes = [
  {
    route: () => '/projects',
    methods: [
      {
        method: 'post',
        tests: {
          extractClientId: true,
          extractProjectId: false,
          checkProjectPermission: false,
          checkClientPermission: true,
        },
      },
      {
        method: 'get',
        tests: {
          extractClientId: true,
          extractProjectId: false,
          checkProjectPermission: false,
          checkClientPermission: true,
        },
      },
    ],
  },
  {
    route: projectId => `/projects/${projectId}/image.png`,
    methods: [
      {
        method: 'get',
        tests: {
          extractClientId: true,
          extractProjectId: true,
          checkProjectPermission: true,
          checkClientPermission: true,
        },
      },
    ],
  },
  {
    route: projectId => `/projects/${projectId}`,
    methods: [
      {
        method: 'put',
        tests: {
          extractClientId: true,
          extractProjectId: true,
          checkProjectPermission: true,
          checkClientPermission: true,
        },
      },
      {
        method: 'delete',
        tests: {
          extractClientId: true,
          extractProjectId: true,
          checkProjectPermission: true,
          checkClientPermission: true,
        },
      },
    ],
  },
  {
    route: projectId => `/projects/${projectId}/api-tokens`,
    methods: [
      {
        method: 'post',
        tests: {
          extractClientId: true,
          extractProjectId: true,
          checkProjectPermission: true,
          checkClientPermission: true,
        },
      },
      {
        method: 'get',
        tests: {
          extractClientId: true,
          extractProjectId: true,
          checkProjectPermission: true,
          checkClientPermission: true,
        },
      },
    ],
  },
  {
    route: (projectId, tokenId) => `/projects/${projectId}/api-tokens/${tokenId}`,
    methods: [
      {
        method: 'put',
        tests: {
          extractClientId: true,
          extractProjectId: true,
          checkProjectPermission: true,
          checkClientPermission: true,
        },
      },
      {
        method: 'delete',
        tests: {
          extractClientId: true,
          extractProjectId: true,
          checkProjectPermission: true,
          checkClientPermission: true,
        },
      },
    ],
  },
  {
    route: () => `/users`,
    methods: [
      {
        method: 'get',
        tests: {
          extractClientId: true,
          extractProjectId: false,
          checkProjectPermission: false,
          checkClientPermission: true,
        },
      },
    ],
  },
  {
    route: projectId => `/projects/${projectId}/users`,
    methods: [
      {
        method: 'post',
        tests: {
          extractClientId: true,
          extractProjectId: true,
          checkProjectPermission: true,
          checkClientPermission: true,
        },
      },
      {
        method: 'get',
        tests: {
          extractClientId: true,
          extractProjectId: true,
          checkProjectPermission: true,
          checkClientPermission: true,
        },
      },
    ],
  },
  {
    route: (projectId, userId) => `/projects/${projectId}/users/${userId}`,
    methods: [
      {
        method: 'delete',
        tests: {
          extractClientId: true,
          extractProjectId: true,
          checkProjectPermission: true,
          checkClientPermission: true,
        },
      },
    ],
  },
  {
    route: (projectId, userId) => `/projects/${projectId}/users/${userId}/permissions`,
    methods: [
      {
        method: 'get',
        tests: {
          extractClientId: true,
          extractProjectId: true,
          checkProjectPermission: true,
          checkClientPermission: true,
        },
      },
      {
        method: 'put',
        tests: {
          extractClientId: true,
          extractProjectId: true,
          checkProjectPermission: true,
          checkClientPermission: true,
        },
      },
    ],
  },
  {
    route: projectId => `/projects/${projectId}/files`,
    methods: [
      {
        method: 'post',
        tests: {
          extractClientId: true,
          extractProjectId: true,
          checkProjectPermission: true,
          checkClientPermission: false,
        },
      },
    ],
  },
]

module.exports = { routes }
