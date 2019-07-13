/*
const { getStatusMessage } = require('../helpers/getStatusMessage')
const { checkAuth } = require('../services/auth/checkAuth')
const { checkProjectAccess } = require('../services/auth/checkProjectAccess')
*/
const cors = require('cors')
const { allowAll } = require('../helpers/corsSettings')
const { extractClientId } = require('../auth/extractClientId')
const { checkClientPermission } = require('../auth/checkClientPermission')
const { extractProjectId } = require('../auth/extractProjectId')
const { checkProjectPermissions } = require('../auth/checkProjectPermissions')
const { apiTokens } = require('./apiTokens')
const { OK } = require('http-status-codes')

const setApiTokensRoutes = app => {
  app.options('/projects/:projectId/api-tokens', cors(allowAll))

  /*
  app.post('/projects/:projectId/tokens', cors(allowMe), checkAuth, checkProjectAccess, async (req, res) => {
    const { projectId } = req.params
    await apiTokens.postApiToken(projectId, req.body)
    res.status(OK).send(getStatusMessage(OK))
  })
  */

  app.post(
    '/projects/:projectId/api-tokens',
    extractClientId,
    checkClientPermission('apiTokenCreate'),
    extractProjectId,
    checkProjectPermissions('apiTokenCreate'),
    cors(allowAll),
    async (req, res) => {
      const { projectId } = req.extractedProps
      const savedApiToken = await apiTokens.postApiToken(projectId, req.body)
      res.status(OK).send(savedApiToken)
    }
  )

  /*
  app.get('/projects/:projectId/tokens', cors(allowMe), checkAuth, checkProjectAccess, async (req, res) => {
    const { projectId } = req.params
    const tokens = await apiTokens.getApiTokens(projectId)
    res.status(OK).send(tokens)
  })

  app.options('/projects/:projectId/tokens/:tokenId', cors(allowMe))

  app.put(
    '/projects/:projectId/tokens/:tokenId',
    cors(allowMe),
    checkAuth,
    checkProjectAccess,
    async (req, res) => {
      const { projectId, tokenId } = req.params
      await apiTokens.putApiToken(projectId, tokenId, req.body)
      res.status(OK).send(getStatusMessage(OK))
    }
  )

  app.delete(
    '/projects/:projectId/tokens/:tokenId',
    cors(allowMe),
    checkAuth,
    checkProjectAccess,
    async (req, res) => {
      const { projectId, tokenId } = req.params
      await apiTokens.deleteApiToken(projectId, tokenId)
      res.status(OK).send(getStatusMessage(OK))
    }
  )
  */
}

module.exports = { setApiTokensRoutes }
