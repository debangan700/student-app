import express from 'express';
import { addStudent, deleteStudent, updateStudent } from '../controllers/writeStudent.mjs';

const router = express.Router();

// Route for adding a student
router.post('/students', addStudent);

// Route for deleting a student by ID
router.delete('/students/:id', deleteStudent);

// Route for updating a student's details
router.put('/students/:id', updateStudent);

export default router;
