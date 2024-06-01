import {
  checkIsObjectIdOrHexString,
  createProductModel,
  findProducts,
  handleUpdateProduct,
} from "../models/product.model.js";

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

