import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import chalk from 'chalk'

import {
	registerValidation,
	loginValidation,
	todoCreateValidation,
} from './validations.js'

import { handleValidationErrors, checkAuth } from './utils/index.js'

import { UserController, TodoController } from './controllers/index.js'
//
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log(chalk.yellow('BD works unlike me')))
	.then(() => console.log(chalk.yellow('OGC')))
	.catch(err => console.log(chalk.red('BD error', err)))

const app = express()

app.use(express.json())
app.use(cors())

//User
app.post(
	'/auth/register',
	loginValidation,
	registerValidation,
	handleValidationErrors,
	UserController.register
)

app.get('/auth/me', checkAuth, UserController.getMe)

//Todo
app.get('/todosId', checkAuth, TodoController.getTodosByUserId)
app.get('/lengthId', checkAuth, TodoController.getlengthByUserId)
app.post(
	'/todo',
	checkAuth,
	todoCreateValidation,
	handleValidationErrors,
	TodoController.create
)
app.put(
	'/todo/:id',
	checkAuth,
	todoCreateValidation,
	handleValidationErrors,
	TodoController.update
)
app.delete('/todo/:id', checkAuth, TodoController.remove)

app.listen(process.env.PORT || 8080, err => {
	if (err) {
		return console.log(err)
	}

	console.log(chalk.rgb(255, 136, 0)('-----------'))
	console.log(chalk.rgb(255, 136, 0)('Server OK'))
})
