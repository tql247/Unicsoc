// require('dotenv').config()

const express = require('express');
const router_path = require('./routes');
const path = require('path');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');


const PORT = process.env.PORT || 5000

const app = express();
const router = express.Router()
router.use(router_path)

app.set('trust proxy', 1) // trust first proxy
// app.use(cookieParser())
app.use("/public", express.static(path.join(__dirname, '/public')))
// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))

module.exports = app