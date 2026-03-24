const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const auth = require('../middleware/auth');
const express = require('express');
const controller = require('../controllers/studentsController');

router.get('/', controller.getAllStudents);
router.get('/:id', controller.getStudentById);
router.post('/', controller.createStudent);
router.put('/:id', controller.updateStudent);
router.delete('/:id', controller.deleteStudent);

module.exports = router;
/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - age
 *         - course
 *         - year
 *         - gender
 *         - enrollmentDate
 *       properties:
 *         _id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         age:
 *           type: number
 *         course:
 *           type: string
 *         year:
 *           type: number
 *         gender:
 *           type: string
 *         enrollmentDate:
 *           type: string
 *           format: date
 *       example:
 *         firstName: Andrew
 *         lastName: Ssemanda
 *         email: andrew@gmail.com
 *         age: 22
 *         course: Computer Science
 *         year: 2
 *         gender: Male
 *         enrollmentDate: 2024-01-10
 */

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
 *     responses:
 *       200:
 *         description: List of students
 */
router.get('/', auth, async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Invalid ID format' });
    }
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', auth, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      age,
      course,
      year,
      gender,
      enrollmentDate
    } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !age || !course || !year || !gender || !enrollmentDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const student = new Student({
      firstName,
      lastName,
      email,
      age,
      course,
      year,
      gender,
      enrollmentDate: new Date(enrollmentDate)
    });

    const newStudent = await student.save();
    res.status(201).json(newStudent);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update fields
    const {
      firstName,
      lastName,
      email,
      age,
      course,
      year,
      gender,
      enrollmentDate
    } = req.body;

    if (firstName) student.firstName = firstName;
    if (lastName) student.lastName = lastName;
    if (email) student.email = email;
    if (age) student.age = age;
    if (course) student.course = course;
    if (year) student.year = year;
    if (gender) student.gender = gender;
    if (enrollmentDate) student.enrollmentDate = new Date(enrollmentDate);

    await student.save();

    res.status(204).send();

  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Invalid ID format' });
    }
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });

  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Invalid ID format' });
    }
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;