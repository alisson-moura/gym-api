import { Router } from 'express'
import createExercise from './controllers/admin/create-exercise'
import createPresenceToken from './controllers/admin/create-presence-token'
import createSession from './controllers/admin/create-session'
import deleteAppointment from './controllers/admin/delete-appointment'
import resetPassword from './controllers/admin/reset-password'
import updateStatusAppointment from './controllers/admin/update-status-appointment'
import deleteExercise from './controllers/admin/delete-exercise'
import listAppointments from './controllers/admin/list-appointments'
import listClientAppointments from './controllers/admin/list-client-appointments'
import listClients from './controllers/admin/list-clients'
import listExercises from './controllers/admin/list-exercises'
import listMuscleGroup from './controllers/admin/list-muscle-group'
import showPresenceToken from './controllers/admin/show-presence-token'
import showProfile from './controllers/admin/show-profile'
import showStatistics from './controllers/admin/statistics'
import updateExercise from './controllers/admin/update-exercise'
import auth from './middlewares/auth'
import { uploadMiddleware } from './middlewares/upload'
import { validator } from './middlewares/validator'
import createNotification from './controllers/admin/notifications/create-notification'
import listNotifications from './controllers/admin/notifications/list-notifications'
import deleteNotifications from './controllers/admin/notifications/delete-notifications'
import updateClient from './controllers/admin/clients/update-client'
import registerPayment from './controllers/admin/payments/register-payment'

const adminRouter = Router()

// Session routes 
adminRouter.post('/signin',
    validator('CreateAdminSessionSchema'),
    async (req, res) => await createSession.execute(req, res))

adminRouter.get('/appointments', auth,
    validator('DateSchema'),
    async (req, res) => listAppointments.execute(req, res))
adminRouter.delete('/appointments/:id', auth,
    async (req, res) => deleteAppointment.execute(req, res))
adminRouter.patch('/appointments/:id', auth,
    async (req, res) => updateStatusAppointment.execute(req, res))
adminRouter.post('/presence-token', auth,
    async (req, res) => createPresenceToken.execute(req, res))
adminRouter.get('/presence-token', auth,
    async (req, res) => showPresenceToken.execute(req, res))
adminRouter.get('/profile', auth,
    async (req, res) => showProfile.execute(req, res))
adminRouter.get('/statistics', auth,
    async (req, res) => showStatistics.execute(req, res))

/**
 * Rotas de alunos
 */
adminRouter.get('/clients', auth,
    validator('PaginationSchema'),
    async (req, res) => listClients.execute(req, res))
adminRouter.put('/reset-password/:id', auth,
    async (req, res) => resetPassword.execute(req, res))
adminRouter.put('/clients', auth,
    validator('UpdateClientSchema'),
    async (req, res) => updateClient.execute(req, res))
adminRouter.get('/clients/:id/appointments', auth,
    async (req, res) => listClientAppointments.execute(req, res))

/**
 * Rotas de exercicios
 */
adminRouter.get('/muscle-group', auth,
    async (req, res) => listMuscleGroup.execute(req, res))
adminRouter.post('/exercises', auth,
    uploadMiddleware.single('cover'),
    validator('CreateExerciseSchema'),
    async (req, res) => createExercise.execute(req, res))
adminRouter.get('/exercises/:id', auth,
    async (req, res) => listExercises.execute(req, res))
adminRouter.delete('/exercises/:id', auth,
    async (req, res) => deleteExercise.execute(req, res))
adminRouter.put('/exercises', auth,
    uploadMiddleware.single('cover'),
    validator('UpdateExerciseSchema'),
    async (req, res) => updateExercise.execute(req, res))


/**
* Rotas de Notificações
*/
adminRouter.post('/notifications', auth,
    uploadMiddleware.array('files'),
    validator('CreateNotificationSchema'),
    async (req, res) => createNotification.execute(req, res))

adminRouter.get('/notifications', auth,
    validator('PaginationSchema'),
    async (req, res) => listNotifications.execute(req, res))

adminRouter.delete('/notifications/:id', auth,
    async (req, res) => deleteNotifications.execute(req, res))


/**
 * Rotas de pagamentos 
*/
adminRouter.post('/payments', auth,
    validator('RegisterPaymentSchema'),
    async (req, res) => registerPayment.execute(req, res))


export default adminRouter