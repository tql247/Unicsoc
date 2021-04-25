require('dotenv').config()
require('module-alias/register')
require('events').defaultMaxListeners = 100;
require('./src/index')
// require('./src/utils/socket')
console.log('Server is running...')