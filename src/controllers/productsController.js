import createHttpError from 'http-errors';
import productServices from '../services/productService.js';

const getAllProducts = async (req, res) => {
  const products = await productServices.getAllProducts();
  return res.status(200).json({
    data: products,
  });
};

const getProductById = async (req, res) => {
  const { productId } = req.params;

  const product = await productServices.getProductById(productId);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json({ data: product });
};

const createProduct = async (req, res) => {
  const product = await productServices.createProduct(req.body);

  res.status(201).json({ data: product });
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await productServices.updateProduct(productId, req.body);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json({ data: product });
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  const product = await productServices.deleteProduct(productId);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json({ data: product });
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
