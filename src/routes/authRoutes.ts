import { Router } from 'express'
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { AuthController } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/create-account',
    body('name')
        .notEmpty().withMessage('El Nombre no puede ir vacio'),
    body('email')
        .isEmail().withMessage('El Email no puede ir vacio o es muy'),
    body('password_confirmation')
        .custom((value, {req}) => {
            
            if(req.body.password !== value){
                throw new Error('Los Password NO son Iguales')
            }
            return true
        }),
    body('password')
        .isLength({min:8}).withMessage('La Contraseña no puede ir vacia'),
    
    handleInputErrors,
        AuthController.createAccount
)

router.post('/login',
    body('email')
        .isEmail().withMessage('El campo de correo se Encuentra vacio'),
    body('password')
        .isLength({min:8}).withMessage('La Contraseña no puede ir vacia'),
    handleInputErrors,
    AuthController.login
)

router.get('/user', 
    authenticate,
    AuthController.user
)

export default router;