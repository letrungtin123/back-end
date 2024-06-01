import {
   createProduct,
   getAllProducts,
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

router.get('/product/:productId', async (req, res) => {
	try {
		const id = req.params.productId;

		if (!isObjectIdOrHexString(id)) {
			return res.status(httpStatus.BAD_REQUEST).json({
				// 400
				message: 'Id không hợp lệ',
				success: false,
			});
		}

		const product = await Product.findById(id);

		if (!product) {
			return res.status(httpStatus.NOT_FOUND).json({
				// 404
				message: 'Không tìm thấy product',
				success: false,
			});
		}

		return res.status(httpStatus.OK).json({
			message: 'get product',
			success: true,
			data: product,
		});
	} catch (error) {
		return res
			.status(httpStatus.INTERNAL_SERVER_ERROR) // 500
			.json({ message: 'Internal Server Error', success: false, data: error });
	}
});

router.delete('/product/:productId', async (req, res) => {
	try {
		const id = req.params.productId;

		if (!isObjectIdOrHexString(id)) {
			return res.status(httpStatus.BAD_REQUEST).json({
				// 400
				message: 'Id không hợp lệ',
				success: false,
			});
		}

		const product = await product.findByIdAndDelete(id);

		if (!product) {
			return res.status(httpStatus.NOT_FOUND).json({
				// 404
				message: 'Không tìm thấy product',
				success: false,
			});
		}

		return res.status(httpStatus.OK).json({
			message: 'Xóa product thành công!',
			success: true,
			data: product,
		});
	} catch (error) {
		return res
			.status(httpStatus.INTERNAL_SERVER_ERROR) // 500
			.json({ message: 'Internal Server Error', success: false, data: error });
	}
});

export default router;