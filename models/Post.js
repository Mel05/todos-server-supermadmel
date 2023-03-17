import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		completed: {
			type: Boolean,
			default: false,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Post', PostSchema)
