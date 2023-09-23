const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /news

    home(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render("home", {
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next);
        // res.render("home")
    }

    // [GET] /news/:slug
    searchs(req, res) {
        res.render('searchs');
    }
}

module.exports = new SiteController;
