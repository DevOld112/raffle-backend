import { Router } from 'express'
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { authenticate } from '../middleware/auth';
import { RaffleController } from '../controllers/raffleController';
import { raffleExists } from '../middleware/raffle';
import { TicketController } from '../controllers/ticketController';

const router = Router()
router.use(authenticate)

router.post('/create-raffle',
    body('title')
        .notEmpty().withMessage('El titulo no puede ir vacio'),
    body('description')
        .notEmpty().withMessage('La descripcion no puede ir vacio'),
    body('premiums')
        .notEmpty().withMessage('Los premios no pueden ir vacio'),
    body('price')
        .notEmpty().withMessage('Los precios no pueden ir vacio'),
    handleInputErrors,
    RaffleController.createRaffle
)

router.get('/allRaffles', RaffleController.getRaffles)

router.get('/:id',
    param('id').isMongoId().withMessage('ID no Valido'),
    handleInputErrors,
    RaffleController.getRaffleById
)

router.put('/:id',
    param('id').isMongoId().withMessage('ID no Valido'),
    body('title')
    .notEmpty().withMessage('El titulo no puede ir vacio'),
    body('description')
        .notEmpty().withMessage('La descripcion no puede ir vacio'),
    body('premiums')
        .notEmpty().withMessage('Los premios no pueden ir vacio'),
    handleInputErrors,
    RaffleController.updateRaffle
)

router.delete('/:id',
    param('id').isMongoId().withMessage('ID no Valido'),
    handleInputErrors,
    RaffleController.deleteRaffle
)

/** Ruta para los tickets que van a estar dentro de los proyectos */

router.param('raffleId', raffleExists)

router.post('/:raffleId/ticket', 
    body('document')
        .notEmpty().withMessage('El Nombre de la tarea es Obligatorio'),
    body('name')
        .notEmpty().withMessage('El Nombre de la tarea es Obligatorio'),
    body('email')
        .notEmpty().withMessage('El Nombre de la tarea es Obligatorio'),
    body('phone')
        .notEmpty().withMessage('El Nombre de la tarea es Obligatorio'),
    body('address')
        .notEmpty().withMessage('El Nombre de la tarea es Obligatorio'),
    body('quantity')
        .notEmpty().withMessage('El Nombre de la tarea es Obligatorio'),
    body('paymentReference')
        .notEmpty().withMessage('El Nombre de la tarea es Obligatorio'),
    handleInputErrors,
    TicketController.createTicket
)

router.get('/:raffleId/ticket', 
    param('raffleId').isMongoId().withMessage('ID no Valido'),
    handleInputErrors,
    TicketController.getTicketsByRaffle)

export default router;