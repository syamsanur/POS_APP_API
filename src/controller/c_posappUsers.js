const m_posappUsers = require ('../model/m_posappUsers')
const response = require('../helpers/h_response')
const { failed } = require('../helpers/h_response')
const jwt = require('jsonwebtoken')
const env = require('../helpers/h_env')

const bcrypt = require ('bcrypt')
const { JWTSECRETKEYREFRESH } = require('../helpers/h_env')
const { json } = require('body-parser')

// let tokenNew = []

const c_posappUsers = {

  register: async (req, res) => {
    try {
      const body = req.body

      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(body.password_users, salt)
      
      const data = {
        email_users : body.email_users,
        password_users : hashPassword
      }

      m_posappUsers.register(data)
      .then((result) => {
        response.success(res, result, `Register user success`)
      }).catch((err) => {
        response.failed(res, [], err.message)
      });
      
    } catch (error) {
      failed(res, [], error)
    }
    
  },

  login : async (req, res) => {
    try {
      const body = req.body
      m_posappUsers.login(body)
      .then( async (result) => {
        if(result.length == 0)  {
          response.failed(res, [], `Data not found`)
        }else{
          const resultUser = result[0]
          const password_users = resultUser.password_users
          const refresh_token_users = resultUser.refresh_token_users
          const isMatch = await bcrypt.compare(body.password_users, password_users)

          if(isMatch){
            jwt.sign(
              {
                email_users : resultUser.email_users
              },
              env.JWTSECRETKEY,
              {expiresIn: 3600},
              (err, token) => {
                if(err){
                  failed(res, [], err)
                }else{
                  if(refresh_token_users === null) {
                    const resultUser = result[0]
                    const id_users = resultUser.id_users
                    // console.log(id_users)
                    const tokenRefreshToken = jwt.sign({id_users}, env.JWTSECRETKEYREFRESH)
                    // console.log(tokenRefreshToken)
                    m_posappUsers.updateRefreshToken(tokenRefreshToken, id_users)
                    .then(() => {
                      const data = {token: token, refreshToken: tokenRefreshToken}
                      response.success(res, data, `Create refresh token success`)
                    })
                    .catch((err) => {
                      console.log(err)
                    })
                  }else{
                      const data = {token: token, refreshToken: refresh_token_users}
                      response.success(res, data, `Success Login`)
                  }
                }
              }
            )
          }else{
            failed(res, [], `Wrong password or email`)
          }
        }
      }).catch((err) => {
        response.failed(res, [], `Login gagal`)
      })

    }catch (error) {
      failed(res, [], error)
    }
  },

  logout: (req, res) => {
    const refreshToken = req.body.refreshToken
    // console.log(refreshToken)
    m_posappUsers.logout(refreshToken)
    .then((result)=>{
      response.success(res, result, `Logout`)
    })
    .catch((err)=>{
        response.failed(res, [], err.message)
    })
  },

  refresh: (req, res) => {
    const refreshToken = req.body.refreshToken
    m_posappUsers.checkRefreshToken(refreshToken)
    .then((result) => {
      if( result.length >= 1 ) {
        const resultUser = result[0]
        const newToken = jwt.sign(
          {
            email_users: resultUser.email_users
          },
          env.JWTSECRETKEY, {expiresIn:3600})
          const data = {token: newToken, refreshToken: refreshToken}
          response.success(res, data, `Refresh token success`)
      }else{
        failed(res, [], `Refresh token not found`)
      }
    })
    .catch((err) => {
      console.log(err)
    })
  },

  getAll: (req,res)=>{
    try {
      const name = !req.query.name?'':req.query.name
        const sorting = !req.query.sorting? "id_users" :req.query.sorting
        const typesort = !req.query.typesort ? "ASC" : req.query.typesort;
        const limit = !req.query.limit ? 20 : parseInt(req.query.limit)
        const page = !req.query.page ? 1 : parseInt(req.query.page)
        const offset = page === 1 ? 0 : (page-1)*limit

        m_posappUsers.getAll(name,sorting,typesort,limit,offset)
        .then((result)=>{
            const totalData = result[0].count
            const meta = {
                totalData : totalData,
                totalPage : Math.ceil(totalData/limit),
                page
            }
            response.sucessWithMeta(res, result, meta, `Get users success`)
        })
        .catch((err)=>{
            response.failed(res, [], err.message)
        })
    } catch (error) {
      failed(res, [], error)
    }
        
  },

  getUser : (req,res)=>{
    try {
      const id = req.params.id
    m_posappUsers.getUser(id)
    .then((result)=>{
        response.success(res, result, `Get user with id ${id} success`)
    })
    .catch((err)=>{
        response.failed(res, [], err.message)
    })  
    } catch (error) {
      failed(res, [], error)
    }  
},

  updateUser : (req,res)=>{
    try {
      const id = req.params.id
      const body = req.body
      m_posappUsers.updateUser(body, id)
      .then((result)=>{
          response.success(res, result, `Update user with id ${id} success`)
      })
      .catch((err)=>{
          response.failed(res, [], err.message)
      })
    } catch (error) {
      failed(res, [], error)
    }
      
  },

  terminateUser : (req,res)=>{
    try {
      const id = req.params.id
      m_posappUsers.terminateUser(id)
      .then((result)=>{
          response.success(res, result, `Delete User with id ${id} success`)
      })
      .catch((err)=>{
          response.failed(res, [], err.message)
      })
    } catch (error) {
      failed(res, [], error)
    }
  }
}

module.exports = c_posappUsers