import express from 'express'
const router = express.Router({ mergeParams: true })

router.use('/user', require('./user.routes'))
router.use('/todos', require('./todo.routes'))

export default router
