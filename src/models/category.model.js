import Category from '../schemas/category.schema.js';
import { isObjectIdOrHexString } from 'mongoose';

export const findCategories = async () => {
	const categories = await Category.find();
	return categories;
};

export const createCategoryModel = async (body) => {
	const category = await Category.create(body);
	return category;
};

// check id category
export const checkIsObjectIdOrHexString = (id) => {
	return isObjectIdOrHexString(id);
};

// update category
export const handleUpdateCategory = async (id, body) => {
	const category = await Category.findByIdAndUpdate(id, body, { new: true });
	return category;
};
//getone 
export const handleGetoneCategory = async (id) => {
	const category = await Category.findById(id, { new: true });
	return category;
};
//delete
export const handleDeleteCategory = async (id) => {
	const category = await Category.findByIdAndDelete(id, { new: true });
	return category;
};