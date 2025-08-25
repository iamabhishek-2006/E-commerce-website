const Cart = require("../../models/cart");

const getCartItemDB = async (id) => {
  return await Cart.find({ user: id });

  // populate ("items"); 
};

const addCartItemsDB = async (user, item, quantity) => {
  // check if item is already in cart
  const cartItem = await Cart.findOne({ user, item });

  if (!cartItem) {
    const data = new Cart({ user, item, quantity });
    return await data.save();
  } else {
    
    return {error:"Item already in cart"};
  }
};

const updateCartIemsDB = async (cartId, quantity) => {
  return await Cart.findByIdAndUpdate(cartId, { quantity }, { new: true });
};

const deleteCartItemsDB = async (cartId) => {
  return await Cart.findByIdAndDelete(cartId);
};

module.exports = {
  getCartItemDB,
  addCartItemsDB,
  updateCartIemsDB,
  deleteCartItemsDB,
};
