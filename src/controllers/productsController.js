import createHttpError from 'http-errors';
import productServices from '../services/productService.js';

const getAllProducts = async (req, res) => {
  const products = await productServices.getAllProducts(req.user._id);
  return res.status(200).json({
    data: products,
  });
};

const getProduct = async (req, res) => {
  const { productId } = req.params;

  const product = await productServices.getProduct({
    userId: req.user._id,
    _id: productId,
  });

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json({ data: product });
};

const createProduct = async (req, res) => {
  console.log(req.user);

  const product = await productServices.createProduct({
    ...req.body,
    userId: req.user._id,
  });

  res.status(201).json({ data: product });
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await productServices.updateProduct(
    {
      _id: productId,
      userId: req.user._id,
    },
    req.body,
  );

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json({ data: product });
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  const product = await productServices.deleteProduct({
    _id: productId,
    userId: req.user._id,
  });

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json({ data: product });
};

export {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
