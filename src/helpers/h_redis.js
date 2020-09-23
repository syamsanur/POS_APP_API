const redis = require('redis')
const response = require('../helpers/h_response')
const _lod = require('lodash')

const redisClient = redis.createClient()

module.exports = {

  getAllProduct: (req,res, next) => {
    redisClient.get('products', (err, data) => {
      if(data){
        data = JSON.parse(data)
        const name = !req.query.name ? null : req.query.name
        const sorting = !req.query.sorting? "id_product" :req.query.sorting
        const typesort = !req.query.typesort ? "ASC" : req.query.typesort;
        const limit = !req.query.limit ? 20 : parseInt(req.query.limit)
        const page = !req.query.page ? 1 : parseInt(req.query.page)

        const startPage = (page -1) * limit
        const lastPage = page * limit

        const sort = _lod.orderBy(data, [sorting], [typesort])

        let dataRedis = sort

        if(name !== null) {
          const search = sort.filter(e => e.name_product.toLowerCase().includes(name.toLowerCase()))
          dataRedis = search
        }
        
        res.send({
          message: 'Get data from Redis success',
          success: true,
          meta : {
            totalRow : dataRedis.length,
            totalPage : Math.ceil(dataRedis.length / limit),
            page
          },
          data: dataRedis.slice(startPage, lastPage)
        })
      }else{
        next()
      }
    })
  },
  
  GetProduct: (req, res, next ) => {
    redisClient.get('products', (err,data) => {
      const id = req.params.id
      data = JSON.parse(data)
      // console.log(data)
      // console.log(id)
      const dataProduct = data.filter(e => e.id_product == id)
      // console.log(dataProduct)
      if(dataProduct.length !== 0){
          response.success(res, dataProduct, `Get Product with id ${id} from redis success`)
      }else{
        next()
      }
    })
  },

  getAllCategory: (req, res, next) => {
    redisClient.get('category', (err, data) => {
      if (data) {
        data = JSON.parse(data)
        const name = !req.query.name ? null : req.query.name
        const sorting = !req.query.sorting? "id_category" :req.query.sorting
        const typesort = !req.query.typesort ? "ASC" : req.query.typesort;
        const limit = !req.query.limit ? 20 : parseInt(req.query.limit)
        const page = !req.query.page ? 1 : parseInt(req.query.page)

        const startPage = (page -1) * limit
        const lastPage = page * limit

        const sort = _lod.orderBy(data, [sorting], [typesort])

        let dataRedis = sort

        if(name !== null) {
          const search = sort.filter(e => e.name_category.toLowerCase().includes(name.toLowerCase()))
          dataRedis = search
        }
        res.send({
          message: 'Get data from Redis success',
          success: true,
          meta : {
            totalRow : dataRedis.length,
            totalPage : Math.ceil(dataRedis.length / limit),
            page
          },
          data: dataRedis.slice(startPage, lastPage)
        })
      }else{
        next()
      }
    })
  },

  getCategory: (req,res, next) => {
    redisClient.get('category', (err,data) => {
    const id = req.params.id
      data = JSON.parse(data)
      // console.log(data)
      // console.log(id)
      const dataCategory = data.filter(e => e.id_category == id)
      // console.log(dataCategory)
      if(dataCategory.length !== 0){
        res.send(
          response.success(res, dataCategory, `Get category with id ${id} from redis success`)
        )
      }else{
        next()
      }
    })
  },

  getAllHistory: (req, res, next) => {
    redisClient.get('history', (err, data) => {
      if (data) {
        data = JSON.parse(data)
        const name = !req.query.name ? null : req.query.name
        const sorting = !req.query.sorting? "id_history" :req.query.sorting
        const typesort = !req.query.typesort ? "ASC" : req.query.typesort;
        const limit = !req.query.limit ? 20 : parseInt(req.query.limit)
        const page = !req.query.page ? 1 : parseInt(req.query.page)

        const startPage = (page -1) * limit
        const lastPage = page * limit

        const sort = _lod.orderBy(data, [sorting], [typesort])

        let dataRedis = sort

        // console.log(dataRedis.invoices_history)

        
        res.send({
          message: 'Get data from Redis success',
          success: true,
          meta : {
            totalRow : dataRedis.length,
            totalPage : Math.ceil(dataRedis.length / limit),
            page
          },
          data: dataRedis.slice(startPage, lastPage)
        })
      }else{
        next()
      }
    })
  },

  getHistory: (req,res, next) => {
    redisClient.get('history', (err,data) => {
    const id = req.params.id
      data = JSON.parse(data)
      // console.log(data)
      // console.log(id)
      const dataHistory = data.filter(e => e.id_history == id)
      // console.log(dataCategory)
      if(dataHistory.length !== 0){
        res.send(
          response.success(res, dataHistory, `Get history with id ${id} from redis success`)
        )
      }else{
        next()
      }
    })
  },

  getAllDetail: (req, res, next) => {
    redisClient.get('detail', (err, data) => {
      if (data) {
        data = JSON.parse(data)
        const name = !req.query.name ? null : req.query.name
        const sorting = !req.query.sorting? "id_detail" :req.query.sorting
        const typesort = !req.query.typesort ? "ASC" : req.query.typesort;
        const limit = !req.query.limit ? 20 : parseInt(req.query.limit)
        const page = !req.query.page ? 1 : parseInt(req.query.page)

        const startPage = (page -1) * limit
        const lastPage = page * limit

        const sort = _lod.orderBy(data, [sorting], [typesort])

        let dataRedis = sort

        if(name !== null) {
          const search = sort.filter(e => e.product_name.toLowerCase().includes(name.toLowerCase()))
          dataRedis = search
        }
        res.send({
          message: 'Get data from Redis success',
          success: true,
          meta : {
            totalRow : dataRedis.length,
            totalPage : Math.ceil(dataRedis.length / limit),
            page
          },
          data: dataRedis.slice(startPage, lastPage)
        })
      }else{
        next()
      }
    })
  }

}
