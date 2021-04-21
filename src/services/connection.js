const mongoose = require('mongoose');

async function connect() {
    const mongoDB = 'mongodb+srv://localhost:Guxy5rnRwXD6IQEZ@unisoc01.mhdcv.mongodb.net/uni_entities?retryWrites=true&w=majority';
    await mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    const db = mongoose.connection;
    db.on('error', (err) => {
        throw err
    });
}

module.exports = connect