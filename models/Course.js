const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const CourseSchema = new Schema({
    title: {
        type: String,
        required: [true, "Course title is required"],
        minLength: [3, 'Too short course title'],
        maxLength: [32, 'Too long course title'],
    },
    description: {
        type: String,
        required: [true, "Course description is required"],
        minLength: [10, 'Too short course description'],
        maxLength: [500, 'Too long course description'],
    },
    image: {
        type: String, // base64 or Image URL
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    price: {
        type: Number,
        required: [true, "Course price is required"],
        min: [0, "Course price must be at least 0"],
    }
}, {
    timestamps: true // Created At, Updated At
});

// Create model
const Course = mongoose.model('Course', CourseSchema);
// Export model
module.exports = Course;