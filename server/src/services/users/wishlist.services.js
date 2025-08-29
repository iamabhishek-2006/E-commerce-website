const { default: mongoose } = require("mongoose");
const WishList = require("../../models/wishlist");
const Cart = require("../../models/cart");

const addWishlistDB=async (userId,productId)=>{
    const data=new WishList({user:userId,item:productId});
    return await data.save();
};

const getWishlistDB= async (userId)=>{
    return await WishList.find({user:userId}).populate("item").exec();
};

const deleteWishlistDB=async(id)=>{
    return await WishList.findOneAndDelete({item:id});
}

const deleteWishlistAllDB=async(userId)=>{
    return await WishList.deleteMany({user:userId});
}

const moveToCartDB=async(id,userId)=>{
    const session=await mongoose.startSession();

    try {
    await session.withTransaction(async()=>{
      await WishList.findOneAndDelete({item:id},{session});

      // check item in cart
      // ...
      // if already in cart,update quantity
      // ...
      // if not in cart, add to cart

    //   const cart=new Cart({
    //     user:userId,
    //     item:id,
    //     quantity:1,
    //   })
    //   await cart.save({session});
     await Cart.findOneAndUpdate(
       { user: userId, item: id },
       { $inc: { quantity: 1 } },
       { new: true, upsert: true, setDefaultsOnInsert: true, session }
     );
    });
    return {};
    } catch (error) {
    console.log(error);
    return null;  
    }
}

module.exports={addWishlistDB,getWishlistDB,deleteWishlistDB,deleteWishlistAllDB,moveToCartDB};