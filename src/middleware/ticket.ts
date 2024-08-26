import type { Request, Response, NextFunction } from 'express'
import Ticket, { ITicket } from '../models/Ticket'

declare global {
    namespace Express {
        interface Request {
            ticket: ITicket
        }
    }
}

export async function ticketExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { ticketId } = req.params
        const ticket = await Ticket.findById(ticketId)
        if(!ticketId){
            const error = new Error('Ticket No Encontrado')
            return res.status(404).json({error: error.message})
        }

        req.ticket = ticket

        next()

    } catch (error) {
        res.status(500).json({error: 'Hubo un error'})
    }
}

export async function ticketBelongsToRaffle(req: Request, res: Response, next: NextFunction){
                //Valido que el ticket pertenece a ese sorteo

                if(req.ticket.raffle.toString() !== req.raffle.id.toString()){
                    const error = new Error('Accion no valida')
                    return res.status(404).json({error: error.message})
                }
                next()
}


