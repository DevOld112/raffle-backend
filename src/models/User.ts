import mongoose, { Schema, Document, mongo} from 'mongoose'

export interface IUser extends Document {
    email: string
    password: string
    name: string
    confirmed: boolean
    accountBank: string
    binanceID: string
    phone: string
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
    },
    accountBank:{
        type: String
    },
    binanceID:{
        type: String
    },
    phone: {
        type: String
    }
}, {timestamps: true})

const User = mongoose.model<IUser>('User', userSchema)
export default User;