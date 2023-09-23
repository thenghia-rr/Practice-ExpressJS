const Course = require('../models/Course');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {

    // [GET] /me/stored/courses
    storedCourse(req, res, next) {
        Promise.all([Course.find({}), Course.findDeleted({})])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    courses: mutipleMongooseToObject(courses),
                    deletedCount: deletedCount.filter(course => course.deleted).length
                })
            )
            .catch(next)
    }
    
    // [GET] /me/trash/courses
    trashCourse(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .then(courses => res.render('me/trash-courses', {
                courses: mutipleMongooseToObject(courses)
            }))
    }
}

module.exports = new MeController;
