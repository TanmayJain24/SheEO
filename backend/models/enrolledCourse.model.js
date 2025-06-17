import mongoose from 'mongoose';

const enrolledCourseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false
  }
});

// Create compound index to ensure unique user-course pairs
enrolledCourseSchema.index({ user: 1, course: 1 }, { unique: true });

export const EnrolledCourse = mongoose.model('EnrolledCourse', enrolledCourseSchema);