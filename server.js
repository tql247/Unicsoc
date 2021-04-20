require('dotenv').config({path: process.cwd() + '.env'})
require('module-alias/register')
require('./src/index')
console.log('Server is running...')