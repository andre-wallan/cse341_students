const express = require('express');
const router = express.Router();
const controller = require('../controllers/coursesController');
const isAuthenticated = require('../middleware/isAuthenticated');

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Courses API
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 */
router.get('/', isAuthenticated, controller.getAllCourses);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 */
router.get('/:id', isAuthenticated, controller.getCourseById);

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 */
router.post('/', isAuthenticated, controller.createCourse);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update a course
 *     tags: [Courses]
 */
router.put('/:id', isAuthenticated, controller.updateCourse);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 */
router.delete('/:id', isAuthenticated, controller.deleteCourse);

module.exports = router;