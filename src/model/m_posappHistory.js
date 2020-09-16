const db = require ('../configs/db')
const response = require('../helpers/h_response')

const m_posappHistory = {
    getAll : (name, sorting, typesort, limit, offset)=>{
        return new Promise((resolve,reject)=>{
            db.query(`SELECT *,
            (SELECT COUNT (*) FROM history) AS count 
            FROM history 
            WHERE invoices_history LIKE '%${name}%' 
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

    getAllDetail : (name, sorting, typesort, limit, offset)=>{
      return new Promise((resolve,reject)=>{
          db.query(`SELECT *,
          (SELECT COUNT (*) FROM history_detail) AS count 
          FROM history_detail 
          WHERE product_name LIKE '%${name}%' 
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

    getHistory : (id)=>{
        return new Promise((resolve, reject)=>{
            db.query(`SELECT * FROM history WHERE id_history = ${id}`,(err,result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },

    insertHistory : (data)=>{
        return new Promise((resolve,reject)=>{
            db.query(`INSERT INTO history (invoices_history, cashier_history, amount_history) VALUES (
                '${data.invoices_history}',
                '${data.cashier_history}',
                '${data.amount_history}'
            )`, (err,result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },

    insertHistoryDetail : (parentId, data)=>{
      return new Promise((resolve,reject)=>{
          db.query(`INSERT INTO history_detail (history_id, product_id, product_name, qty, price) VALUES (
              '${parentId}',
              '${data.id_product}',
              '${data.product_name}',
              '${data.qty}',
              '${data.price}'
          )`, (err,result)=>{
              if(err){
                  reject(new Error(err))
              }else{
                  resolve(result)
              }
          })
      })
  },

    updateHistory : (data, id)=>{
        return new Promise((resolve, reject)=>{
            db.query(`UPDATE history SET
              invoices_history= '${data.invoices_history}',
              cashier_history ='${data.cashier_history}',
              amount_history ='${data.amount_history}'
              WHERE id_history = ${id}`, (err,result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },

    terminateHistory : (id)=>{
        return new Promise((resolve,reject)=>{
            db.query(`DELETE FROM history WHERE id_history = ${id}`,(err,result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    }
}

module.exports = m_posappHistory