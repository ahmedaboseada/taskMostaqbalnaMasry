const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const {
    getCourseByIdSchema,
    createCourseSchema,
    updateCourseSchema,
    deleteCourseSchema,
} = require("../validators/courseValidator");
const {
    createCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
} = require("../Controllers/courseController");

router
    .route('/')
    .get(getCourses)
    .post(createCourseSchema, validate, createCourse);

router
    .route('/:id')
    .get(getCourseByIdSchema, validate, getCourse)
    .put(updateCourseSchema, validate, updateCourse)
    .delete(deleteCourseSchema, validate, deleteCourse);

module.exports = router;