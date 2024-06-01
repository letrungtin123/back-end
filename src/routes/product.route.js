import {
   createProduct,
   deleteProduct,
   getAllProducts,
   getoneProduct,
   updateProduct
} from '../controllers/product.controller.js';

import Product from '../schemas/product.shema.js';
import express from 'express';
import { httpStatus } from '../configs/http-status.config.js';
import { isObjectIdOrHexString } from 'mongoose';

const router = express.Router();

router.get('/product', getAllProducts);

router.post('/product', createProduct);

router.put('/product/:productId', updateProduct);

router.get('/product/:productId', getoneProduct);

router.delete('/product/:productId', deleteProduct);

export default router;