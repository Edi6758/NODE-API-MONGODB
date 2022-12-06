const express = require('express')
const router = express.Router();

const TaskController = require('../controller/TaskController')
const TaskValidation = require('../middlewares/TaskValidation')
const MacaddressValidation = require('../middlewares/MacaddressValidation')

router.post('/', TaskValidation, TaskController.create) 
//creation of the routes, we put the middleare before the controller route so that validation is done before entering the route
router.put('/:id', TaskValidation, TaskController.update)
router.get('/filter/all', MacaddressValidation, TaskController.all)
router.get('/:id', TaskController.show)
router.delete('/:id', TaskController.delete)
router.put('/:id/:done', TaskController.done)
router.get('/filter/late', MacaddressValidation, TaskController.late)
router.get('/filter/today', MacaddressValidation, TaskController.today)

module.exports = router