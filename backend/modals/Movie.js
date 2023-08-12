const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({

key:{
    type:String
},
location:{
    type:String
}


}


)

const MOVIE = mongoose.model("MOVIE", MovieSchema);
module.exports=MOVIE