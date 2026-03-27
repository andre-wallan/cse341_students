const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentscontroller');
const isAuthenticated = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student API
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 */
router.get('/', isAuthenticated, controller.getAllStudents);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 */
router.get('/:id', isAuthenticated, controller.getStudentById);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 */
router.post('/', isAuthenticated, controller.createStudent);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student
 *     tags: [Students]
 */
router.put('/:id', isAuthenticated, controller.updateStudent);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 */
router.delete('/:id', isAuthenticated, controller.deleteStudent);

module.exports = router;