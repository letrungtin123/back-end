import {
	createCategory,
	deleteCategory,
	getAllCategories,
	getoneCategory,
	updateCategory,
} from '../controllers/category.controller.js';

import Category from '../schemas/category.schema.js';
import express from 'express';
import { httpStatus } from '../configs/http-status.config.js';
import { isObjectIdOrHexString } from 'mongoose';

const router = express.Router();

// api/v1/category
router.get('/category', getAllCategories);

// create category
router.post('/category', createCategory);

// update category
router.put('/category/:categoryId', updateCategory);

// get one category
router.get('/category/:categoryId',getoneCategory); 

// delete category
router.delete('/category/:categoryId', deleteCategory);

export default router;