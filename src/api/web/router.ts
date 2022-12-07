import { Router } from 'express'
import acceptTermController from './controllers/accept-term-controller'
import addProfilePhotoController from './controllers/add-profile-photo-controller'
import cancelAppointmentController from './controllers/cancel-appointment-controller'
import confirmAppointmentController from './controllers/confirm-appointment-controller'
import createAccountController from './controllers/create-account-controller'
import createSessionController from './controllers/create-session-controller'
import healthController from './controllers/health-controller'
import newAppointmentController from './controllers/new-appointment-controller'
import showAvailableGuideline from './controllers/show-available-guideline'
import showAvailablesAppointmentsController from './controllers/show-availables-appointments-controller'
import showClientAppointmentsController from './controllers/show-client-appointments-controller'
import showProfileController from './controllers/show-profile-controller'
import showTermController from './controllers/show-term-controller'
import updateProfileController from './controllers/update-profile-controller'
import auth from './middlewares/auth'
import { uploadMiddleware } from './middlewares/upload'
import { validator } from './middlewares/validator'
const router = Router()


//health route
router.get('/health', async (req, res) => await healthController.execute(req, res))

// Session routes 
router.post('/signup',
    validator('CreateAccountSchema'),
    async (req, res) => await createAccountController.execute(req, res))

router.post('/signin',
    validator('CreateSessionSchema'),
    async (req, res) => await createSessionController.execute(req, res))


// Profile routes
router.get('/profile', auth,
    async (req, res) => await showProfileController.execute(req, res))

router.put('/profile', auth,
    validator('UpdateAccountSchema'),
    async (req, res) => await updateProfileController.execute(req, res))

router.post('/photo',
    auth,
    uploadMiddleware.single('photo'),
    async (req, res) => await addProfilePhotoController.execute(req, res))

// Term routes
router.get('/term/:id', auth,
    async (req, res) => await showTermController.execute(req, res))

router.put('/accept/:termId', auth,
    async (req, res) => acceptTermController.execute(req, res))

// Get GuideLine
router.get('/guide', auth,
    async (req, res) => showAvailableGuideline.execute(req, res))


// Appointments routes
router.get('/appointments', auth,
    async (req, res) => await showClientAppointmentsController.execute(req, res))

router.get('/available-appointments', auth,
    validator('DateSchema'),
    async (req, res) => await showAvailablesAppointmentsController.execute(req, res))

router.post('/new-appointment', auth,
    validator('NewAppointmentSchema'),
    async (req, res) => await newAppointmentController.execute(req, res))

router.put('/cancel-appointment', auth,
    validator('CancelAppointmentSchema'),
    async (req, res) => await cancelAppointmentController.execute(req, res))

router.put('/confirm-appointment', auth,
    validator('ConfirmAppointmentSchema'),
    async (req, res) => await confirmAppointmentController.execute(req, res))

export default router