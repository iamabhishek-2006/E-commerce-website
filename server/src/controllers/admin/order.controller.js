const { updateOrderStatusDB, getAllOrdersDB } = require("../../services/admin/order.service");

const updateOrderStatus=async(req,res)=>{

  const { id } = req.params;
  const { status } = req.body;

  const data = await updateOrderStatusDB(id, status);
  return res.json({ success: true, data });
};

const getAllOrders=async(req,res)=>{
     const data = await getAllOrdersDB();
     return res.json({ success: true, data });
    }

module.exports={updateOrderStatus,getAllOrders};