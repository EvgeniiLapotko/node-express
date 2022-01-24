const express = require('express')
const router = express.Router()
const controllers = require('../controllers/index')


router.route('/', ).get(controllers.getAllItem)
router.route('/', ).post(controllers.createItem)
router.route('/:id', ).get(controllers.getTask)
router.route('/:id', ).patch(controllers.updateTask)
router.route('/:id', ).delete(controllers.deleteTask)



module.exports = router
