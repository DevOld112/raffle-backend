import type { Request, Response } from 'express'
import  Ticket  from '../models/Ticket'



export class TicketController {

    static createTicket = async (req: Request, res: Response) => {
        try {

        const { quantity, document, name, email, phone, paymentReference } = req.body;

        const totalTicketPrice = req.raffle.price * quantity;

        const ticket = new Ticket({
            raffle: req.raffle.id,
            document,
            name,
            email,
            phone,
            quantity,
            paymentReference
        });


        
        if(ticket.quantity > req.raffle.availableQuantity){
            return res.status(400).send('Cantidad a comprar es mayor a la disponible')
        }


        // Guarda el ticket en la base de datos

        await ticket.save();

        // Actualiza la rifa

        req.raffle.tickets.push(ticket.id);
        req.raffle.totalAmount += totalTicketPrice; 
        req.raffle.availableQuantity -= quantity;  
        await req.raffle.save();


        return res.status(200).send('Ticket Creado Correctamente');
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error intente de nuevo');
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
            res.status(500).json({error: 'Hubo un error en la eliminacion de los tickets'})
        }
    }

    static acceptTicket = async (req: Request, res: Response) => {
        try {
            
        req.ticket.status = 'completed'
        
        req.raffle.purchasedTickets += req.ticket.quantity

        for(let i = req.raffle.purchasedTickets - req.ticket.quantity; i < req.raffle.purchasedTickets; i++){
            req.ticket.ticketNumber.push(i)
        }


        await Promise.allSettled([req.raffle.save(), req.ticket.save()]);

        
        res.status(200).json({message: 'Ticket accepted successfully', ticket: req.ticket});

        } catch (error) {
            res.status(500).json({error: 'Hubo un error en la aceptacion de los tickets'})
        }
    }

    static changeTicketNumber = async(req: Request, res: Response) => {

        try {
            req.ticket.ticketNumber = req.body

            for(let i = 0; i < req.ticket.ticketNumber.length; i++){
                if(req.ticket.ticketNumber[i] >= 1000){
                    return res.status(400).json({error: 'El numero de ticket sobrepasa el numero'})
                }
            }

            await Promise.allSettled([req.raffle.save(), req.ticket.save()])
            res.status(200).json({message: 'Ticket accepted successfully', ticket: req.ticket});
        } catch (error) {
            res.status(500).json({error: 'Hubo un error en la aceptacion de los tickets'})
        }
        
        
    }

}