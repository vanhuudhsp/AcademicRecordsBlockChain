import express from 'express';
import { createStudent, queryAllStudents, updateStudent  }from '../controllers/students.js';

const router = express.Router();

router.post('/createStudent', createStudent);
router.post('/queryAllStudents', queryAllStudents);
router.post('/updateStudent', updateStudent);

export default router;