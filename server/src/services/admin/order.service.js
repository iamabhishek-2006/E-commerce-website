const Order = require("../../models/order")

const updateOrderStatusDB=async(id,body)=>{
    return await Order.findByIdAndUpdate(id,body, { new: true });
}

const getAllOrdersDB=async()=>{
    return await Order.find({})
}

module.exports={updateOrderStatusDB,getAllOrdersDB}