import {
  checkIsObjectIdOrHexString,
  createProductModel,
  findProducts,
  handleDeleteProduct,
  handleGetoneProduct,
  handleUpdateProduct,
} from "../models/product.model.js";

import { handleGetoneCategory } from "../models/category.model.js";
import { httpStatus } from "../configs/http-status.config.js";
import { messageResponse } from "../utils/message.util.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await findProducts();
        if (!products) {
            return messageResponse({
                res,
                status: httpStatus.BAD_REQUEST,
                message: "Khoong tim thay products",
                success:false,
            });
        }
        return messageResponse({
            res,
            status:httpStatus.OK,
            message: "get all products",
            data:products,
        });
    } catch (error) {
        return messageResponse({
            res,
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message:false,
            success:false,
            data:error,
        });
    }
};

export const createProduct = async (req,res) => {
    try {
        const body = req.body;
        const product = await createProductModel(body);

        if (!product){
            return messageResponse({
                res,
                status:httpStatus.BAD_REQUEST,
                message:"Tao product khong thanh cong!",
            });
        }
        return messageResponse({
            res,
            status: httpStatus.CREATED,
            message: "Tao product thanh cong!",
            dât:product,
        });
    } catch (error) {
		return messageResponse({
			res,
			status: httpStatus.INTERNAL_SERVER_ERROR,
			message: 'Internal Server Error',
			success: false,
			data: error,
		});
    }
};
export const updateProduct = async (req, res) => {
	try {
		const id = req.params.categoryId;
		const body = req.body;

		if (!checkIsObjectIdOrHexString(id)) {
			return messageResponse({
				res,
				status: httpStatus.BAD_REQUEST,
				message: 'Id không hợp lệ',
				success: false,
			});
		}

		const product = await handleUpdateProduct(id, body);

		if (!product) {
			return messageResponse({
				res,
				status: httpStatus.BAD_REQUEST,
				message: 'Cập nhật product không thành công!',
			});
		}

		return messageResponse({
			res,
			status: httpStatus.OK,
			message: 'Cập nhật product thành công!',
			data: product,
		});
	} catch (error) {
		return messageResponse({
			res,
			status: httpStatus.INTERNAL_SERVER_ERROR,
			message: 'Internal Server Error',
			success: false,
			data: error,
		});
	}
};

// get one 
export const getoneProduct = async (req, res) => {
	try {
		const id = req.params.productId;

		if (!isObjectIdOrHexString(id)) {
			return res.status(httpStatus.BAD_REQUEST).json({
				// 400
				message: 'Id không hợp lệ',
				success: false,
			});
		}

		const category = await handleGetoneProduct(id);

		if (!category) {
			return res.status(httpStatus.NOT_FOUND).json({
				// 404
				message: 'Không tìm thấy product',
				success: false,
			});
		}

		return res.status(httpStatus.OK).json({
			message: 'get product',
			success: true,
			data: category,
		});
	} catch (error) {
		return res
			.status(httpStatus.INTERNAL_SERVER_ERROR) // 500
			.json({ message: 'Internal Server Error', success: false, data: error });
		}
	};
	//delete
	export const deleteProduct = async (req, res) => {
		try {
			const id = req.params.productId;
	
			if (!isObjectIdOrHexString(id)) {
				return res.status(httpStatus.BAD_REQUEST).json({
					// 400
					message: 'Id không hợp lệ',
					success: false,
				});
			}
	
			const category = await handleDeleteProduct(id);
	
			if (!category) {
				return res.status(httpStatus.NOT_FOUND).json({
					// 404
					message: 'Không tìm thấy product',
					success: false,
				});
			}
	
			return res.status(httpStatus.OK).json({
				message: 'Xóa product thành công!',
				success: true,
				data: category,
			});
		} catch (error) {
			return res
				.status(httpStatus.INTERNAL_SERVER_ERROR) // 500
				.json({ message: 'Internal Server Error', success: false, data: error });
		}
	};