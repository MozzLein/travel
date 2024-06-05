const bcrypt = require('bcrypt')
const Users = require('../models/userModel.js')
const Tokens = require('../models/tokenModel.js')
const {generateUUID} = require('../helper/generateId.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// for user register
exports.getUserRegister = (req, res) => {
    try {
        res.status(201).render('register', { errorMessage: null })
    } catch (error) {
        res.status(500).send({
            error : error.message
        })
    }
}

exports.userRegister = async (req, res) => {
    try {
        const {name, phoneNumber, username, password, confirmPassword} = req.body
        //check if username has been used
        const checkUsername = await Users.findOne({ where: { username } })
        if(checkUsername){
            res.status(400).render('register', { errorMessage: 'Username already used' })
            return
        }
        //check if password doesn't match
        if(password !== confirmPassword){
            res.status(400).render('register', { errorMessage: 'Password doesn\'t match' })
            return
        }
        //create hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const id = generateUUID();
        //input data to db
        await Users.create({ id, name, username, phoneNumber, password: hashedPassword });

        res.status(201).redirect('/login')
    } catch (error) {
        res.status(500).send({
            error : error.message
        })
    }
}

//for user login
exports.getUserLogin = (req, res) => {
    try {
        res.render('login', { errorMessage: null })
    } catch (error) {
        res.status(500).send({
            error : error.message
        })
    }
}
exports.userLogin = async (req, res) => {
    try {
        const {username, password} = req.body
        //check if the user exist
        const userInformation = await Users.findOne({ where: { username } })
        if(!userInformation){
            res.status(404).render('login', { errorMessage: 'Wrong username or password' })
            return
        }
        //check if inputed password match with password in db
        const passwordMatch = await bcrypt.compare(password, userInformation.password)
        if(!passwordMatch){
            res.status(401).render('login', { errorMessage: 'Wrong username or password' })
            return
        }
        const token = jwt.sign({ user: { id: userInformation.id, username: userInformation.username, name: userInformation.firstName + " " + userInformation.lastName} }, process.env.ACCESS_SECRET_KEY, { expiresIn: '10m' });
        res.status(200).cookie('token', token, { httpOnly: true }).cookie('id', userInformation.id, { httpOnly: true }).redirect('/dashboard')
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }
}

//for logout
exports.userLogout = (req, res) => {
    try {
        res.clearCookie('token').clearCookie('id').redirect('/login')
    } catch (error) {
        res.status(500).send({
            error : error.message
        })
    }
}