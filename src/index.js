const path = require('path')
const express = require('express');
const router_path = require('./routes');
const mongoose = require("mongoose");
const {not_found_url, ErrorHandler} = require("./handlers");
const passport = require("passport");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000
const app = express();
const router = express.Router();

router.use(router_path)
mongoose.Promise = global.Promise;

app.use(passport.initialize({}))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors())
app.use(express.json())
app.use('/public', express.static(path.resolve(__dirname, '../public')))
app.set('view engine', 'ejs');
app.set('trust proxy', 1);
app.set('views', path.join(__dirname, '/views'));
app.use(router)
app.use([not_found_url, ErrorHandler])

// app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))

module.exports = app