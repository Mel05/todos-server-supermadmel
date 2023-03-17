import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
	{
		nickName: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('User', UserSchema)
