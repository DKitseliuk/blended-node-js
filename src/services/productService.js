import { Product } from '../models/product.js';

const getAllProducts = async () => {
  const products = await Product.find();
  return products;
};

const getProductById = async (productId) => {
  return Product.findById(productId);
};

const createProduct = async (payload) => {
  return Product.create(payload);
};

const updateProduct = async (productId, payload) => {
  return Product.findByIdAndUpdate(productId, payload, { new: true });
};
const deleteProduct = async (productId) => {
  return Product.findByIdAndDelete(productId);
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
