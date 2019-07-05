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

const ProjectImage = mongoose.model(
  'ProjectImage',
  new Schema({
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    buffer: Buffer,
  })
)

const Project = mongoose.model(
  'Project',
  new Schema({
    name: String,
  })
)

const User = mongoose.model(
  'User',
  new Schema({
    login: String,
    passHash: String,
    isVerified: Boolean,
  })
)

const EncryptionKey = mongoose.model(
  'EncryptionKey',
  new Schema({
    key: String,
  })
)

/*
const ApiToken = new Schema({
  projectId: String,
  name: String,
  token: String,
})

const RecoverPass = new Schema({
  userId: String,
  tokens: [String],
})

const ProjectAndUserRelation = new Schema({
  userId: String,
  projectId: String,
})

const AuthToken = new Schema({
  userId: String,
  token: String,
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
  ProjectImage,
  Project,
  User,
  // Client,
  EncryptionKey,
  /*
  ApiToken: mongoose.model('ApiToken', ApiToken),
  RecoverPass: mongoose.model('RecoverPass', RecoverPass),
  ProjectAndUserRelation: mongoose.model('ProjectAndUserRelation', ProjectAndUserRelation),
  AuthToken: mongoose.model('AuthToken', AuthToken),
  Model: mongoose.model('Model', Model),
  Entry: mongoose.model('Entry', Entry),
  File: mongoose.model('File', File),
  Contact: mongoose.model('Contact', Contact),
  */
}
