import type { Request, Response, NextFunction } from 'express'
import Raffle, { IRaffle } from '../models/Raffle'

declare global {
    namespace Express {
        interface Request {
            raffle: IRaffle
        }
    }
}

export async function raffleExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { raffleId } = req.params
        const raffle = await Raffle.findById(raffleId)
        if(!raffle){
            const error = new Error('Proyecto No Encontrado')
            return res.status(404).json({error: error.message})
        }

        req.raffle = raffle

        next()

    } catch (error) {
        res.status(500).json({error: 'Hubo un error'})
    }
}

