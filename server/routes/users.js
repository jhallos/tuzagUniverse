const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')


router.route('/register')
    .post((req, res) => {
        const { isValid, errors } = validateRegisterInput(req.body)

        if (!isValid) {
            return res.status(404).json(errors)
        }
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    errors.email = 'Email was used'
                    return res.status(404).json(errors)
                }
               bcrypt.genSalt(10, function (err, salt){
                   bcrypt.hash(req.body.password,salt, function (err, hash) {
                       const newUser = new User({
                           email: req.body.email,
                           username: req.body.username,
                           password: hash
                       })
                       newUser.save()
                        .then(newUser => res.json(newUser))
                        .catch(err => console.log(err))
                   })
               })
            })
    })

    router.route('/login')
        .post((req, res) => {
            const { errors, isValid } = validateLoginInput(req.body)
            if (!isValid) {
                return res.status(404).json(errors)
            }
            User.findOne({ email: req.body.email})
                .then(user=> {
                    if (user) {
                        bcrypt.compare(req.body.passord, user.passord)
                        .then(isMatch => {
                            if (isMatch) {
                                const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1d'}, function (err, token) {
                                     res.json({
                                        success: true,
                                        token: token
                                     })
                                })
                            } else {
                                errors.password = 'Password is incorrect'
                                return res.status(404).json(errors)
                            }
                        })
                    } else {
                        errors.email = 'User not found'
                        return res.status(404).json(errors)
                    }
                })
        })

    
router.route('/')
        .get( passport.authenticate('jwt', { session: false}),(req, res) => {
            res.json({
                _id: req.user._id,
                email: req.user.email,
                username: req.user.username,
                followers: require.user.followers,
                following: req.user.following
            })
        })
        module.exports = router