const { getCartItemsDB, addCartItemDB, updateCartItemDB } = require("../../services/users/cart.services");

const getCartItems = async (req, res) => {
  const { id } = req.user;

  try {
    const data = await getCartItemsDB(id);
    return res.status(200).json({
      success: true,
      message: "Cart items fetched successfully!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "something went wrong!",
    });
  }
};

const addCartItem = async (req, res) => {
  const { id } = req.user;
  const { item, quantity } = req.body;

  if ((!item, !quantity)) {
    return res.json({ success: false, error: "All fields are required", required: ["item", "quantity"] });
  }

  try {
    const data = await addCartItemDB(id, item, quantity);
    return res.json({ success: true, data });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: "something went wrong!" });
  }
};

const updateCartItem = async (req, res) => {
  const { id: cartId } = req.params;
  const { quantity } = req.body;

  if (!quantity) {
    return res.json({ success: false, error: "All fields are required", required: ["quantity"] });
  }

  try {
    const data = await updateCartItemDB(cartId, quantity);
    return res.json({ success: true, data });
  } catch (error) {
    return res.json({ success: false, error: "something went wrong!" });
  }
};

const deleteCartItem = () => {};

module.exports = { getCartItems, addCartItem, updateCartItem, deleteCartItem };
