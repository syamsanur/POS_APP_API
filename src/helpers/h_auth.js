const jwt = require('jsonwebtoken')
const env = require('../helpers/h_env')

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
        res.send({
          msg: `Token expired`
        })
      }else if(err && err.name === 'JsonWebTokenError'){
        res.send({
          msg: `Wrong token`
        })
      }else{
        next()
      }
    })
  }
}