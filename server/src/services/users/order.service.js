const { default: mongoose } = require("mongoose");
const Order = require("../../models/order");
const Cart = require("../../models/cart");

const getOrdersDB=async()=>{
    return await Order.find({}).populate({path:"orderItems.product"}).populate("shippingAddress");
}

const createOrderDB=async(data)=>{
    // const newOrder=new Order(data);
    // return await newOrder.save();
      const session = await mongoose.startSession();

      try {
        return await session.withTransaction(async () => {
          const newOrder = new Order(data);
          const order = await newOrder.save();

          // clear the cart
          await Cart.deleteMany({ user: data.user });

          return order;
        });
      } catch (error) {
        console.log(error);
        return null;
      }
}
const cancelOrderDB = async (id) => {
  return await Order.findByIdAndUpdate(  id,  { status: "canceled" },  { new: true }
  );
};

module.exports={getOrdersDB,createOrderDB,cancelOrderDB};