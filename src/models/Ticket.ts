import mongoose, { Schema, Document, Types } from "mongoose";

const ticketStatus = {
    PENDING: 'pending',
    COMPLETED: 'completed'
} as const;

export type TicketStatus = typeof ticketStatus[keyof typeof ticketStatus]

export interface ITicket extends Document {
    raffle: Types.ObjectId
    document: string
    name: string
    email: string
    phone: string
    address: string
    quantity: number
    paymentReference: string
    status: string
    ticketNumber: number[]
    
}

export const ticketSchema:Schema = new Schema({
    raffle: {
        type: Types.ObjectId,
        ref: 'Raffle'
    },
    document: {
        type: String,
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,
        default: ''
    },
    quantity: {
        type: Number,
        trim: true,
        required: true
    },
    paymentReference: {
        type: String,
        trim: true,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(ticketStatus),
        default: ticketStatus.PENDING
    },
    ticketNumber: {
        type:  [{ type: Number }],
        default: [],
        validate: {
            validator: function(numbers: number[]){
                return numbers.length === new Set(numbers).size
            },
            message: 'No se puede asignar el mismo numero dos veces'
        }

    }
}, {timestamps: true})

const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema)
export default Ticket;