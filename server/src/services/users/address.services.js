const Address = require("../../models/address");

const getAddressesDB = async () => {
  return await Address.find({});
};

const addAddressDB = async (data) => {
  const newAddress = new Address(data);
  return await newAddress.save();
};

module.exports = { getAddressesDB, addAddressDB };
