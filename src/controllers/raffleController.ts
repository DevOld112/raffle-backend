import type { Request, Response } from "express"
import Raffle from "../models/Raffle"

export class RaffleController {

    //Crear Sorteo

    static createRaffle = async(req: Request, res: Response) => {

        const { title, description, premiums, price } = req.body

        const raffle = new Raffle(req.body)

        //Asigna a un Usuario Administrador el sorteo

        raffle.admin = req.user.id

        try {
            await raffle.save()
            res.send('Sorteo Creado Exitosamente')

        } catch (error) {
            console.log(error)
                
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    //Obtener todos los sorteos

    static getRaffles = async(req: Request, res: Response) => {
        try {
            
            const raffles = await Raffle.find({
                $or: [
                    {admin: {$in: req.user.id}}
                ]
            })

            res.status(200).json(raffles)

        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    //Obtener un Sorteo en especifico

    static getRaffleById = async(req: Request, res: Response) => {

        try {
            const { id } = req.params
            const raffle = await Raffle.findById(id)

            if(!raffle){
                const error = new Error('Sorteo No Encontrado')
                return res.status(404).json({error: error.message})
            }

            

            if(raffle.admin.toString() !== req.user.id.toString()){
                const error = new Error('Accion no Valida')
                return res.status(404).json({error: error.message})
            }

            res.status(200).json(raffle)

        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
        
        


    }

    //Actualizar un sorteo

    static updateRaffle = async(req: Request, res: Response) => {

        try {
            const { id } = req.params
            const raffle = await Raffle.findByIdAndUpdate(id, req.body)

            if(!raffle){
                const error = new Error('Sorteo No Encontrado')
                return res.status(404).json({error: error.message})
            }

            if(raffle.admin.toString() !== req.user.id.toString()){
                const error = new Error('Accion no Valida')
                return res.status(404).json({error: error.message})
            }

            await raffle.save()
            res.status(200).send('Sorteo Actualizado Correctamente')

        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }

    }

    //Eliminar un Sorteo

    static deleteRaffle = async(req: Request, res: Response) => {
        try {

            const { id } = req.params
            const raffle = await Raffle.findById(id)

            if(!raffle){
                const error = new Error('Sorteo No Encontrado')
                return res.status(404).json({error: error.message})
            }

            

            if(raffle.admin.toString() !== req.user.id.toString()){
                const error = new Error('Accion no Valida')
                return res.status(404).json({error: error.message})
            }

            await raffle.deleteOne()

            res.status(200).send('Sorteo Eliminado Correctamente')

            
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
}