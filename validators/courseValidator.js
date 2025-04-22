const {param, body} = require("express-validator");

// @desc Validation schema for getting a course by ID
const getCourseByIdSchema = [
    param("id")
        .isMongoId()
        .withMessage("Invalid Course ID"),
];

// @desc Validation schema for creating a course
const createCourseSchema = [
    body("title")
        .notEmpty()
        .withMessage("Course name is required")
        .isString()
        .withMessage("Course name must be a string")
        .trim()
        .isLength({min: 3, max: 32})
        .withMessage("Course name must be between 3 and 32 characters"),
    body("description")
        .notEmpty()
        .withMessage("Course description is required")
        .isString()
        .withMessage("Course description must be a string")
        .trim()
        .isLength({min: 10, max: 500})
        .withMessage("Course description must be between 10 and 500 characters"),
    body("price")
        .notEmpty()
        .withMessage("Course price is required")
        .isNumeric()
        .withMessage("Course price must be a number")
        .isFloat({gt: 0})
        .withMessage("Course price must be greater than 0"),
];

// @desc Validation schema for updating a course
const updateCourseSchema = [
    param("id")
        .isMongoId()
        .withMessage("Invalid Course ID"),
];

// @desc Validation schema for deleting a course
const deleteCourseSchema = [
    param("id")
        .isMongoId()
        .withMessage("Invalid Course ID"),
];

module.exports = {
    getCourseByIdSchema,
    createCourseSchema,
    updateCourseSchema,
    deleteCourseSchema,
};
