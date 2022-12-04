const express = require('express')
const router = express.Router();

const TaskController = require('../controller/TaskController')
const TaskValidation = require('../middlewares/TaskValidation')

router.post('/', TaskValidation, TaskController.create) 
//creation of the routes, we put the middleare before the controller route so that validation is done before entering the route
router.put('/:id', TaskController.update)

module.exports = router