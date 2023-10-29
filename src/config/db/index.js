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
// MONGODB_URL=mongodb+srv://thenghia_rr:NnV0gbWEGvDQsBHU@courses-api.ltokyry.mongodb.net/
// mongodb://127.0.0.1:27017/f8_education_dev
module.exports = { connect };
