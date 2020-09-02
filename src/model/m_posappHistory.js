const db = require ('../configs/db')

const m_posappHistory = {
    getAll : (name, sorting, typesort, limit, offset)=>{
        return new Promise((resolve,reject)=>{
            db.query(`SELECT *,
            (SELECT COUNT (*) FROM history) AS count 
            FROM history 
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
            db.query(`INSERT INTO history (cashier_history, date_history, order_history, amount_history) VALUES (
                '${data.cashier_history}',
                '${data.date_history}',
                '${data.order_history}',
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

    updateHistory : (data, id)=>{
        return new Promise((resolve, reject)=>{
            db.query(`UPDATE history SET
            cashier_history='${data.cashier_history}',
            date_history='${data.date_history}',
            order_history='${data.order_history}',
            amount_history='${data.amount_history}'
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