const Order = require("../../models/order");

const getAllOrdersDB = async () => {
  return await Order.find({}).populate({ path: "user", select: "name email" });
};

const updateOrderStatusDB = async (id, status) => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};

module.exports = { getAllOrdersDB, updateOrderStatusDB };
