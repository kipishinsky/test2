import mongoose, {Document, Schema} from 'mongoose'

// @ts-ignore
export interface ISomeString extends Document {
	_id: mongoose.Types.ObjectId

	created: Date
	update: Date

	_doc: object //crutch
}

const SomeString: Schema = new Schema({
		str: {
			type: String,
			required: true
		}
	}, {
		timestamps: {
			createdAt: 'created',
			updatedAt: 'updated'
		}
	}
)


// @ts-ignore
export default mongoose.model<ISomeString>('someString', SomeString)


//email: string
//password: string
//rememberMe: boolean
//isAdmin: boolean

//token: string
//tokenDeathTime: number
