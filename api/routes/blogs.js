const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const Blog = require('../models/Blog')
const { fetchUser } = require('../utils/verifyToken')
const { createBlog, updateBlog, deleteBlog, getBlog,getBlogs, getBlogByUser, getBlogByCategory } = require('../controllers/blogController')



// router.post('/',  createBlog)
router.post('/', fetchUser, createBlog)
//update
router.put('/:id', fetchUser, updateBlog)

//delete
router.delete('/:id', fetchUser, deleteBlog)

//get
router.get('/find/:id', getBlog)

router.get('/',getBlogs)
//get all by user
router.get('/user/:userId', getBlogByUser)

// //get all by category
router.get('/category', getBlogByCategory)

module.exports = router