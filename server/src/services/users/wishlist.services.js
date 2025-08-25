const { default: mongoose } = require("mongoose");
const Cart = require("../../models/cart");
const WishList = require("../../models/wishlist");

const getWLItemsDB = async (userId) => {
  return await WishList.find({ user: userId }).populate("item").exec();
};

const addWLItemDB = async (userId, productId) => {
  const data = new WishList({ user: userId, item: productId });
  return await data.save();
};

const deleteWLItemDB = async (id) => {
  return await WishList.findOneAndDelete({ item: id });
};

const deleteAllWLItemDB = async (userId) => {
  return await WishList.deleteMany({ user: userId });
};

const moveToCartDB = async (id, userId) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      await WishList.findOneAndDelete({ item: id }, { session });

      // check item in cart
      // ...
      // if already in cart, update quantity
      // ...
      // if not in cart, add to cart
      const cart = new Cart({
        user: userId,
        item: id,
        quantity: 1,
      });
      await cart.save({ session });
    });
    return {};
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { getWLItemsDB, addWLItemDB, deleteWLItemDB, deleteAllWLItemDB, moveToCartDB };
