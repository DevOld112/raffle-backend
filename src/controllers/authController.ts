import type { Request, Response } from "express"
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth"
import { generateJWT } from "../utils/jwt"



export class AuthController {
    static createAccount = async(req: Request, res: Response) => {

        try {
            const { email, password } = req.body
            const user = new User(req.body)
                //Prevenir Duplicados

                const userExist = await User.findOne({email: email})

                if(userExist){
                    const error = new Error('El usuario esta registrado')
                    return res.status(409).json({error: error.message})
                }

                //Hashear Password

                user.password = await hashPassword(password)

                await Promise.allSettled([user.save()])

                res.send('Usuario Creado Correctamente, se envio un mensaje a tu correo')
            } catch (error) {
                console.log(error)
                
                res.status(500).json({error: 'Hubo un error'})
            }
    }

    static login = async(req: Request, res: Response) => {
        try {

            const { email, password } = req.body

            const user = await User.findOne({email: email})

            //Valido que el usuario exista

            if(!user){
                const error = new Error('Usuario NO Registrado')
                return res.status(404).json({error: error.message})
            }


            //Revisar Password

            const isPasswordCorrect = await checkPassword(password, user.password)

            if(!isPasswordCorrect){
                const error = new Error('Contraseña Invalida')
                return res.status(401).json({error: error.message})
            }

            const token = generateJWT({id: user.id})


            return res.send(token)
            
        } catch (error) {
            res.status(500).json({error: 'Hubo un Error'})
        }
    }

    static user = async(req: Request, res: Response) => {

        return res.json(req.user)
    }
}