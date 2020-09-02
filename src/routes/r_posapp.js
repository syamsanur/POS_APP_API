const express = require('express');

const c_posappProduct = require('../controller/c_posappProduct')
const c_posappCategory = require('../controller/c_posappCategory')
const c_posappHistory = require('../controller/c_posappHistory')

const upload = require ('../helpers/h_upload')

const router = express.Router()

router

    .get('/product/getall', c_posappProduct.getAll)
    .get('/product/getproduct/:id', c_posappProduct.getProduct)
    .post('/product/insert', upload.single('image'), c_posappProduct.insertProduct)
    .put('/product/update/:id', upload.single('image'), c_posappProduct.updateProduct)
    .patch('/product/update/:id', upload.single('image'), c_posappProduct.updatePatchProduct)
    .delete('/product/delete/:id', c_posappProduct.terminateProduct)

    .get('/category/getall', c_posappCategory.getAll)
    .get('/category/getcategory/:id', c_posappCategory.getCategory)    
    .post('/category/insert', c_posappCategory.insertCategory)
    .put('/category/update/:id', c_posappCategory.updateCategory)
    .delete('/category/delete/:id', c_posappCategory.terminateCategory)

    .get('/history/getall', c_posappHistory.getAll)
    .get('/history/gethistory/:id', c_posappHistory.getHistory)
    .post('/history/insert', c_posappHistory.insertHistory)
    .put('/history/update/:id', c_posappHistory.updateHistory)
    .delete('/history/delete/:id', c_posappHistory.terminateHistory)

module.exports = router