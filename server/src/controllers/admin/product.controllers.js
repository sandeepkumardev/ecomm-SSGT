const {
  getProductsDB,
  createProductDB,
  updateProductDB,
  deleteProductDB,
  getProductInfoDB,
} = require("../../services/admin/product.services");
const { generateSlug } = require("../../utils");

const getProductInfo = async (req, res) => {
  const { slug } = req.params;
  const data = await getProductInfoDB({ slug });
  return res.json({ success: true, data });
};

const getProducts = async (req, res) => {
  const data = await getProductsDB();
  return res.json({ success: true, data });
};

const createProduct = async (req, res) => {
  const { title, description, price, mrp, rating, stock, category, images } = req.body;

  if (!title || !description || !price || !mrp || !rating || !category) {
    return res.json({
      success: false,
      error: "All fields are required",
      required: ["title", "description", "price", "mrp", "rating", "category"],
    });
  }

  if (mrp < price) {
    return res.json({
      success: false,
      error: "MRP should be greater than price",
    });
  }

  const slug = generateSlug(title);

  try {
    const data = await createProductDB({ title, slug, description, price, mrp, rating, stock, category, images });
    return res.json({ success: true, data });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ success: false, error: "Product already exists" });
    }

    return res.json({ success: false, error: "something went wrong!" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (body.title) {
    body.slug = generateSlug(body.title);
  }

  try {
    const data = await updateProductDB(id, body);
    return res.json({ success: true, data });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ success: false, error: "Product already exists" });
    }

    return res.json({ success: false, error: "something went wrong!" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteProductDB(id);
    return res.json({ success: true, data: "Product deleted successfully!" });
  } catch (error) {
    return res.json({ success: false, error: "something went wrong!" });
  }
};

module.exports = { getProductInfo, getProducts, createProduct, updateProduct, deleteProduct };
