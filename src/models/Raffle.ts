import mongoose, { Schema, Document, PopulatedDoc, Types} from 'mongoose'
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
    bankEntity: string
    accountBank: string
    binanceID: string
    phone: string
    price: number
    availableQuantity: number
    totalAmount: number
    purchasedTickets: number   
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
    bankEntity:{
        type: String,
        ref: 'User'
    },
    accountBank:{
        type: String,
        ref: 'User'
    },
    binanceID:{
        type: String,
        ref: 'User'
    },
    phone:{
        type: String,
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
        min: 0 
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
    purchasedTickets:{
        type: Number,
        default: 0
    }
    
}, {timestamps: true})

const Raffle = mongoose.model<IRaffle>('Raffle', RaffleSchema)
export default Raffle;