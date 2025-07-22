const Cart = require("../../models/cart");

const getCartItemsDB = async (id) => {
  return await Cart.find({ user: id });
  // .populate("item")
};

const addCartItemDB = async (user, item, quantity) => {
  // check if item is already in cart
  const cartItem = await Cart.findOne({ user, item });

  if (!cartItem) {
    const data = new Cart({ user, item, quantity });
    return await data.save();
  } else {
    // return error
    // update quantity

    return {};
  }
};

const updateCartItemDB = async (cartId, quantity) => {
  return await Cart.findByIdAndUpdate(cartId, { quantity }, { new: true });
};

module.exports = { getCartItemsDB, addCartItemDB, updateCartItemDB };
