import type { Request, Response } from 'express'
import  Ticket  from '../models/Ticket'



export class TicketController {

    static createTicket = async (req: Request, res: Response) => {
        try {

        const { quantity, document, name, email, phone, address, paymentReference } = req.body;

        const totalTicketPrice = req.raffle.price * quantity;

        const ticket = new Ticket({
            raffle: req.raffle.id,
            document,
            name,
            email,
            phone,
            address,
            quantity,
            paymentReference
        });
        


        // Guarda el ticket en la base de datos

        await ticket.save();

        // Actualiza la rifa

        req.raffle.tickets.push(ticket.id);
        req.raffle.totalAmount += totalTicketPrice; 
        req.raffle.availableQuantity -= quantity;  
        await req.raffle.save();


        res.status(200).json(ticket);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Hubo un error al comprar el ticket' });
    }
}

    static getTicketsByRaffle = async(req: Request, res: Response) => {
        try {
            const tickets = await Ticket.find({raffle: req.raffle.id}).populate('raffle')
            res.status(200).json(tickets)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error en la obtencion de los tickets'})
        }
    }

    static deleteTicket = async(req: Request, res: Response) => {
        try {

            req.raffle.tickets = req.raffle.tickets.filter(ticket => ticket._id.toString() !== req.ticket.id.toString())

            req.raffle.totalAmount -= req.ticket.quantity * req.raffle.price; 
            req.raffle.availableQuantity += req.ticket.quantity; 

            await Promise.allSettled([req.ticket.deleteOne(), req.raffle.save()])
            
            return res.status(200).send('Ticket Rechazado')

        } catch (error) {
            res.status(500).json({error: 'Hubo un error en la obtencion de los tickets'})
        }
    }

}