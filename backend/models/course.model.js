import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Course description is required']
  },
  instructor: {
    type: String,
    required: [true, 'Instructor name is required']
  },
  thumbnail: {
    type: String,
    required: [true, 'Thumbnail URL is required']
  },
  videoUrl: {
    type: String,
    required: [true, 'Video URL is required']
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Duration is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for better performance
courseSchema.index({ title: 'text', description: 'text', category: 'text' });

export const Course = mongoose.model('Course', courseSchema);