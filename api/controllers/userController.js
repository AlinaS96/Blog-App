const bcrypt = require('bcrypt')
const User = require('../models/User')

async function updateUser(req, res, next) {
    try {
        if (req.body.password) {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(req.body.password, salt)
            req.body.password = hash
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).send(updatedUser)
        } else {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).send(updatedUser)
        }
        
    } catch (err) {
        next(err)
    }

}


async function deleteUser(req, res, next) {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send('user has been deleted')
    } catch (err) {
        next(err)
    }

}


async function getUsername(req, res, next) {
    try {
        const user = await User.findById(req.params.id)
        console.log(user)
        res.status(200).send(user.username)
    } catch (err) {
        next(err)
    }

}
module.exports = { updateUser, deleteUser, getUsername }