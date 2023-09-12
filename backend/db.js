const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/";

//run mongodb server in services to avoid selection error
const connectToMongo = async () =>{
   await mongoose.connect(mongoURI).then(()=> console.log("Connected Successfully")).catch(err => console.log(err));
}

module.exports = connectToMongo;