const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController')

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.post('/handle-form-stored-actions', courseController.handleFormStoredActions)
router.post('/handle-form-trash-actions', courseController.handleFormTrashActions)
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.delete);
router.delete('/:id/force-delete', courseController.forceDelete);
router.get('/:slug', courseController.show);


module.exports = router;
