const express = require('express')
const router = express.Router()
const {verifyUser} = require('../utils/verifyToken')
const { updateUser, deleteUser, getUsername } = require('../controllers/userController')

router.put('/:id',verifyUser, updateUser)

router.delete('/:id',verifyUser, deleteUser)

//return username wih userid
router.get('/:id', getUsername)

module.exports = router