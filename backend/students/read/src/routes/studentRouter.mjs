import express from 'express';
import { getAllStudents, getStudentById } from '../controllers/studentController.mjs';

const router = express.Router();

// Route for getting all students
router.get('/', getAllStudents);

// Route for getting a student by ID
router.get('/:id', getStudentById);

export default router;
