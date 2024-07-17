const mongoose = require('mongoose');


const connectDatabase = ()=>{
    mongoose
    .connect(process.env.MONGO_URI,{
        dbName: "kudingMonk",
    
        
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })

}


module.exports = connectDatabase;


