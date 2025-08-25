const { addWishlistDB, getWishlistDB, deleteWishlistDB, deleteWishlistAllDB } = require("../../services/users/wishlist.services");

const getWishlist=async(req,res)=>{
    try {
        const data=await getWishlistDB(req.user.id);
        return res.json({success:true,data})
    } catch (error) {
        return res.json({success:false,error:"something went wrong"});
    }
};

const addWishlist=async (req,res)=>{
    if(!req.body.item){
        return res.json({success:false,error:"All fields are required"});
    }

    try {
    const data=await addWishlistDB(req.user.id,req.body.item);
    return res.status(200).json({
        success:true,
        message:"User add to wishlist successfully",
        data,
    })
    } catch (error) {
     return res.json({
        success:false,
        error:"User not add to wishlist",
     })
    }


}

const deleteWishlist=async(req,res)=>{
    const {id}=req.params;

    try {
    await deleteWishlistDB(id,req.user.id);
    return res.json({success:true,data:"wishlist item deleted successfully"});
    } catch (error) {
    return res.json({success:false,error:"something went wrong"});
    }
}


const deleteWishlistAll=async (req,res)=>{
    try {
    await deleteWishlistAllDB(req.user.id);
    return res.json({success:true,data:"All wishlist items deleted successfully"});
        
    } catch (error) {
    return res.json({success:false,error:"something went wrong"});
    }
}

module.exports={getWishlist,addWishlist,deleteWishlist,deleteWishlistAll};