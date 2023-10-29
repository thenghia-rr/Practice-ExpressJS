const mongoose = require('mongoose');
require('dotenv').config()
const mongodbURL = process.env.MONGODB_URL

async function connect() {
    try {
        await mongoose.connect(`${mongodbURL}`, {
            // useNewUrlParser: true,
            // // useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        console.log("Connected Successfully");
    } catch (error) {
        console.log("Connected Failure", error);   
    }
}

module.exports = { connect };
