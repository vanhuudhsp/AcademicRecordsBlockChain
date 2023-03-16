import express from 'express';
import { getUsers, createUser, updateUser, loginUser}from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);

router.post('/', createUser);

router.post('/update', updateUser);

router.post('/login', loginUser);


export default router;