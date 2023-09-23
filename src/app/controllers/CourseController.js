const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
            .then(course => {
                res.render('./courses/show', {course : mongooseToObject(course)});
            })
            .catch(next);
    }
    // [GET] /courses/create
    create(req, res, next) {
        res.render('./courses/create')
    }

    // [POST] /courses/store
    store(req, res, next) {
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/0.jpg`;
        const courseClient = new Course(req.body);
        courseClient.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    } 

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('./courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next)
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/0.jpg`;
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/'))
            .catch(next)
    }

    // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
    
    // [DELETE] /courses/:id/force-delete
    forceDelete(req, res, next) {
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }

    // [POST] /courses/handle-form-stored-actions
    handleFormStoredActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({_id: {$in: req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
        
            default:
                res.json({messageErr: 'Invalid action'})
                break;
        }
    }

    // [POST] /courses/handle-form-trash-actions
    handleFormTrashActions(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                Course.restore({_id: {$in: req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            case 'force-delete':
                Course.deleteMany({_id: {$in: req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.json({messageErr: 'Invalid action'})
                break;
        }
    }

}

module.exports = new CourseController;
