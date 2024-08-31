import { Router } from 'express'
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { authenticate } from '../middleware/auth';
import { RaffleController } from '../controllers/raffleController';
import { raffleExists } from '../middleware/raffle';
import { TicketController } from '../controllers/ticketController';
import { ticketBelongsToRaffle, ticketExists } from '../middleware/ticket';

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

router.get('/allRafflesByUser', RaffleController.getRafflesByUser)

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


router.get('/:raffleId/ticket', 
    param('raffleId').isMongoId().withMessage('ID no Valido'),
    handleInputErrors,
    TicketController.getTicketsByRaffle
)

router.param('ticketId', ticketExists)
router.param('tickerId', ticketBelongsToRaffle)

router.delete('/:raffleId/ticket/:ticketId',
    param('ticketId').isMongoId().withMessage('ID no Valido'),
    handleInputErrors,
    TicketController.deleteTicket
)

export default router;