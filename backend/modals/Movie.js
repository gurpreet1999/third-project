const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({

url:{
    type:String,
    default:""
},
name:{
    type:String,
    default:""
},
size:{
    type:String,
    default:""
}


}


)

const MOVIE = mongoose.model("MOVIE", MovieSchema);
module.exports=MOVIE