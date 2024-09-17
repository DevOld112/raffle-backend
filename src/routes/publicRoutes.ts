import { Router } from 'express'
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation'
import { AuthController } from '../controllers/authController';
import { RaffleController } from '../controllers/raffleController';
import { TicketController } from '../controllers/ticketController';
import { raffleExists } from '../middleware/raffle';

const router = Router()

router.get('/allRaffles', RaffleController.getAllRaffles)

router.get('/:id',
    param('id').isMongoId().withMessage('ID no Valido'),
    handleInputErrors,
    RaffleController.getPublicRaffleById
)

router.param('raffleId', raffleExists)


router.post('/:raffleId/ticket', 
    body('document')
        .notEmpty().withMessage('El numero del documento es Obligatorio'),
    body('name')
        .notEmpty().withMessage('El Nombre de la persona es Obligatorio'),
    body('email')
        .notEmpty().withMessage('El numero de telefono es Obligatorio'),
    body('phone')
        .notEmpty().withMessage('La cantidad es Obligatoria'),
    body('quantity')
        .notEmpty().withMessage('El Nombre de la tarea es Obligatorio'),
    body('paymentReference')
        .notEmpty().withMessage('El Nombre de la tarea es Obligatorio'),
    handleInputErrors,
    TicketController.createTicket
)




export default router;