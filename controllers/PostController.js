import PostModel from '../models/Post.js'

export const getAll = async (req, res) => {
	try {
		const posts = await PostModel.find().populate('user').exec()
		res.json(posts)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить статьи',
		})
	}
}

export const getPostsByUserId = async (req, res) => {
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
		const post = await PostModel.find({
			completed: sortItem,
			user: { _id: req.userId },
		})
			.limit(limit)
			.skip(startIndex)

		if (!post) {
			return res.status(404).json({
				message: 'Пост не найден',
			})
		}

		const [...postData] = post

		res.json(postData)
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
		const post = await PostModel.find({
			completed: sortItem,
			user: { _id: req.userId },
		})

		if (!post) {
			return res.status(404).json({
				message: 'Пост не найден',
			})
		}

		const [...postData] = post

		res.json(postData)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Нет доступа',
		})
	}
}

export const getOne = async (req, res) => {
	try {
		const postId = req.params.id

		PostModel.findOneAndUpdate(
			{
				_id: postId,
			},
			{
				returnDocument: 'after',
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						message: 'Не удалось вернуть статью',
					})
				}

				if (!doc) {
					return res.status(404).json({
						message: 'Статья не найдена',
					})
				}

				res.json(doc)
			}
		).populate('user')
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить статьи',
		})
	}
}

export const remove = async (req, res) => {
	try {
		const postId = req.params.id

		PostModel.findOneAndDelete(
			{
				_id: postId,
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						message: 'Не удалось удалить статью',
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
			message: 'Не удалось получить статьи',
		})
	}
}

export const create = async (req, res) => {
	try {
		const doc = new PostModel({
			name: req.body.name,
			completed: false,
			user: req.userId,
		})

		const post = await doc.save()

		res.json(post)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось создать статью',
		})
	}
}

export const update = async (req, res) => {
	try {
		const postId = req.params.id

		await PostModel.updateOne(
			{
				_id: postId,
			},
			{
				name: req.body.name,
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
			message: 'Не удалось обновить статью',
		})
	}
}
