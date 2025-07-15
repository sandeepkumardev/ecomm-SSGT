const { getAddressesDB, addAddressDB } = require("../../services/users/address.services");

const fetchAddresses = async (req, res) => {
  const data = await getAddressesDB();
  return res.json({ success: true, data });
};

const addAddress = async (req, res) => {
  const { fullName, phone, line1, line2, landmark, city, postalCode, country, user } = req.body;

  if (!fullName || !phone || !line1 || !line2 || !landmark || !city || !postalCode || !country || !user) {
    return res.json({
      success: false,
      error: "All fields are required",
      required: ["fullName", "phone", "line1", "line2", "landmark", "city", "postalCode", "country", "user"],
    });
  }

  // TODO: check user is exist

  try {
    const data = await addAddressDB(req.body);
    return res.json({ success: true, data });
  } catch (error) {
    return res.json({ success: false, error: "something went wrong!" });
  }
};

const updateAddress = () => {};

const deleteAddress = () => {};

module.exports = { fetchAddresses, addAddress, updateAddress, deleteAddress };
