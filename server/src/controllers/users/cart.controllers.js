const { getCartItemsDB, addCartItemDB, updateCartItemDB, deleteCartItemDB } = require("../../services/users/cart.services");

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
    if (data.error) {
      return res.json({ success: false, error: data.error });
    }
    return res.json({ success: true, data });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: "something went wrong!" });
  }
};

const updateCartItem = async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const data = await updateCartItemDB(userId, id, quantity);
    return res.json({ success: true, data });
  } catch (error) {
    return res.json({ success: false, error: "something went wrong!" });
  }
};

const deleteCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteCartItemDB(id);
    return res.json({ success: true, data: "Cart item deleted successfully!" });
  } catch (error) {
    return res.json({ success: false, error: "something went wrong!" });
  }
};

module.exports = { getCartItems, addCartItem, updateCartItem, deleteCartItem };
