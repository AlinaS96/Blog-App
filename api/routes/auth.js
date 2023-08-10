const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const {register, login, logout} = require('../controllers/authController')

//register
router.post('/register', register)


//login
router.post('/login', login)

//logout
router.get('/logout', logout)

module.exports=router