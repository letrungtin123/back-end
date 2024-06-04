import { createUser, deleteUser, getAllUsers, getoneUser, updateUser } from '../controllers/user.controller.js';

import express from 'express';
import { httpStatus } from '../configs/http-status.config.js';
import { isObjectIdOrHexString } from 'mongoose';

const router = express.Router();

// api/v1/user
router.get('/user', getAllUsers);

// create user
router.post('/user', createUser);

// update user
router.put('/user/:userId', updateUser);

// get one user
router.get('/user/:userId',getoneUser);

// delete user
router.delete('/user/:userId', deleteUser);

export default router;