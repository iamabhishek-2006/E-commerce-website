const WishList = require("../../models/wishlist");

const addWishlistDB=async (userId,productId)=>{
    const data=new WishList({user:userId,item:productId});
    return await data.save();
};

const getWishlistDB= async (userId)=>{
    return await WishList.find({user:userId}).populate("item").exec();
};

const deleteWishlistDB=async(id)=>{
    return await WishList.findByIdAndDelete(id);
}

const deleteWishlistAllDB=async(userId)=>{
    return await WishList.deleteMany({user:userId});
}

module.exports={addWishlistDB,getWishlistDB,deleteWishlistDB,deleteWishlistAllDB};