const m_posappProduct = require('../model/m_posappProduct')
const response = require('../helpers/h_response')
const { failed } = require('../helpers/h_response')

const c_posappProduct = {
    getAll: (req,res)=>{
        try {
            const name = !req.query.name?'':req.query.name
            const sorting = !req.query.sorting? null :req.query.sorting
            const typesort = !req.query.typesort ? "ASC" : req.query.typesort;
            const limit = !req.query.limit ? 5 : parseInt(req.query.limit)
            const page = !req.query.page ? 1 : parseInt(req.query.page)
            const offset = page === 1 ? 0 : (page-1)*limit
            
            m_posappProduct.getAll(name,sorting,typesort,limit,offset)
            .then((result)=>{
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
        const body = req.body
        body.image = req.file == undefined ? '' : req.file.filename
        
        m_posappProduct.insertProduct(body)        
        .then((result)=>{
            response.success(res, result, `Insert product success`)
        })
        .catch((err)=>{
            response.failed(res, [], err.message)
        })
    },

    updateProduct : (req,res)=>{
        try {
            const id= req.params.id
            const body = req.body
            body.image = req.file == undefined ? '' : req.file.filename
            // console.log(body)
            m_posappProduct.updateProduct(body, id)
            .then((result)=>{
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