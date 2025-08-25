const { getCartItemDB, addCartItemsDB, updateCartIemsDB, deleteCartItemsDB } = require("../../services/users/cart.services");

const getCartItems=async (req,res)=>{
    const {id}=req.user;

    try {
    const data=await getCartItemDB(id);
    return res.status(200).json({
        success:true,
        message:"Cart items fetch Successfully",
        data,
    })
    } catch (error) {
    return res.status(500).json({
        success:false,
        message:"Something went wrong",
    })
    }
};

const addCartItems= async (req,res)=>{
    const {id}=req.user;
    const {item,quantity}=req.body;

    if((!item || !quantity)){
        return res.json({success:false, error:"all fields are required ",required:["item","quantity"]});
    }

    try {
    const data=await addCartItemsDB(id,item,quantity);
    return res.status(200).json({
        success:true,
        data
    })

    } catch (error) {
        console.log(error);
    res.json({
        success:false,
        error:"Something went wrong"
    })
    };

}

const updateCartIems= async (req,res)=>{
    const {id:cartId}=req.params;
    const {quantity}=req.body;

    if(!quantity){
        return res.json({success:false,error:"All fields are required",required:["quantity"]});
    }
    try {
    const data=await updateCartIemsDB(cartId,quantity);
    return res.json({
        success:true,
        data,
    });
        
    } catch (error) {
        return res.json({success:false,error:"something went wrong"});
    }


}

const deleteCartItems= async (req,res)=>{
    const {id:cartId}=req.params;

    try {
    const data=await deleteCartItemsDB(cartId);
    return res.json({
        success:true,
        message:"Item deleted successfully",
        data,
    })
    } catch (error) {
    console.log(error);
    return res.json({
        success:false,
        error:"something went wrong",
    })
    }
}

module.exports={getCartItems,addCartItems,updateCartIems,deleteCartItems}