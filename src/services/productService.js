import { Product } from '../models/product.js';

const getAllProducts = (userId) => {
  return Product.find({ userId });
};

const getProduct = (payload) => {
  return Product.findOne(payload);
};

const createProduct = (payload) => {
  return Product.create(payload);
};

const updateProduct = (data, payload) => {
  return Product.findOneAndUpdate(data, payload, { new: true });
};

const deleteProduct = (data) => {
  return Product.findOneAndDelete(data);
};

export default {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
