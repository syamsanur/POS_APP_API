const db = require ('../configs/db')

const m_posappCategory = {
    getAll : (name,sorting,typesort,limit,offset)=>{
        return new Promise((resolve,reject)=>{
            db.query(`SELECT *,
            (SELECT COUNT (*) FROM category) AS count 
            FROM category 
            WHERE name_category LIKE '%${name}%' 
            ORDER BY ${sorting} ${typesort}
            LIMIT ${offset},${limit}`,(err,result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },

    getCategory : (id)=> {
        return new Promise((resolve,reject)=>{
            db.query(`SELECT * FROM category WHERE id_category = ${id} `, (err,result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },

    insertCategory : (data)=>{
        return new Promise((resolve,reject)=>{
            db.query(`INSERT INTO category (name_category) VALUES ('${data.name_category}')`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },

    updateCategory : (data, id)=>{
        return new Promise((resolve, reject)=>{
            db.query(`UPDATE category SET name_category = '${data.name_category}' WHERE id_category = ${id}`, (err,result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },

    terminateCategory : (id)=>{
        return new Promise((resolve,reject)=>{
            db.query(`DELETE FROM category WHERE id_category = ${id}`, (err,result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    }
}

module.exports = m_posappCategory