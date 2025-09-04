const { updateOrderStatusDB, getAllOrdersDB } = require("../../services/admin/order.service");

const updateOrderStatus=async(req,res)=>{
    const {id}=req.params;
    const body=req.body;
    console.log(id);

    try {
        const data = await updateOrderStatusDB(id, body);
        console.log(data);
        if(!data){
            return res.json({success:false,error:"Order not found"})
        }
        return res.json({ success: true, data }); 
    } catch (error) {
        console.log(error);
        return res.json({success:false,error:"something went wrong"})
    }
    
}

const getAllOrders=async(req,res)=>{
    try {
    const order=await getAllOrdersDB();
    return res.json({
        success:true,
        data:order
    })
    } catch (error) {
        res.json({
        success:false,
        error:"Order not found"
    })
    }
}

module.exports={updateOrderStatus,getAllOrders};