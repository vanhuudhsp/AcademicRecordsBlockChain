import express from 'express';
import { createCourse, queryAllCourses, updateCourse }from '../controllers/courses.js';

const router = express.Router();

router.post('/createCourse', createCourse);
router.post('/updateCourse', updateCourse);
router.post('/queryAllCourses', queryAllCourses);

export default router;