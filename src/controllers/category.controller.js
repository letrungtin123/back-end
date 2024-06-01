import {
	checkIsObjectIdOrHexString,
	createCategoryModel,
	findCategories,
	handleUpdateCategory,
} from '../models/category.model.js';

import { httpStatus } from '../configs/http-status.config.js';
import { messageResponse } from '../utils/message.util.js';

/* get all category */
export const getAllCategories = async (req, res) => {
	try {
		const categories = await findCategories();

		if (!categories) {
			return messageResponse({
				res,
				status: httpStatus.BAD_REQUEST,
				message: 'Không tìm thấy categories',
				success: false,
			});
		}

		return messageResponse({
			res,
			status: httpStatus.OK,
			message: 'get all categories',
			data: categories,
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

export const createCategory = async (req, res) => {
	try {
		const body = req.body;

		const category = await createCategoryModel(body);

		if (!category) {
			return messageResponse({
				res,
				status: httpStatus.BAD_REQUEST,
				message: 'Tạo category không thành công!',
			});
		}

		return messageResponse({
			res,
			status: httpStatus.CREATED,
			message: 'Tạo category thành công!',
			data: category,
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

// update
export const updateCategory = async (req, res) => {
	try {
		const id = req.params.categoryId;
		const body = req.body;

		// check id category
		if (!checkIsObjectIdOrHexString(id)) {
			return messageResponse({
				res,
				status: httpStatus.BAD_REQUEST,
				message: 'Id không hợp lệ',
				success: false,
			});
		}

		const category = await handleUpdateCategory(id, body);

		if (!category) {
			return messageResponse({
				res,
				status: httpStatus.BAD_REQUEST,
				message: 'Cập nhật category không thành công!',
			});
		}

		return messageResponse({
			res,
			status: httpStatus.OK,
			message: 'Cập nhật category thành công!',
			data: category,
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