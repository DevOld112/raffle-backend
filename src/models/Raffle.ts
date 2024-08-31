import mongoose, { Schema, Document, mongo, PopulatedDoc, Types} from 'mongoose'
import { IUser } from "./User";
import { ITicket } from './Ticket';

export interface IRaffle extends Document {
    title: string
    date: string
    description: string
    premiums: string
    quantity: number
    admin: PopulatedDoc<IUser & Document>
    tickets: PopulatedDoc<ITicket & Document>[]
    price: number
    availableQuantity: number
    totalAmount: number     
}

const RaffleSchema: Schema = new Schema({
    title:{
        type: String,
        required: true,

    },
    endDate:{
        type: String,
        required: true,

    },
    description:{
        type: String,
        required: true,

    },
    premiums:{
        type: String,
        required: true,

    },
    quantity:{
        type: Number,
        required: true,
        default: 1000
    },
    admin: {
        type: Types.ObjectId,
        ref: 'User'
    },
    tickets: [
        {
            type: Types.ObjectId,
            ref:'Ticket'
        }
    ]
    ,
    availableQuantity: {   
        type: Number,
        required: true,
        default: 1000,
        min: [0,  'La cantidad disponible no puede ser menor a 1']   
    },
    price: {
        type: Number,
        require: true
    },
    totalAmount: {          
        type: Number,
        required: true,
        default: 0,         
    },
    
}, {timestamps: true})

const Raffle = mongoose.model<IRaffle>('Raffle', RaffleSchema)
export default Raffle;