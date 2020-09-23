const jwt = require('jsonwebtoken')
const env = require('../helpers/h_env')
const {tokenResultExpired, tokenResultWrong} = require('../helpers/h_response')

module.exports = {
  authentication: (req, res, next) => {
    const token = req.headers.token
    if(token === undefined || token === '') {
      res.send({
        msg : ` Require Token`
      })
    }else{
      next()
    }
  },

  authorization: (req, res, next) => {
    const token = req.headers.token
    jwt.verify(token, env.JWTSECRETKEY, (err, decoded) => {
      if(err && err.name === 'TokenExpiredError'){
        tokenResultExpired(res, [], 'Token expired')
      }else if(err && err.name === 'JsonWebTokenError'){
        tokenResultWrong(res, [], 'Wrong Token')
      }else{
        next()
      }
    })
  }
}