const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({

url:{
    type:String
}


}


)

const MOVIE = mongoose.model("MOVIE", MovieSchema);
module.exports=MOVIE