import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from '../controllers/productsController.js';
import { authenticate } from '../middleware/authenticate.js';

const productsRouter = Router();

productsRouter.use('/products', authenticate);

productsRouter.get('/products', getAllProducts);
productsRouter.get('/products/:productId', getProduct);
productsRouter.post('/products', createProduct);
productsRouter.patch('/products/:productId', updateProduct);
productsRouter.delete('/products/:productId', deleteProduct);

export default productsRouter;
