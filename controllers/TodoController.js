import TodoModel from '../models/Todo.js'

export const getTodosByUserId = async (req, res) => {
	let { _limit, _page, completed_like } = req.query
	let sortItem = undefined
	if (completed_like === 'true') {
		sortItem = true
	} else if (completed_like === 'false') {
		sortItem = false
	} else if (completed_like === '') {
		sortItem = { $in: [true, false] }
	}

	let limit = _limit || 2
	let page = _page || 1
	let startIndex = (page - 1) * limit

	try {
		const todo = await TodoModel.find({
			completed: sortItem,
			user: { _id: req.userId },
		})
			.limit(limit)
			.skip(startIndex)

		if (!todo) {
			return res.status(404).json({
				message: 'Todo не найден',
			})
		}

		const [...todoData] = todo

		res.json(todoData)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Нет доступа',
		})
	}
}

export const getlengthByUserId = async (req, res) => {
	let { completed_like } = req.query
	let sortItem = undefined
	if (completed_like === 'true') {
		sortItem = true
	} else if (completed_like === 'false') {
		sortItem = false
	} else if (completed_like === '') {
		sortItem = { $in: [true, false] }
	}

	try {
		const todo = await TodoModel.find({
			completed: sortItem,
			user: { _id: req.userId },
		})

		if (!todo) {
			return res.status(404).json({
				message: 'Todo не найден',
			})
		}

		const [...todoData] = todo

		res.json(todoData)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Нет доступа',
		})
	}
}

export const create = async (req, res) => {
	try {
		const doc = new TodoModel({
			title: req.body.title,
			completed: false,
			user: req.userId,
		})

		const todo = await doc.save()

		res.json(todo)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось создать Todo',
		})
	}
}

export const update = async (req, res) => {
	try {
		const todoId = req.params.id

		await TodoModel.updateOne(
			{
				_id: todoId,
			},
			{
				title: req.body.title,
				completed: req.body.completed,
				user: req.userId,
			}
		)

		res.json({
			success: true,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось обновить Todo',
		})
	}
}

export const remove = async (req, res) => {
	try {
		const todoId = req.params.id

		TodoModel.findOneAndDelete(
			{
				_id: todoId,
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						message: 'Не удалось удалить Todo',
					})
				}

				if (!doc) {
					return res.status(404).json({
						message: 'Статья не найдена',
					})
				}

				res.json({
					success: true,
				})
			}
		)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить Todo',
		})
	}
}
