const db = require('../configs/db');
const { refresh } = require('../controller/c_posappUsers');

const m_posappUsers = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      db.query (`INSERT INTO users SET ?`, data, (err, result) => {
        if (err) {
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },
  
  login: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * from users WHERE email_users = ?`, data.email_users, (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },

  updateRefreshToken: (token, id_users) => {
    return new Promise((resolve, reject) => {
      db.query (`UPDATE users SET refresh_token_users = '${token}' WHERE id_users ='${id_users}' `,  (err, result) => {
        if (err) {
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },

  logout: (token) => {
    return new Promise((resolve, reject) => {
      db.query (`UPDATE users SET refresh_token_users = null WHERE refresh_token_users ='${token}' `,  (err, result) => {
        if (err) {
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },

  checkRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * from users WHERE refresh_token_users = '${refreshToken}'`, (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },

  getAll: (name,sorting,typesort,limit,offset)=>{
    return new Promise((resolve, reject)=>{
        db.query(`SELECT *,
        (SELECT COUNT (*) FROM users) AS count 
        FROM users 
        WHERE email_users LIKE '%${name}%' 
        ORDER BY ${sorting} ${typesort}
        LIMIT ${offset},${limit}`, (err,result)=>{
            if(err){
                reject(new Error(err))
            }else{
                resolve(result)
            }
        })
    })
  },

  getUser : (id)=> {
    return new Promise((resolve,reject)=>{
        db.query(`SELECT * FROM users WHERE id_users = ${id} `, (err,result)=>{
            if(err){
                reject(new Error(err))
            }else{
                resolve(result)
            }
        })
    })
},


  updateUser : (data, id)=>{
      return new Promise((resolve, reject)=>{
          db.query(`UPDATE users SET email_users = '${data.email_users}' WHERE id_users = ${id}`, (err,result)=>{
              if(err){
                  reject(new Error(err))
              }else{
                  resolve(result)
              }
          })
      })
  },

  terminateUser : (id)=>{
      return new Promise((resolve,reject)=>{
          db.query(`DELETE FROM users WHERE id_users = ${id}`, (err,result)=>{
              if(err){
                  reject(new Error(err))
              }else{
                  resolve(result)
              }
          })
      })
  }
}

module.exports = m_posappUsers