const express = require('express');

const c_posappProduct = require('../controller/c_posappProduct')
const c_posappCategory = require('../controller/c_posappCategory')
const c_posappHistory = require('../controller/c_posappHistory')
const c_posappUsers = require('../controller/c_posappUsers')

const upload = require ('../helpers/h_upload')
const auth = require('../helpers/h_auth')

// const redis = require('../helpers/h_redis')

const router = express.Router()

router

    .post('/users/register', c_posappUsers.register)
    .post('/users/login', c_posappUsers.login)
    .post('/users/refresh', c_posappUsers.refresh)
    .post('/users/logout', c_posappUsers.logout)
    .get('/users/getall',auth.authentication, auth.authorization,  c_posappUsers.getAll)
    .get('/users/getuser/:id', auth.authentication, auth.authorization, c_posappUsers.getUser)    
    .post('/users/insert', auth.authentication, auth.authorization, c_posappUsers.register)
    .put('/users/update/:id', auth.authentication, auth.authorization, c_posappUsers.updateUser)
    .delete('/users/delete/:id', auth.authentication, auth.authorization, c_posappUsers.terminateUser)

    // .get('/product/getall',auth.authentication, auth.authorization, redis.getAllProduct,  c_posappProduct.getAll)
    .get('/product/getall',auth.authentication, auth.authorization, c_posappProduct.getAll)
    .get('/product/getproduct/:id', auth.authentication, auth.authorization, c_posappProduct.getProduct)
    .post('/product/insert', auth.authentication, auth.authorization, c_posappProduct.insertProduct)
    .put('/product/update/:id', auth.authentication, auth.authorization, upload.single('image'), c_posappProduct.updateProduct)
    .patch('/product/update/:id', auth.authentication, auth.authorization, upload.single('image'), c_posappProduct.updatePatchProduct)
    .delete('/product/delete/:id', auth.authentication, auth.authorization, c_posappProduct.terminateProduct)

    .get('/category/getall', auth.authentication, auth.authorization, c_posappCategory.getAll)
    .get('/category/getcategory/:id', auth.authentication, auth.authorization, c_posappCategory.getCategory)    
    .post('/category/insert', auth.authentication, auth.authorization, c_posappCategory.insertCategory)
    .put('/category/update/:id', auth.authentication, auth.authorization, c_posappCategory.updateCategory)
    .delete('/category/delete/:id', auth.authentication, auth.authorization, c_posappCategory.terminateCategory)

    .get('/history/getall', auth.authentication, auth.authorization, c_posappHistory.getAll)
    .get('/history/getalldetail', auth.authentication, auth.authorization, c_posappHistory.getAllDetail)
    .get('/history/gethistory/:id', auth.authentication, auth.authorization, c_posappHistory.getHistory)
    .get('/history/gethistoryproduct', auth.authentication, auth.authorization, c_posappHistory.getHistoryProduct)
    .post('/history/insert', auth.authentication, auth.authorization, c_posappHistory.insertHistory)
    .put('/history/update/:id', auth.authentication, auth.authorization, c_posappHistory.updateHistory)
    .delete('/history/delete/:id', auth.authentication, auth.authorization, c_posappHistory.terminateHistory)

module.exports = router