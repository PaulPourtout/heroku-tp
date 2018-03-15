const express = require('express')

/** Way 1 */
//const { authJwt, authCredentials } = require('./auth/passport')

/** Way 2 */
// const { authCredentials } = require('./auth/login-passport')
// const { authJwt } = require('./auth/jwt-passport')

/** Way 3 */
const { checkCredentialsMiddleware } = require('./auth/login')
const { checkTokenMiddleware } = require('./auth/jwt')
const authCredentials = checkCredentialsMiddleware
const authJwt = checkTokenMiddleware

const {
  roleAuthorization,
  ownAccount,
  isCardAssociated
} = require('./auth/authorization')
const listCtrl = require('./controllers/list')
const cardCtrl = require('./controllers/card')
const userCtrl = require('./controllers/user')
const authCtrl = require('./controllers/auth')
const userCardCtrl = require('./controllers/user.card')

const isAdmin = roleAuthorization('admin')

exports.listRouter = express
  .Router()
  .get('/full', listCtrl.getFull)
  .get('/', listCtrl.getAll)
  .post('/', listCtrl.post)
  .put('/:id', listCtrl.put)
  .delete('/:id', listCtrl.delete)

exports.cardRouter = express
  .Router()
  .get('/', cardCtrl.getAll)
  .post('/', cardCtrl.post)
  .put('/:id', cardCtrl.put)
  .delete('/:id', cardCtrl.delete)

exports.authRouter = express
  .Router()
  .post('/register', authCtrl.register)
  .post('/login', authCredentials, authCtrl.login)

exports.userRouter = express
  .Router()
  .get('/', userCtrl.getAll)
  .get('/:userId', userCtrl.getById)
  .put('/:userId', ownAccount, userCtrl.update)
  .delete('/:userId', ownAccount, userCtrl.delete)
  .put('/:userId/role/:role', userCtrl.setRole)

exports.userCardRouter = express
  .Router()
  .post('/:userId', ownAccount, userCardCtrl.add)
  .put(
    '/:userId',
    ownAccount,
    isCardAssociated,
    userCardCtrl.move
  )
  .get('/:userId', ownAccount, userCardCtrl.get)
