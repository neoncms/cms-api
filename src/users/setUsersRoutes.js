const cors = require('cors')
const { allowAll } = require('../helpers/corsSettings')
const { extractClientId } = require('../auth/extractClientId')
const { checkClientPermission } = require('../auth/checkClientPermission')
const { extractProjectId } = require('../auth/extractProjectId')
const { apiUsers } = require('./apiUsers')
const { OK } = require('http-status-codes')
const { checkProjectPermissions } = require('../auth/checkProjectPermissions')

const setUsersRoutes = app => {
  app.options('/users', cors(allowAll))

  app.get('/users', cors(allowAll), extractClientId, checkClientPermission('userRead'), async (req, res) => {
    const { login } = req.query
    const users = await apiUsers.search(login)
    res.status(OK).send(users)
  })

  app.post(
    '/projects/:projectId/users',
    cors(allowAll),
    extractClientId,
    checkClientPermission('userOfProjectCreate'),
    extractProjectId,
    checkProjectPermissions('userOfProjectCreate'),
    async (req, res) => {
      const { projectId } = req.extractedProps
      const user = await apiUsers.addUserToProject(projectId, req.body)
      res.status(OK).send(user)
    }
  )
}

module.exports = { setUsersRoutes }
