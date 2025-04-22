const Course = require("../models/Course");

class CourseService {
    async createCourse(title, description, image, startDate, endDate, price) {
        const existingCourse = await Course.findOne({
            title: title,
        });
        if (existingCourse) {
            const error = new Error("Course already exists");
            error.code = 400;
            throw error;
        }
        // Create a new course - Put null values in case empty data that would be handled in the validation layer
        const newCourse = await Course.create({
            title: (title != null) ? title : null,
            description: (description != null) ? description : null,
            image: (image != null) ? image : null,
            startDate: (startDate != null) ? startDate : null,
            endDate: (endDate != null) ? endDate : null,
            price: (price != null) ? price : null,
        });

        return newCourse;
    }

    async findAll(req) {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;
        const skip = (page - 1) * limit;
        const courses = await Course.find().skip(skip).limit(limit);
        if (courses)
            return {results: courses.length, page, data: courses};
        const error = new Error("No data found");
        error.code = 404;
        throw error;
    }

    async findById(id) {
        const course = await Course.findById(id);
        if (!course) {
            const error = new Error("Course not found");
            error.code = 404;
            throw error;
        }
        return course;
    }

    async updateCourse(id, title, description, image, startDate, endDate, price) {
        console.log(id)
        const existingCourse = await this.findById(id)
        console.log(existingCourse);
        if (!existingCourse) {
            const error = new Error("Course not found");
            error.code = 404;
            throw error;
        }
        const course = await Course.findByIdAndUpdate(
            id,
            {
                title: (title != null) ? title : existingCourse.title,
                description: (description != null) ? description : existingCourse.description,
                image: (image != null) ? image : existingCourse.image,
                startDate: (startDate != null) ? startDate : existingCourse.startDate,
                endDate: (endDate != null) ? endDate : existingCourse.endDate,
                price: (price != null) ? price : existingCourse.price,
            },
            {new: true},
        );

        return course;
    }

    async deleteCourse(id) {
        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            const error = new Error("Course not found");
            error.code = 404;
            throw error;
        }
        return course;
    }
}

module.exports = new CourseService();
