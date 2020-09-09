const multer = require('multer')
const path = require ('path')

const storage = multer.diskStorage({
    destination: (req, res, cb)=>{
        cb(null, 'src/img')
    },
    filename: (req, file, cb)=>{
        cb(null, `${file.originalname}-${Date.now()}`)
    }
})

const upload = multer({
    storage
})

module.exports = upload