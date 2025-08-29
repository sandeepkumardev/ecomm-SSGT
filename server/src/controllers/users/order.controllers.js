const { createOrderDB, getOrdersDB, cancleOrderDB, getOrderDetailDB } = require("../../services/users/order.services");

const getOrders = async (req, res) => {
  const data = await getOrdersDB();
  return res.json({ success: true, data });
};

const getOrderDetail = async (req, res) => {
  const id = req.params.id;
  const data = await getOrderDetailDB(id);
  return res.json({ success: true, data });
};

const createOrder = async (req, res) => {
  const userId = req.user.id;
  const { orderItems, totalAmount, paymentMethod, shippingAddress } = req.body;

  if (!orderItems || !totalAmount || !paymentMethod || !shippingAddress) {
    return res.json({ success: false, error: "All fields are required" });
  }

  if (!Array.isArray(orderItems)) {
    return res.json({ success: false, error: "Order items should be an array" });
  }

  req.body.user = userId;

  try {
    const data = await createOrderDB(req.body);
    return res.json({ success: true, data });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      error: "something went worng!",
    });
  }
};

const cancelOrder = async (req, res) => {
  const id = req.params.id;

  try {
    await cancleOrderDB(id);
    return res.json({ success: true, message: "Order canceled successfully!" });
  } catch (error) {
    return res.json({
      success: false,
      error: "something went wrong!",
    });
  }
};

module.exports = { getOrderDetail, getOrders, createOrder, cancelOrder };
