import express from 'express';
import { createDegree, updateDegree, signDegree, queryAllDegreeByCreated, queryAllDegreeByStudentID, queryAllDegreeSign }from '../controllers/degrees.js';

const router = express.Router();

router.post('/createDegree', createDegree);
router.post('/updateDegree', updateDegree);
router.post('/signDegree', signDegree);
router.post('/queryAllDegreeByCreated', queryAllDegreeByCreated);
router.post('/queryAllDegreeByStudentID', queryAllDegreeByStudentID);
router.post('/queryAllDegreeSign', queryAllDegreeSign);

export default router;