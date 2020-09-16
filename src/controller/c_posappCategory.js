const m_posappCategory = require('../model/m_posappCategory')
const response = require('../helpers/h_response')

const redis = require('redis')
const redisClient = redis.createClient()


const c_posappCategory = {
    getAll : (req,res)=>{
      try {
        const name = !req.query.name?'':req.query.name
        const sorting = !req.query.sorting? null :req.query.sorting
        const typesort = !req.query.typesort ? "ASC" : req.query.typesort;
        const limit = !req.query.limit ? 20 : parseInt(req.query.limit)
        const page = !req.query.page ? 1 : parseInt(req.query.page)
        const offset = page === 1 ? 0 : (page-1)*limit

        m_posappCategory.getAll(name,sorting,typesort,limit,offset)
        .then((result)=>{
          redisClient.set('category', JSON.stringify(result))
            const totalData = result[0].count
            const meta = {
                totalData : totalData,
                totalPage : Math.ceil(totalData/limit),
                page
            }
            response.sucessWithMeta(res, result, meta, `Get product success`)
        })
        .catch((err)=>{
            response.failed(res, [], err.message)
        })
      } catch (error) {
        failed(res, [], error)
      }
        
    },

    getCategory : (req,res)=>{
      try {
        const id = req.params.id
        m_posappCategory.getCategory(id)
        .then((result)=>{
            response.success(res, result, `Get category with id ${id} success`)
        })
        .catch((err)=>{
            response.failed(res, [], err.message)
        })
      } catch (error) {
        failed(res, [], error)
      }
        
    },

    insertCategory : (req,res)=>{
      try {
        const body = req.body
        m_posappCategory.insertCategory(body)
        .then((result)=>{
            redisClient.del('category')
            response.success(res, result, `Insert category success`)
        })
        .catch((err)=>{
            response.failed(res, [], err.message)
        })
      } catch (error) {
        failed(res, [], error)
      }
        
    },

    updateCategory : (req,res)=>{
      try {
        const id = req.params.id
        const body = req.body
        m_posappCategory.updateCategory(body, id)
        .then((result)=>{
            redisClient.del('category')
            response.success(res, result, `Update category with id ${id} success`)
        })
        .catch((err)=>{
            response.failed(res, [], err.message)
        })
      } catch (error) {
        failed(res, [], error)
      }
        
    },

    terminateCategory : (req,res)=>{
      try {
        const id = req.params.id
        m_posappCategory.terminateCategory(id)
        .then((result)=>{
            redisClient.del('category')
            response.success(res, result, `Delete category with id ${id} success`)
        })
        .catch((err)=>{
            response.failed(res, [], err.message)
        })
      } catch (error) {
        failed(res, [], error)
      }
        
    }
}

module.exports = c_posappCategory