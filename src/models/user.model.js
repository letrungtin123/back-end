import User from "../schemas/product.shema.js";
import { isObjectIdOrHexString } from "mongoose";

export const findUsers = async () => {
    const users = await User.find();
    return users;
};
export const createUserModel = async (body) => {
    const user =await User.create(body);
    return user;
}
export const checkIsObjectIdOrHexString = (id) => {
    return isObjectIdOrHexString(id);
}

export const handleUpdateUser = async (id,body) => {
    const user = await User.findByIdAndUpdate(id,body, {new:true});
    return user;
}
//getone 
export const handleGetoneUser = async (id) => {
	const user = await User.findById(id, { new: true });
	return user;
};
//delete
export const handleDeleteUser = async (id) => {
	const user = await User.findByIdAndDelete(id, { new: true });
	return user;
};