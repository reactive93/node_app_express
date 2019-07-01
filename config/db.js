const mongoose = require('mongoose');
const config = require('config');


/**
 * @type {String} db
 */
const db = config.get("mongoURI");

async function connectDB() {

    try {
        await mongoose.connect(db,
        {
            useNewUrlParser:true,
            useCreateIndex:true
        });
        console.log('DataBase connected.')
    }
    catch(err) {
        console.log(err.message);
        process.exit(1);
    }

}

module.exports = connectDB;
