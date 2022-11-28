import { Router } from 'express'
import createPresenceToken from './controllers/admin/create-presence-token'
import createSession from './controllers/admin/create-session'
import listAppointments from './controllers/admin/list-appointments'
import listClientAppointments from './controllers/admin/list-client-appointments'
import listClients from './controllers/admin/list-clients'
import showPresenceToken from './controllers/admin/show-presence-token'
import auth from './middlewares/auth'
import { validator } from './middlewares/validator'

const adminRouter = Router()

// Session routes 
adminRouter.post('/signin',
    validator('CreateAdminSessionSchema'),
    async (req, res) => await createSession.execute(req, res))


adminRouter.get('/clients', auth,
    async (req, res) => listClients.execute(req, res))
adminRouter.get('/clients/:id/appointments', auth,
    async (req, res) => listClientAppointments.execute(req, res))
adminRouter.get('/appointments', auth,
    validator('DateSchema'),
    async (req, res) => listAppointments.execute(req, res))
adminRouter.post('/presence-token', auth,
    async (req, res) => createPresenceToken.execute(req, res))
adminRouter.get('/presence-token', auth,
    async (req, res) => showPresenceToken.execute(req, res))

export default adminRouter