const Cart = require("../../models/cart");

const getCartItemDB = async (id) => {
  return await Cart.find({ user: id });
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

const updateCartItemDB = async (userId, itemId, quantity) => {
  if (!quantity) {
    return await Cart.findOneAndDelete({ user: userId, item: itemId });
  }
  return await Cart.findOneAndUpdate({ user: userId, item: itemId }, { quantity }, { new: true });
}

const deleteCartItemsDB = async (cartId) => {
  return await Cart.findOneAndDelete(cartId);
};

module.exports = {
  getCartItemDB,
  addCartItemsDB,
  updateCartItemDB,
  deleteCartItemsDB,
};
