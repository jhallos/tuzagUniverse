const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const users = require('./routes/users')
const cors = require('cors')
const passport = require('passport')

// setup environment
dotenv.config()

// mongo db connect
// mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
const app = express()
mongoose.connect(`mongodb://${process.env.DB_NAME}:${process.env.DB_PASS}@localhost:27017/tuzagtweet?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false`,(err)=>{
if(err) throw err;
console.log("DB Connected Successfully");
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use(passport.initialize())
require('./config/passport')(passport)

app.use('/api/users', users)

// run app
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))