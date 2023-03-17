import jwt from 'jsonwebtoken'

import UserModel from '../models/User.js'

export const register = async (req, res) => {
	try {
		const user = await UserModel.findOne({ nickName: req.body.nickName })

		if (!user) {
			const doc = new UserModel({
				nickName: req.body.nickName,
			})

			const user = await doc.save()

			const token = jwt.sign(
				{
					_id: user._id,
				},
				'secret123',
				{
					expiresIn: '30d',
				}
			)

			const { ...userData } = user._doc

			return res.json({
				...userData,
				token,
			})
		}

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '30d',
			}
		)

		const { ...userData } = user._doc

		res.json({
			...userData,
			token,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось авторизоваться',
		})
	}
}

export const getMe = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId)

		if (!user) {
			return res.status(404).json({
				message: 'Пользователь не найден',
			})
		}

		const { ...userData } = user._doc

		res.json(userData)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Нет доступа',
		})
	}
}

// export const register = async (req, res) => {
// 	try {
// 		const doc = new UserModel({
// 			nickName: req.body.nickName,
// 		})

// 		const user = await doc.save()

// 		const token = jwt.sign(
// 			{
// 				_id: user._id,
// 			},
// 			'secret123',
// 			{
// 				expiresIn: '30d',
// 			}
// 		)

// 		const { ...userData } = user._doc

// 		res.json({
// 			...userData,
// 			token,
// 		})
// 	} catch (err) {
// 		console.log(err)
// 		res.status(500).json({
// 			message: 'Не удалось зарегистрироваться',
// 		})
// 	}
// }

// export const login = async (req, res) => {
// 	try {
// 		const user = await UserModel.findOne({ nickName: req.body.nickName })

// 		if (!user) {
// 			return res.status(404).json({
// 				message: 'Пользователь не найден',
// 			})
// 		}

// 		const token = jwt.sign(
// 			{
// 				_id: user._id,
// 			},
// 			'secret123',
// 			{
// 				expiresIn: '30d',
// 			}
// 		)

// 		const { ...userData } = user._doc

// 		res.json({
// 			...userData,
// 			token,
// 		})
// 	} catch (err) {
// 		console.log(err)
// 		res.status(500).json({
// 			message: 'Не удалось авторизоваться',
// 		})
// 	}
// }
