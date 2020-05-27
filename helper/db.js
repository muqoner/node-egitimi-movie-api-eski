const mongoose = require("mongoose");



module.exports = () =>{
    mongoose.connect("mongodb+srv://admin:369erdal456@movie-api-nodejs-tgvir.mongodb.net/test?retryWrites=true&w=majority");
    mongoose.connection.on("open", ()=>{
        console.log("MongoDB: Connected");
    })
    mongoose.connection.on("error", (err)=>{
        console.log("MongoDB: Err", err);
    });
    mongoose.Promise = global.Promise;
}