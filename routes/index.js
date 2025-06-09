import express from 'express'
const router = express.Router({ mergeParams: true })

router.use('/user', require('./user.routes'))
router.use('/todos', require('./todo.routes'))

/// Костыль для onrender
router.use('/onrender', require('./onrender.routes'))

export default router
