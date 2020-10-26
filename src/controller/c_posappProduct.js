const m_posappProduct = require('../model/m_posappProduct')
const response = require('../helpers/h_response')
const { failed } = require('../helpers/h_response')

const upload = require('../helpers/h_upload')

// const redis = require('redis')
// const redisClient = redis.createClient()

const c_posappProduct = {
      getAll: (req,res)=>{
        try {
            const name = !req.query.name?'':req.query.name
            const sorting = !req.query.sorting? "id_product" :req.query.sorting
            const typesort = !req.query.typesort ? "ASC" : req.query.typesort;
            const limit = !req.query.limit ? 5 : parseInt(req.query.limit)
            const page = !req.query.page ? 1 : parseInt(req.query.page)
            const offset = page === 1 ? 0 : (page-1)*limit
            
            
            m_posappProduct.getAll(name,sorting,typesort,limit,offset)
            .then((result)=>{
                console.log(sorting)
                // redisClient.set('products', JSON.stringify(result))
                const totalData = result[0].count
                const meta = {
                    totalData : totalData,
                    totalPage : Math.ceil(totalData/limit),
                    page
                }
                response.sucessWithMeta(res, result, meta, `Get product success`)
            })
            .catch((err)=>{
                response.failed(res, [], err)
            })
            
        } catch (error) {
            failed(res, [], error)
        }
        
    },
    
    getProduct: (req,res)=>{
        try {
            const id = req.params.id
            m_posappProduct.getProduct(id)
            .then((result)=>{
                response.success(res, result, `Get product with id ${id} success`)
            })
            .catch((err)=>{
                response.failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], error)
        }
        
    },

    insertProduct : (req,res)=>{
      try {
        upload.single('image')(req, res, (err)=>{
          if(err){
            if(err.code === `LIMIT_FIELD_VALUE`){
              failed(res, [], `Image size is to big`)
            }else{
              failed(res, [], err) 
            }
          }else{
            const body = req.body
            body.image = req.file == undefined ? '' : req.file.filename
            
            m_posappProduct.insertProduct(body)        
            .then((result)=>{
              // redisClient.del('products')
              response.success(res, result, `Insert product success`)
            })
            .catch((err)=>{
                response.failed(res, [], err.message)
            })
          }
        })
      } catch (error) {
        failed(res, [], error)
      }
        
    },

    updateProduct : (req,res)=>{
        try {
            const id= req.params.id
            const body = req.body
            body.image = !req.file ? req.file : req.file.filename
            // console.log(body)
            m_posappProduct.updateProduct(body, id)
            .then((result)=>{
                // redisClient.del('products')
                response.success(res, result, `Update product success`)
            })
            .catch((err)=>{
                response.failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], error)
        }
        
    },

    updatePatchProduct : (req,res)=>{
        try {
            const id= req.params.id
            const body = req.body
            body.image = req.file == undefined ? '' : req.file.filename
            console.log(body)
            m_posappProduct.updatePatchProduct(body, id)
            .then((result)=>{
                // redisClient.del('products')
                response.success(res, result, `Update product success`)
            })
            .catch((err)=>{
                response.failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], error)
        }
        
    },
    

    terminateProduct : (req,res)=>{
        try {
            const id= req.params.id
            m_posappProduct.terminateProduct(id)
            .then((result)=>{
                // redisClient.del('products')
                response.success(res, result, `Delete product success`)
            })
            .catch((err)=>{
                response.failed(res, [], err.message)
            })    
        } catch (error) {
            failed(res, [], error)
        }
        
    }
}

module.exports = c_posappProduct