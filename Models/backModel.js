const mongoose = require('mongoose');

const backSchema = new mongoose.Schema({
    imgURL:       { type : String, required: true },
    name:         { type : String, required: true },
    dis:           { type : String, required: true},
    webLink:      { type : String, required: true },   
    
})

module.exports= mongoose.model("back", backSchema);