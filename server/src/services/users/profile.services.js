const Cart = require("../../models/cart");
const Image = require("../../models/images");
const User = require("../../models/user");
const WishList = require("../../models/wishlist");

const getProfileDB = async (id) => {
  const user = await User.findById(id).select("-password -__v");

  // get cart and wishlist
  const cart = await Cart.find({ user: user._id }).populate({
    path: "item",
    select: "title slug",
  });

  for (let c of cart) {
    const images = await Image.find({ product_id: c.item._id }).limit(1);
    if (images.length === 0) {
      c.item = {
        ...c.item._doc,
        images: [{ url: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg" }],
      };
      continue;
    }
    c.item = {
      ...c.item._doc,
      images: images,
    };
  }

  const wishlist = await WishList.find({ user: user._id }).populate({
    path: "item",
    select: "title slug",
  });

  for (let w of wishlist) {
    const images = await Image.find({ product_id: w.item._id }).limit(1);
    if (images.length === 0) {
      w.item = {
        ...w.item._doc,
        images: [{ url: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg" }],
      };
      continue;
    }
    w.item = {
      ...w.item._doc,
      images: images,
    };
  }

  return { user, cart, wishlist };
};

module.exports = { getProfileDB };
