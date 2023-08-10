const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

async function register(req, res, next) {
    try {
        const { picture, username, email, password } = req.body
        
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const newUser = new User({

            // ...req.body ,password: hash
            picture, username, email, password: hash

        })

        await newUser.save()
        res.status(200).send("User has been created")
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) { res.status(404).send("user not found") }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) res.status(404).send("Incorrect username or password")
        const { password, ...otherDetails } = user._doc
        const token = jwt.sign({ id: user._id }, process.env.JWT)
        // const token = jwt.sign(
        //     { email: fetchedUser.email, userId: fetchedUser._id },
        //     "secret_this_should_be_longer",
        //     { expiresIn: "1h" }
        //   );
        return res.cookie("access_token", token, { httpOnly: true }).status(200).send({ details: { ...otherDetails } })
        
    } catch (err) {
        next(err)
    }
}

const logout = (req, res, next) => {
    try {
        const token = req.cookies.access_token
        if(token) {
            res.clearCookie("access_token");
            res.status(200).send('cookie cleared')
        }
    } catch (err) {
        next(err)
    }
}



module.exports = { register, login, logout }