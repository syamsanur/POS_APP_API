const db = require('../configs/db')
const fs = require('fs')

const m_posappProduct = {
      getAll: (name,sorting,typesort,limit,offset)=>{
        return new Promise((resolve, reject)=>{
            db.query(`SELECT *,
            (SELECT COUNT (*) FROM display_product) AS count 
            FROM display_product 
            WHERE name_product LIKE '%${name}%' 
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
    getProduct:(id)=>{
        return new Promise((resolve,reject)=>{
            db.query(`SELECT * FROM display_product WHERE id_product=${id}`, (err,result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },

    insertProduct:(data)=>{
        return new Promise((resolve,reject)=>{
            db.query(`INSERT INTO product (name_product, price_product, date_product, image, category_id) VALUES(
            '${data.name_product}',
            '${data.price_product}',
            '${data.date_product}',
            '${data.image}',
            '${data.category_id}'
            )`,(err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },

    updateProduct:(data, id)=>{
        return new Promise((resolve,reject)=>{
            db.query(`SELECT * FROM product WHERE id_product = ${id}`, (err,result)=>{
                if(err){
                    reject(err)
                }else{

                  resolve(new Promise((resolve, reject)=>{
                      let imagename = null
                      if(!data.image){
                            imagename = result[0].image
                      }else {
                        imagename = data.image  
                        fs.unlink(`src/img/${result[0].image}`, (err)=>{
                          if(err) throw err
                          console.log('Sukses Delete')
                          console.log(result[0].image)
                      })
                    }
                    console.log(imagename)
                    
                    // resolve(new Promise((resolve, reject)=>{
                    //     const imgOld = result[0].image 
                    //     const imageNew = data.image
                    //     if(imgOld !== imageNew){
                    //         fs.unlink(`src/img/${imgOld}`, (err)=>{
                    //             if(err){
                    //                 console.log(`Data is already empty`)
                    //             }
                    //             console.log(`Delete image success`)
                    //         })
                    //     }
                        

                        db.query(`UPDATE product SET
                            name_product='${data.name_product}',
                            price_product='${data.price_product}',
                            date_product='${data.date_product}',
                            image='${imagename}',
                            category_id='${data.category_id}'
                            WHERE id_product='${id}'`,(err, result)=>{
                                if(err){
                                    reject(new Error(err))
                                }else{
                                    resolve(result)
                                }
                            })
                    }))
                }
            })
        
        })
    },

    updatePatchProduct:(data, id)=>{
        return new Promise((resolve,reject)=>{
            db.query(`UPDATE product SET ? WHERE id_product = ?`, [data, id], (err,result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },

    terminateProduct:(id)=>{
        return new Promise((resolve, reject)=>{

            db.query(`SELECT * FROM product WHERE id_product = ${id}`, (err, result)=>{
                if(err){
                    reject (new Error(err))
                }else{
                    resolve (new Promise ((resolve,reject)=>{
                        const imageName = result[0].image
                                fs.unlink(`src/img/${imageName}`, (err)=>{
                                    if(err) throw err;
                                    console.log(`Delete image success`)
                                })
                        db.query(`DELETE FROM product WHERE id_product='${id}'`,(err, result)=>{
                                
                            if(err){
                                reject(new Error(err))
                            }else{
                                resolve(result)
                            }
                        })
                    }))
                }
            })
        })
    }
}

module.exports = m_posappProduct