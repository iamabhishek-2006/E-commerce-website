const Order = require("../../models/order")

const updateOrderStatusDB = async (id, status) => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};

const getAllOrdersDB = async () => {
  return await Order.find({}).populate({ path: "user", select: "name email" });
};

module.exports={updateOrderStatusDB,getAllOrdersDB}