const express = require('express');
const app = express()
const port = 8000;
const cors = require('cors')
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');

require('dotenv').config()
require('./config/mongoose.config')

app.use(cookieParser())
app.use(cors({credentials: true, origin: "http://localhost:3000"}))
app.use(express.json(), express.urlencoded({extended: true}))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})


require('./routes/user.routes')(app)

app.listen(port, ()=> console.log(`Listening on port ${port}`))