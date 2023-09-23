const Course = require('../models/Course');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {

    // [GET] /me/stored/courses
    storedCourse(req, res, next) {
        let courseQuery = Course.find({});
        
        if(req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            })
        }

        Promise.all([courseQuery, Course.findDeleted({})])
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
