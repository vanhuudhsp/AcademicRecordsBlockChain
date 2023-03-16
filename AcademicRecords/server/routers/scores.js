import express from 'express';
import {createScore, updateScore, queryAllScore, queryScoreByStudentID , queryScoreByLecturer}from '../controllers/scores.js';

const router = express.Router();


router.post('/createScore', createScore);
router.post('/updateScore', updateScore);
router.post('/queryAllScore', queryAllScore);
router.post('/queryScoreByStudentID', queryScoreByStudentID);
router.post('/queryScoreByLecturer', queryScoreByLecturer);



export default router;