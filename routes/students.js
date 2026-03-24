const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentsController');
const auth = require('../middleware/auth');

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
 *     security:
 *       - bearerAuth: []
 */
router.get('/', auth, controller.getAllStudents);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', auth, controller.getStudentById);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', auth, controller.createStudent);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', auth, controller.updateStudent);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', auth, controller.deleteStudent);

module.exports = router;