const mongoose = require('mongoose')
const { config } = require('../../config')

mongoose.Promise = global.Promise
mongoose.connect(
  config.mongoDbUrl,
  { useNewUrlParser: true, useFindAndModify: false }
)
const db = mongoose.connection

db.on('error', error => {
  console.log(error) // eslint-disable-line no-console
})

db.once('open', () => {
  if (config.logsTo !== 'no') {
    console.log('Conected to db!') // eslint-disable-line no-console
  }
})

const Schema = mongoose.Schema

const ProjectImage = new Schema({
  projectId: Schema.Types.ObjectId,
  buffer: Buffer,
})

const Project = new Schema({
  name: String,
})

const ProjectPermission = new Schema({
  projectId: Schema.Types.ObjectId,
  clientId: Schema.Types.ObjectId,
  projectRead: Boolean,
  projectUpdate: Boolean,
  projectDelete: Boolean,
  apiTokenCreate: Boolean,
  apiTokenRead: Boolean,
  apiTokenUpdate: Boolean,
  apiTokenDelete: Boolean,
})

const ClientPermission = new Schema({
  clientId: Schema.Types.ObjectId,
  userRead: Boolean,
  projectCreate: Boolean,
  projectRead: Boolean,
  projectUpdate: Boolean,
  projectDelete: Boolean,
  apiTokenCreate: Boolean,
  apiTokenRead: Boolean,
  apiTokenUpdate: Boolean,
  apiTokenDelete: Boolean,
})

const Client = new Schema({
  type: String,
  clientSourceId: Schema.Types.ObjectId,
})

const User = new Schema({
  login: String,
  passHash: String,
  isVerified: Boolean,
})

const App = new Schema({
  name: String,
})

const AccessToken = new Schema({
  clientId: Schema.Types.ObjectId,
  token: String,
})

const EncryptionKey = new Schema({
  key: String,
})

const PasswordRecoveryToken = new Schema({
  userId: Schema.Types.ObjectId,
  token: String,
})

/*
const ApiToken = new Schema({
  projectId: String,
  name: String,
  token: String,
})


const ProjectAndUserRelation = new Schema({
  userId: String,
  projectId: String,
})

const Model = new Schema({
  projectId: String,
  apiId: String,
  data: String,
})

const Entry = new Schema({
  projectId: String,
  modelId: String,
  data: String,
})

const File = new Schema({
  projectId: String,
  name: String,
  buffer: Buffer,
  mimetype: String,
})

const Contact = new Schema({
  data: String,
})
*/

module.exports = {
  connection: db,
  ProjectImage: mongoose.model('ProjectImage', ProjectImage),
  Project: mongoose.model('Project', Project),
  ProjectPermission: mongoose.model('ProjectPermission', ProjectPermission),
  ClientPermission: mongoose.model('ClientPermission', ClientPermission),
  Client: mongoose.model('Client', Client),
  User: mongoose.model('User', User),
  App: mongoose.model('App', App),
  AccessToken: mongoose.model('AccessToken', AccessToken),
  EncryptionKey: mongoose.model('EncryptionKey', EncryptionKey),
  PasswordRecoveryToken: mongoose.model('PasswordRecoveryToken', PasswordRecoveryToken),
  /*
  RecoverPass: mongoose.model('RecoverPass', RecoverPass),
  ProjectAndUserRelation: mongoose.model('ProjectAndUserRelation', ProjectAndUserRelation),
  AuthToken: mongoose.model('AuthToken', AuthToken),
  Model: mongoose.model('Model', Model),
  Entry: mongoose.model('Entry', Entry),
  File: mongoose.model('File', File),
  Contact: mongoose.model('Contact', Contact),
  */
}
