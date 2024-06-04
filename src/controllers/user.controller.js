import { createUserModel, findUsers, handleDeleteUser, handleGetoneUser } from "../models/user.model.js";

import { httpStatus } from "../configs/http-status.config.js";
import { messageResponse } from "../utils/message.util.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await findUsers();
        if (!users) {
            return messageResponse({
                res,
                status: httpStatus.BAD_REQUEST,
                message: "Khoong tim thay users",
                success:false,
            });
        }
        return messageResponse({
            res,
            status:httpStatus.OK,
            message: "get all users",
            data:users,
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

export const createUser = async (req,res) => {
    try {
        const body = req.body;
        const user = await createUserModel(body);

        if (!user){
            return messageResponse({
                res,
                status:httpStatus.BAD_REQUEST,
                message:"Tao user khong thanh cong!",
            });
        }
        return messageResponse({
            res,
            status: httpStatus.CREATED,
            message: "Tao user thanh cong!",
            data:user,
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
export const updateUser = async (req, res) => {
	try {
		const id = req.params.userId;
		const body = req.body;

		if (!checkIsObjectIdOrHexString(id)) {
			return messageResponse({
				res,
				status: httpStatus.BAD_REQUEST,
				message: 'Id không hợp lệ',
				success: false,
			});
		}

		const user = await handleUpdateUser(id, body);

		if (!user) {
			return messageResponse({
				res,
				status: httpStatus.BAD_REQUEST,
				message: 'Cập nhật user không thành công!',
			});
		}

		return messageResponse({
			res,
			status: httpStatus.OK,
			message: 'Cập nhật user thành công!',
			data: user,
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
export const getoneUser = async (req, res) => {
	try {
		const id = req.params.userId;

		if (!isObjectIdOrHexString(id)) {
			return res.status(httpStatus.BAD_REQUEST).json({
				// 400
				message: 'Id không hợp lệ',
				success: false,
			});
		}

		const user = await handleGetoneUser(id);

		if (!user) {
			return res.status(httpStatus.NOT_FOUND).json({
				// 404
				message: 'Không tìm thấy product',
				success: false,
			});
		}

		return res.status(httpStatus.OK).json({
			message: 'get user',
			success: true,
			data: user,
		});
	} catch (error) {
		return res
			.status(httpStatus.INTERNAL_SERVER_ERROR) // 500
			.json({ message: 'Internal Server Error', success: false, data: error });
		}
	};
	//delete
	export const deleteUser = async (req, res) => {
		try {
			const id = req.params.userId;
	
			if (!isObjectIdOrHexString(id)) {
				return res.status(httpStatus.BAD_REQUEST).json({
					// 400
					message: 'Id không hợp lệ',
					success: false,
				});
			}
	
			const user = await handleDeleteUser(id);
	
			if (!user) {
				return res.status(httpStatus.NOT_FOUND).json({
					// 404
					message: 'Không tìm thấy user',
					success: false,
				});
			}
	
			return res.status(httpStatus.OK).json({
				message: 'Xóa user thành công!',
				success: true,
				data: user,
			});
		} catch (error) {
			return res
				.status(httpStatus.INTERNAL_SERVER_ERROR) // 500
				.json({ message: 'Internal Server Error', success: false, data: error });
		}
	};