import { Router } from 'express'
import createPresenceToken from './controllers/admin/create-presence-token'
import createSession from './controllers/admin/create-session'
import deleteAppointment from './controllers/admin/delete-appointment'
import listAppointments from './controllers/admin/list-appointments'
import listClientAppointments from './controllers/admin/list-client-appointments'
import listClients from './controllers/admin/list-clients'
import resetPassword from './controllers/admin/reset-password'
import showPresenceToken from './controllers/admin/show-presence-token'
import showProfile from './controllers/admin/show-profile'
import showStatistics from './controllers/admin/statistics'
import auth from './middlewares/auth'
import { validator } from './middlewares/validator'

const adminRouter = Router()

// Session routes 
adminRouter.post('/signin',
    validator('CreateAdminSessionSchema'),
    async (req, res) => await createSession.execute(req, res))


adminRouter.get('/clients', auth,
    validator('PaginationSchema'),
    async (req, res) => listClients.execute(req, res))
adminRouter.put('/reset-password/:id', auth,
    async (req, res) => resetPassword.execute(req, res))
adminRouter.get('/clients/:id/appointments', auth,
    async (req, res) => listClientAppointments.execute(req, res))
adminRouter.get('/appointments', auth,
    validator('DateSchema'),
    async (req, res) => listAppointments.execute(req, res))
adminRouter.delete('/appointments/:id', auth,
    async (req, res) => deleteAppointment.execute(req, res))
adminRouter.post('/presence-token', auth,
    async (req, res) => createPresenceToken.execute(req, res))
adminRouter.get('/presence-token', auth,
    async (req, res) => showPresenceToken.execute(req, res))
adminRouter.get('/profile', auth,
    async (req, res) => showProfile.execute(req, res))
adminRouter.get('/statistics', auth,
    async (req, res) => showStatistics.execute(req, res))

export default adminRouter