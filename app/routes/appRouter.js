const express = require('express')
const router = express.Router()

const {getUserRegister, getUserLogin, userRegister, userLogin, userLogout} = require('../controllers/userController')
const {getDashboard, addPackage} = require('../controllers/packageController')
const {verifyToken} = require('../middleware/authMiddleware')

router.get('/register', getUserRegister)
router.post('/register', userRegister)

router.get('/', getUserLogin)
router.get('/login', getUserLogin)
router.post('/login', userLogin)

router.get('/dashboard', verifyToken, getDashboard)
router.post('/dashboard', addPackage)

router.get('/logout', userLogout)


module.exports = router