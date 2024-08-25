import mongoose, { Schema, Document, mongo} from 'mongoose'

export interface IUser extends Document {
    email: string
    password: string
    name: string
    confirmed: boolean
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

const User = mongoose.model<IUser>('User', userSchema)
export default User;