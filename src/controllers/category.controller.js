import {
	checkIsObjectIdOrHexString,
	createCategoryModel,
	findCategories,
	handleUpdateCategory,
	handleGetoneCategory,
	deleteCategory,
	handleDeleteCategory,
} from '../models/category.model.js';

import { httpStatus } from '../configs/http-status.config.js';
import { isObjectIdOrHexString } from 'mongoose';
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
// get one 
export const getoneCategory = async (req, res) => {
	try {
		const id = req.params.categoryId;

		// check id category
		if (!isObjectIdOrHexString(id)) {
			return res.status(httpStatus.BAD_REQUEST).json({
				// 400
				message: 'Id không hợp lệ',
				success: false,
			});
		}

		const category = await handleGetoneCategory(id);

		if (!category) {
			return res.status(httpStatus.NOT_FOUND).json({
				// 404
				message: 'Không tìm thấy category',
				success: false,
			});
		}

		return res.status(httpStatus.OK).json({
			message: 'get category',
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
	export const deleteCategory = async (req, res) => {
		try {
			const id = req.params.categoryId;
	
			// check id category
			if (!isObjectIdOrHexString(id)) {
				return res.status(httpStatus.BAD_REQUEST).json({
					// 400
					message: 'Id không hợp lệ',
					success: false,
				});
			}
	
			const category = await handleDeleteCategory(id);
	
			if (!category) {
				return res.status(httpStatus.NOT_FOUND).json({
					// 404
					message: 'Không tìm thấy category',
					success: false,
				});
			}
	
			return res.status(httpStatus.OK).json({
				message: 'Xóa category thành công!',
				success: true,
				data: category,
			});
		} catch (error) {
			return res
				.status(httpStatus.INTERNAL_SERVER_ERROR) // 500
				.json({ message: 'Internal Server Error', success: false, data: error });
		}
	};