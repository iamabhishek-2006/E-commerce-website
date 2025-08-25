const mongoose=require("mongoose");

const WishLishSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    item:{type:mongoose.Schema.Types.ObjectId,ref:"Product",require:true},
})

const WishList=mongoose.model("WishList",WishLishSchema);

module.exports=WishList;