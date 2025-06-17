import express from 'express';
import { Course } from '../models/course.model.js';
import { EnrolledCourse } from '../models/enrolledCourse.model.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch courses' });
  }
});

// Get enrolled courses with course details populated
router.get('/enrolled', isAuthenticated, async (req, res) => {
  try {
    const enrolledCourses = await EnrolledCourse.find({ user: req.id })
      .populate('course')
      .sort({ enrolledAt: -1 });

    res.status(200).json({ 
      success: true, 
      courses: enrolledCourses.map(ec => ec.course) 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch enrolled courses' });
  }
});

// Enroll in a course
router.post('/:courseId/enroll', isAuthenticated, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Check if already enrolled
    const existingEnrollment = await EnrolledCourse.findOne({
      user: req.id,
      course: req.params.courseId
    });

    if (existingEnrollment) {
      return res.status(400).json({ 
        success: false, 
        message: 'Already enrolled in this course' 
      });
    }

    // Create new enrollment
    const enrollment = new EnrolledCourse({
      user: req.id,
      course: req.params.courseId
    });

    await enrollment.save();

    res.status(200).json({ 
      success: true, 
      message: 'Course enrolled successfully' 
    });
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }
    res.status(500).json({ 
      success: false, 
      message: 'Failed to enroll in course' 
    });
  }
});

// Check enrollment status
router.get('/:courseId/enrollment-status', isAuthenticated, async (req, res) => {
  try {
    const enrollment = await EnrolledCourse.findOne({
      user: req.id,
      course: req.params.courseId
    });

    res.status(200).json({ 
      success: true, 
      isEnrolled: !!enrollment 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to check enrollment status' 
    });
  }
});

export default router;