const response = require('../helpers/h_response')
const m_posappHistory = require('../model/m_posappHistory')
const { failed } = require('../helpers/h_response')

const c_posappHistory = {
    getAll : (req,res) =>{
        try {
            const name = !req.query.name?'':req.query.name
            const sorting = !req.query.sorting? null :req.query.sorting
            const typesort = !req.query.typesort ? "ASC" : req.query.typesort;
            const limit = !req.query.limit ? 5 : parseInt(req.query.limit)
            const page = !req.query.page ? 1 : parseInt(req.query.page)
            const offset = page === 1 ? 0 : (page-1)*limit
            
            m_posappHistory.getAll(name,sorting, typesort ,limit,offset)
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
                response.failed(res, [], err.message)
            })
                
        } catch (error) {
            failed(res, [], error)
        }
    },

    getHistory : (req,res)=> {
        try {
            const id = req.params.id
            m_posappHistory.getHistory(id)
            .then((result)=>{
                response.success(res,result, `Get history with id ${id} success`)
            })
            .catch((err)=>{
                response.failed(res, [], err.message)
            })

        } catch (error) {
          failed(res, [], error)  
        }
        
    },

    insertHistory : (req,res)=>{
        try {
            const body = req.body
            m_posappHistory.insertHistory(body)
            .then((result)=>{
                response.success(res, result, `Add history success`)
        })
            .catch((err)=>[
                response.failed(res, [], err.message)
            ])  

        } catch (error) {
           failed(res, [], error) 
        }
        
    },

    updateHistory : (req,res)=>{
        try {
            const id = req.params.id
            const body = req.body
            m_posappHistory.updateHistory(body, id)
            .then((result)=>{
                response.success(res, result, `Update history with id ${id} success`)
            })
            .catch((err)=>{
                response.failed(res, [], err.message)
            })
            
        } catch (error) {
            failed(res, [], error)
        }
    },

    terminateHistory : (req,res)=>{
        try {
            const id = req.params.id
            m_posappHistory.terminateHistory(id)
            .then((result)=>{
                response.success(res, result, `Delete history with id ${id} success`)
            })
            .catch((err)=>{
                response.failed(res, [], err.message)
            })

        } catch (error) {
            failed(res, [], error)
        }
    }
}

module.exports = c_posappHistory