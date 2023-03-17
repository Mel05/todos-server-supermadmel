import { body } from 'express-validator'

export const loginValidation = [
	body('nickName', 'Укажите имя').isLength({ min: 3 }),
]

export const registerValidation = [
	body('nickName', 'Укажите имя').isLength({ min: 3 }),
]

export const todoCreateValidation = [
	body('title', 'Введите заголовок Todo-шки').isString(),
]
