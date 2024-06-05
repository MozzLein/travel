const express = require('express')
const app = express()
const session = require('express-session')
const path = require('path')
const bodyParser = require('body-parser')
const router = require('./app/routes/appRouter')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(session({
  secret: 'rahasia',
  resave: false,
  saveUninitialized: false
}));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/', router) 
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.status(404).send('Halaman tidak ditemukan');
});
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './app/views'))

app.listen(3000, ()=>console.log('app running on http://localhost:3000'))