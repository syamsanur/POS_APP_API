const response = {
    success: (res, data, message)=>{
        const result= {
            message : message,
            success : true,
            code : 200,
            data : data
        }
        res.json(result)
        res.end()
    },

    failed: (res, data, message)=>{
        const result = {
            message : message,
            success : false,
            code : 300,
            data : data
        }
        res.json(result)
    },

    sucessWithMeta: (res, data, meta, message)=>{
        const result = {
            message : message,
            success : true,
            code : 200,
            meta : meta,
            data : data,
        }
        res.json(result)
    },
  //   token: (res, data, message)=>{
  //     const result= {
  //         message : message,
  //         success : true,
  //         code : 200,
  //         data : data,
  //     }
  //     res.json(result)
  // },
  
}

module.exports = response