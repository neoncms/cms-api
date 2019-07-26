/*global describe, it, before, after*/

const { request } = require('../helpers/request')
const { getAuth } = require('../helpers/getAuth')
const { getProject } = require('../helpers/getProject')

let auth
let project

describe('Check project permissions', () => {
  before(async () => {
    auth = await getAuth()
    project = await getProject()
  })

  const routes = [
    {
      desc: 'GET projects image',
      method: (...props) => request.get(...props),
      route: () => `/projects/${project.project.id}/image.png`,
    },
    {
      desc: 'PUT projects',
      method: (...props) => request.put(...props),
      route: () => `/projects/${project.project.id}`,
    },
    {
      desc: 'DELETE projects',
      method: (...props) => request.delete(...props),
      route: () => `/projects/${project.project.id}`,
    },
    {
      desc: 'POST api tokens',
      method: (...props) => request.post(...props),
      route: () => `/projects/${project.project.id}/api-tokens`,
    },
    {
      desc: 'GET api tokens',
      method: (...props) => request.get(...props),
      route: () => `/projects/${project.project.id}/api-tokens`,
    },
    {
      desc: 'PUT api tokens',
      method: (...props) => request.put(...props),
      route: () => `/projects/${project.project.id}/api-tokens/${project.project.id}`,
    },
    {
      desc: 'DELETE api tokens',
      method: (...props) => request.delete(...props),
      route: () => `/projects/${project.project.id}/api-tokens/${project.project.id}`,
    },
    {
      desc: 'POST user to project',
      method: (...props) => request.post(...props),
      route: () => `/projects/${project.project.id}/users`,
    },
    {
      desc: 'GET users of project',
      method: (...props) => request.get(...props),
      route: () => `/projects/${project.project.id}/users`,
    },
    {
      desc: 'DELETE user of project',
      method: (...props) => request.delete(...props),
      route: () => `/projects/${project.project.id}/users/${project.project.id}`,
    },
    {
      desc: 'GET permissions of user',
      method: (...props) => request.get(...props),
      route: () => `/projects/${project.project.id}/users/${project.project.id}/permissions`,
    },
    {
      desc: 'PUT permissions of user',
      method: (...props) => request.put(...props),
      route: () => `/projects/${project.project.id}/users/${project.project.id}/permissions`,
    },
    {
      desc: 'POST file',
      method: (...props) => request.post(...props),
      route: () => `/projects/${project.project.id}/files`,
    },
  ]

  routes.forEach(({ desc, method, route }) => {
    it(`${desc} should return 404`, done => {
      method(route())
        .set('AccessToken', auth.accessToken.token)
        .expect(404)
        .end(done)
    })
  })

  after(async () => {
    await auth.remove()
    await project.remove()
  })
})
