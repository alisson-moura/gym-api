import { Router } from 'express'
import cancelAppointmentController from './controllers/cancel-appointment-controller'
import confirmAppointmentController from './controllers/confirm-appointment-controller'
import createAccountController from './controllers/create-account-controller'
import createSessionController from './controllers/create-session-controller'
import newAppointmentController from './controllers/new-appointment-controller'
import showAvailablesAppointmentsController from './controllers/show-availables-appointments-controller'
import showClientAppointmentsController from './controllers/show-client-appointments-controller'
import showProfileController from './controllers/show-profile-controller'
import updateProfileController from './controllers/update-profile-controller'
import auth from './middlewares/auth'
import { validator } from './middlewares/validator'
const router = Router()

// Session routes 
router.post('/signup',
    validator('CreateAccountSchema'),
    async (req, res) => await createAccountController.execute(req, res))
    
router.post('/signin',
    validator('CreateSessionSchema'),
    async (req, res) => await createSessionController.execute(req, res))

// enable auth middleware
router.use(auth)

// Profile routes
router.get('/profile',
    async (req, res) => await showProfileController.execute(req, res))

router.put('/profile',
    validator('UpdateAccountSchema'),
    async (req, res) => await updateProfileController.execute(req, res))

// Appointments routes
router.get('/appointments',
    async (req, res) => await showClientAppointmentsController.execute(req, res))

router.get('/available-appointments',
    validator('DateSchema'),
    async (req, res) => await showAvailablesAppointmentsController.execute(req, res))

router.post('/new-appointment',
    validator('NewAppointmentSchema'),
    async (req, res) => await newAppointmentController.execute(req, res))

router.put('/cancel-appointment',
    validator('CancelAppointmentSchema'),
    async (req, res) => await cancelAppointmentController.execute(req, res))

router.put('/confirm-appointment',
    validator('ConfirmAppointmentSchema'),
    async (req, res) => await confirmAppointmentController.execute(req, res))

export default router