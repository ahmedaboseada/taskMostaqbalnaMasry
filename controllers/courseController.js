const AsyncHandler = require("express-async-handler");
const responseWrapper = require("../utils/responseWrapper");
const responseTypes = require("../utils/responseTypes");
const ApiError = require("../utils/apiError");
const courseService = require("../Services/courseService");

// @desc Create Course
// @route POST /api/courses
// @access Private
const createCourse = AsyncHandler(async (req, res, next) => {
    const {title, description, image, startDate, endDate, price} = req.body;
    await courseService
        .createCourse(title, description, image, startDate, endDate, price)
        .then((result) =>
            responseWrapper(
                res,
                responseTypes.CREATED,
                "Course created successfully",
                result,
            ),
        )
        .catch((error) => {
            const statusCode = error.code || responseTypes.SERVER_ERROR.code;
            const message =
                statusCode === 400 ? error.message : responseTypes.SERVER_ERROR.message;
            return next(new ApiError(message, statusCode));
        });
});

// @desc Get list of courses
// @route GET /api/courses
// @access Public
const getCourses = AsyncHandler(async (req, res, next) => {
    await courseService
        .findAll(req)
        .then((result) =>
            responseWrapper(
                res,
                responseTypes.SUCCESS,
                "Courses list fetched successfully",
                result,
            ),
        )
        .catch((err) => {
            const statusCode = err.code || 500;
            const message =
                statusCode === 404 ? err.message : responseTypes.SERVER_ERROR.message;
            return next(new ApiError(message, statusCode));
        });
});

// @desc Get a specific course
// @route GET /api/courses/:id
// @access Public
const getCourse = AsyncHandler(async (req, res, next) => {
    const {id} = req.params;
    await courseService
        .findById(id)
        .then((result) =>
            responseWrapper(
                res,
                responseTypes.SUCCESS,
                "Course fetched successfully",
                result,
            ),
        )
        .catch((err) => {
            const statusCode = err.code || 500;
            const message =
                statusCode === 404 ? err.message : responseTypes.SERVER_ERROR.message;
            return next(new ApiError(message, statusCode));
            // return responseWrapper(res, type, message);
        });
});

// @desc Update a specific course
// @route PUT /api/courses/:id
// @access Private
const updateCourse = AsyncHandler(async (req, res, next) => {
    const {id} = req.params;
    console.log(id)
    console.log(req.body)
    const {title, description, image, startDate, endDate, price} = req.body;
    await courseService
        .updateCourse(id, title, description, image, startDate, endDate, price)
        .then((result) =>
            responseWrapper(
                res,
                responseTypes.SUCCESS,
                "Course updated successfully",
                result,
            ),
        )
        .catch((err) => {
            const statusCode = err.code || 500;
            const message =
                statusCode === 404 ? err.message : responseTypes.SERVER_ERROR.message;
            return next(new ApiError(message, statusCode));
        });
});

// @desc Delete a specific course
// @route PUT /api/courses/:id
// @access Private
const deleteCourse = AsyncHandler(async (req, res, next) => {
    const {id} = req.params;
    await courseService
        .deleteCourse(id)
        .then((result) =>
            responseWrapper(
                res,
                responseTypes.SUCCESS,
                "Course deleted successfully",
                result,
            ),
        )
        .catch((err) => {
            const statusCode = err.code || 500;
            const message =
                statusCode === 404 ? err.message : responseTypes.SERVER_ERROR.message;
            return next(new ApiError(message, statusCode));
        });
});

module.exports = {
    createCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
};
