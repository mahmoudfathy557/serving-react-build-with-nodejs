const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { UnauthenticatedError } = require('../errors')

const authenticatedMiddleware = async (req, res, next) => {
  console.log(req.headers, 'sssss')
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Not authorized')
  }

  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    console.log(payload)
    const { userId, username } = payload

    //attach the user to the job routes
    req.user = { userId, username }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Not authorized ')
  }
}

module.exports = authenticatedMiddleware
