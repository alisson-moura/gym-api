import { Router } from 'express'
import createSession from './controllers/admin/create-session'
import auth from './middlewares/auth'
import { validator } from './middlewares/validator'

const adminRouter = Router()

// Session routes 
adminRouter.post('/signin',
    validator('CreateAdminSessionSchema'),
    async (req, res) => await createSession.execute(req, res))



export default adminRouter